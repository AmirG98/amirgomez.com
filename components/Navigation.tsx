'use client';

import Link from 'next/link';
import { useState } from 'react';

interface NavigationProps {
  currentPage?: string;
  showConsultationButton?: boolean;
}

export default function Navigation({ 
  currentPage = '', 
  showConsultationButton = true 
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' }
  ];

  return (
    <nav className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-foreground/10 z-50">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            AG
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={`hover:text-foreground/80 transition-colors ${
                  currentPage === item.href ? 'text-orange-600 font-semibold' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
            {showConsultationButton && (
              <Link
                href="/contact"
                className="bg-orange-600 text-white px-4 sm:px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition-colors text-sm sm:text-base"
              >
                Get Consultation
              </Link>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
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
            <div className="container mx-auto px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={`block py-2 hover:text-orange-600 transition-colors ${
                    currentPage === item.href ? 'text-orange-600 font-semibold' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {showConsultationButton && (
                <div className="pt-3 border-t border-foreground/10">
                  <Link
                    href="/contact"
                    className="block w-full bg-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Free Consultation
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}