import { useState } from 'react';
import axios from 'axios';
import gLogo from '/images/google.png';
import mailLogo from '/images/emailIcon.jpg';
import closeBtn from '/images/closeBtn.jpg';
import signupCss from './Signup.module.css';

let Signup = ({ setAuth }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    checkbox: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear any previous error messages when user starts typing
    setError('');
  };

  const handleSubmit = async () => {
    try {
      // Validate form data
      if (!formData.username.trim()) {
        setError('Please enter your name');
        return;
      }
      if (!formData.email.trim()) {
        setError('Please enter your email');
        return;
      }
      if (!formData.checkbox) {
        setError('Please accept the terms and conditions');
        return;
      }

      const response = await axios.post('http://localhost:4001/signup', {
        username: formData.username.trim(),
        email: formData.email.trim(),
        checkbox: formData.checkbox
      });

      if (response.data.success) {
        setSuccess('Registration successful!');
        // Clear form after successful registration
        setFormData({
          username: '',
          email: '',
          checkbox: false
        });
        // Optional: Close the signup modal or redirect
        setTimeout(() => {
          setAuth({ closed: true, login: false, signup: false });
        }, 2000);
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  let loginDiv = <div className={signupCss.outerDiv}>
    <div className={signupCss.modal}>
      <div className={signupCss.header}>
        <span className={signupCss.tt1}>Sign up</span>
        <span className={signupCss.close} onClick={() => setAuth({ closed: true, login: false, signup: false })}>
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
          placeholder="Enter your name" 
        />
        <input 
          className={signupCss.inpBox} 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email" 
        />
        <span className={signupCss.termsTxt}>
          <input 
            type="checkbox" 
            name="checkbox"
            checked={formData.checkbox}
            onChange={handleChange}
            id="accept" 
            className={signupCss.checkBox} 
          />
          <span>
            I agree to the <a href="#" className={signupCss.termsAnchor}>Terms of Service</a> and <a href="#" className={signupCss.termsAnchor}>Privacy Policy</a>
          </span>
        </span>
        <button 
          className={signupCss.btn} 
          onClick={handleSubmit}
          disabled={!formData.username || !formData.email || !formData.checkbox}
        >
          Create account
        </button>
      </div>
      <div className={signupCss.orLine}>
        <span>or</span>
      </div>
      <button className={signupCss.googleBtn}>
        <img src={gLogo} alt="Google" className={signupCss.btnIcon} />
        Continue with Google
      </button>
      <button className={signupCss.emailBtn} onClick={() => setAuth({ closed: false, login: true, signup: false })}>
        <img src={mailLogo} alt="Email" className={signupCss.btnIcon} />
        Continue with Email
      </button>
    </div>
  </div>;

  return loginDiv;
};

export default Signup; 