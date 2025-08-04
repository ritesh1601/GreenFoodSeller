import { NextRequest, NextResponse } from 'next/server';
import { ref, set } from 'firebase/database';
import { db } from '@/lib/firebase';

export async function POST(request: NextRequest) {
  try {
    const { uid, role } = await request.json();
    
    if (!uid || !role) {
      return NextResponse.json({ 
        error: 'User uid and role are required',
        success: false 
      }, { status: 400 });
    }

    if (role !== 'consumer' && role !== 'merchant') {
      return NextResponse.json({ 
        error: 'Role must be either "consumer" or "merchant"',
        success: false 
      }, { status: 400 });
    }

    await set(ref(db, `users/${uid}/role`), role);

    return NextResponse.json({ 
      success: true,
      message: `Role set successfully to ${role}`,
      UserRole:`${role}`
    }, { status: 200 });

  } catch (error: unknown) {
    console.error('Error setting role:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      success: false 
    }, { status: 500 });
  }
} 