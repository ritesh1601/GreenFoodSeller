import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { ref, get } from 'firebase/database';
import { User } from '@/app/constants';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const SECRET = process.env.JWT_SECRET!; 

export async function POST(request: NextRequest) {
  try {
    const { uid } = await request.json();

    if (!uid) {
      return NextResponse.json({ error: 'Missing uid', success: false }, { status: 400 });
    }

    const snapshot = await get(ref(db, `users/${uid}`));
    if (!snapshot.exists()) {
      return NextResponse.json({ error: 'User not found', success: false }, { status: 404 });
    }

    const userData: User = snapshot.val();

    // Generate JWT
    const token = jwt.sign(
        { uid: userData.uid,
          email: userData.email,
          role: userData.role ,
          fullName:userData.fullName,
          phone:userData.phoneNumber,
          photo:userData.photoURL,
          creationTime:userData.createdAt|| 'user' },
        SECRET,
        { expiresIn: '1d' }
    );

    const cookie = serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 *15,
      path: '/',
      sameSite: 'lax',
    });

    const response = NextResponse.json({
      user: userData,
      success: true,
    });

    response.headers.set('Set-Cookie', cookie);
    return response;
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'Internal server error', success: false }, { status: 500 });
  }
}
