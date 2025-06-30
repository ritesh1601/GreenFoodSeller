// lib/googleLogin.ts
import { signInWithPopup } from 'firebase/auth';
import { ref, get, set } from 'firebase/database';
import { auth, db, googleProvider } from './firebase';

export const googleLogin = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  // Check if user exists in Realtime Database
  const snapshot = await get(ref(db, `users/${user.uid}`));
  const userData = snapshot.val();

  let role = userData?.role;

  if (!role) {
    // Prompt to choose role (fallback)
    role = prompt('Please enter your role (merchant/consumer):')?.toLowerCase();

    if (!role || (role !== 'merchant' && role !== 'consumer')) {
      throw new Error('Invalid or no role provided');
    }

    // Save new user role in database
    await set(ref(db, `users/${user.uid}`), {
      email: user.email,
      role,
    });
  }

  // Set role in cookie
  document.cookie = `user_role=${role}; path=/;`;

  return { user, role };
};
