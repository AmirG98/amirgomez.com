'use client';

import Link from 'next/link';
import { useState } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Footer from '@/components/Footer';
import { AnimatedButton, MagneticHover, ScrollNavbar } from '@/components/animations';
import CustomCursor from '@/components/effects/CustomCursor';
import AmbientOrbs from '@/components/effects/AmbientOrbs';
import { useFormModal } from '@/components/useFormModal';
import MultiStepForm from '@/components/MultiStepForm';
import { motion, AnimatePresence } from 'framer-motion';

interface PageShellProps {
  children: React.ReactNode;
  activeNav?: string;
  locale?: 'en' | 'es';
}

export default function PageShell({ children, activeNav, locale = 'en' }: PageShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isOpen, currentVariant, openForm, closeForm, handleSubmit } = useFormModal();

  const navItems = ['About', 'Services', 'Blog', 'Contact'];

  return (
    <>
      <CustomCursor />
      <AmbientOrbs />

      <div className="min-h-screen bg-background text-foreground relative">
        {/* Navigation */}
        <ScrollNavbar>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="font-display text-2xl font-extrabold tracking-tight">
                <span className="text-gradient-brand">AG</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                {navItems.map((item) => {
                  const isActive = activeNav?.toLowerCase() === item.toLowerCase();
                  return (
                    <MagneticHover key={item} strength={0.2}>
                      <Link
                        href={`/${item.toLowerCase()}`}
                        className={`relative py-1 group transition-colors ${
                          isActive ? 'text-brand-500 font-semibold' : 'text-foreground/70 hover:text-foreground'
                        }`}
                      >
                        {item}
                        <span className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-brand-500 to-accent transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`} />
                      </Link>
                    </MagneticHover>
                  );
                })}
                <LanguageSwitcher currentLocale={locale} />
                <AnimatedButton
                  onClick={() => openForm('consultation')}
                  variant="primary"
                  size="sm"
                >
                  Get Free Consultation
                </AnimatedButton>
              </div>

              {/* Mobile Navigation */}
              <div className="md:hidden flex items-center gap-3">
                <LanguageSwitcher currentLocale={locale} />
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-foreground hover:text-foreground/80 p-2"
                  aria-label="Toggle mobile menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="md:hidden overflow-hidden"
                >
                  <div className="py-4 space-y-1">
                    {navItems.map((item, i) => {
                      const isActive = activeNav?.toLowerCase() === item.toLowerCase();
                      return (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <Link
                            href={`/${item.toLowerCase()}`}
                            className={`block py-3 text-lg transition-colors ${
                              isActive ? 'text-brand-500 font-semibold' : 'hover:text-brand-500'
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item}
                          </Link>
                        </motion.div>
                      );
                    })}
                    <div className="pt-4 border-t border-border-subtle">
                      <AnimatedButton
                        onClick={() => { openForm('consultation'); setIsMobileMenuOpen(false); }}
                        variant="primary"
                        className="w-full"
                      >
                        Get Free Consultation
                      </AnimatedButton>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollNavbar>

        {/* Page Content */}
        {children}

        {/* Footer */}
        <Footer />

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

// Re-export the hook so pages can access form opening
export { useFormModal } from '@/components/useFormModal';
