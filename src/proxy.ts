import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Protect specific routes from unauthenticated users
  if (pathname.startsWith('/courses') || pathname.startsWith('/dashboard')) {
    // Better Auth sets standard session tokens depending on environment
    const sessionToken = request.cookies.get('better-auth.session_token') || request.cookies.get('__Secure-better-auth.session_token');
    
    if (!sessionToken) {
      // Redirect unauthenticated users to login page
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
