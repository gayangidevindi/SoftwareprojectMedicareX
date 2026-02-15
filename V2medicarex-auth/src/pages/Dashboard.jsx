import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  return (
    <div className="dashboard-container">
      {/* Navigation Bar */}
      <nav className="dashboard-nav">
        <div className="nav-logo">
          <div className="logo-icon"></div>
          <span className="logo-text">MediCareX</span>
        </div>
        <div className="nav-links">
          <a href="#" className="nav-link">Help Center</a>
          <a href="#" className="nav-link">Support</a>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome to MediCareX Dashboard</h1>
          <p className="welcome-subtitle">
            You have successfully logged in to your account
          </p>
        </div>

        {/* User Info Card */}
        <div className="info-card">
          <div className="info-header">
            <div className="user-avatar">
              {currentUser?.displayName
                ? currentUser.displayName.charAt(0).toUpperCase()
                : currentUser?.email.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <h2 className="user-name">
                {currentUser?.displayName || 'User'}
              </h2>
              <p className="user-email">{currentUser?.email}</p>
            </div>
          </div>

          <div className="info-body">
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{currentUser?.email}</span>
            </div>
            <div className="info-row">
              <span className="info-label">User ID:</span>
              <span className="info-value">{currentUser?.uid}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Account Status:</span>
              <span className="info-value status-active">
                <span className="status-dot"></span>
                Active
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Email Verified:</span>
              <span className="info-value">
                {currentUser?.emailVerified ? (
                  <span className="verified">✓ Verified</span>
                ) : (
                  <span className="not-verified">✗ Not Verified</span>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="actions-grid">
          <div className="action-card">
            <div className="action-icon"></div>
            <h3 className="action-title">View Analytics</h3>
            <p className="action-description">
              Access your dashboard analytics and reports
            </p>
          </div>

          <div className="action-card">
            <div className="action-icon"></div>
            <h3 className="action-title">Settings</h3>
            <p className="action-description">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="action-card">
            <div className="action-icon"></div>
            <h3 className="action-title">Support</h3>
            <p className="action-description">
              Get help from our support team
            </p>
          </div>

          <div className="action-card">
            <div className="action-icon"></div>
            <h3 className="action-title">Documentation</h3>
            <p className="action-description">
              Browse through our comprehensive guides
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
