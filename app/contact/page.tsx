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
  StaggerContainer,
  AnimatedButton,
  MagneticHover,
  ScrollNavbar,
} from '@/components/animations';
import MeshGradient from '@/components/effects/MeshGradient';
import SpotlightCard from '@/components/effects/SpotlightCard';
import { Target, BarChart3, Rocket, Mail, Briefcase, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isOpen, currentVariant, openForm, closeForm, handleSubmit } = useFormModal();
  const t = getTranslations('en');

  const navItems = ['About', 'Services', 'Blog', 'Contact'];

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

      <div className="min-h-screen bg-background text-foreground relative">

        {/* ==========================================
            NAVIGATION
           ========================================== */}
        <ScrollNavbar>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="font-display text-2xl font-extrabold tracking-tight">
                <span className="text-gradient-brand">AG</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                {navItems.map((item) => (
                  <MagneticHover key={item} strength={0.2}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className={`relative py-1 transition-colors group ${
                        item === 'Contact'
                          ? 'text-brand-500 font-semibold'
                          : 'text-foreground/70 hover:text-foreground'
                      }`}
                    >
                      {item}
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-brand-500 to-accent transition-all duration-300 ${
                          item === 'Contact' ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </Link>
                  </MagneticHover>
                ))}
                <LanguageSwitcher currentLocale="en" />
                <AnimatedButton
                  onClick={() => openForm('consultation')}
                  variant="primary"
                  size="sm"
                >
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
                    {navItems.map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          href={`/${item.toLowerCase()}`}
                          className={`block py-3 text-lg transition-colors ${
                            item === 'Contact'
                              ? 'text-brand-500 font-semibold'
                              : 'hover:text-brand-500'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item}
                        </Link>
                      </motion.div>
                    ))}
                    <div className="pt-4 border-t border-border-subtle">
                      <AnimatedButton
                        onClick={() => { openForm('consultation'); setIsMobileMenuOpen(false); }}
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

        {/* ==========================================
            HERO SECTION
           ========================================== */}
        <section className="relative overflow-hidden">
          <MeshGradient />

          <div className="container mx-auto px-4 py-20 relative z-10">
            <FadeInView>
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
                  {t.contact.hero.title}
                  <span className="text-gradient-brand"> {t.contact.hero.titleHighlight}</span>
                </h1>
                <p className="text-xl md:text-2xl text-foreground/60 mb-12 max-w-3xl mx-auto leading-relaxed">
                  {t.contact.hero.subtitle}
                </p>
              </div>
            </FadeInView>

            {/* Key Benefits */}
            <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto" staggerDelay={0.15}>
              <SpotlightCard className="p-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, var(--brand-500), var(--brand-600))' }}>
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-bold mb-2">{t.contact.benefits.strategy.title}</h3>
                <p className="text-sm text-foreground/60">{t.contact.benefits.strategy.description}</p>
              </SpotlightCard>

              <SpotlightCard className="p-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, var(--brand-400), var(--accent))' }}>
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-bold mb-2">{t.contact.benefits.audit.title}</h3>
                <p className="text-sm text-foreground/60">{t.contact.benefits.audit.description}</p>
              </SpotlightCard>

              <SpotlightCard className="p-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, var(--accent), var(--brand-500))' }}>
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-bold mb-2">{t.contact.benefits.plan.title}</h3>
                <p className="text-sm text-foreground/60">{t.contact.benefits.plan.description}</p>
              </SpotlightCard>
            </StaggerContainer>
          </div>
        </section>

        {/* ==========================================
            CONTACT FORM & INFO
           ========================================== */}
        <section className="container mx-auto px-4 pb-20 pt-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">

              {/* Contact Form */}
              <FadeInView>
                <SpotlightCard className="p-8">
                  <h2 className="font-display text-2xl font-bold mb-6">{t.contact.form.title}</h2>
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
                          className="w-full px-4 py-3 border border-foreground/20 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
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
                          className="w-full px-4 py-3 border border-foreground/20 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
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
                        className="w-full px-4 py-3 border border-foreground/20 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
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
                        className="w-full px-4 py-3 border border-foreground/20 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
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
                        className="w-full px-4 py-3 border border-foreground/20 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
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
                        className="w-full px-4 py-3 border border-foreground/20 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
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
                        className="w-full px-4 py-3 border border-foreground/20 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
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
                        className="w-full px-4 py-3 border border-foreground/20 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
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
                      <label htmlFor="newsletter" className="text-sm text-foreground/60">
                        {t.contact.form.newsletter}
                      </label>
                    </div>

                    <AnimatedButton
                      type="submit"
                      variant="primary"
                      className="w-full py-4 text-lg"
                    >
                      {t.contact.form.submit}
                    </AnimatedButton>

                    <p className="text-xs text-foreground/40 text-center">
                      {t.contact.form.privacy}
                    </p>
                  </form>
                </SpotlightCard>
              </FadeInView>

              {/* Contact Information & Calendar */}
              <div className="space-y-8">

                {/* Calendar Embed */}
                <FadeInView delay={0.1}>
                  <SpotlightCard className="p-8">
                    <h3 className="font-display text-xl font-bold mb-4">{t.contact.calendar.title}</h3>
                    <p className="text-foreground/60 mb-6">
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
                  </SpotlightCard>
                </FadeInView>

                {/* Contact Details */}
                <FadeInView delay={0.2}>
                  <SpotlightCard className="p-8">
                    <h3 className="font-display text-xl font-bold mb-6">{t.contact.other.title}</h3>

                    <div className="space-y-5">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, var(--brand-500), var(--brand-600))' }}>
                          <Mail className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold">{t.contact.other.email}</div>
                          <div className="text-foreground/50 text-sm">amir@amirgomez.com</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, var(--brand-400), var(--accent))' }}>
                          <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold">{t.contact.other.linkedin}</div>
                          <div className="text-foreground/50 text-sm">linkedin.com/in/amir-gabriel-gomez</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, var(--accent), var(--brand-500))' }}>
                          <Clock className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold">{t.contact.other.responseTime}</div>
                          <div className="text-foreground/50 text-sm">{t.contact.other.within24}</div>
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </FadeInView>

                {/* FAQ */}
                <FadeInView delay={0.3}>
                  <SpotlightCard className="p-8">
                    <h3 className="font-display text-xl font-bold mb-6">{t.contact.faq.title}</h3>

                    <div className="space-y-5">
                      <div>
                        <h4 className="font-semibold mb-2">{t.contact.faq.q1.question}</h4>
                        <p className="text-sm text-foreground/60">
                          {t.contact.faq.q1.answer}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">{t.contact.faq.q2.question}</h4>
                        <p className="text-sm text-foreground/60">
                          {t.contact.faq.q2.answer}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">{t.contact.faq.q3.question}</h4>
                        <p className="text-sm text-foreground/60">
                          {t.contact.faq.q3.answer}
                        </p>
                      </div>
                    </div>
                  </SpotlightCard>
                </FadeInView>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            SOCIAL PROOF
           ========================================== */}
        <section className="py-20" style={{ background: 'var(--background-secondary)' }}>
          <div className="container mx-auto px-4">
            <FadeInView>
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-10">{t.contact.social.title}</h2>

                <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.1}>
                  <div className="rounded-2xl p-6 border border-border-default" style={{ background: 'var(--surface-glass)', backdropFilter: 'blur(16px)' }}>
                    <div className="text-3xl font-extrabold font-display text-gradient-brand mb-2">97%</div>
                    <div className="text-sm text-foreground/50">{t.contact.social.satisfaction}</div>
                  </div>
                  <div className="rounded-2xl p-6 border border-border-default" style={{ background: 'var(--surface-glass)', backdropFilter: 'blur(16px)' }}>
                    <div className="text-3xl font-extrabold font-display text-gradient-brand mb-2">450%</div>
                    <div className="text-sm text-foreground/50">{t.contact.social.roiIncrease}</div>
                  </div>
                  <div className="rounded-2xl p-6 border border-border-default" style={{ background: 'var(--surface-glass)', backdropFilter: 'blur(16px)' }}>
                    <div className="text-3xl font-extrabold font-display text-gradient-brand mb-2">$35M+</div>
                    <div className="text-sm text-foreground/50">{t.contact.social.adSpend}</div>
                  </div>
                </StaggerContainer>
              </div>
            </FadeInView>
          </div>
        </section>

        {/* ==========================================
            FOOTER
           ========================================== */}
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
