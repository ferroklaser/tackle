// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, initializeAuth, connectAuthEmulator, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  databaseURL: process.envFIREBASE_DATABASE_URL
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
let FIREBASE_AUTH;

try {
  FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
} catch (err) {
  // If already initialized, fallback to getAuth()
  FIREBASE_AUTH = getAuth(FIREBASE_APP);
}
export { FIREBASE_AUTH }
// connectAuthEmulator(FIREBASE_AUTH, "http://127.0.0.1:9099");
export const FIREBASE_DATABASE = getFirestore(FIREBASE_APP);
export const FIREBASE_RTDB = getDatabase(FIREBASE_APP);



