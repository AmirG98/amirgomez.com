'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getTranslations } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function CaseStudiesThankYouPage() {
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
              <div className="text-orange-600 text-6xl mb-4">🎉</div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-orange-800 dark:text-orange-200">
                Here's Your Growth Marketing Playbook 2025!
              </h1>
              <p className="text-lg text-orange-700 dark:text-orange-300 mb-6">
                Your comprehensive guide to scaling your business is ready! This playbook contains the exact strategies I've used to generate $35M+ in campaign results.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-left">
                <h3 className="text-xl font-semibold mb-4 text-foreground">What's Inside Your Growth Playbook:</h3>
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">📈</span>
                    <span><strong>Real Campaign Results:</strong> Detailed case studies from $35M+ in managed campaigns</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">🎯</span>
                    <span><strong>Industry-Specific Strategies:</strong> Tactics proven to work across multiple business sectors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">🔧</span>
                    <span><strong>Implementation Templates:</strong> Step-by-step guides and frameworks you can use immediately</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">💡</span>
                    <span><strong>Exclusive Insights:</strong> Advanced tactics typically reserved for high-paying clients</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Growth Playbook Access */}
        <section className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Access Your Growth Marketing Playbook 2025
            </h2>
            
            {/* Download Options */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a 
                href="https://gamma.app/docs/h61z4ybro7w63i4" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors text-center"
              >
                📥 Download Full Playbook
              </a>
              <a 
                href="https://gamma.app/embed/h61z4ybro7w63i4" 
                target="_blank" 
                rel="noopener noreferrer"
                className="border border-orange-600 text-orange-600 px-6 py-3 rounded-full font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors text-center"
              >
                🔗 Open in New Tab
              </a>
            </div>
            
            <p className="text-center text-foreground/80 mb-8">
              View the playbook below or download it for offline access. Click fullscreen for the best reading experience.
            </p>
            
            {/* Growth Marketing Playbook Embed */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-foreground/10">
              <div className="p-4 sm:p-6">
                <div className="w-full flex justify-center">
                  <iframe 
                    src="https://gamma.app/embed/h61z4ybro7w63i4" 
                    style={{ width: '700px', maxWidth: '100%', height: '450px' }}
                    allow="fullscreen" 
                    title="Growth Marketing Playbook 2025"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
            
            {/* Additional Access Options */}
            <div className="text-center mt-6">
              <p className="text-sm text-foreground/60 mb-2">
                Having trouble viewing the playbook? Try these options:
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a 
                  href="https://gamma.app/docs/h61z4ybro7w63i4" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-orange-600 hover:text-orange-700 text-sm underline"
                >
                  Direct Link
                </a>
                <span className="text-foreground/40 text-sm">•</span>
                <a 
                  href="mailto:amir@amirgomez.com?subject=Growth%20Playbook%20Access%20Issue" 
                  className="text-orange-600 hover:text-orange-700 text-sm underline"
                >
                  Email Support
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* What Makes This Special */}
        <section className="bg-foreground/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
                What Makes This Growth Playbook Different
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-background rounded-lg p-6 shadow-sm border border-foreground/10">
                  <h3 className="text-xl font-semibold mb-4">🎯 Proven Results</h3>
                  <p className="text-foreground/80">
                    Every strategy included has generated real results from actual campaigns managing over $35M in ad spend across 100+ successful funnels.
                  </p>
                </div>
                
                <div className="bg-background rounded-lg p-6 shadow-sm border border-foreground/10">
                  <h3 className="text-xl font-semibold mb-4">📊 Data-Driven</h3>
                  <p className="text-foreground/80">
                    All recommendations are backed by real performance data, not theory. You'll see actual metrics and ROI improvements.
                  </p>
                </div>
                
                <div className="bg-background rounded-lg p-6 shadow-sm border border-foreground/10">
                  <h3 className="text-xl font-semibold mb-4">🚀 Immediately Actionable</h3>
                  <p className="text-foreground/80">
                    No fluff or generic advice. Every strategy comes with step-by-step implementation guides you can use today.
                  </p>
                </div>
                
                <div className="bg-background rounded-lg p-6 shadow-sm border border-foreground/10">
                  <h3 className="text-xl font-semibold mb-4">🔄 Continuously Updated</h3>
                  <p className="text-foreground/80">
                    As I develop new strategies and achieve new results, you'll receive updates and additions to your playbook.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Explore More */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Explore More Marketing Insights
            </h2>
            <p className="text-lg text-foreground/80 mb-12">
              While you wait for your Growth Playbook, check out these additional resources to accelerate your marketing success.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background rounded-lg p-6 shadow-sm border border-foreground/10">
                <h3 className="text-xl font-semibold mb-4">📖 Marketing Blog</h3>
                <p className="text-foreground/80 mb-4">
                  In-depth articles covering advanced marketing strategies and tactics.
                </p>
                <Link 
                  href="/blog"
                  className="bg-orange-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-orange-700 transition-colors inline-block"
                >
                  Read Blog
                </Link>
              </div>
              
              <div className="bg-background rounded-lg p-6 shadow-sm border border-foreground/10">
                <h3 className="text-xl font-semibold mb-4">🎯 Our Services</h3>
                <p className="text-foreground/80 mb-4">
                  Learn how we help businesses achieve 400%+ ROI improvements.
                </p>
                <Link 
                  href="/services"
                  className="bg-orange-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-orange-700 transition-colors inline-block"
                >
                  View Services
                </Link>
              </div>
              
              <div className="bg-background rounded-lg p-6 shadow-sm border border-foreground/10">
                <h3 className="text-xl font-semibold mb-4">💬 Schedule Call</h3>
                <p className="text-foreground/80 mb-4">
                  Get personalized advice with a free 30-minute consultation.
                </p>
                <Link 
                  href="/contact"
                  className="bg-orange-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-orange-700 transition-colors inline-block"
                >
                  Book Call
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-foreground/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">Questions About Your Playbook?</h3>
              <p className="text-foreground/80 mb-6">
                If you have any questions about the content or need help implementing the strategies, I'm here to help.
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