import { locales, type Locale, getTranslations } from '@/lib/i18n'
import { notFound } from 'next/navigation'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}

// Generate static params for all locales
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const { locale } = await params
  
  // Validate that the incoming locale parameter is valid
  if (!locales.includes(locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body>
        {children}
      </body>
    </html>
  )
}