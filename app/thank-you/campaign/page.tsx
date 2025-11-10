'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getTranslations } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function CampaignThankYouPage() {
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
              <div className="text-orange-600 text-6xl mb-4">🚀</div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-orange-800 dark:text-orange-200">
                Your Campaign Request Has Been Received!
              </h1>
              <p className="text-lg text-orange-700 dark:text-orange-300 mb-6">
                I've received your marketing campaign request and will personally review your requirements to create a custom strategy that drives real results.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-left">
                <h3 className="text-xl font-semibold mb-4 text-foreground">What Happens Next:</h3>
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">📋</span>
                    <span><strong>Requirements Analysis:</strong> I'll review your business goals, target audience, and budget parameters</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">🎯</span>
                    <span><strong>Strategy Development:</strong> Custom campaign strategy designed for your specific objectives and industry</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">📊</span>
                    <span><strong>Proposal Creation:</strong> Detailed campaign proposal with projected ROI and implementation timeline</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">🤝</span>
                    <span><strong>Strategy Call:</strong> Personal consultation to discuss the strategy and answer your questions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Calendar Booking Section */}
        <section className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Schedule Your Campaign Strategy Call
              </h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                Let's discuss your campaign goals in detail and create a custom strategy that delivers exceptional results for your business.
              </p>
            </div>

            {/* Calendar Embed */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
              <div className="rounded-lg overflow-hidden" style={{ height: '700px' }}>
                <iframe
                  src="https://calendly.com/amir-amirgomez/30min?embed_domain=amirgomez-com.vercel.app&embed_type=Inline"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Schedule a campaign strategy call with Amir Gomez"
                  style={{ border: 'none' }}
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Campaign Process */}
        <section className="bg-foreground/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
                Our Campaign Development Process
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-orange-600">1</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Discovery</h3>
                  <p className="text-foreground/80 text-sm">Understand your business, audience, and goals</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-orange-600">2</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Strategy</h3>
                  <p className="text-foreground/80 text-sm">Develop custom campaign strategy and targeting</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-orange-600">3</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Launch</h3>
                  <p className="text-foreground/80 text-sm">Execute campaigns with proper tracking and optimization</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-orange-600">4</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Optimize</h3>
                  <p className="text-foreground/80 text-sm">Continuous optimization for maximum ROI</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Why Choose Our Campaign Management
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-background rounded-lg p-6 shadow-sm border border-foreground/10">
                <h3 className="text-xl font-semibold mb-4">📈 Proven Results</h3>
                <p className="text-foreground/80 mb-4">
                  $35M+ managed in campaigns with an average 450% ROI improvement across 100+ successful projects.
                </p>
                <ul className="text-sm text-foreground/70 space-y-1">
                  <li>• Average 450% ROI improvement</li>
                  <li>• 100+ successful campaigns</li>
                  <li>• $35M+ in managed ad spend</li>
                </ul>
              </div>
              
              <div className="bg-background rounded-lg p-6 shadow-sm border border-foreground/10">
                <h3 className="text-xl font-semibold mb-4">🎯 Data-Driven Approach</h3>
                <p className="text-foreground/80 mb-4">
                  Every campaign decision is backed by data analysis and continuous optimization based on performance metrics.
                </p>
                <ul className="text-sm text-foreground/70 space-y-1">
                  <li>• Advanced analytics implementation</li>
                  <li>• Real-time performance monitoring</li>
                  <li>• Continuous A/B testing</li>
                </ul>
              </div>
              
              <div className="bg-background rounded-lg p-6 shadow-sm border border-foreground/10">
                <h3 className="text-xl font-semibold mb-4">🚀 Multi-Platform Expertise</h3>
                <p className="text-foreground/80 mb-4">
                  Comprehensive campaign management across Google Ads, Facebook Ads, LinkedIn, and other platforms.
                </p>
                <ul className="text-sm text-foreground/70 space-y-1">
                  <li>• Google Ads certified specialist</li>
                  <li>• Facebook Blueprint certified</li>
                  <li>• Cross-platform optimization</li>
                </ul>
              </div>
              
              <div className="bg-background rounded-lg p-6 shadow-sm border border-foreground/10">
                <h3 className="text-xl font-semibold mb-4">🤝 Personal Attention</h3>
                <p className="text-foreground/80 mb-4">
                  Direct access to me personally - no account managers or middlemen, just dedicated expert attention.
                </p>
                <ul className="text-sm text-foreground/70 space-y-1">
                  <li>• Direct communication with specialist</li>
                  <li>• Weekly performance reviews</li>
                  <li>• Strategic consulting included</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-foreground/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">Questions About Your Campaign?</h3>
              <p className="text-foreground/80 mb-6">
                If you have any questions about the campaign development process or need to discuss specific requirements, I'm here to help.
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