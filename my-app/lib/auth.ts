"use client";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  sendEmailVerification,
  applyActionCode,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";

import { FirebaseError } from "firebase/app";
import { useEffect, useState } from "react";
import { app } from "@/lib/firebase";
import { setCookie } from "cookies-next";
import { getDatabase, ref, set, get } from "firebase/database";
import { validatePassword, validateEmail } from "./validation";

// Get Firebase Auth instance
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Custom error types
export interface AuthError {
  code: string;
  message: string;
}

// Rate limiting implementation
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

const checkRateLimit = (email: string): { allowed: boolean; message: string } => {
  const now = Date.now();
  const attempt = loginAttempts.get(email);

  if (attempt) {
    if (now - attempt.lastAttempt < LOCKOUT_DURATION) {
      if (attempt.count >= MAX_ATTEMPTS) {
        return {
          allowed: false,
          message: `Too many login attempts. Please try again in ${Math.ceil((LOCKOUT_DURATION - (now - attempt.lastAttempt)) / 60000)} minutes.`,
        };
      }
    } else {
      loginAttempts.delete(email);
    }
  }

  return { allowed: true, message: "" };
};

// ✅ Google Sign-in Function

export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return { user }; 
  } catch (error) {
    throw new Error(error.message || "Google login failed");
  }
};


// ✅ Signup Function
// Extracts a display name from email (e.g., "ritesh.saini" => "Ritesh Saini")
const getNameFromEmail = (email: string): string => {
  const username = email.split("@")[0];
  const parts = username.split(/[._]/);
  return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
};

// Generates a gravatar image URL based on email
const gravatarURL = (email: string): string => {
  const hash = md5(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
};
export const signup = async (email: string, password: string, userType: "merchant" | "consumer") => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Send verification
    await sendEmailVerification(userCredential.user);
    const name = getNameFromEmail(email);
    const photo = gravatarURL(email);
    // Save userType in Realtime Database
    const db = getDatabase(app);
    await set(ref(db, `users/${userCredential.user.uid}`), {
      email: userCredential.user.email,
      userType: userType,
      name:name,
      phoneNumber:"",
      PhotoUrl:photo,
      uid:userCredential.user.uid,
      createdAt: new Date().toISOString(),
    });

    const token = await userCredential.user.getIdToken();
    setCookie("firebase_token", token);
    return userCredential.user;
  } catch (error) {
    // Error handling remains the same...
    throw error;
  }
};


// ✅ Login Function
export const login = async (email: string, password: string) => {
  try {
    // Check rate limiting
    const rateLimitCheck = checkRateLimit(email);
    if (!rateLimitCheck.allowed) {
      throw new Error(rateLimitCheck.message);
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Check if email is verified
    if (!userCredential.user.emailVerified) {
      await sendEmailVerification(userCredential.user);
      throw new Error("Please verify your email before logging in. A new verification email has been sent.");
    }

    // Reset login attempts on successful login
    loginAttempts.delete(email);

    const token = await userCredential.user.getIdToken();
    setCookie("firebase_token", token);
    return userCredential.user;
  } catch (error) {
    // Increment failed login attempts
    const attempts = loginAttempts.get(email) || { count: 0, lastAttempt: Date.now() };
    loginAttempts.set(email, {
      count: attempts.count + 1,
      lastAttempt: Date.now(),
    });

    if (error instanceof FirebaseError) {
      // Handle specific login errors
      switch (error.code) {
        case 'auth/invalid-email':
          throw new Error('Please enter a valid email address.');
        case 'auth/user-disabled':
          throw new Error('This account has been disabled. Please contact support.');
        case 'auth/user-not-found':
          throw new Error('No account found with this email. Please check your email or sign up.');
        case 'auth/wrong-password':
          throw new Error('Incorrect password. Please try again.');
        case 'auth/too-many-requests':
          throw new Error('Too many failed login attempts. Please try again later.');
        default:
          throw new Error(error.message);
      }
    }
    throw new Error("An unexpected error occurred during login");
  }
};

// ✅ Verify Email Function
export const verifyEmail = async (code: string) => {
  try {
    await applyActionCode(auth, code);
    return true;
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/invalid-action-code':
          throw new Error('The verification link is invalid or has expired.');
        case 'auth/expired-action-code':
          throw new Error('The verification link has expired. Please request a new one.');
        default:
          throw new Error(error.message);
      }
    }
    throw new Error("An unexpected error occurred during email verification");
  }
};

// ✅ Resend Verification Email
export const resendVerificationEmail = async () => {
  try {
    const user = auth.currentUser;
    if (user && !user.emailVerified) {
      await sendEmailVerification(user);
      return true;
    }
    throw new Error("No unverified user found");
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/too-many-requests':
          throw new Error('Too many verification emails sent. Please try again later.');
        default:
          throw new Error(error.message);
      }
    }
    throw new Error("An unexpected error occurred while sending verification email");
  }
};

// ✅ Logout Function
export const logout = async () => {
  try {
    await signOut(auth);
    setCookie("firebase_token", "", { maxAge: 0 }); // Clear the token cookie
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred during logout");
  }
};

// ✅ React Hook: Get Current User
export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          setCookie("firebase_token", token);
        } catch (error) {
          console.error("Error getting token:", error);
        }
      } else {
        setCookie("firebase_token", "", { maxAge: 0 }); // Clear token when user logs out
      }
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return { user, loading };
};
