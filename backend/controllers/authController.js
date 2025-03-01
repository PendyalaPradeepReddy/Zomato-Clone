import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import twilio from 'twilio';
import messagebird from 'messagebird';

// Validate required environment variables
const validateEnvVariables = () => {
  const requiredVars = {
    JWT_SECRET: process.env.JWT_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    NODE_ENV: process.env.NODE_ENV
  };

  const missingVars = Object.entries(requiredVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  // In production, require at least one SMS service
  if (process.env.NODE_ENV === 'production' && 
      !process.env.MESSAGEBIRD_API_KEY && 
      !(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER)) {
    throw new Error('Production environment requires either MessageBird or Twilio configuration');
  }
};

try {
  validateEnvVariables();
} catch (error) {
  console.error('Environment validation error:', error.message);
  process.exit(1);
}

// Initialize SMS clients with error handling
let twilioClient = null;
let messageBirdClient = null;

try {
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }
} catch (error) {
  console.error('Failed to initialize Twilio client:', error);
}

try {
  if (process.env.MESSAGEBIRD_API_KEY) {
    messageBirdClient = messagebird(process.env.MESSAGEBIRD_API_KEY);
  }
} catch (error) {
  console.error('Failed to initialize MessageBird client:', error);
}

// Rate limiting helper
const rateLimiter = {
  attempts: new Map(),
  cleanupInterval: 60 * 60 * 1000, // 1 hour
  cleanupTimer: null,

  init() {
    // Clear any existing timer
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }

    // Cleanup old entries periodically
    this.cleanupTimer = setInterval(() => {
      const now = Date.now();
      for (const [key, value] of this.attempts) {
        if (now - value.timestamp > this.cleanupInterval) {
          this.attempts.delete(key);
        }
      }
    }, this.cleanupInterval);

    // Handle process termination
    process.on('SIGTERM', () => this.cleanup());
    process.on('SIGINT', () => this.cleanup());
  },

  cleanup() {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }
    this.attempts.clear();
  },

  async checkLimit(phoneNumber) {
    const now = Date.now();
    const key = `${phoneNumber}`;
    const attempt = this.attempts.get(key);

    if (!attempt) {
      this.attempts.set(key, {
        count: 1,
        timestamp: now,
        blocked: false
      });
      return { allowed: true };
    }

    // Reset count if more than 1 hour has passed
    if (now - attempt.timestamp > this.cleanupInterval) {
      attempt.count = 1;
      attempt.timestamp = now;
      attempt.blocked = false;
      return { allowed: true };
    }

    // Check if blocked
    if (attempt.blocked) {
      const remainingTime = Math.ceil((attempt.timestamp + this.cleanupInterval - now) / 1000);
      return {
        allowed: false,
        message: `Too many attempts. Please try again after ${Math.ceil(remainingTime / 60)} minutes`,
        retryAfter: new Date(attempt.timestamp + this.cleanupInterval)
      };
    }

    // Increment count
    attempt.count++;

    // Block if too many attempts
    if (attempt.count > 10) { // 10 attempts per hour
      attempt.blocked = true;
      return {
        allowed: false,
        message: 'Too many attempts. Please try again after 1 hour',
        retryAfter: new Date(now + this.cleanupInterval)
      };
    }

    return { allowed: true };
  }
};

// Initialize rate limiter
rateLimiter.init();

// Helper function to validate phone number
const validatePhoneNumber = (phoneNumber) => {
  // Remove any non-digit characters except leading +
  const cleanNumber = phoneNumber.replace(/(?!^\+)[^\d]/g, '');
  
  // Check basic format (international format with optional +)
  if (!cleanNumber.match(/^\+?[1-9]\d{1,14}$/)) {
    throw new Error('Invalid phone number format. Please use international format (e.g., +1234567890)');
  }

  // Ensure minimum length (country code + number)
  if (cleanNumber.length < 8) {
    throw new Error('Phone number too short. Please include country code.');
  }

  // Ensure maximum length
  if (cleanNumber.length > 15) {
    throw new Error('Phone number too long. Maximum 15 digits allowed.');
  }

  return cleanNumber;
};

