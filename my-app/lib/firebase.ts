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
  storageBucket: "greenfoodseller.appspot.com",
  messagingSenderId: "371265581815",
  appId: "1:371265581815:web:386f392b7e3fbf29c8d9f2",
  measurementId: "G-YW2MBM66FS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();
