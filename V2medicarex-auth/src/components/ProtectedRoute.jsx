// src/components/ProtectedRoute.jsx
// REPLACE YOUR EXISTING ProtectedRoute.jsx WITH THIS

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute Component
 * Protects routes that require authentication and specific roles
 * Redirects to login page if user is not authenticated
 * Redirects to correct dashboard if user has wrong role
 */
const ProtectedRoute = ({ children, allowedRole }) => {
  const { currentUser, userRole } = useAuth();

  // If no user is logged in, redirect to login page
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // NEW: If allowedRole is specified, check if user has the correct role
  if (allowedRole && userRole !== allowedRole) {
    // Redirect to the correct dashboard based on user's actual role
    switch (userRole) {
      case 'customer':
        return <Navigate to="/dashboard/customer" replace />;
      case 'pharmacist':
        return <Navigate to="/dashboard/pharmacist" replace />;
      case 'supplier':
        return <Navigate to="/dashboard/supplier" replace />;
      case 'admin':
        return <Navigate to="/dashboard/admin" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  // If user is authenticated and has correct role, render the protected content
  return children;
};

export default ProtectedRoute;
