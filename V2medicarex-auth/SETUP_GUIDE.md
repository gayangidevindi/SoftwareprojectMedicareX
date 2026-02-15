# 🚀 Complete Setup Guide - MediCareX Authentication System

This guide will walk you through setting up the project from scratch.

## 📋 Prerequisites Checklist

Before starting, ensure you have:
- [ ] Node.js 16 or higher installed
- [ ] npm (comes with Node.js) or yarn
- [ ] A Google account for Firebase
- [ ] A code editor (VS Code recommended)
- [ ] Terminal/Command Prompt access

### Check Node.js Installation

```bash
node --version
# Should show v16.0.0 or higher

npm --version
# Should show 8.0.0 or higher
```

If not installed, download from: https://nodejs.org/

---

## 🔥 Part 1: Firebase Project Setup (15 minutes)

### Step 1.1: Create Firebase Project

1. Open your browser and go to: https://console.firebase.google.com/
2. Sign in with your Google account
3. Click **"Add project"** (or **"Create a project"** if it's your first)
4. Enter project name: `medicarex-auth` (or your preferred name)
5. Click **"Continue"**
6. Toggle **off** "Enable Google Analytics" (not needed for this project)
7. Click **"Create project"**
8. Wait for project creation (takes about 30 seconds)
9. Click **"Continue"** when ready

### Step 1.2: Register Web App

1. You should now be on your project dashboard
2. Look for the **Web icon** (`</>`) in the center (under "Get started by adding Firebase to your app")
3. Click the **Web icon** (`</>`)
4. Enter app nickname: `MediCareX Web`
5. ✅ Check **"Also set up Firebase Hosting"** (optional, but recommended)
6. Click **"Register app"**
7. **IMPORTANT**: You'll see a code snippet with your Firebase configuration. **Keep this page open** - you'll need these values!

Your config will look like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "medicarex-auth-xxxxx.firebaseapp.com",
  projectId: "medicarex-auth-xxxxx",
  storageBucket: "medicarex-auth-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

8. Click **"Continue to console"**

### Step 1.3: Enable Email/Password Authentication

1. In the left sidebar, click **"Authentication"** (under "Build" section)
2. If it's your first time, click **"Get started"**
3. Click on the **"Sign-in method"** tab at the top
4. You'll see a list of sign-in providers
5. Find **"Email/Password"** in the list
6. Click on it to open
7. Toggle **Enable** on the first option (Email/Password)
   - Leave the second option (Email link) disabled
8. Click **"Save"**
9. You should see "Email/Password" with status **"Enabled"**

### Step 1.4: Copy Firebase Configuration

Keep your Firebase configuration handy. You'll need:
- `apiKey`
- `authDomain`
- `projectId`
- `storageBucket`
- `messagingSenderId`
- `appId`

---

## 💻 Part 2: Project Installation (10 minutes)

### Step 2.1: Navigate to Project Directory

```bash
# Navigate to where you want to create the project
cd /path/to/your/projects

# If you have the project folder already
cd medicarex-auth
```

### Step 2.2: Install Dependencies

```bash
npm install
```

This will install:
- `react` (18.3.1) - React framework
- `react-dom` (18.3.1) - React DOM bindings
- `react-router-dom` (6.22.0) - Routing library
- `firebase` (10.8.0) - Firebase SDK
- `vite` (5.3.1) - Build tool and dev server
- `@vitejs/plugin-react` (4.3.1) - Vite React plugin

Installation should take 1-2 minutes depending on your internet speed.

### Step 2.3: Create Environment File

1. Create a new file named `.env` in the project root:

**On Mac/Linux:**
```bash
touch .env
```

**On Windows:**
```bash
type nul > .env
```

**Or manually**: Create a new file called `.env` (no extension) in your project root.

### Step 2.4: Add Firebase Configuration to `.env`

Open the `.env` file and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=medicarex-auth-xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=medicarex-auth-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=medicarex-auth-xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
```

**Replace** each `XXXXX` with your actual Firebase values from Step 1.2.

⚠️ **Important Notes**:
- Each variable must start with `VITE_`
- No spaces around the `=` sign
- No quotes around the values
- Save the file after editing

### Step 2.5: Verify File Structure

Your project should now look like this:

```
medicarex-auth/
├── node_modules/          ✅ (created after npm install)
├── src/
│   ├── firebase/
│   │   └── firebaseConfig.js
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Auth.css
│   │   └── Dashboard.css
│   ├── components/
│   │   └── ProtectedRoute.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── .env                   ✅ (created by you)
├── .env.example
├── .gitignore
└── README.md
```

---

## 🎯 Part 3: Running the Application (5 minutes)

### Step 3.1: Start Development Server

```bash
npm run dev
```

You should see output like:

```
  VITE v5.3.1  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Step 3.2: Open in Browser

1. Open your browser (Chrome, Firefox, Safari, or Edge)
2. Navigate to: **http://localhost:3000**
3. You should see the **Login page** 🎉

---

## ✅ Part 4: Testing the Application (15 minutes)

### Test 1: User Registration

1. Click **"Register"** tab or navigate to `/register`
2. Fill in the form:
   ```
   Full Name: John Doe
   Email: john.doe@example.com
   Password: password123
   Confirm Password: password123
   ```
3. ✅ Check "Agree to Terms and Conditions"
4. Click **"CREATE ACCOUNT"**
5. **Expected Result**: You should be redirected to the Dashboard
6. You should see your name and email on the dashboard

### Test 2: Logout

1. On the Dashboard, click **"Logout"** button in the top right
2. **Expected Result**: You should be redirected to the Login page

### Test 3: User Login

1. On the Login page, enter your credentials:
   ```
   Email: john.doe@example.com
   Password: password123
   ```
2. Select a role (e.g., "Customer")
3. Click **"SIGN IN →"**
4. **Expected Result**: You should be redirected to the Dashboard

### Test 4: Protected Routes

1. While logged in, copy the URL: `http://localhost:3000/dashboard`
2. Click **"Logout"**
3. Try to manually navigate to: `http://localhost:3000/dashboard`
4. **Expected Result**: You should be redirected to `/login`

### Test 5: Forgot Password

1. On the Login page, click **"Forgot password?"**
2. Enter your email: `john.doe@example.com`
3. Click **"RECOVER"**
4. **Expected Result**: You should see a success screen
5. Check your email inbox (and spam folder)
6. Click the password reset link in the email
7. Create a new password
8. Return to the app and login with the new password

### Test 6: Form Validation

Try these invalid inputs to test validation:

**Registration Page:**
- Leave fields empty → Should show "Field is required"
- Enter invalid email (e.g., "notanemail") → Should show "Invalid email"
- Enter password < 6 chars → Should show "At least 6 characters"
- Passwords don't match → Should show "Passwords do not match"
- Don't check terms → Should show "You must agree to terms"

**Login Page:**
- Wrong password → Should show "Incorrect password"
- Non-existent email → Should show "No account found"

---

## 🔍 Part 5: Verifying in Firebase Console

### Check Users in Firebase

1. Go to Firebase Console: https://console.firebase.google.com/
2. Select your project (`medicarex-auth`)
3. Click **"Authentication"** in the left sidebar
4. Click on the **"Users"** tab
5. You should see your registered user with:
   - Email address
   - User UID
   - Creation date
   - Sign-in date

### Check Authentication Activity

1. In Firebase Console → Authentication
2. Click the **"Activity"** tab (if available)
3. You can see login/signup activity logs

---

## 🐛 Troubleshooting Common Issues

### Issue 1: "Module not found" Error

**Error**: Cannot find module 'firebase' or 'react-router-dom'

**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 2: Firebase Configuration Error

**Error**: "Firebase: Error (auth/invalid-api-key)"

**Solution**:
1. Check that `.env` file exists in project root
2. Verify all `VITE_` prefixes are correct
3. Ensure no extra spaces in `.env` file
4. Restart dev server after changing `.env`:
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

### Issue 3: Can't Access Dashboard

**Problem**: Dashboard redirects to login even after logging in

**Solution**:
1. Check browser console for errors (F12 → Console tab)
2. Clear browser cache and cookies
3. Try in incognito/private mode
4. Verify Firebase Authentication is enabled in Firebase Console

### Issue 4: Password Reset Email Not Received

**Solutions**:
1. Check spam/junk folder
2. Wait 5-10 minutes (emails can be delayed)
3. Verify email is correct in Firebase Console → Authentication → Users
4. Check Firebase Console → Authentication → Templates → Password reset
5. Try resending the email

### Issue 5: "auth/too-many-requests"

**Error**: Too many unsuccessful login attempts

**Solution**:
1. Wait 15-30 minutes
2. Or use "Forgot Password" to reset
3. Or enable reCAPTCHA in Firebase Console (advanced)

### Issue 6: Port 3000 Already in Use

**Error**: Port 3000 is already in use

**Solution**:
```bash
# Option 1: Kill process using port 3000
# On Mac/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Option 2: Use different port
npm run dev -- --port 3001
```

---

## 📦 Building for Production

### Create Production Build

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Preview Production Build Locally

```bash
npm run preview
```

Opens the production build at `http://localhost:4173`

---

## 🎓 Next Steps

Now that your app is working, you can:

1. **Customize the UI**: Edit CSS files to match your brand
2. **Add Email Verification**: Implement `sendEmailVerification()`
3. **Add Profile Page**: Create a page for users to update their info
4. **Add Password Strength Meter**: Show password strength indicator
5. **Add Social Login**: Enable Google, Facebook, or GitHub login
6. **Add 2FA**: Implement two-factor authentication
7. **Deploy to Production**: Deploy to Vercel, Netlify, or Firebase Hosting

---

## 📚 Additional Resources

- **Firebase Docs**: https://firebase.google.com/docs/auth
- **React Router**: https://reactrouter.com/
- **Vite Docs**: https://vitejs.dev/
- **React Context**: https://react.dev/reference/react/useContext

---

## ✅ Setup Complete!

Congratulations! 🎉 You've successfully set up a production-ready authentication system.

If you encounter any issues not covered here, check the main README.md or search for the error message in the Firebase documentation.

**Happy Coding! 🚀**