// Helper function to send SMS
const sendSMS = async (phoneNumber, message) => {
  try {
    // Validate and clean phone number
    const validatedNumber = validatePhoneNumber(phoneNumber);

    if (!messageBirdClient && !twilioClient) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Development mode: SMS would be sent to', validatedNumber, 'with message:', message);
        return;
      }
      throw new Error('No SMS service configured. Please configure MessageBird or Twilio.');
    }

    const errors = [];

    // Try MessageBird first if available
    if (messageBirdClient) {
      try {
        await messageBirdClient.messages.create({
          originator: 'YourApp',
          recipients: [validatedNumber],
          body: message
        });
        return; // Success, exit function
      } catch (messageBirdError) {
        console.error('MessageBird error:', messageBirdError);
        errors.push(`MessageBird: ${messageBirdError.message}`);
      }
    }

    // Try Twilio as fallback if available
    if (twilioClient) {
      try {
        await twilioClient.messages.create({
          body: message,
          to: validatedNumber,
          from: process.env.TWILIO_PHONE_NUMBER
        });
        return; // Success, exit function
      } catch (twilioError) {
        console.error('Twilio error:', twilioError);
        errors.push(`Twilio: ${twilioError.message}`);
      }
    }

    // If we get here, all available services failed
    throw new Error(`Failed to send SMS: ${errors.join(', ')}`);
  } catch (error) {
    // Wrap validation errors
    if (error.message.includes('phone number')) {
      throw new Error(`Phone number validation failed: ${error.message}`);
    }
    throw error;
  }
};

// Helper function to generate tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { user: { id: userId } },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  const refreshToken = jwt.sign(
    { user: { id: userId } },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

// Helper function to handle errors
const handleError = (error) => {
  if (error.code === 11000) {
    return 'Email already exists';
  }
  if (error.name === 'ValidationError') {
    return Object.values(error.errors).map(err => err.message).join(', ');
  }
  return 'Server error occurred';
};

// @desc    Register new user
// @route   POST /signup
// @access  Public
export const signup = async (req, res) => {
  try {
    console.log('Signup request received:', req.body);
    
    const { username, email, checkbox } = req.body;

    // Validate required fields
    if (!username || !email) {
      return res.status(400).json({
        success: false,
        error: 'Please provide both name and email'
      });
    }

    // Validate terms acceptance
    if (!checkbox) {
      return res.status(400).json({
        success: false,
        error: 'Please accept the terms and conditions'
      });
    }

    // Clean the email
    const cleanEmail = email.trim().toLowerCase();
    console.log('Checking for existing user with email:', cleanEmail);

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email: cleanEmail });
      console.log('Existing user check result:', existingUser);

      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: 'Email already exists'
        });
      }

      // Create user
      const user = await User.create({
        username: username.trim(),
        email: cleanEmail,
        acceptedTerms: checkbox
      });

      console.log('User created successfully:', user);

      // Send response
      res.status(201).json({
        success: true,
        message: 'Registration successful',
        user: {
          _id: user._id,
          username: user.username,
          email: user.email
        }
      });
    } catch (dbError) {
      console.error('Database operation error:', dbError);
      
      // Check if it's a duplicate key error
      if (dbError.code === 11000) {
        return res.status(400).json({
          success: false,
          error: 'Email already exists'
        });
      }

      throw dbError; // Re-throw other errors to be caught by outer catch block
    }

  } catch (error) {
    console.error('Signup error:', error);
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server error during registration'
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        msg: 'Invalid credentials'
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        msg: 'Account is deactivated'
      });
    }

    // Check if account is locked
    if (user.isLocked()) {
      const lockTime = Math.ceil((user.lockUntil - Date.now()) / 1000 / 60);
      return res.status(401).json({
        success: false,
        msg: `Account is locked. Please try again in ${lockTime} minutes`
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      await user.handleFailedLogin();
      return res.status(401).json({
        success: false,
        msg: `Invalid credentials. ${5 - user.loginAttempts} attempts remaining`
      });
    }

    // Handle successful login
    await user.handleSuccessfulLogin();

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);
    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified
      },
      accessToken,
      refreshToken
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      msg: 'Error during login'
    });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        msg: 'Refresh token is required'
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    
    // Find user
    const user = await User.findById(decoded.user.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        msg: 'Invalid refresh token'
      });
    }

    // Check if account is still active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        msg: 'Account is deactivated'
      });
    }

    // Generate new tokens
    const tokens = generateTokens(user._id);

    // Update refresh token
    user.refreshToken = tokens.refreshToken;
    await user.save();

    res.json({
      success: true,
      ...tokens
    });

  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({
      success: false,
      msg: 'Invalid refresh token'
    });
  }
};

