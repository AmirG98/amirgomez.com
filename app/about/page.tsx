'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getTranslations } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useFormModal } from '@/components/useFormModal';
import MultiStepForm from '@/components/MultiStepForm';
import Footer from '@/components/Footer';
import {
  FadeInView,
  SlideInView,
  StaggerContainer,
  CountUpNumber,
  AnimatedButton,
  MagneticHover,
  ScrollNavbar,
} from '@/components/animations';
import SpotlightCard from '@/components/effects/SpotlightCard';
import MeshGradient from '@/components/effects/MeshGradient';
import { motion, AnimatePresence } from 'framer-motion';

export default function AboutPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isOpen, currentVariant, openForm, closeForm, handleSubmit } = useFormModal();
  const t = getTranslations('en'); // Default to English

  return (
    <>
      <div className="min-h-screen bg-background text-foreground relative">
        {/* Modern Navigation with ScrollNavbar */}
        <ScrollNavbar>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="font-display text-2xl font-extrabold tracking-tight">
                <span className="text-gradient-brand">AG</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                {['Home', 'About', 'Services', 'Blog', 'Contact'].map((item) => (
                  <MagneticHover key={item} strength={0.2}>
                    <Link
                      href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                      className={`relative py-1 group transition-colors ${
                        item === 'About'
                          ? 'text-brand-500 font-semibold'
                          : 'text-foreground/70 hover:text-foreground'
                      }`}
                    >
                      {t.nav[item.toLowerCase() as keyof typeof t.nav] || item}
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-brand-500 to-accent transition-all duration-300 ${
                          item === 'About' ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </Link>
                  </MagneticHover>
                ))}
                <LanguageSwitcher currentLocale="en" />
                <AnimatedButton onClick={() => openForm('consultation')} variant="primary" size="sm">
                  {t.nav.getConsultation}
                </AnimatedButton>
              </div>

              {/* Mobile Navigation */}
              <div className="md:hidden flex items-center gap-3">
                <LanguageSwitcher currentLocale="en" />
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-foreground hover:text-foreground/80 p-2"
                  aria-label="Toggle mobile menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        isMobileMenuOpen
                          ? 'M6 18L18 6M6 6l12 12'
                          : 'M4 6h16M4 12h16M4 18h16'
                      }
                    />
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
                  transition={{ duration: 0.3 }}
                  className="md:hidden overflow-hidden"
                >
                  <div className="py-4 space-y-1">
                    {['Home', 'About', 'Services', 'Blog', 'Contact'].map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                          className={`block py-3 text-lg transition-colors ${
                            item === 'About'
                              ? 'text-brand-500 font-semibold'
                              : 'hover:text-brand-500'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {t.nav[item.toLowerCase() as keyof typeof t.nav] || item}
                        </Link>
                      </motion.div>
                    ))}
                    <div className="pt-4 border-t border-border-subtle">
                      <AnimatedButton
                        onClick={() => {
                          openForm('consultation');
                          setIsMobileMenuOpen(false);
                        }}
                        variant="primary"
                        className="w-full"
                      >
                        {t.nav.getConsultation}
                      </AnimatedButton>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollNavbar>

        {/* Hero Section */}
        <section className="relative container mx-auto px-4 py-16 md:py-24 overflow-hidden">
          <MeshGradient />
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <FadeInView>
                <div>
                  <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight">
                    {t.about.hero.title}
                    <span className="text-gradient-brand"> {t.about.hero.titleHighlight}</span>
                  </h1>
                  <p className="text-lg sm:text-xl text-foreground/80 mb-8 leading-relaxed">
                    {t.about.hero.subtitle}
                  </p>
                  <div className="flex items-center gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gradient-brand">
                        <CountUpNumber prefix="$" to={35000000} suffix="+" className="text-2xl font-bold" />
                      </div>
                      <div className="text-sm text-foreground/60">{t.about.hero.metrics.generated}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gradient-brand">
                        <CountUpNumber to={100} suffix="+" className="text-2xl font-bold" />
                      </div>
                      <div className="text-sm text-foreground/60">{t.about.hero.metrics.funnels}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gradient-brand">
                        <CountUpNumber to={450} suffix="%" className="text-2xl font-bold" />
                      </div>
                      <div className="text-sm text-foreground/60">{t.about.hero.metrics.roi}</div>
                    </div>
                  </div>
                  <AnimatedButton
                    onClick={() => openForm('consultation')}
                    variant="primary"
                    size="lg"
                  >
                    {t.about.hero.cta}
                    <span className="ml-2">→</span>
                  </AnimatedButton>
                </div>
              </FadeInView>

              <SlideInView direction="right" delay={0.2}>
                <div className="relative">
                  {/* Glow behind image */}
                  <div
                    className="absolute -inset-4 rounded-2xl opacity-30 blur-2xl"
                    style={{
                      background: 'linear-gradient(135deg, var(--brand-400), var(--accent))',
                    }}
                  />
                  <div className="gradient-border rounded-2xl relative">
                    <div className="w-full h-96 rounded-2xl overflow-hidden">
                      <img
                        src="/amir-profile.jpg"
                        alt="Amir Gomez - Digital Marketing Specialist"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <SpotlightCard className="absolute -bottom-6 -left-6">
                    <div className="p-6">
                      <div className="text-sm text-foreground/60 mb-1">Client Success Rate</div>
                      <div className="text-2xl font-bold text-gradient-brand">
                        <CountUpNumber to={97} suffix="%" className="text-2xl font-bold" />
                      </div>
                    </div>
                  </SpotlightCard>
                </div>
              </SlideInView>
            </div>
          </div>
        </section>

        {/* My Story Section */}
        <section className="py-20" style={{ background: 'var(--background-secondary)' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <FadeInView>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold mb-12 text-center tracking-tight">
                  {t.about.story.title}
                </h2>
              </FadeInView>

              <FadeInView delay={0.2}>
                <div className="prose prose-lg max-w-none">
                  <div className="text-lg sm:text-xl text-foreground/80 leading-relaxed space-y-6">
                    {t.about.story.content.map((paragraph: string, index: number) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* My Approach */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <FadeInView>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold mb-12 text-center tracking-tight">
                  {t.about.approach.title}
                </h2>
              </FadeInView>

              <div className="grid md:grid-cols-2 gap-12">
                <SlideInView direction="left" delay={0.1}>
                  <SpotlightCard>
                    <div className="p-8">
                      <h3 className="font-display text-xl sm:text-2xl font-bold mb-6">
                        {t.about.approach.beliefs.title}
                      </h3>
                      <ul className="space-y-4">
                        {t.about.approach.beliefs.items.map((item: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 mt-2.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </SpotlightCard>
                </SlideInView>

                <SlideInView direction="right" delay={0.2}>
                  <SpotlightCard>
                    <div className="p-8">
                      <h3 className="font-display text-xl sm:text-2xl font-bold mb-6">
                        {t.about.approach.process.title}
                      </h3>
                      <ul className="space-y-4">
                        {t.about.approach.process.items.map((item: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 mt-2.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </SpotlightCard>
                </SlideInView>
              </div>
            </div>
          </div>
        </section>

        {/* Client Success Stories */}
        <section className="py-20" style={{ background: 'var(--background-secondary)' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <FadeInView>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
                  {t.home.testimonials.title}
                </h2>
                <p className="text-lg sm:text-xl text-foreground/80 mb-12">
                  {t.home.testimonials.subtitle}
                </p>
              </FadeInView>

              <StaggerContainer staggerDelay={0.15} className="grid md:grid-cols-3 gap-8">
                {/* Testimonial 1 */}
                <SpotlightCard>
                  <div className="p-6 sm:p-8">
                    <div className="text-brand-400 mb-4 text-2xl">★★★★★</div>
                    <p className="text-foreground/80 mb-6 leading-relaxed italic text-sm sm:text-base">
                      &ldquo;{t.home.testimonials.testimonial1.text}&rdquo;
                    </p>
                    <div>
                      <div className="font-semibold text-sm sm:text-base">
                        {t.home.testimonials.testimonial1.author}
                      </div>
                      <div className="text-xs sm:text-sm text-foreground/60">
                        {t.home.testimonials.testimonial1.company}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>

                {/* Testimonial 2 */}
                <SpotlightCard>
                  <div className="p-6 sm:p-8">
                    <div className="text-brand-400 mb-4 text-2xl">★★★★★</div>
                    <p className="text-foreground/80 mb-6 leading-relaxed italic text-sm sm:text-base">
                      &ldquo;{t.home.testimonials.testimonial2.text}&rdquo;
                    </p>
                    <div>
                      <div className="font-semibold text-sm sm:text-base">
                        {t.home.testimonials.testimonial2.author}
                      </div>
                      <div className="text-xs sm:text-sm text-foreground/60">
                        {t.home.testimonials.testimonial2.company}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>

                {/* Testimonial 3 */}
                <SpotlightCard>
                  <div className="p-6 sm:p-8">
                    <div className="text-brand-400 mb-4 text-2xl">★★★★★</div>
                    <p className="text-foreground/80 mb-6 leading-relaxed italic text-sm sm:text-base">
                      &ldquo;{t.home.testimonials.testimonial3.text}&rdquo;
                    </p>
                    <div>
                      <div className="font-semibold text-sm sm:text-base">
                        {t.home.testimonials.testimonial3.author}
                      </div>
                      <div className="text-xs sm:text-sm text-foreground/60">
                        {t.home.testimonials.testimonial3.company}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </StaggerContainer>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 overflow-hidden">
          <MeshGradient />
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-3xl mx-auto">
              <FadeInView>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
                  {t.home.cta.title}
                </h2>
                <p className="text-lg sm:text-xl text-foreground/80 mb-8">
                  {t.home.cta.subtitle}
                </p>
                <AnimatedButton
                  onClick={() => openForm('consultation')}
                  variant="primary"
                  size="lg"
                >
                  {t.home.cta.button}
                </AnimatedButton>
                <p className="text-sm text-foreground/60 mt-6">
                  {t.home.cta.features}
                </p>
              </FadeInView>
            </div>
          </div>
        </section>

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
