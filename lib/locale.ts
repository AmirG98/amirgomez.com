import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { locales, defaultLocale, type Locale } from './i18n'

export function getLocaleFromHeaders(request: Request): Locale {
  // Get languages from Accept-Language header
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))
  
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  
  // Match with supported locales
  return match(languages, locales, defaultLocale) as Locale
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]
  
  if (locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale
  }
  
  return null
}

export function removeLocaleFromPathname(pathname: string, locale: Locale): string {
  if (pathname.startsWith(`/${locale}/`)) {
    return pathname.slice(3) // Remove /locale
  }
  if (pathname === `/${locale}`) {
    return '/'
  }
  return pathname
}