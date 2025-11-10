import { useRouter } from 'next/router'
import { useMemo } from 'react'

// Import translation files
import en from '@/locales/en.json'
import es from '@/locales/es.json'

const translations = {
  en,
  es,
}

export function useTranslation() {
  const router = useRouter()
  const { locale = 'en' } = router

  const t = useMemo(() => {
    const translation = translations[locale as keyof typeof translations] || translations.en

    // Helper function to get nested translation values
    function getNestedTranslation(obj: any, path: string): string {
      return path.split('.').reduce((current, key) => {
        return current?.[key]
      }, obj) || path
    }

    return (key: string, params?: Record<string, string | number>) => {
      let value = getNestedTranslation(translation, key)
      
      // Replace parameters in the translation
      if (params && typeof value === 'string') {
        Object.entries(params).forEach(([param, paramValue]) => {
          value = value.replace(`{${param}}`, String(paramValue))
        })
      }
      
      return value
    }
  }, [locale])

  return { t, locale }
}