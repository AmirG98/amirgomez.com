'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getTranslations } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function NewsletterThankYouPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
                <Link href="/contact" className="hover:text-foreground/80 transition-colors">{t.nav.contact}</Link>
                <LanguageSwitcher currentLocale="en" />
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
                  <Link href="/contact" className="block py-2 hover:text-orange-600 transition-colors">{t.nav.contact}</Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Thank You Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-8 mb-8">
              <div className="text-orange-600 text-6xl mb-4">📧</div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-orange-800 dark:text-orange-200">
                Welcome to Our Marketing Community!
              </h1>
              <p className="text-lg text-orange-700 dark:text-orange-300 mb-6">
                You've successfully subscribed to our newsletter. Get ready for weekly insights that will transform your marketing results.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-left">
                <h3 className="text-xl font-semibold mb-4 text-foreground">What You'll Receive Every Tuesday:</h3>
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">📊</span>
                    <span><strong>Weekly Case Studies:</strong> Real campaign results and ROI breakdowns from $35M+ in managed spend</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">🎯</span>
                    <span><strong>Actionable Strategies:</strong> Specific tactics you can implement immediately for better results</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">🔧</span>
                    <span><strong>Tool Recommendations:</strong> Latest marketing tools and platforms that drive performance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">💡</span>
                    <span><strong>Exclusive Insights:</strong> Advanced tactics and industry trends not shared anywhere else</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What to Expect */}
        <section className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              What Makes Our Newsletter Different
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Real Data</h3>
                <p className="text-foreground/80">Every strategy shared is backed by actual campaign data and proven results, not theory.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Immediately Actionable</h3>
                <p className="text-foreground/80">No fluff or generic advice. Every email contains specific tactics you can implement today.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Results-Focused</h3>
                <p className="text-foreground/80">Every strategy is designed to improve your ROI and drive measurable business growth.</p>
              </div>
            </div>
          </div>
        </section>

        {/* First Email Timeline */}
        <section className="bg-foreground/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                When Will You Receive Your First Email?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <div className="bg-background rounded-lg p-6 shadow-sm border border-foreground/10">
                  <h3 className="text-xl font-semibold mb-4">📧 Welcome Email</h3>
                  <p className="text-foreground/80 mb-2"><strong>Within 5 minutes</strong></p>
                  <p className="text-sm text-foreground/70">
                    Check your inbox for a welcome email with immediate access to our top 3 marketing strategies.
                  </p>
                </div>
                
                <div className="bg-background rounded-lg p-6 shadow-sm border border-foreground/10">
                  <h3 className="text-xl font-semibold mb-4">📊 First Newsletter</h3>
                  <p className="text-foreground/80 mb-2"><strong>Next Tuesday</strong></p>
                  <p className="text-sm text-foreground/70">
                    Your first weekly newsletter arrives every Tuesday morning with fresh insights and case studies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Explore While You Wait */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Explore While You Wait
            </h2>
            <p className="text-lg text-foreground/80 mb-12">
              While you wait for your first newsletter, check out these popular resources to start improving your marketing today.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background rounded-lg p-6 shadow-sm border border-foreground/10">
                <h3 className="text-xl font-semibold mb-4">📖 Marketing Blog</h3>
                <p className="text-foreground/80 mb-4">
                  In-depth articles covering proven strategies from managing $35M+ in campaigns.
                </p>
                <Link 
                  href="/blog"
                  className="bg-orange-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-orange-700 transition-colors inline-block"
                >
                  Read Latest Posts
                </Link>
              </div>
              
              <div className="bg-background rounded-lg p-6 shadow-sm border border-foreground/10">
                <h3 className="text-xl font-semibold mb-4">🎯 Our Services</h3>
                <p className="text-foreground/80 mb-4">
                  Learn how we help businesses achieve 400%+ ROI improvements through strategic marketing.
                </p>
                <Link 
                  href="/services"
                  className="bg-orange-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-orange-700 transition-colors inline-block"
                >
                  View Services
                </Link>
              </div>
              
              <div className="bg-background rounded-lg p-6 shadow-sm border border-foreground/10">
                <h3 className="text-xl font-semibold mb-4">💬 Free Consultation</h3>
                <p className="text-foreground/80 mb-4">
                  Get personalized marketing advice with a free 30-minute strategy session.
                </p>
                <Link 
                  href="/contact"
                  className="bg-orange-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-orange-700 transition-colors inline-block"
                >
                  Schedule Call
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="bg-foreground/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                Join 5,000+ Marketers Getting Results
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-background rounded-lg p-6 shadow-sm border border-foreground/10">
                  <div className="text-3xl font-bold text-orange-600 mb-2">5,000+</div>
                  <h3 className="text-lg font-semibold mb-2">Active Subscribers</h3>
                  <p className="text-foreground/80 text-sm">Marketing professionals getting weekly insights</p>
                </div>
                
                <div className="bg-background rounded-lg p-6 shadow-sm border border-foreground/10">
                  <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
                  <h3 className="text-lg font-semibold mb-2">Open Rate</h3>
                  <p className="text-foreground/80 text-sm">Industry-leading email engagement rates</p>
                </div>
                
                <div className="bg-background rounded-lg p-6 shadow-sm border border-foreground/10">
                  <div className="text-3xl font-bold text-orange-600 mb-2">450%</div>
                  <h3 className="text-lg font-semibold mb-2">Average ROI Improvement</h3>
                  <p className="text-foreground/80 text-sm">Results achieved by newsletter subscribers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Questions or Feedback?</h3>
            <p className="text-foreground/80 mb-6">
              If you have any questions about the newsletter content or suggestions for topics you'd like me to cover, I'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:amir@amirgomez.com"
                className="bg-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors"
              >
                Email Me Directly
              </a>
              <Link 
                href="/contact"
                className="border border-orange-600 text-orange-600 px-6 py-3 rounded-full font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
              >
                Visit Contact Page
              </Link>
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
      </div>
    </>
  );
}