// src/App.jsx
// REPLACE YOUR EXISTING App.jsx WITH THIS

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

// NEW: Import all role-based dashboards
import CustomerDashboard from './pages/CustomerDashboard';
import PharmacistDashboard from './pages/PharmacistDashboard';
import SupplierDashboard from './pages/SupplierDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* NEW: Role-Based Protected Routes */}
          <Route
            path="/dashboard/customer"
            element={
              <ProtectedRoute allowedRole="customer">
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/dashboard/pharmacist"
            element={
              <ProtectedRoute allowedRole="pharmacist">
                <PharmacistDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/dashboard/supplier"
            element={
              <ProtectedRoute allowedRole="supplier">
                <SupplierDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Default Route - Redirect to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* OLD: Generic dashboard route - redirect to login */}
          <Route path="/dashboard" element={<Navigate to="/login" replace />} />

          {/* Catch all route - Redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
