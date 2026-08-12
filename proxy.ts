import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const staffSession = request.cookies.get('staff_session')?.value;
  
  if (request.nextUrl.pathname.startsWith('/staff')) {
    if (request.nextUrl.pathname === '/staff/login') {
      if (staffSession) {
        return NextResponse.redirect(new URL('/staff', request.url));
      }
      return NextResponse.next();
    }
    
    if (!staffSession) {
      return NextResponse.redirect(new URL('/staff/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/staff/:path*'],
};
