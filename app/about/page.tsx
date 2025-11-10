'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getTranslations } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useFormModal } from '@/components/useFormModal';
import MultiStepForm from '@/components/MultiStepForm';

export default function AboutPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isOpen, currentVariant, openForm, closeForm, handleSubmit } = useFormModal();
  const t = getTranslations('en'); // Default to English

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-foreground/10 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              AG
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="hover:text-foreground/80 transition-colors">{t.nav.home}</Link>
              <Link href="/about" className="text-orange-600 font-semibold">{t.nav.about}</Link>
              <Link href="/services" className="hover:text-foreground/80 transition-colors">{t.nav.services}</Link>
              <Link href="/blog" className="hover:text-foreground/80 transition-colors">{t.nav.blog}</Link>
              <Link href="/contact" className="hover:text-foreground/80 transition-colors">{t.nav.contact}</Link>
              <LanguageSwitcher currentLocale="en" />
              <button 
                onClick={() => openForm('consultation')}
                className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition-colors"
              >
                {t.nav.getConsultation}
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-4">
              <LanguageSwitcher currentLocale="en" />
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-foreground hover:text-foreground/80 p-2"
                aria-label="Toggle mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-foreground/10 shadow-lg">
              <div className="container mx-auto px-4 py-4 space-y-4">
                <Link href="/" className="block py-2 hover:text-orange-600 transition-colors">{t.nav.home}</Link>
                <Link href="/about" className="block py-2 text-orange-600 font-semibold">{t.nav.about}</Link>
                <Link href="/services" className="block py-2 hover:text-orange-600 transition-colors">{t.nav.services}</Link>
                <Link href="/blog" className="block py-2 hover:text-orange-600 transition-colors">{t.nav.blog}</Link>
                <Link href="/contact" className="block py-2 hover:text-orange-600 transition-colors">{t.nav.contact}</Link>
                <div className="pt-4 border-t border-foreground/10">
                  <button 
                    onClick={() => {
                      openForm('consultation');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors"
                  >
                    {t.nav.getConsultation}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {t.about.hero.title}
                <span className="text-orange-600"> {t.about.hero.titleHighlight}</span>
              </h1>
              <p className="text-lg sm:text-xl text-foreground/80 mb-8 leading-relaxed">
                {t.about.hero.subtitle}
              </p>
              <div className="flex items-center gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">$35M+</div>
                  <div className="text-sm text-foreground/60">{t.about.hero.metrics.generated}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">100+</div>
                  <div className="text-sm text-foreground/60">{t.about.hero.metrics.funnels}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">450%</div>
                  <div className="text-sm text-foreground/60">{t.about.hero.metrics.roi}</div>
                </div>
              </div>
              <button 
                onClick={() => openForm('consultation')}
                className="bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-orange-700 transition-colors inline-flex items-center gap-2"
              >
                {t.about.hero.cta}
                <span>→</span>
              </button>
            </div>
            <div className="relative">
              <div className="w-full h-96 rounded-xl overflow-hidden border-4 border-orange-100 dark:border-orange-900/30">
                <img 
                  src="/amir-profile.jpg" 
                  alt="Amir Gomez - Digital Marketing Specialist"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-background border border-foreground/10 rounded-lg p-6 shadow-lg">
                <div className="text-sm text-foreground/60 mb-1">Client Success Rate</div>
                <div className="text-2xl font-bold text-green-600">97%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Story Section */}
      <section className="bg-foreground/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 text-center">{t.about.story.title}</h2>
            
            <div className="prose prose-lg max-w-none">
              <div className="text-lg sm:text-xl text-foreground/80 leading-relaxed space-y-6">
                {t.about.story.content.map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Approach */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 text-center">{t.about.approach.title}</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-6">{t.about.approach.beliefs.title}</h3>
                <ul className="space-y-4">
                  {t.about.approach.beliefs.items.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-orange-500 mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-6">{t.about.approach.process.title}</h3>
                <ul className="space-y-4">
                  {t.about.approach.process.items.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-blue-500 mt-1">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Success Stories */}
      <section className="bg-foreground/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">{t.home.testimonials.title}</h2>
            <p className="text-lg sm:text-xl text-foreground/80 mb-12">{t.home.testimonials.subtitle}</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-background rounded-xl p-6 sm:p-8 shadow-lg border border-foreground/10">
                <div className="text-orange-400 mb-4 text-2xl">★★★★★</div>
                <p className="text-foreground/80 mb-6 leading-relaxed italic text-sm sm:text-base">
                  "{t.home.testimonials.testimonial1.text}"
                </p>
                <div>
                  <div className="font-semibold text-sm sm:text-base">{t.home.testimonials.testimonial1.author}</div>
                  <div className="text-xs sm:text-sm text-foreground/60">{t.home.testimonials.testimonial1.company}</div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-background rounded-xl p-6 sm:p-8 shadow-lg border border-foreground/10">
                <div className="text-orange-400 mb-4 text-2xl">★★★★★</div>
                <p className="text-foreground/80 mb-6 leading-relaxed italic text-sm sm:text-base">
                  "{t.home.testimonials.testimonial2.text}"
                </p>
                <div>
                  <div className="font-semibold text-sm sm:text-base">{t.home.testimonials.testimonial2.author}</div>
                  <div className="text-xs sm:text-sm text-foreground/60">{t.home.testimonials.testimonial2.company}</div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-background rounded-xl p-6 sm:p-8 shadow-lg border border-foreground/10">
                <div className="text-orange-400 mb-4 text-2xl">★★★★★</div>
                <p className="text-foreground/80 mb-6 leading-relaxed italic text-sm sm:text-base">
                  "{t.home.testimonials.testimonial3.text}"
                </p>
                <div>
                  <div className="font-semibold text-sm sm:text-base">{t.home.testimonials.testimonial3.author}</div>
                  <div className="text-xs sm:text-sm text-foreground/60">{t.home.testimonials.testimonial3.company}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-50 dark:bg-orange-900/20 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
              {t.home.cta.title}
            </h2>
            <p className="text-lg sm:text-xl text-foreground/80 mb-8">
              {t.home.cta.subtitle}
            </p>
            <button 
              onClick={() => openForm('consultation')}
              className="bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-orange-700 transition-colors"
            >
              {t.home.cta.button}
            </button>
            <p className="text-sm text-foreground/60 mt-6">
              {t.home.cta.features}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <div className="text-xl font-bold mb-2">Amir Gomez</div>
              <p className="text-foreground/60">{t.footer.tagline}</p>
            </div>
            <div className="flex space-x-6">
              <Link href="https://linkedin.com/in/amir-gabriel-gomez" className="text-foreground/60 hover:text-foreground transition-colors">{t.footer.links.linkedin}</Link>
              <Link href="mailto:amir@amirgomez.com" className="text-foreground/60 hover:text-foreground transition-colors">{t.footer.links.email}</Link>
            </div>
          </div>
          <div className="border-t border-foreground/10 mt-8 pt-8 text-center text-foreground/60">
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </footer>

      {/* Form Modal */}
      {currentVariant && (
        <MultiStepForm
          variant={currentVariant}
          isOpen={isOpen}
          onClose={closeForm}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}