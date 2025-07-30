// /app/api/signup/route.ts (App Router with Next.js 13+)
import { NextRequest, NextResponse } from 'next/server';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, db } from '@/lib/firebase'; // your Firebase setup
import { User } from '@/app/constants';

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, phone, password, role } = await req.json();

    if (!fullName || !email || !phone || !password || !role) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName: fullName });

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

    // Save additional info in Firebase Realtime Database
    await set(ref(db, `users/${user.uid}`), userData);

    return NextResponse.json({ message: 'Signup successful', uid: user.uid }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ message: error instanceof Error ? error.message : 'Signup failed' }, { status: 500 });
  }
}
