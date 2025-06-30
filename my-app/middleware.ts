import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const rolePaths = {
  consumer: '/consumer',
  merchant: '/merchant',
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = request.nextUrl;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Prevent users from accessing other roles' paths
  const isConsumerRoute = pathname.startsWith(rolePaths.consumer);
  const isMerchantRoute = pathname.startsWith(rolePaths.merchant);

  if (isConsumerRoute && token.role !== 'consumer') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isMerchantRoute && token.role !== 'merchant') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/consumer/:path*', '/merchant/:path*'],
};
