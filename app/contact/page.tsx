'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getTranslations } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useFormModal } from '@/components/useFormModal';
import MultiStepForm from '@/components/MultiStepForm';

export default function ContactPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isOpen, currentVariant, openForm, closeForm, handleSubmit } = useFormModal();
  const t = getTranslations('en');

  return (
    <>
      {/* Google Tag Manager */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5HKRKM7F');`,
        }}
      />
      {/* End Google Tag Manager */}
      
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-5HKRKM7F"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      {/* End Google Tag Manager (noscript) */}
      
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
              <Link href="/about" className="hover:text-foreground/80 transition-colors">{t.nav.about}</Link>
              <Link href="/services" className="hover:text-foreground/80 transition-colors">{t.nav.services}</Link>
              <Link href="/blog" className="hover:text-foreground/80 transition-colors">{t.nav.blog}</Link>
              <Link href="/contact" className="text-orange-600 font-semibold">{t.nav.contact}</Link>
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
                <Link href="/about" className="block py-2 hover:text-orange-600 transition-colors">{t.nav.about}</Link>
                <Link href="/services" className="block py-2 hover:text-orange-600 transition-colors">{t.nav.services}</Link>
                <Link href="/blog" className="block py-2 hover:text-orange-600 transition-colors">{t.nav.blog}</Link>
                <Link href="/contact" className="block py-2 text-orange-600 font-semibold">{t.nav.contact}</Link>
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
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {t.contact.hero.title}
            <span className="text-orange-600"> {t.contact.hero.titleHighlight}</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t.contact.hero.subtitle}
          </p>
          
          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
              <div className="text-2xl mb-3">🎯</div>
              <h3 className="font-semibold mb-2">{t.contact.benefits.strategy.title}</h3>
              <p className="text-sm text-foreground/70">{t.contact.benefits.strategy.description}</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <div className="text-2xl mb-3">📊</div>
              <h3 className="font-semibold mb-2">{t.contact.benefits.audit.title}</h3>
              <p className="text-sm text-foreground/70">{t.contact.benefits.audit.description}</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
              <div className="text-2xl mb-3">🚀</div>
              <h3 className="font-semibold mb-2">{t.contact.benefits.plan.title}</h3>
              <p className="text-sm text-foreground/70">{t.contact.benefits.plan.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div className="bg-background border border-foreground/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">{t.contact.form.title}</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                      {t.contact.form.firstName} *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                      {t.contact.form.lastName} *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {t.contact.form.email} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    {t.contact.form.company}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Acme Corp"
                  />
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium mb-2">
                    {t.contact.form.website}
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    className="w-full px-4 py-3 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div>
                  <label htmlFor="monthlyBudget" className="block text-sm font-medium mb-2">
                    {t.contact.form.budget}
                  </label>
                  <select
                    id="monthlyBudget"
                    name="monthlyBudget"
                    className="w-full px-4 py-3 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">{t.contact.form.budgetOptions.select}</option>
                    <option value="under-1k">{t.contact.form.budgetOptions.under1k}</option>
                    <option value="1k-5k">{t.contact.form.budgetOptions['1k5k']}</option>
                    <option value="5k-10k">{t.contact.form.budgetOptions['5k10k']}</option>
                    <option value="10k-25k">{t.contact.form.budgetOptions['10k25k']}</option>
                    <option value="25k-50k">{t.contact.form.budgetOptions['25k50k']}</option>
                    <option value="50k-plus">{t.contact.form.budgetOptions['50kplus']}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="challenges" className="block text-sm font-medium mb-2">
                    {t.contact.form.challenges} *
                  </label>
                  <textarea
                    id="challenges"
                    name="challenges"
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder={t.contact.form.challengesPlaceholder}
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="goals" className="block text-sm font-medium mb-2">
                    {t.contact.form.goals}
                  </label>
                  <textarea
                    id="goals"
                    name="goals"
                    rows={3}
                    className="w-full px-4 py-3 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder={t.contact.form.goalsPlaceholder}
                  ></textarea>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    className="mt-1"
                  />
                  <label htmlFor="newsletter" className="text-sm text-foreground/80">
                    {t.contact.form.newsletter}
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-orange-700 transition-colors"
                >
                  {t.contact.form.submit}
                </button>

                <p className="text-xs text-foreground/60 text-center">
                  {t.contact.form.privacy}
                </p>
              </form>
            </div>

            {/* Contact Information & Calendar */}
            <div className="space-y-8">
              
              {/* Calendar Embed Placeholder */}
              <div className="bg-background border border-foreground/10 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-4">{t.contact.calendar.title}</h3>
                <p className="text-foreground/80 mb-6">
                  {t.contact.calendar.description}
                </p>
                
                {/* Calendly Integration */}
                <div className="rounded-lg overflow-hidden" style={{ height: '600px' }}>
                  <iframe
                    src="https://calendly.com/amir-amirgomez/30min?embed_domain=amirgomez-com.vercel.app&embed_type=Inline"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Schedule a meeting with Amir Gomez"
                    style={{ border: 'none' }}
                  ></iframe>
                </div>
              </div>

              {/* Contact Details */}
              <div className="bg-background border border-foreground/10 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-6">{t.contact.other.title}</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                      <span className="text-orange-600">📧</span>
                    </div>
                    <div>
                      <div className="font-semibold">{t.contact.other.email}</div>
                      <div className="text-foreground/60">amir@amirgomez.com</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600">💼</span>
                    </div>
                    <div>
                      <div className="font-semibold">{t.contact.other.linkedin}</div>
                      <div className="text-foreground/60">linkedin.com/in/amir-gabriel-gomez</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <span className="text-green-600">⏰</span>
                    </div>
                    <div>
                      <div className="font-semibold">{t.contact.other.responseTime}</div>
                      <div className="text-foreground/60">{t.contact.other.within24}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-background border border-foreground/10 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-6">{t.contact.faq.title}</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">{t.contact.faq.q1.question}</h4>
                    <p className="text-sm text-foreground/70">
                      {t.contact.faq.q1.answer}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">{t.contact.faq.q2.question}</h4>
                    <p className="text-sm text-foreground/70">
                      {t.contact.faq.q2.answer}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">{t.contact.faq.q3.question}</h4>
                    <p className="text-sm text-foreground/70">
                      {t.contact.faq.q3.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-foreground/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-8">{t.contact.social.title}</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background rounded-lg p-6">
                <div className="text-2xl font-bold text-orange-600 mb-2">97%</div>
                <div className="text-sm text-foreground/60">{t.contact.social.satisfaction}</div>
              </div>
              <div className="bg-background rounded-lg p-6">
                <div className="text-2xl font-bold text-orange-600 mb-2">450%</div>
                <div className="text-sm text-foreground/60">{t.contact.social.roiIncrease}</div>
              </div>
              <div className="bg-background rounded-lg p-6">
                <div className="text-2xl font-bold text-orange-600 mb-2">$35M+</div>
                <div className="text-sm text-foreground/60">{t.contact.social.adSpend}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
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
    </>
  );
}