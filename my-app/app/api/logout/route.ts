import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
    const expiredCookie = serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
        expires: new Date(0),
    });

    const response = NextResponse.json({ message: 'Logged out', success: true ,redirect:'/'});
    response.headers.set('Set-Cookie', expiredCookie);
    return response;
}
