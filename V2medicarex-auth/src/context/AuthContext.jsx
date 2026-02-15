// src/context/AuthContext.jsx
// REPLACE YOUR ENTIRE AuthContext.jsx WITH THIS VERIFIED VERSION

import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore'; // CRITICAL: Firestore imports
import { auth, db } from '../firebase/firebaseConfig'; // CRITICAL: Import db

// Create authentication context
const AuthContext = createContext({});

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  // Get user role from Firestore
  const getUserRole = async (userId) => {
    try {
      console.log('🔍 Fetching role for user:', userId); // DEBUG
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const role = userDoc.data().role;
        console.log('✅ Role found:', role); // DEBUG
        return role;
      } else {
        console.warn('⚠️ User document not found in Firestore'); // DEBUG
        return null;
      }
    } catch (error) {
      console.error('❌ Error getting user role:', error); // DEBUG
      return null;
    }
  };

  // Register new user with email, password, fullName, and role
  const register = async (email, password, fullName, role) => {
    console.log('🔵 Register function called'); // DEBUG
    console.log('  📧 Email:', email); // DEBUG
    console.log('  👤 Name:', fullName); // DEBUG
    console.log('  🎭 Role:', role); // DEBUG
    
    try {
      // Step 1: Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('✅ Firebase Auth user created:', userCredential.user.uid); // DEBUG
      
      // Step 2: Update display name
      if (fullName) {
        await updateProfile(userCredential.user, {
          displayName: fullName,
        });
        console.log('✅ Display name updated'); // DEBUG
      }

      // Step 3: Create Firestore user document with role
      const userData = {
        email: email,
        displayName: fullName || '',
        role: role, // CRITICAL: Save the role!
        createdAt: new Date().toISOString(),
      };
      
      console.log('💾 Saving to Firestore:', userData); // DEBUG
      
      await setDoc(doc(db, 'users', userCredential.user.uid), userData);
      
      console.log('✅ Firestore document created successfully!'); // DEBUG
      
      // Step 4: Set role in state
      setUserRole(role);
      console.log('✅ Role set in state:', role); // DEBUG
      
      return userCredential;
    } catch (error) {
      console.error('❌ Registration error:', error); // DEBUG
      console.error('   Error code:', error.code); // DEBUG
      console.error('   Error message:', error.message); // DEBUG
      throw error;
    }
  };

  // Login with email and password
  const login = async (email, password) => {
    console.log('🔵 Login function called for:', email); // DEBUG
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ Login successful:', userCredential.user.uid); // DEBUG
      
      // Get user role from Firestore
      const role = await getUserRole(userCredential.user.uid);
      setUserRole(role);
      console.log('✅ User role set:', role); // DEBUG
      
      return userCredential;
    } catch (error) {
      console.error('❌ Login error:', error); // DEBUG
      throw error;
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await signOut(auth);
      setUserRole(null);
      console.log('✅ Logout successful'); // DEBUG
    } catch (error) {
      console.error('❌ Logout error:', error); // DEBUG
      throw error;
    }
  };

  // Send password reset email
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log('✅ Password reset email sent'); // DEBUG
    } catch (error) {
      console.error('❌ Password reset error:', error); // DEBUG
      throw error;
    }
  };

  // Monitor authentication state changes
  useEffect(() => {
    console.log('🔵 Setting up auth state listener'); // DEBUG
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('🔵 Auth state changed:', user ? user.uid : 'No user'); // DEBUG
      
      setCurrentUser(user);
      
      if (user) {
        // Get user role when auth state changes
        const role = await getUserRole(user.uid);
        setUserRole(role);
      } else {
        setUserRole(null);
      }
      
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    register,
    login,
    logout,
    resetPassword,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
