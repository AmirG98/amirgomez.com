'use client';

import Link from 'next/link';
import { ArrowUp } from 'lucide-react';
import NewsletterSignup from './NewsletterSignup';

interface FooterProps {
  className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`relative overflow-hidden ${className}`}>
      {/* Gradient background */}
      <div className="absolute inset-0 bg-foreground" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.08), transparent 70%)',
            top: '-20%',
            right: '-10%',
            filter: 'blur(60px)',
          }}
        />
        <div className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(245,158,11,0.05), transparent 70%)',
            bottom: '-10%',
            left: '-5%',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative z-10 text-background">
        {/* Top CTA heading */}
        <div className="border-b border-background/10">
          <div className="container mx-auto px-4 py-16 lg:py-20">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-center">
              Let&apos;s Build Something{' '}
              <span className="text-gradient-brand">Great</span>
            </h2>
          </div>
        </div>

        {/* Main footer content */}
        <div className="container mx-auto px-4 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Brand */}
            <div>
              <div className="font-display text-2xl font-extrabold mb-3">
                <span className="text-gradient-brand">AG</span>
              </div>
              <p className="text-background/50 text-sm leading-relaxed mb-4">
                Digital marketing specialist helping businesses grow through data-driven advertising strategies.
              </p>
              <div className="flex gap-4">
                <Link
                  href="https://www.linkedin.com/in/amir-gabriel-gomez/"
                  className="text-background/40 hover:text-brand-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Link>
                <Link
                  href="mailto:amir@amirgomez.com"
                  className="text-background/40 hover:text-brand-400 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-display font-bold text-sm uppercase tracking-wider text-background/40 mb-5">Pages</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'About', href: '/about' },
                  { name: 'Services', href: '/services' },
                  { name: 'Blog', href: '/blog' },
                  { name: 'Contact', href: '/contact' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-background/60 hover:text-background transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-display font-bold text-sm uppercase tracking-wider text-background/40 mb-5">Services</h4>
              <ul className="space-y-3">
                {['Google Ads', 'Social Media Ads', 'Email Marketing', 'Conversion Optimization', 'Website Development', 'Marketing Strategy'].map((s) => (
                  <li key={s}>
                    <Link href="/services" className="text-background/60 hover:text-background transition-colors text-sm">
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter mini */}
            <div>
              <h4 className="font-display font-bold text-sm uppercase tracking-wider text-background/40 mb-5">Stay Updated</h4>
              <p className="text-background/50 text-sm mb-4">
                Join 5,000+ marketers getting weekly strategies.
              </p>
              <NewsletterSignup
                title=""
                subtitle=""
                placeholder="Your email"
                buttonText="Subscribe"
                className="text-left [&_form]:flex-col [&_form]:gap-3 [&_input]:bg-background/10 [&_input]:border-background/20 [&_input]:text-background [&_input]:placeholder-background/40 [&_button]:w-full [&_button]:bg-gradient-to-r [&_button]:from-brand-500 [&_button]:to-brand-600 [&_p:last-child]:hidden"
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-background/10">
          <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-background/40 text-sm">
              &copy; {new Date().getFullYear()} Amir Gomez. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-background/40 hover:text-background/70 text-sm transition-colors">
                Privacy Policy
              </Link>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1.5 text-background/40 hover:text-background/70 text-sm transition-colors cursor-pointer"
              >
                Back to top
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
