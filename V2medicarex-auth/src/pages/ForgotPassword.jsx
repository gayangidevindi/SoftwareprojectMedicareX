import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const ForgotPassword = () => {
  const { resetPassword } = useAuth();

  // Form state
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Handle email input change
  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) {
      setError('');
    }
  };

  // Validate email
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      setError('Email is required');
      return false;
    }
    
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      await resetPassword(email);
      setEmailSent(true);
    } catch (error) {
      let errorMessage = 'Failed to send reset email';

      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'This email is not registered';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many attempts. Please try again later';
          break;
        default:
          errorMessage = 'Failed to send reset email. Please try again';
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle resend email
  const handleResend = async () => {
    setLoading(true);
    setError('');

    try {
      await resetPassword(email);
      // Show a brief success message
      alert('Email sent successfully!');
    } catch (error) {
      setError('Failed to resend email. Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card forgot-password-card">
        {!emailSent ? (
          <>
            {/* Initial Form - Enter Email */}
            <h1 className="auth-title">Recover your password</h1>
            <p className="auth-subtitle">
              Enter the email address you used to create your account
            </p>

            <form onSubmit={handleSubmit} className="auth-form">
              {/* Email Input */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="test123@gmail.com"
                    value={email}
                    onChange={handleChange}
                    className={error ? 'error' : ''}
                  />
                  {error && <span className="error-icon">⊗</span>}
                </div>
                {error && <span className="error-text">{error}</span>}
              </div>

              {/* Submit Button */}
              <button type="submit" className="auth-button" disabled={loading}>
                {loading ? 'SENDING...' : 'RECOVER'}
              </button>

              {/* Back to Login Link */}
              <Link to="/login" className="back-link">
                ← Log in
              </Link>
            </form>
          </>
        ) : (
          <>
            {/* Confirmation Screen - Email Sent */}
            <div className="success-icon">📧</div>
            <h1 className="auth-title">Recover your password</h1>
            <p className="auth-subtitle success-message">
              We just sent you an email containing further instructions.
            </p>
            <p className="auth-note">
              Please check your inbox and spam folder. The link will expire in 24 hours.
            </p>

            {/* Continue Exploring Button */}
            <Link to="/login" className="auth-button">
              Continue exploring →
            </Link>

            {/* Resend Email Link */}
            <div className="resend-section">
              <span>Didn't receive the email? </span>
              <button
                onClick={handleResend}
                className="resend-link"
                disabled={loading}
              >
                Resend email
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
