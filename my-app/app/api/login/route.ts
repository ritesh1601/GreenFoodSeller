import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { ref, get } from 'firebase/database';
import { User } from '@/app/constants';

export async function POST(request: NextRequest) {
  try {
    const { uid } = await request.json();
    if (!uid) {
      return NextResponse.json({ error: 'Missing uid',success:false }, { status: 400 });
    }
    const snapshot = await get(ref(db, `users/${uid}`));
    if (!snapshot.exists()) {
      return NextResponse.json({ error: 'User not found',success:false }, { status: 404 });
    }
    const userData: User = snapshot.val();
    return NextResponse.json({ 
      user: userData,
      success: true,
    }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Internal server error',success:true }, { status: 500 });
  }
}