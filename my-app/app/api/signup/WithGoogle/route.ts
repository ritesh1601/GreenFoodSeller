import { NextRequest, NextResponse } from 'next/server';
import { ref, set } from 'firebase/database';
import { db } from '@/lib/firebase'; 
import { User } from '@/app/constants';

export async function POST(req: NextRequest) {
  try {
    const { uid, fullName, email, phone, role } = await req.json();

    if (!fullName || !email || !phone || !role) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const userData: User = {
      uid,
      email,
      fullName,
      role,
      photoURL: null,
      phoneNumber: phone,
      createdAt: new Date().toISOString(),
    };

    await set(ref(db, `users/${uid}`), userData);

    return NextResponse.json({ message: 'Signup successful', uid , userData}, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ message: error instanceof Error ? error.message : 'Signup failed' }, { status: 500 });
  }
}
