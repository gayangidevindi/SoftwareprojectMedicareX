# MediCareX Authentication System

A complete React + Firebase authentication system with Login, Registration, Forgot Password, and Protected Dashboard functionality.

## 📋 Table of Contents
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Firebase Setup](#firebase-setup)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Testing the Application](#testing-the-application)
- [Common Firebase Errors](#common-firebase-errors)
- [Deployment](#deployment)

## 🧱 Tech Stack

- **React 18.3** - UI Framework
- **Vite 5.3** - Build Tool
- **Firebase 10.8** - Authentication Backend
- **React Router DOM 6.22** - Routing
- **Context API** - State Management
- **CSS3** - Styling

## ✨ Features

### Authentication
- ✅ Email/Password Registration
- ✅ Email/Password Login
- ✅ Forgot Password (Email Reset)
- ✅ User Role Selection
- ✅ Protected Routes
- ✅ Logout Functionality

### Validation
- ✅ Email format validation
- ✅ Password strength (min 6 characters)
- ✅ Password confirmation matching
- ✅ Real-time error messages
- ✅ Firebase error handling

### UI/UX
- ✅ Responsive design
- ✅ Clean, modern interface
- ✅ Loading states
- ✅ Success/error feedback
- ✅ Accessible forms

## 📁 Project Structure

```
medicarex-auth/
├── src/
│   ├── firebase/
│   │   └── firebaseConfig.js          # Firebase initialization
│   ├── context/
│   │   └── AuthContext.jsx            # Authentication state management
│   ├── pages/
│   │   ├── Login.jsx                  # Login page
│   │   ├── Register.jsx               # Registration page
│   │   ├── ForgotPassword.jsx         # Password reset page
│   │   ├── Dashboard.jsx              # Protected dashboard
│   │   ├── Auth.css                   # Auth pages styling
│   │   └── Dashboard.css              # Dashboard styling
│   ├── components/
│   │   └── ProtectedRoute.jsx         # Route protection component
│   ├── App.jsx                        # Main app with routing
│   ├── main.jsx                       # Entry point
│   └── index.css                      # Global styles
├── index.html
├── package.json
├── vite.config.js
├── .env.example
├── .gitignore
└── README.md
```

## 🔥 Firebase Setup

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `medicarex-auth` (or any name you prefer)
4. Disable Google Analytics (optional for this project)
5. Click **"Create project"**

### Step 2: Register Your Web App

1. In your Firebase project dashboard, click the **Web icon** (`</>`)
2. Register app with nickname: `MediCareX Web`
3. Check **"Also set up Firebase Hosting"** (optional)
4. Click **"Register app"**
5. Copy the Firebase configuration object (you'll need this soon)

### Step 3: Enable Email/Password Authentication

1. In the Firebase Console, click **"Authentication"** in the left sidebar
2. Click **"Get started"**
3. Go to the **"Sign-in method"** tab
4. Click on **"Email/Password"**
5. **Enable** the first option (Email/Password)
6. Click **"Save"**

### Step 4: Get Firebase Configuration

Your Firebase config should look like this:

```javascript
{
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
}
```

## 📦 Installation

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Step 1: Clone/Download the Project

```bash
# If you have the project folder
cd medicarex-auth

# Or create from scratch
npm create vite@latest medicarex-auth -- --template react
cd medicarex-auth
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- `react` & `react-dom` - React framework
- `react-router-dom` - Routing
- `firebase` - Firebase SDK
- `vite` - Development server

### Step 3: Configure Environment Variables

1. Create a `.env` file in the root directory:

```bash
touch .env
```

2. Add your Firebase configuration (replace with your actual values):

```env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
```

⚠️ **Important**: 
- Never commit `.env` to version control
- The `.env` file is already in `.gitignore`
- Use `.env.example` as a template

## 🚀 Running the Project

### Development Mode

```bash
npm run dev
```

The application will open at: **http://localhost:3000**

### Production Build

```bash
npm run build
```

Builds the app for production to the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing.

## 🧪 Testing the Application

### 1. Test Registration

1. Navigate to **http://localhost:3000/register**
2. Fill in the registration form:
   - Full Name: `John Doe`
   - Email: `john@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
3. Check "Agree to Terms"
4. Click **"CREATE ACCOUNT"**
5. You should be redirected to the Dashboard

### 2. Test Login

1. Navigate to **http://localhost:3000/login**
2. Enter your credentials:
   - Email: `john@example.com`
   - Password: `password123`
3. Select a role (Customer/Pharmacist/Supplier/Admin)
4. Click **"SIGN IN"**
5. You should be redirected to the Dashboard

### 3. Test Forgot Password

1. Navigate to **http://localhost:3000/forgot-password**
2. Enter your email: `john@example.com`
3. Click **"RECOVER"**
4. Check your email for the password reset link
5. Click the link and create a new password
6. Log in with your new password

### 4. Test Protected Routes

1. Try accessing **http://localhost:3000/dashboard** without logging in
2. You should be redirected to the login page
3. After logging in, you can access the dashboard

### 5. Test Logout

1. Click the **"Logout"** button in the navigation
2. You should be redirected to the login page
3. Try accessing the dashboard - you'll be redirected to login

## 🐛 Common Firebase Errors

### 1. `auth/email-already-in-use`
**Error**: The email address is already in use by another account.
**Solution**: Use a different email or log in with existing credentials.

### 2. `auth/invalid-email`
**Error**: The email address is badly formatted.
**Solution**: Check email format (must include @ and domain).

### 3. `auth/weak-password`
**Error**: Password should be at least 6 characters.
**Solution**: Use a password with 6 or more characters.

### 4. `auth/user-not-found`
**Error**: There is no user record corresponding to this identifier.
**Solution**: Check the email or register a new account.

### 5. `auth/wrong-password`
**Error**: The password is invalid or the user does not have a password.
**Solution**: Check your password or use "Forgot Password".

### 6. `auth/invalid-credential`
**Error**: The supplied auth credential is malformed or has expired.
**Solution**: Check both email and password are correct.

### 7. `auth/too-many-requests`
**Error**: Access to this account has been temporarily disabled.
**Solution**: Wait a few minutes or reset your password.

### 8. `auth/network-request-failed`
**Error**: A network error has occurred.
**Solution**: Check your internet connection and try again.

## 🔒 Security Best Practices

1. **Never commit `.env` file** - It contains sensitive credentials
2. **Use environment variables** - Don't hardcode Firebase config
3. **Implement rate limiting** - Prevent brute force attacks
4. **Add email verification** - Verify user emails before access
5. **Use strong passwords** - Enforce password complexity rules
6. **Enable 2FA** - Add two-factor authentication (optional)
7. **Monitor authentication** - Check Firebase Console regularly

## 📤 Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add environment variables in Vercel dashboard.

### Deploy to Netlify

```bash
npm run build
```

Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop).

Add environment variables in Netlify dashboard.

### Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## 📝 Environment Variables

All Firebase configuration uses environment variables prefixed with `VITE_`:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Access them in code: `import.meta.env.VITE_FIREBASE_API_KEY`

## 🎯 Key Features Implemented

### 1. Context API for Auth State
- Global authentication state
- Easy access to `currentUser` anywhere
- Auth methods: `login()`, `register()`, `logout()`, `resetPassword()`

### 2. Protected Routes
- Redirects to login if not authenticated
- Preserves route after login
- Clean implementation with `ProtectedRoute` component

### 3. Form Validation
- Real-time validation
- Clear error messages
- Field-level error display
- Prevention of invalid submissions

### 4. Firebase Integration
- Proper initialization with environment variables
- Email/Password authentication
- Password reset functionality
- User profile updates (display name)

### 5. UI/UX Best Practices
- Loading states during async operations
- Success/error feedback
- Responsive design
- Accessible forms with labels
- Keyboard navigation support

## 🆘 Troubleshooting

### Issue: "Module not found" errors
**Solution**: Run `npm install` to install all dependencies.

### Issue: Firebase not initializing
**Solution**: Check that all environment variables are set correctly in `.env`.

### Issue: Login not working
**Solution**: Verify that Email/Password auth is enabled in Firebase Console.

### Issue: Password reset email not received
**Solution**: Check spam folder and verify email is correct in Firebase Console.

### Issue: Build fails
**Solution**: Clear `node_modules` and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Additional Resources

- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [React Router Docs](https://reactrouter.com/)
- [Vite Documentation](https://vitejs.dev/)
- [React Context API](https://react.dev/reference/react/useContext)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Created with ❤️ for MediCareX

---

**Happy Coding! 🚀**
