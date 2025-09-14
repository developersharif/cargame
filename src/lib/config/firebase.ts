import { initializeApp } from 'firebase/app';
import { getDatabase, ref as dbRef } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase only if config is available
let app: any = null;
let database: any = null;
let auth: any = null;

console.log('Firebase config check:', {
  hasApiKey: !!firebaseConfig.apiKey,
  hasProjectId: !!firebaseConfig.projectId,
  hasDatabaseURL: !!firebaseConfig.databaseURL,
  apiKey: firebaseConfig.apiKey ? firebaseConfig.apiKey.substring(0, 10) + '...' : 'missing',
  projectId: firebaseConfig.projectId,
  databaseURL: firebaseConfig.databaseURL
});

try {
  if (firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.databaseURL) {
    app = initializeApp(firebaseConfig);
    database = getDatabase(app);
    auth = getAuth(app);
    console.log('Firebase initialized successfully');
    console.log('Database instance:', !!database);
  } else {
    console.warn('Firebase configuration incomplete. Missing:', {
      apiKey: !firebaseConfig.apiKey,
      projectId: !firebaseConfig.projectId,
      databaseURL: !firebaseConfig.databaseURL
    });
  }
} catch (error) {
  console.error('Failed to initialize Firebase:', error);
}

export { app, database, auth };
export { firebaseConfig };

// Helper function to check if Firebase is available
export const isFirebaseAvailable = (): boolean => {
  return app !== null && database !== null;
};

// Helper to get database reference
export const getDbRef = (path: string) => {
  if (!database) {
    throw new Error('Firebase database is not initialized');
  }
  return dbRef(database, path);
};