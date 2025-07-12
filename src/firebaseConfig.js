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
  apiKey: "AIzaSyAO2TCbL0EPVc11KCqEXeJ8EYjeschcSPM",
  authDomain: "tackle-2d290.firebaseapp.com",
  projectId: "tackle-2d290",
  storageBucket: "tackle-2d290.firebasestorage.app",
  messagingSenderId: "266555871877",
  appId: "1:266555871877:web:19aa56bdd00a363b674fec",
  databaseURL: "https://tackle-2d290-default-rtdb.firebaseio.com/"
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



