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
import SectionDivider from '@/components/effects/SectionDivider';
import AmbientOrbs from '@/components/effects/AmbientOrbs';
import CustomCursor from '@/components/effects/CustomCursor';
import { Target, Smartphone, Mail, BarChart3, Search, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    id: 'google-ads-management',
    title: 'Google Ads Management',
    description: 'Strategic Google Ads campaigns that target your ideal customers and maximize your advertising budget with proven optimization techniques.',
    features: [
      'Keyword research & strategy development',
      'Campaign setup & ongoing optimization',
      'Performance tracking & detailed reporting',
      'Landing page optimization recommendations',
      'Conversion tracking implementation'
    ],
    icon: Target,
    results: '+450% average ROI increase'
  },
  {
    id: 'facebook-advertising',
    title: 'Facebook & Instagram Advertising',
    description: 'Facebook and Instagram advertising that builds brand awareness and drives qualified leads through advanced targeting strategies.',
    features: [
      'Audience research & precise targeting',
      'Creative development & A/B testing',
      'Campaign optimization & scaling',
      'Retargeting campaign setup',
      'Cross-platform attribution tracking'
    ],
    icon: Smartphone,
    results: '+300% lead quality improvement'
  },
  {
    id: 'email-marketing-automation',
    title: 'Email Marketing Automation',
    description: 'Automated email sequences and campaigns that nurture leads and increase customer lifetime value through personalized messaging.',
    features: [
      'Email automation setup & strategy',
      'List building & segmentation',
      'Performance optimization & testing',
      'Customer journey mapping',
      'Revenue attribution tracking'
    ],
    icon: Mail,
    results: '+587% email revenue increase'
  },
  {
    id: 'conversion-optimization',
    title: 'Conversion Rate Optimization',
    description: 'Landing page optimization and conversion rate improvements that turn more visitors into customers through data-driven testing.',
    features: [
      'Landing page design & testing',
      'A/B testing & analytics setup',
      'User experience optimization',
      'Conversion funnel analysis',
      'Performance monitoring & reporting'
    ],
    icon: BarChart3,
    results: '+187% conversion improvement'
  },
  {
    id: 'marketing-analytics',
    title: 'Marketing Analytics & Tracking',
    description: 'Comprehensive tracking and reporting that provides clear insights into campaign performance and ROI measurement.',
    features: [
      'Analytics setup & configuration',
      'Custom dashboard creation',
      'Performance reporting & insights',
      'Data-driven recommendations',
      'Attribution modeling setup'
    ],
    icon: Search,
    results: '+340% data accuracy improvement'
  },
  {
    id: 'marketing-strategy',
    title: 'Marketing Strategy Consulting',
    description: 'Comprehensive marketing strategies and consulting that align with your business goals and competitive positioning.',
    features: [
      'Marketing strategy development',
      'Competitive analysis & positioning',
      'Growth planning & execution roadmap',
      'Team training & implementation',
      'Ongoing strategic guidance'
    ],
    icon: Rocket,
    results: '+250% strategic clarity'
  }
];

const packages = [
  {
    name: 'Growth Starter',
    description: 'Perfect for small businesses ready to scale their marketing',
    features: [
      'Google Ads or Facebook Ads management',
      'Basic email marketing automation',
      'Monthly performance reports',
      'Quarterly strategy sessions',
      'Email & chat support'
    ],
    popular: false
  },
  {
    name: 'Growth Accelerator',
    description: 'Comprehensive marketing for growing businesses',
    features: [
      'Multi-platform advertising (Google + Facebook)',
      'Advanced email marketing automation',
      'Conversion rate optimization',
      'Bi-weekly strategy calls',
      'Priority support & dedicated account manager'
    ],
    popular: true
  },
  {
    name: 'Enterprise Growth',
    description: 'Full-service marketing for established businesses',
    features: [
      'Complete marketing strategy & execution',
      'Advanced analytics & attribution modeling',
      'Custom automation & integrations',
      'Weekly strategy sessions',
      'Dedicated marketing team'
    ],
    popular: false
  }
];

