export const locales = ['en', 'es'] as const
export const defaultLocale = 'en' as const

export type Locale = (typeof locales)[number]

// Import translation files
import en from '@/locales/en.json'
import es from '@/locales/es.json'

const translations = {
  en,
  es,
}

export function getTranslations(locale: Locale) {
  return translations[locale] || translations[defaultLocale]
}

export function getNestedTranslation(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => {
    return current?.[key]
  }, obj) || path
}

export function translateWithParams(
  text: string, 
  params?: Record<string, string | number>
): string {
  if (!params) return text
  
  let result = text
  Object.entries(params).forEach(([param, value]) => {
    result = result.replace(`{${param}}`, String(value))
  })
  
  return result
}