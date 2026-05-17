'use client';

import Link from 'next/link';
// import Image from 'next/image';
import { getFeaturedPosts } from '@/data/blog-posts';
import MultiStepForm from '@/components/MultiStepForm';
import { useFormModal } from '@/components/useFormModal';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Footer from '@/components/Footer';
import {
  FadeInView,
  SlideInView,
  StaggerContainer,
  CountUpNumber,
  HoverLift,
  AnimatedButton,
  MagneticHover,
  ScrollNavbar,
  HeroTextReveal,
  GSAPParallax,
  TimelineProcess,
} from '@/components/animations';
import MeshGradient from '@/components/effects/MeshGradient';
import SpotlightCard from '@/components/effects/SpotlightCard';
// import SectionDivider from '@/components/effects/SectionDivider';
import AmbientOrbs from '@/components/effects/AmbientOrbs';
import CustomCursor from '@/components/effects/CustomCursor';
import { useState } from 'react';
import { Target, Smartphone, BarChart3, Mail, Code2, TrendingUp, Quote, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { isOpen, currentVariant, openForm, closeForm, handleSubmit } = useFormModal();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const services = [
    { icon: Target, title: 'Google Ads Management', desc: 'Strategic Google Ads campaigns that target your ideal customers and maximize your advertising budget with proven optimization techniques.', features: ['Keyword research & strategy', 'Campaign setup & optimization', 'Performance tracking & reporting'] },
    { icon: Smartphone, title: 'Social Media Advertising', desc: 'Facebook, Instagram, and LinkedIn advertising that builds brand awareness and drives qualified leads through advanced targeting strategies.', features: ['Audience research & targeting', 'Creative development & testing', 'Campaign optimization'] },
    { icon: BarChart3, title: 'Conversion Optimization', desc: 'Landing page optimization and conversion rate improvements that turn more visitors into customers through data-driven testing.', features: ['Landing page design & testing', 'A/B testing & analytics', 'User experience optimization'] },
    { icon: Mail, title: 'Email Marketing', desc: 'Automated email sequences and campaigns that nurture leads and increase customer lifetime value through personalized messaging.', features: ['Email automation setup', 'List building & segmentation', 'Performance optimization'] },
    { icon: Code2, title: 'Website Development', desc: 'Custom website design and development with integrated analytics, strategic planning, and performance optimization.', features: ['Custom website design & development', 'Analytics setup & tracking', 'Strategic planning & optimization'] },
    { icon: TrendingUp, title: 'Marketing Strategy & Analytics', desc: 'Comprehensive marketing strategy development with advanced analytics, performance tracking, and data-driven optimization recommendations.', features: ['Marketing strategy development', 'Advanced analytics implementation', 'Performance tracking & reporting'] },
  ];

  const processSteps = [
    { number: 1, title: 'Audit & Analysis', description: 'Comprehensive analysis of your current marketing performance, competitors, and growth opportunities.' },
    { number: 2, title: 'Strategy Development', description: 'Custom marketing strategy creation based on your specific business goals, target audience, and budget.' },
    { number: 3, title: 'Campaign Launch', description: 'Implementation of campaigns across selected platforms with proper tracking and optimization systems in place.' },
    { number: 4, title: 'Optimize & Scale', description: 'Continuous optimization based on performance data to maximize ROI and scale successful campaigns.' },
  ];

  const testimonials = [
    { quote: "Amir is one of the most talented marketers I've had the opportunity to work with. I strongly recommend him.", name: 'Steven Page', title: 'VP of Marketing at Giant Partners' },
    { quote: "Amir possesses a deep understanding of market trends and customer behavior, and has a remarkable talent for creating innovative strategies that drive business growth and increase revenue.", name: 'Nick Koriakos', title: 'Founder of Stack Force' },
    { quote: "I deeply trust Amir's ability to drive business growth, simplifying complex scenarios into actionable strategies.", name: 'Agustin Oliva', title: 'General Manager of RollerShow' },
  ];

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
                {['About', 'Services', 'Blog', 'Contact'].map((item) => (
                  <MagneticHover key={item} strength={0.2}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="relative text-foreground/70 hover:text-foreground transition-colors py-1 group"
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-brand-500 to-accent group-hover:w-full transition-all duration-300" />
                    </Link>
                  </MagneticHover>
                ))}
                <LanguageSwitcher currentLocale="en" />
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
                    {['About', 'Services', 'Blog', 'Contact'].map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          href={`/${item.toLowerCase()}`}
                          className="block py-3 text-lg hover:text-brand-500 transition-colors"
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
                        Get Free Consultation
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
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          <MeshGradient />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center">

              <HeroTextReveal className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-[1.05] tracking-tight">
                Grow Your Business with Proven Marketing
              </HeroTextReveal>

              <motion.p
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl md:text-2xl text-foreground/60 mb-10 leading-relaxed max-w-2xl mx-auto"
              >
                I help businesses increase revenue through data-driven advertising strategies.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
              >
                <AnimatedButton
                  onClick={() => openForm('audit')}
                  variant="primary"
                  size="lg"
                >
                  Get Free Marketing Audit
                </AnimatedButton>
                <AnimatedButton
                  onClick={() => openForm('caseStudies')}
                  variant="secondary"
                  size="lg"
                >
                  Grab Growth Playbook
                </AnimatedButton>
              </motion.div>

              {/* Trust Indicators */}
              <StaggerContainer
                staggerDelay={0.1}
                initialDelay={1}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 mb-6"
              >
                {[
                  { value: '$125M+', label: 'Generated' },
                  { value: '100+', label: 'Funnels' },
                  { value: '450%', label: 'Avg ROI' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="glass rounded-full px-5 py-2.5 text-sm flex items-center gap-2"
                  >
                    <span className="font-bold text-brand-500">{stat.value}</span>
                    <span className="text-foreground/60">{stat.label}</span>
                  </div>
                ))}
              </StaggerContainer>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-brand-600"
                  style={{ background: 'linear-gradient(135deg, var(--brand-50), var(--accent-soft))' }}
                >
                  <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
                  10 years in business
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ==========================================
            SERVICES SECTION
           ========================================== */}
        <section id="services" className="relative py-28 lg:py-36" style={{ background: 'var(--background-secondary)' }}>
          <MeshGradient className="opacity-50" />

          <div className="container mx-auto px-4 relative z-10">
            <FadeInView className="text-center mb-20">
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight">
                Full-Funnel Marketing Services That{' '}
                <span className="text-gradient-brand">Drive Results</span>
              </h2>
            </FadeInView>

            <StaggerContainer
              staggerDelay={0.08}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
            >
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <SpotlightCard key={service.title} className="p-8">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                      style={{ background: 'linear-gradient(135deg, var(--brand-500), var(--brand-600))' }}
                    >
                      <IconComponent className="w-7 h-7 text-white" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-xl font-bold mb-4">{service.title}</h3>
                    <p className="text-foreground/70 mb-5 leading-relaxed text-sm">{service.desc}</p>
                    <ul className="text-sm text-foreground/60 space-y-2">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </SpotlightCard>
                );
              })}
            </StaggerContainer>

            <FadeInView delay={0.3} className="text-center mt-14">
              <AnimatedButton
                onClick={() => openForm('campaign')}
                variant="primary"
                size="lg"
              >
                Start Your Marketing Campaign
              </AnimatedButton>
            </FadeInView>
          </div>
        </section>

        {/* ==========================================
            PROCESS SECTION (Dark)
           ========================================== */}
        <section id="process" className="relative py-28 lg:py-36 bg-foreground text-background overflow-hidden">
          {/* Subtle mesh on dark bg */}
          <div className="absolute inset-0 pointer-events-none opacity-30" aria-hidden="true">
            <div className="absolute w-[500px] h-[500px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.15), transparent 70%)', top: '10%', right: '-5%', filter: 'blur(80px)' }}
            />
            <div className="absolute w-[400px] h-[400px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.1), transparent 70%)', bottom: '10%', left: '-5%', filter: 'blur(60px)' }}
            />
          </div>

          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <FadeInView className="text-center mb-20">
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight">
                My Proven 4-Step Process
              </h2>
              <p className="text-xl md:text-2xl text-background/60 max-w-3xl mx-auto">
                A systematic approach that has helped 200+ businesses achieve their marketing goals
              </p>
            </FadeInView>

            <TimelineProcess
              steps={processSteps}
              className="relative"
            />
          </div>
        </section>

        {/* ==========================================
            TESTIMONIALS SECTION
           ========================================== */}
        <section id="testimonials" className="relative py-28 lg:py-36 overflow-hidden"
          style={{ background: 'var(--background-secondary)' }}
        >
          <MeshGradient className="opacity-40" />

          <div className="container mx-auto px-4 relative z-10">
            <FadeInView className="text-center mb-20">
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight">
                What Clients Say
              </h2>
              <p className="text-xl md:text-2xl text-foreground/60">
                Real results from real businesses
              </p>
            </FadeInView>

            <StaggerContainer
              staggerDelay={0.15}
              className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto"
            >
              {testimonials.map((t) => (
                <SpotlightCard key={t.name} className="p-8 flex flex-col">
                  {/* Decorative quote */}
                  <Quote className="w-10 h-10 text-brand-500/30 mb-4" strokeWidth={1} />

                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                        <defs>
                          <linearGradient id={`star-grad-${t.name}-${i}`} x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--brand-400)" />
                            <stop offset="100%" stopColor="var(--accent)" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M10 1l2.39 4.84L17.82 6.7l-3.91 3.81.92 5.38L10 13.23l-4.83 2.66.92-5.38L2.18 6.7l5.43-.86L10 1z"
                          fill={`url(#star-grad-${t.name}-${i})`}
                        />
                      </svg>
                    ))}
                  </div>

                  <p className="text-foreground/80 text-lg leading-relaxed italic flex-1 mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="border-t border-border-subtle pt-5">
                    <div className="font-display font-bold">{t.name}</div>
                    <div className="text-sm text-brand-600 font-medium">{t.title}</div>
                  </div>
                </SpotlightCard>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ==========================================
            CTA SECTION (Visual Climax)
           ========================================== */}
        <section className="relative py-32 lg:py-40 overflow-hidden">
          {/* Dramatic gradient background */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(249,115,22,0.08) 0%, transparent 70%)',
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(249,115,22,0.1), transparent 60%)',
              filter: 'blur(80px)',
              animation: 'pulseGlow 4s ease-in-out infinite',
            }}
            aria-hidden="true"
          />

          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-5xl mx-auto">
              <FadeInView>
                <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-8 tracking-tight">
                  Ready to{' '}
                  <span className="text-gradient-brand">Grow</span>
                  {' '}Your Business?
                </h2>
              </FadeInView>

              <FadeInView delay={0.2}>
                <p className="text-xl md:text-2xl text-foreground/60 mb-12">
                  Get a free marketing audit and custom growth strategy.
                </p>
              </FadeInView>

              <FadeInView delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <AnimatedButton
                    onClick={() => openForm('consultation')}
                    variant="primary"
                    size="lg"
                  >
                    <span className="flex items-center gap-2">
                      Get Free Consultation
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </AnimatedButton>
                  <AnimatedButton
                    onClick={() => openForm('caseStudies')}
                    variant="secondary"
                    size="lg"
                  >
                    Grab My Free Growth Playbook
                  </AnimatedButton>
                </div>
                <p className="text-sm text-foreground/40">
                  Free consultation &middot; No commitment
                </p>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* ==========================================
            BLOG HIGHLIGHTS SECTION
           ========================================== */}
        <section className="relative py-28 lg:py-36" style={{ background: 'var(--background-secondary)' }}>
          <div className="container mx-auto px-4 relative z-10">
            <FadeInView className="text-center mb-20">
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight">
                Latest Marketing Insights
              </h2>
              <p className="text-xl md:text-2xl text-foreground/60 max-w-3xl mx-auto">
                Proven strategies and real case studies from managing{' '}
                <CountUpNumber to={2} prefix="$" suffix="M+ in ad spend" delay={0.5} />
              </p>
            </FadeInView>

            <StaggerContainer
              staggerDelay={0.1}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
            >
              {getFeaturedPosts().slice(0, 3).map((post) => (
                <article key={post.id}>
                  <Link href={`/blog/${post.slug}`}>
                    <SpotlightCard className="overflow-hidden group">
                      {/* Featured Image with gradient overlay */}
                      <div className="relative overflow-hidden aspect-[16/9]">
                        <img
                          src={post.featuredImage || 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=450&fit=crop&auto=format'}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        {/* Category badge */}
                        <div className="absolute top-4 left-4">
                          <span className="glass rounded-full px-3 py-1 text-xs font-semibold text-white">
                            {post.category}
                          </span>
                        </div>
                        {/* Reading time */}
                        <div className="absolute top-4 right-4">
                          <span className="glass rounded-full px-3 py-1 text-xs text-white/80">
                            {post.readingTime} min read
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="font-display text-lg font-bold mb-3 group-hover:text-brand-500 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-foreground/70 mb-5 leading-relaxed text-sm line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-brand-200">
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-sm">{post.author.name}</div>
                            <div className="text-xs text-foreground/50">
                              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </SpotlightCard>
                  </Link>
                </article>
              ))}
            </StaggerContainer>

            <FadeInView delay={0.3} className="text-center mt-16">
              <Link href="/blog">
                <AnimatedButton
                  variant="primary"
                  size="lg"
                  className="inline-flex items-center gap-2"
                >
                  Read All Articles
                  <ArrowRight className="w-5 h-5" />
                </AnimatedButton>
              </Link>
            </FadeInView>
          </div>
        </section>

        {/* ==========================================
            FOOTER
           ========================================== */}
        <Footer />

        {/* Multi-Step Form Modal */}
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