export const logout = async (req, res) => {
  try {
    // Clear refresh token in database
    const user = await User.findById(req.user.id);
    user.refreshToken = null;
    await user.save();

    res.json({
      success: true,
      msg: 'Logged out successfully'
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      msg: 'Server error during logout'
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: 'User not found'
      });
    }

    // Generate reset token
    const resetToken = user.generatePasswordResetToken();
    await user.save();

    // TODO: Send password reset email
    // sendPasswordResetEmail(email, resetToken);

    res.json({
      success: true,
      msg: 'Password reset email sent'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      msg: 'Server error during password reset request'
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // Hash token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: 'Invalid or expired reset token'
      });
    }

    // Update password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({
      success: true,
      msg: 'Password reset successful'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(400).json({
      success: false,
      msg: handleError(error)
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Hash token
    const emailVerificationToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Find user with valid token
    const user = await User.findOne({
      emailVerificationToken,
      emailVerificationExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: 'Invalid or expired verification token'
      });
    }

    // Update user
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;
    await user.save();

    res.json({
      success: true,
      msg: 'Email verified successfully'
    });

  } catch (error) {
    console.error('Email verification error:', error);
    res.status(400).json({
      success: false,
      msg: handleError(error)
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: 'User not found'
      });
    }

    res.json({
      success: true,
      user: user.toJSON()
    });
    
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      msg: 'Server error while fetching user data'
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, phoneNumber, address, preferences } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: 'User not found'
      });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (email && email !== user.email) {
      user.email = email;
      user.isEmailVerified = false;
      const verificationToken = user.generateEmailVerificationToken();
      // TODO: Send verification email
    }
    if (phoneNumber && phoneNumber !== user.phoneNumber) {
      user.phoneNumber = phoneNumber;
      user.isPhoneVerified = false;
    }
    if (address) user.address = { ...user.address, ...address };
    if (preferences) user.preferences = { ...user.preferences, ...preferences };

    await user.save();

    res.json({
      success: true,
      user: user.toJSON()
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(400).json({
      success: false,
      msg: handleError(error)
    });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('notifications')
      .sort({ 'notifications.createdAt': -1 });

    res.json({
      success: true,
      notifications: user.notifications
    });

  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({
      success: false,
      msg: 'Server error while fetching notifications'
    });
  }
};

export const markNotificationRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const user = await User.findById(req.user.id);

    const notification = user.notifications.id(notificationId);
    if (!notification) {
      return res.status(404).json({
        success: false,
        msg: 'Notification not found'
      });
    }

    notification.read = true;
    await user.save();

    res.json({
      success: true,
      notification
    });

  } catch (error) {
    console.error('Mark notification error:', error);
    res.status(500).json({
      success: false,
      msg: 'Server error while updating notification'
    });
  }
};

export const toggleFavoriteRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const user = await User.findById(req.user.id);

    const index = user.favoriteRestaurants.indexOf(restaurantId);
    if (index > -1) {
      user.favoriteRestaurants.splice(index, 1);
    } else {
      user.favoriteRestaurants.push(restaurantId);
    }

    await user.save();

    res.json({
      success: true,
      favoriteRestaurants: user.favoriteRestaurants
    });

  } catch (error) {
    console.error('Toggle favorite restaurant error:', error);
    res.status(500).json({
      success: false,
      msg: 'Server error while updating favorites'
    });
  }
};

