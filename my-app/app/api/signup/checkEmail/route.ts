import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { ref, get, query, orderByChild, equalTo } from 'firebase/database';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json({ 
        error: 'Email is required',
        exists: false 
      }, { status: 400 });
    }

    // Query the database to find users with the given email
    const usersRef = ref(db, 'users');
    const emailQuery = query(usersRef, orderByChild('email'), equalTo(email));
    const snapshot = await get(emailQuery);

    if (snapshot.exists()) {
      // Get the first user found with this email
      const userData = Object.values(snapshot.val())[0] as any;
      return NextResponse.json({ 
        exists: true,
        user: userData,
        message: `User with email ${email} already exists`
      }, { status: 200 });
    }

    return NextResponse.json({ 
      exists: false,
      message: `No user found with email ${email}`
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error checking email:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      exists: false 
    }, { status: 500 });
  }
} 