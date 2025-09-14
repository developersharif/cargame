# Firebase Setup Guide

This guide will help you set up Firebase for the multiplayer racing game.

## 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "multiplayer-race-game")
4. Enable/disable Google Analytics as desired
5. Click "Create project"

## 2. Set up Realtime Database

1. In your Firebase project, go to "Realtime Database" in the left sidebar
2. Click "Create Database"
3. Choose your location (closer to your users is better)
4. Start in **test mode** for now (we'll secure it later)
5. Click "Enable"

## 3. Get your Firebase Configuration

1. Go to Project Settings (click the gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and choose the web icon (</>)
4. Register your app with a nickname
5. Copy the configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'your-project.firebaseapp.com',
  databaseURL: 'https://your-project-default-rtdb.firebaseio.com/',
  projectId: 'your-project-id',
  storageBucket: 'your-project.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:abcdef123456',
};
```

## 4. Set up Environment Variables

### For Local Development:

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your Firebase configuration:
   ```bash
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com/
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
   ```

### For GitHub Pages Deployment:

1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Add the following repository secrets:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_DATABASE_URL`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

## 5. Configure Database Security Rules

For production, update your Realtime Database rules:

```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        ".read": true,
        ".write": "auth != null || !data.exists()",
        "players": {
          ".write": "auth != null"
        }
      }
    },
    "peerMappings": {
      "$roomId": {
        "$userId": {
          ".read": true,
          ".write": "auth != null && auth.uid == $userId"
        }
      }
    },
    "presence": {
      "$userId": {
        ".read": true,
        ".write": "auth != null && auth.uid == $userId"
      }
    }
  }
}
```

## 6. Test the Setup

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Check the browser console for Firebase connection status
3. Try creating a multiplayer room to test Firebase integration

## 7. Deploy to GitHub Pages

1. Push your changes to the main branch
2. The GitHub Action will automatically build and deploy your site
3. Make sure all Firebase secrets are properly set in GitHub repository settings

## Troubleshooting

### Common Issues:

1. **"Firebase configuration not found"**

   - Check that all environment variables are set correctly
   - Ensure variable names start with `VITE_`

2. **"Permission denied" errors**

   - Check your database security rules
   - Ensure the database URL is correct

3. **"Failed to initialize Firebase"**

   - Verify your Firebase project is active
   - Check that the API key and project ID are correct

4. **Deployment fails on GitHub**
   - Verify all secrets are set in GitHub repository settings
   - Check the GitHub Actions logs for specific errors

### Need Help?

- Check the Firebase documentation: https://firebase.google.com/docs
- Review the project's GitHub issues
- Make sure your Firebase project has Realtime Database enabled

## Optional: Anonymous Authentication

To improve security, you can enable anonymous authentication:

1. In Firebase Console, go to Authentication > Sign-in method
2. Enable "Anonymous" authentication
3. Update your game to sign in users anonymously before joining rooms

This allows for better user tracking and security rules without requiring user registration.