export default function ServicesPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isOpen, currentVariant, openForm, closeForm, handleSubmit } = useFormModal();
  const t = getTranslations('en');

  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Ambient Background Orbs */}
      <AmbientOrbs />

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
                {[
                  { label: t.nav.home, href: '/' },
                  { label: t.nav.about, href: '/about' },
                  { label: t.nav.services, href: '/services' },
                  { label: t.nav.blog, href: '/blog' },
                  { label: t.nav.contact, href: '/contact' },
                ].map((item) => (
                  <MagneticHover key={item.href} strength={0.2}>
                    <Link
                      href={item.href}
                      className={`relative py-1 group transition-colors ${
                        item.href === '/services'
                          ? 'text-gradient-brand font-semibold'
                          : 'text-foreground/70 hover:text-foreground'
                      }`}
                    >
                      {item.label}
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-brand-500 to-accent transition-all duration-300 ${
                          item.href === '/services' ? 'w-full' : 'w-0 group-hover:w-full'
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
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
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="md:hidden overflow-hidden"
                >
                  <div className="py-4 space-y-1">
                    {[
                      { label: t.nav.home, href: '/' },
                      { label: t.nav.about, href: '/about' },
                      { label: t.nav.services, href: '/services' },
                      { label: t.nav.blog, href: '/blog' },
                      { label: t.nav.contact, href: '/contact' },
                    ].map((item, i) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          className={`block py-3 text-lg transition-colors ${
                            item.href === '/services'
                              ? 'text-gradient-brand font-semibold'
                              : 'hover:text-brand-500'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
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

        {/* ==========================================
            HERO SECTION
           ========================================== */}
        <section className="relative overflow-hidden">
          <MeshGradient />

          <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
            <FadeInView>
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                  Marketing Services That{' '}
                  <span className="text-gradient-brand">Drive Results</span>
                </h1>
                <p className="text-xl md:text-2xl text-foreground/60 mb-10 max-w-3xl mx-auto leading-relaxed">
                  Proven digital marketing solutions that turn ad spend into profitable growth.
                  No contracts, no fluff -- just results-driven strategies with guaranteed ROI.
                </p>

                {/* Trust Indicators */}
                <StaggerContainer className="grid md:grid-cols-3 gap-6 mb-12" staggerDelay={0.15}>
                  <SpotlightCard className="p-6">
                    <div className="font-display text-2xl font-bold text-gradient-brand mb-2">$35M+</div>
                    <div className="text-sm text-foreground/60">Generated with Campaigns</div>
                  </SpotlightCard>
                  <SpotlightCard className="p-6">
                    <div className="font-display text-2xl font-bold text-gradient-brand mb-2">100+</div>
                    <div className="text-sm text-foreground/60">Successful Funnels</div>
                  </SpotlightCard>
                  <SpotlightCard className="p-6">
                    <div className="font-display text-2xl font-bold text-gradient-brand mb-2">450%</div>
                    <div className="text-sm text-foreground/60">Average ROI</div>
                  </SpotlightCard>
                </StaggerContainer>
              </div>
            </FadeInView>
          </div>
        </section>

        <SectionDivider variant="wave" />

        {/* ==========================================
            SERVICES GRID
           ========================================== */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <FadeInView>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-12 text-center">
                Comprehensive Marketing Solutions
              </h2>
            </FadeInView>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <SpotlightCard key={service.id} className="p-8">
                    <div className="mb-6 w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, var(--brand-500), var(--accent))' }}
                    >
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-display text-xl font-bold mb-4">{service.title}</h3>
                    <p className="text-foreground/60 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="text-sm text-foreground/60 space-y-2 mb-6">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-brand-500 mt-1">&#8226;</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="border-t border-border-default pt-6">
                      <div className="flex justify-center items-center mb-4">
                        <div className="text-sm text-green-500 font-medium">{service.results}</div>
                      </div>
                      <AnimatedButton
                        onClick={() => openForm('consultation')}
                        variant="primary"
                        className="w-full"
                      >
                        Learn More
                      </AnimatedButton>
                    </div>
                  </SpotlightCard>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        <SectionDivider variant="curve" fill="var(--background-secondary)" />

        {/* ==========================================
            PACKAGES SECTION
           ========================================== */}
        <section style={{ background: 'var(--background-secondary)' }} className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <FadeInView>
                <div className="text-center mb-16">
                  <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
                    Plans Adapted to Your Needs
                  </h2>
                  <p className="text-xl text-foreground/60 max-w-3xl mx-auto">
                    Flexible packages designed to scale with your business growth and marketing needs
                  </p>
                </div>
              </FadeInView>

              <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.15}>
                {packages.map((pkg, index) => (
                  <SpotlightCard
                    key={index}
                    className={`p-8 relative ${pkg.popular ? 'gradient-border' : ''}`}
                  >
                    {pkg.popular && (
                      <>
                        {/* Glow effect behind popular card */}
                        <div
                          className="absolute -inset-1 rounded-2xl opacity-20 blur-xl -z-10"
                          style={{ background: 'linear-gradient(135deg, var(--brand-500), var(--accent))' }}
                        />
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                          <span
                            className="px-4 py-2 rounded-full text-sm font-semibold text-white"
                            style={{ background: 'linear-gradient(135deg, var(--brand-500), var(--brand-600))' }}
                          >
                            Most Popular
                          </span>
                        </div>
                      </>
                    )}

                    <div className="text-center mb-8">
                      <h3 className="font-display text-2xl font-bold mb-4">{pkg.name}</h3>
                      <p className="text-foreground/60">{pkg.description}</p>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <span className="text-green-500 mt-1">&#10003;</span>
                          <span className="text-foreground/70">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <AnimatedButton
                      onClick={() => openForm('consultation')}
                      variant={pkg.popular ? 'primary' : 'secondary'}
                      className="w-full"
                    >
                      Get Quote
                    </AnimatedButton>
                  </SpotlightCard>
                ))}
              </StaggerContainer>

              <FadeInView delay={0.3}>
                <div className="text-center mt-12">
                  <p className="text-foreground/50 mb-4">
                    Need a custom solution? Let&apos;s discuss your specific requirements.
                  </p>
                  <AnimatedButton
                    onClick={() => openForm('consultation')}
                    variant="ghost"
                  >
                    Schedule Custom Consultation &rarr;
                  </AnimatedButton>
                </div>
              </FadeInView>
            </div>
          </div>
        </section>

        <SectionDivider variant="wave" flip />

        {/* ==========================================
            PROCESS SECTION
           ========================================== */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <FadeInView>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-12">
                  How We Work Together
                </h2>
              </FadeInView>

              <StaggerContainer className="grid md:grid-cols-4 gap-8" staggerDelay={0.12}>
                {[
                  {
                    num: 1,
                    title: 'Strategy Session',
                    desc: 'Free consultation to understand your goals, challenges, and opportunities for growth.',
                  },
                  {
                    num: 2,
                    title: 'Custom Plan',
                    desc: 'Detailed marketing strategy tailored to your business, budget, and growth objectives.',
                  },
                  {
                    num: 3,
                    title: 'Implementation',
                    desc: 'Launch campaigns with proper tracking, optimization systems, and performance monitoring.',
                  },
                  {
                    num: 4,
                    title: 'Scale & Optimize',
                    desc: 'Continuous optimization and scaling based on performance data to maximize ROI.',
                  },
                ].map((step) => (
                  <div key={step.num} className="text-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ background: 'linear-gradient(135deg, var(--brand-500), var(--accent))' }}
                    >
                      <span className="font-display text-2xl font-bold text-white">{step.num}</span>
                    </div>
                    <h3 className="font-display text-xl font-bold mb-4">{step.title}</h3>
                    <p className="text-foreground/60">{step.desc}</p>
                  </div>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </section>

        <SectionDivider variant="angle" fill="var(--background-secondary)" />

        {/* ==========================================
            CTA SECTION
           ========================================== */}
        <section style={{ background: 'var(--background-secondary)' }} className="py-20">
          <div className="container mx-auto px-4 text-center">
            <FadeInView>
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
                  Ready to Scale Your Marketing?
                </h2>
                <p className="text-xl text-foreground/60 mb-10">
                  Get a free marketing audit and custom growth strategy. No payment required until you see results.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <AnimatedButton
                    onClick={() => openForm('consultation')}
                    variant="primary"
                    size="lg"
                  >
                    Schedule Free Consultation
                  </AnimatedButton>
                  <AnimatedButton variant="secondary" size="lg">
                    <Link href="/blog">
                      Read Marketing Insights
                    </Link>
                  </AnimatedButton>
                </div>
                <p className="text-sm text-foreground/40 mt-6">
                  Free consultation &bull; No commitment &bull; Results guaranteed
                </p>
              </div>
            </FadeInView>
          </div>
        </section>

        <SectionDivider variant="curve" flip />

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
