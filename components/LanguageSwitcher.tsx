'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { locales, type Locale } from '@/lib/i18n'

interface LanguageSwitcherProps {
  currentLocale: Locale
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const switchLanguage = (newLocale: Locale) => {
    setIsOpen(false)
    
    // Remove current locale from pathname if it exists
    let newPathname = pathname
    
    // Handle current locale removal
    if (currentLocale === 'en') {
      // Currently on English (no locale prefix)
      newPathname = pathname
    } else {
      // Currently on Spanish (has locale prefix)
      if (pathname.startsWith(`/${currentLocale}/`)) {
        newPathname = pathname.slice(3) // Remove /locale
      } else if (pathname === `/${currentLocale}`) {
        newPathname = '/'
      }
    }
    
    // Add new locale prefix if switching to Spanish
    if (newLocale === 'es') {
      newPathname = `/es${newPathname}`
    }
    
    // Ensure we don't have double slashes
    newPathname = newPathname.replace('//', '/')
    
    router.push(newPathname)
  }

  const getLanguageInfo = (locale: Locale) => {
    switch (locale) {
      case 'en':
        return { name: 'English', flag: '🇺🇸' }
      case 'es':
        return { name: 'Español', flag: '🇪🇸' }
      default:
        return { name: 'English', flag: '🇺🇸' }
    }
  }

  const currentLangInfo = getLanguageInfo(currentLocale)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors border border-foreground/20 rounded-lg hover:bg-foreground/5"
        aria-label="Switch language"
      >
        <span className="text-lg">{currentLangInfo.flag}</span>
        <span className="hidden sm:inline">{currentLangInfo.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-background border border-foreground/20 rounded-lg shadow-lg z-20">
            {locales.map((locale) => {
              const langInfo = getLanguageInfo(locale)
              const isActive = locale === currentLocale
              
              return (
                <button
                  key={locale}
                  onClick={() => switchLanguage(locale)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-foreground/5 first:rounded-t-lg last:rounded-b-lg ${
                    isActive 
                      ? 'text-orange-600 font-semibold bg-orange-50 dark:bg-orange-900/20' 
                      : 'text-foreground/80 hover:text-foreground'
                  }`}
                >
                  <span className="text-lg">{langInfo.flag}</span>
                  <span>{langInfo.name}</span>
                  {isActive && (
                    <svg className="w-4 h-4 ml-auto text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}