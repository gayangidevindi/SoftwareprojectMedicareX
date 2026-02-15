// src/pages/Register.jsx
// REPLACE YOUR ENTIRE Register.jsx WITH THIS VERIFIED VERSION

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Role state - CRITICAL: Default to 'customer'
  const [selectedRole, setSelectedRole] = useState('customer');

  // Error and loading states
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
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

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the Terms of Service and Privacy Policy';
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

    // DEBUG: Log what we're about to send
    console.log(' Form Data:', {
      email: formData.email,
      fullName: formData.fullName,
      role: selectedRole, // CRITICAL: Check this logs correctly
    });

    try {
      // CRITICAL: Pass all 4 parameters in correct order
      await register(
        formData.email,      // Parameter 1: email
        formData.password,   // Parameter 2: password
        formData.fullName,   // Parameter 3: fullName
        selectedRole         // Parameter 4: role (CRITICAL!)
      );
      
      console.log('✅ Registration completed successfully!'); // DEBUG
      
      // Navigate based on role
      const roleRoutes = {
        customer: '/dashboard/customer',
        pharmacist: '/dashboard/pharmacist',
        supplier: '/dashboard/supplier',
        admin: '/dashboard/admin'
      };
      
      const targetRoute = roleRoutes[selectedRole] || '/dashboard/customer';
      console.log('🚀 Navigating to:', targetRoute); // DEBUG
      
      navigate(targetRoute);
      
    } catch (error) {
      console.error('❌ Registration failed:', error);
      
      let errorMessage = 'Failed to create account';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered';
          setErrors({ email: errorMessage });
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          setErrors({ email: errorMessage });
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak';
          setErrors({ password: errorMessage });
          break;
        default:
          setErrors({ general: errorMessage + ': ' + error.message });
      }
    } finally {
      setLoading(false);
    }
  };

  // Role options
  const roles = [
    { id: 'customer', label: 'Customer', subtitle: 'Buying Medicines' },
    { id: 'pharmacist', label: 'Pharmacist', subtitle: 'Retail Operations' },
    { id: 'supplier', label: 'Supplier', subtitle: 'Logistics & Supply' },
    { id: 'admin', label: 'Admin', subtitle: 'System Control'},
  ];

  // DEBUG: Log when role changes
  const handleRoleChange = (roleId) => {
    console.log(' Role selected:', roleId); // DEBUG
    setSelectedRole(roleId);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Create Your Account</h1>
        <p className="auth-subtitle">Join the pharmaceutical ecosystem with secure access.</p>

        <div className="auth-tabs">
          <Link to="/login" className="auth-tab">
            Login
          </Link>
          <button className="auth-tab active">Register</button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {errors.general && (
            <div className="error-message general-error">{errors.general}</div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <div className="input-wrapper">
                <span className="input-icon"></span>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={errors.fullName ? 'error' : ''}
                  disabled={loading}
                />
              </div>
              {errors.fullName && (
                <span className="error-text">{errors.fullName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon"></span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@smartpharma.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  disabled={loading}
                />
              </div>
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon"></span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="········"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                  disabled={loading}
                />
              </div>
              {errors.password && (
                <span className="error-text">{errors.password}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <span className="input-icon"></span>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="········"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? 'error' : ''}
                  disabled={loading}
                />
              </div>
              {errors.confirmPassword && (
                <span className="error-text">{errors.confirmPassword}</span>
              )}
            </div>
          </div>

          {/* CRITICAL: Role Selection */}
          <div className="form-group">
            <label>Select Your Role</label>
            <div className="role-grid">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className={`role-card ${selectedRole === role.id ? 'selected' : ''}`}
                  onClick={() => handleRoleChange(role.id)}
                >
                  <div className="role-icon">{role.icon}</div>
                  <div className="role-info">
                    <div className="role-label">{role.label}</div>
                    <div className="role-subtitle">{role.subtitle}</div>
                  </div>
                  {selectedRole === role.id && (
                    <div className="role-check">✓</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="terms-wrapper">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                disabled={loading}
              />
              <span>
                By creating an account, you agree to our{' '}
                <a href="#" className="terms-link">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="terms-link">
                  Privacy Policy
                </a>
                .
              </span>
            </label>
            {errors.terms && <span className="error-text">{errors.terms}</span>}
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
          </button>

          <p className="auth-footer">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
