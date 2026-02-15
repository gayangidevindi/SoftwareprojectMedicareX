// src/pages/Login.jsx
// REPLACE YOUR EXISTING Login.jsx WITH THIS

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, userRole } = useAuth(); // NEW: Get userRole from context

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Error and loading states
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Login user
      await login(formData.email, formData.password);
      
      // NEW: Get role from context after login
      // Wait a bit for context to update
      setTimeout(() => {
        const role = userRole;
        
        // Navigate based on role
        switch (role) {
          case 'customer':
            navigate('/dashboard/customer');
            break;
          case 'pharmacist':
            navigate('/dashboard/pharmacist');
            break;
          case 'supplier':
            navigate('/dashboard/supplier');
            break;
          case 'admin':
            navigate('/dashboard/admin');
            break;
          default:
            navigate('/dashboard/customer');
        }
      }, 500);
      
    } catch (error) {
      let errorMessage = 'Failed to sign in';

      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email';
          setErrors({ email: errorMessage });
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          setErrors({ password: errorMessage });
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          setErrors({ email: errorMessage });
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled';
          setErrors({ general: errorMessage });
          break;
        case 'auth/invalid-credential':
          errorMessage = 'Invalid email or password';
          setErrors({ general: errorMessage });
          break;
        default:
          setErrors({ general: errorMessage });
      }
    } finally {
      setLoading(false);
    }
  };

  // REMOVED: selectedRole state - no longer needed in login
  // Role is now fetched from Firestore after login

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Please enter your credentials to continue</p>

        {/* Tab Navigation */}
        <div className="auth-tabs">
          <button className="auth-tab active">Login</button>
          <Link to="/register" className="auth-tab">
            Register
          </Link>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* General Error Message */}
          {errors.general && (
            <div className="error-message general-error">{errors.general}</div>
          )}

          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email">EMAIL ADDRESS</label>
            <div className="input-wrapper">
              <span className="input-icon"></span>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
            </div>
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password">PASSWORD</label>
            <div className="password-header">
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>
            <div className="input-wrapper">
              <span className="input-icon"></span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="········"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'SIGNING IN...' : 'SIGN IN →'}
          </button>

          {/* Register Link */}
          <p className="auth-footer">
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Register here
            </Link>
          </p>
        </form>

        {/* Security Badge */}
        <div className="security-badge">
          <span className="security-icon"></span>
          <span className="security-text">END-TO-END ENCRYPTED CONNECTION</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