export const sendOTP = async (req, res) => {
  try {
    const { phoneNumber, purpose = 'verification' } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        msg: 'Phone number is required'
      });
    }

    // Check rate limit first
    const rateLimitResult = await rateLimiter.checkLimit(phoneNumber);
    if (!rateLimitResult.allowed) {
      return res.status(429).json({
        success: false,
        msg: rateLimitResult.message,
        retryAfter: rateLimitResult.retryAfter
      });
    }
    
    // Find user by phone number
    const user = await User.findOne({ phoneNumber });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: 'No user found with this phone number'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        msg: 'Account is deactivated. Please contact support.'
      });
    }

    // Check if user can request new OTP
    if (!user.canRequestOTP()) {
      const hoursSinceLastRequest = Math.ceil((Date.now() - user.otpRequestCount.lastRequest) / (1000 * 60 * 60));
      return res.status(429).json({
        success: false,
        msg: `Daily OTP limit exceeded. Please try again after ${24 - hoursSinceLastRequest} hours.`,
        nextAllowedDate: new Date(user.otpRequestCount.lastRequest.getTime() + 24 * 60 * 60 * 1000)
      });
    }

    // Generate new OTP
    const otp = user.generateOTP();
    await user.save();

    // Send OTP via SMS
    try {
      await sendSMS(
        phoneNumber,
        `Your verification code is: ${otp}. Valid for 60 seconds. Do not share this code with anyone.`
      );
    } catch (smsError) {
      // If SMS fails in production, revert OTP generation
      if (process.env.NODE_ENV !== 'development') {
        user.phoneOTP.code = null;
        user.phoneOTP.expiresAt = null;
        user.otpRequestCount.count -= 1;
        await user.save();
        throw new Error(`Failed to send OTP: ${smsError.message}`);
      }
    }

    // Calculate remaining attempts for the day
    const remainingAttempts = 5 - user.otpRequestCount.count;

    res.json({
      success: true,
      msg: 'OTP sent successfully',
      expiresIn: 60, // seconds
      remainingAttempts,
      retryAfter: user.phoneOTP.expiresAt,
      // Only send OTP in development
      otp: process.env.NODE_ENV === 'development' ? otp : undefined
    });

  } catch (error) {
    console.error('Send OTP error:', error);
    
    // Handle specific error types
    if (error.message.includes('validation failed')) {
      return res.status(400).json({
        success: false,
        msg: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      msg: error.message || 'Error sending OTP',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    // Validate input
    if (!phoneNumber || !otp) {
      return res.status(400).json({
        success: false,
        msg: 'Phone number and OTP are required'
      });
    }

    // Validate OTP format
    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        success: false,
        msg: 'Invalid OTP format. Must be 6 digits.'
      });
    }
    
    // Find user by phone number
    const user = await User.findOne({ phoneNumber });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: 'No user found with this phone number'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        msg: 'Account is deactivated. Please contact support.'
      });
    }

    // Verify OTP
    const verificationResult = await user.verifyOTP(otp);
    
    if (!verificationResult.isValid) {
      // Calculate remaining attempts
      const remainingAttempts = 3 - user.phoneOTP.attempts;
      
      return res.status(400).json({
        success: false,
        msg: verificationResult.message,
        remainingAttempts,
        canRequestNew: user.canRequestOTP(),
        retryAfter: remainingAttempts === 0 ? new Date(Date.now() + 15 * 60 * 1000) : null // 15 minutes cooldown if no attempts left
      });
    }

    // Generate tokens on successful verification
    const { accessToken, refreshToken } = generateTokens(user._id);
    user.refreshToken = refreshToken;
    await user.save();

    // Add success notification
    await user.addNotification('system', 'Phone number verified successfully');

    res.json({
      success: true,
      msg: verificationResult.message,
      accessToken,
      refreshToken,
      user: user.toJSON(),
      isPhoneVerified: true
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      msg: 'Error verifying OTP',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const resendOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    // Check rate limit first
    const rateLimitResult = await rateLimiter.checkLimit(phoneNumber);
    if (!rateLimitResult.allowed) {
      return res.status(429).json({
        success: false,
        msg: rateLimitResult.message,
        retryAfter: rateLimitResult.retryAfter
      });
    }
    
    // Find user by phone number
    const user = await User.findOne({ phoneNumber });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: 'No user found with this phone number'
      });
    }

    // Check if previous OTP has expired
    if (user.phoneOTP.expiresAt && user.phoneOTP.expiresAt > Date.now()) {
      const remainingTime = Math.ceil((user.phoneOTP.expiresAt - Date.now()) / 1000);
      return res.status(429).json({
        success: false,
        msg: `Please wait ${remainingTime} seconds before requesting a new OTP`,
        retryAfter: user.phoneOTP.expiresAt
      });
    }

    // Check daily limit
    if (!user.canRequestOTP()) {
      const hoursSinceLastRequest = Math.ceil((Date.now() - user.otpRequestCount.lastRequest) / (1000 * 60 * 60));
      return res.status(429).json({
        success: false,
        msg: `Daily OTP limit exceeded. Please try again after ${24 - hoursSinceLastRequest} hours.`,
        nextAllowedDate: new Date(user.otpRequestCount.lastRequest.getTime() + 24 * 60 * 60 * 1000)
      });
    }

    // Generate and send new OTP
    const otp = user.generateOTP();
    await user.save();

    // Send OTP via SMS
    try {
      await sendSMS(
        phoneNumber,
        `Your new verification code is: ${otp}. Valid for 60 seconds. Do not share this code with anyone.`
      );
    } catch (smsError) {
      // If SMS fails in production, revert OTP generation
      if (process.env.NODE_ENV !== 'development') {
        user.phoneOTP.code = null;
        user.phoneOTP.expiresAt = null;
        user.otpRequestCount.count -= 1;
        await user.save();
        throw smsError;
      }
    }

    // Calculate remaining attempts for the day
    const remainingAttempts = 5 - user.otpRequestCount.count;

    res.json({
      success: true,
      msg: 'New OTP sent successfully',
      expiresIn: 60,
      remainingAttempts,
      retryAfter: user.phoneOTP.expiresAt,
      otp: process.env.NODE_ENV === 'development' ? otp : undefined
    });

  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({
      success: false,
      msg: error.message || 'Error resending OTP',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};