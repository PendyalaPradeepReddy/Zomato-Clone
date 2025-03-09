import { createPortal } from 'react-dom';
import React, { useState } from 'react';
import axios from 'axios';
import gLogo from '/images/google.png';
import mailLogo from '/images/emailIcon.jpg';
import closeBtn from '/images/closeBtn.jpg';

import signupCss from './Signup.module.css';

const Signup = ({ setAuth }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        checkbox: false
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when user starts typing
        setError('');
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError('');

            // Validate form
            if (!formData.username || !formData.email) {
                setError('Please fill in all fields');
                return;
            }

            if (!formData.checkbox) {
                setError('Please accept the terms and conditions');
                return;
            }

            // Make API call to backend
            const response = await axios.post('http://localhost:4001/signup', {
                username: formData.username.trim(),
                email: formData.email.trim(),
                checkbox: formData.checkbox
            });

            console.log('Signup response:', response.data);

            if (response.data.success) {
                setSuccess('Registration successful! Redirecting to login...');
                // Clear form
                setFormData({
                    username: '',
                    email: '',
                    checkbox: false
                });
                // Redirect to login immediately
                setAuth({ closed: false, login: true, signup: false });
            } else {
                setError(response.data.error || 'Registration failed. Please try again.');
            }
        } catch (err) {
            console.error('Signup error:', err);
            setError(err.response?.data?.error || 'An error occurred during registration');
        } finally {
            setLoading(false);
        }
    };

    const loginDiv = (
        <div className={signupCss.outerDiv}>
            <div className={signupCss.modal}>
                <div className={signupCss.header}>
                    <span className={signupCss.ttl}>Signup</span>
                    <span 
                        className={signupCss.closeBtn} 
                        onClick={() => setAuth({ closed: true, login: false, signup: false })}
                    >
                        <img className={signupCss.closeBtnImg} src={closeBtn} alt="close button" />
                    </span>
                </div>
                <div className={signupCss.lgBox}>
                    {error && <div className={signupCss.error}>{error}</div>}
                    {success && <div className={signupCss.success}>{success}</div>}
                    
                    <input 
                        className={signupCss.inpBox} 
                        type="text" 
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder='Full Name' 
                    />
                    <input 
                        className={signupCss.inpBox} 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Email' 
                    />
                    <span className={signupCss.termsTxt}>
                        <input 
                            type="checkbox" 
                            name="checkbox" 
                            checked={formData.checkbox}
                            onChange={handleChange}
                            className={signupCss.checkBox} 
                        />
                        <span>
                            I agree to Zomato's <a href="" className={signupCss.termaAnchor}>Terms of Service, Privacy Policy</a> and <a href="" className={signupCss.termaAnchor}>Content Policies</a>
                        </span>
                    </span>
                    <button 
                        className={`${signupCss.btn} ${loading ? signupCss.loading : ''}`} 
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </div>
                <div className={signupCss.orBreak}>
                    <span className={signupCss.orBreakText}>or</span>
                </div>
                <div className={signupCss.socialSignupBox}>
                    <img className={signupCss.icon} src={gLogo} alt="google login" />
                    Continue with Google
                </div>
                <hr className={signupCss.break} />
                <div className={signupCss.newToZomato}>
                    Already have an account? 
                    <div 
                        className={signupCss.createAcc} 
                        onClick={() => setAuth({ closed: false, login: true, signup: false })}
                    >
                        Log in
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(loginDiv, document.getElementById('modal'));
};

export default Signup;