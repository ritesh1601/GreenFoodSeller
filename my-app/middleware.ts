// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

// Initialize Firebase Admin if it hasn't been initialized
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const PUBLIC_PATHS = ["/", "/login", "/signup", "/about"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Allow public pages without auth
  if (PUBLIC_PATHS.includes(path) || path.startsWith("/_next")) {
    return NextResponse.next();
  }

  // Try to get auth token from cookies
  const token = request.cookies.get("firebase_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Verify the token using Firebase Admin
    const decodedToken = await getAuth().verifyIdToken(token);
    
    // Check if the user has the required role for the path
    const userRole = decodedToken.role as string | undefined;
    
    if (path.startsWith("/merchant") && userRole !== "merchant") {
      return NextResponse.redirect(new URL("/consumer", request.url));
    }
    
    if (path.startsWith("/consumer") && userRole !== "consumer") {
      return NextResponse.redirect(new URL("/merchant", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // Token is invalid or expired
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/merchant/:path*", "/consumer/:path*"],
};
