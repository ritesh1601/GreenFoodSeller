import { NextRequest, NextResponse } from 'next/server';
import { ref, set } from 'firebase/database';
import { db } from '@/lib/firebase';
import { User } from '@/app/constants';

export async function POST(request: NextRequest) {
  try {
    const { user, role } = await request.json();
    
    if (!user || !role) {
      return NextResponse.json({ 
        error: 'User and role are required',
        success: false 
      }, { status: 400 });
    }

    if (!user.email) {
      return NextResponse.json({ 
        error: 'User email is missing. Cannot set role.',
        success: false 
      }, { status: 400 });
    }

    if (role !== 'consumer' && role !== 'merchant') {
      return NextResponse.json({ 
        error: 'Role must be either "consumer" or "merchant"',
        success: false 
      }, { status: 400 });
    }

    // Create user object following the User interface
    const userData: User = {
      uid: user.uid,
      email: user.email,
      fullName: user.displayName || user.fullName || 'Unknown User',
      role,
      photoURL: user.photoURL || null,
      phoneNumber: user.phoneNumber || undefined,
      createdAt: new Date().toISOString(),
    };

    // Save user role in database
    await set(ref(db, `users/${user.uid}`), userData);

    return NextResponse.json({ 
      success: true,
      message: `Role set successfully to ${role}`,
      user: userData
    }, { status: 200 });

  } catch (error: unknown) {
    console.error('Error setting role:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      success: false 
    }, { status: 500 });
  }
} 