'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getTranslations } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function PrivacyPage() {
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
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-5HKRKM7F"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

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

      {/* Privacy Policy Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-foreground/60 mb-12">Last updated: January 7, 2026</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-foreground/80 leading-relaxed">
                At Amir Gomez ("we," "us," or "our"), we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website amirgomez.com.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">We may collect the following types of information:</p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80">
                <li><strong>Personal Information:</strong> Name, email address, phone number, and company name when you fill out our contact forms or request a consultation.</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent on pages, and navigation paths.</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information, and operating system.</li>
                <li><strong>Cookies:</strong> Small data files stored on your device to enhance your browsing experience.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80">
                <li>Respond to your inquiries and provide requested services</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Analyze website traffic and user behavior</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Cookies and Tracking Technologies</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                We may use third-party services such as Google Analytics to help us understand how visitors use our site. These services may collect information about your visits to our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Client Business Data</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                When we work with businesses as clients, we may have access to sensitive business information including analytics data, advertising accounts, customer lists, conversion data, and proprietary business strategies. We want to be clear about how we handle this information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-4">
                <li><strong>Confidentiality:</strong> All client business data is treated as strictly confidential and is never shared with third parties, competitors, or other clients.</li>
                <li><strong>No Commercial Use:</strong> We do not use your business data, analytics, or insights to benefit ourselves or other clients. Your data is used exclusively to provide services to you.</li>
                <li><strong>No Resale:</strong> We never sell, license, or monetize client data in any form.</li>
                <li><strong>Access Limitations:</strong> Only team members directly working on your account have access to your business data, and only to the extent necessary to deliver our services.</li>
                <li><strong>Platform Credentials:</strong> When you grant us access to advertising platforms (Google Ads, Meta Business, etc.), we use these credentials solely for managing your campaigns and never for unauthorized purposes.</li>
                <li><strong>Competitive Separation:</strong> We maintain strict boundaries between client accounts and never use insights, strategies, or data from one client to benefit another, especially competitors in the same industry.</li>
                <li><strong>Data Return & Deletion:</strong> Upon termination of our services, we will return or delete all client data upon request, and remove our access from all connected platforms.</li>
              </ul>
              <p className="text-foreground/80 leading-relaxed">
                We understand that trust is fundamental to our client relationships. Your business data belongs to you, and we act solely as stewards of that information while providing our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Data Sharing and Disclosure</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">We do not sell your personal information. We may share your data with:</p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80">
                <li><strong>Service Providers:</strong> Third-party vendors who help us operate our website and deliver services</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <p className="text-foreground/80 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">Depending on your location, you may have the following rights:</p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Request data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Third-Party Links</h2>
              <p className="text-foreground/80 leading-relaxed">
                Our website may contain links to other websites. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
              <p className="text-foreground/80 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-foreground/80 leading-relaxed">
                If you have any questions about this privacy policy or our data practices, please contact us at:
              </p>
              <p className="text-foreground/80 mt-4">
                <strong>Email:</strong> <a href="mailto:amir@amirgomez.com" className="text-orange-600 hover:underline">amir@amirgomez.com</a>
              </p>
            </section>
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
    </div>
    </>
  );
}
