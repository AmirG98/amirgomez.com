import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Simple middleware - just let all requests pass through
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Only apply to specific paths if needed
    '/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}