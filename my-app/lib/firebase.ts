// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { GoogleAuthProvider } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyA3H8J0P8SNZcPGql5ru-4lO7uurku7alE",
  authDomain: "greenfoodseller.firebaseapp.com",
  databaseURL: "https://greenfoodseller-default-rtdb.firebaseio.com",
  projectId: "greenfoodseller",
  storageBucket: "greenfoodseller.firebasestorage.app",
  messagingSenderId: "371265581815",
  appId: "1:371265581815:web:3bd08fcad3a02124c8d9f2",
  measurementId: "G-HLQ67WX6EW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();
