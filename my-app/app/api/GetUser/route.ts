import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const SECRET = process.env.JWT_SECRET!;

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ user: null, success: false }, { status: 401 });
    }

    const user = jwt.verify(token, SECRET);
    return NextResponse.json({ user, success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid token', success: false }, { status: 403 });
  }
}
