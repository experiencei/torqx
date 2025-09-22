// Import the functions you need from the SDKs you need
import { initializeApp , getApps, getApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPDZvuCws3ZPmTY24XnfiOSLy2AKuJ2AE",
  authDomain: "torqxai1.firebaseapp.com",
  projectId: "torqxai1",
  storageBucket: "torqxai1.firebasestorage.app",
  messagingSenderId: "798510613408",
  appId: "1:798510613408:web:44a8ef8bce5de1416c1ac5",
  measurementId: "G-NX2PPDWBQH"
};

// Initialize Firebase
// Avoid re-initializing on hot reload
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Services you’ll use
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

// lib/firebase.ts
// import { initializeApp, getApps, getApp } from "firebase/app";