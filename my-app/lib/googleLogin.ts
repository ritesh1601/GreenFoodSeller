// lib/googleLogin.ts
import { signInWithPopup } from 'firebase/auth';
import { ref, set ,get } from 'firebase/database';
import { auth, db, googleProvider } from './firebase';

// Google login: returns the user object
export const googleLogin = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  console.log(`result: ${JSON.stringify(result, null, 2)}`);
  const user = result.user;

  if (!user.email) {
    throw new Error('Google account does not have an email address associated.');
  }

  // Check if user exists in Realtime Database
  const snapshot = await get(ref(db, `users/${user.uid}`));
  if (snapshot.exists()) {
    const role=snapshot.val().role||null;
    return { user , role };

  }

  return { user };
};

// Set role for a user and set a cookie
export const SetRole = async ({
  user,
  role,
}: {
  user: { displayName:string; photoURL:string; uid: string; email: string | null };
  role: string;
}) => {
  if (!user.email) {
    throw new Error('User email is missing. Cannot set role.');
  }
  // Save new user role in database
  await set(ref(db, `users/${user.uid}`), {
    name:user.displayName,
    image:user.photoURL,
    email: user.email,
    role,
  });

  // Set role in cookie
  document.cookie = `user_role=${role}; path=/;`;
};