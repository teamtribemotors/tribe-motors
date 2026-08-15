import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if we're on a staff route, but NOT the login page
  if (request.nextUrl.pathname.startsWith('/staff') && request.nextUrl.pathname !== '/staff/login') {
    const session = request.cookies.get('staff_session');
    
    if (!session?.value) {
      // Redirect to login if no session cookie exists
      return NextResponse.redirect(new URL('/staff/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/staff/:path*'],
};
