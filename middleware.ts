import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale, type Locale } from './lib/i18n'

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  
  // Skip middleware for certain paths
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap.xml') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Special handling for /contact - redirect to /en/contact
  if (pathname === '/contact') {
    return NextResponse.redirect(new URL('/en/contact', request.url))
  }

  // For other root paths without locale, let them go to the root pages (English)
  const rootPaths = ['/', '/about', '/services', '/blog']
  const isRootPath = rootPaths.includes(pathname) || pathname.startsWith('/blog/')
  
  if (isRootPath) {
    return NextResponse.next()
  }

  // For any other paths, continue normally
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}