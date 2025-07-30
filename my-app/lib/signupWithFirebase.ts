import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, db } from './firebase';
import { User } from '@/app/constants';

export const signupWithFirebase = async (
  fullName: string,
  email: string,
  phone: string,
  password: string,
  role: 'merchant' | 'consumer'
) => {
  // Create user in Firebase Authentication
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Create user object following the User interface
  const userData: User = {
    uid: user.uid,
    email,
    fullName,
    role,
    photoURL: null,
    phoneNumber: phone,
    createdAt: new Date().toISOString(),
  };

  // Save user details to Firebase Realtime Database
  await set(ref(db, `users/${user.uid}`), userData);

  // Save role in cookie (for protected routing)
  document.cookie = `user_role=${role}; path=/;`;

  return user;
};
