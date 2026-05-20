'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { blogPosts, blogCategories, getFeaturedPosts } from '@/data/blog-posts';
import { getTranslations } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useFormModal } from '@/components/useFormModal';
import MultiStepForm from '@/components/MultiStepForm';
import Footer from '@/components/Footer';
import {
  FadeInView,
  StaggerContainer,
  ScrollNavbar,
  AnimatedButton,
  MagneticHover,
} from '@/components/animations';
import MeshGradient from '@/components/effects/MeshGradient';
import SpotlightCard from '@/components/effects/SpotlightCard';

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function BlogPostCard({ post, featured = false }: { post: typeof blogPosts[0], featured?: boolean }) {
  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`}>
        <SpotlightCard className="overflow-hidden">
          {/* Featured Image */}
          <div className="relative overflow-hidden aspect-[16/9]">
            <img
              src={post.featuredImage || 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=450&fit=crop&auto=format'}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-500"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            {/* Featured badge */}
            {featured && (
              <div
                className="absolute top-4 left-4 text-white px-4 py-2 text-sm font-semibold rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, var(--brand-500), var(--brand-600))',
                }}
              >
                Featured Article
              </div>
            )}
          </div>

          <div className="p-6">
            {/* Category and reading time */}
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-brand-50 dark:bg-brand-900/20 text-brand-600 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <span className="text-sm text-foreground/60">
                {post.readingTime} min read
              </span>
            </div>

            {/* Title */}
            <h2 className={`font-display font-bold mb-3 group-hover:text-brand-500 transition-colors ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="text-foreground/70 mb-4 leading-relaxed text-sm">
              {post.excerpt}
            </p>

            {/* Author and date */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-brand-200 dark:border-brand-800/40">
                <img
                  src="/amir-profile.jpg"
                  alt={post.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-semibold text-sm">{post.author.name}</div>
                <div className="text-xs text-foreground/50">{formatDate(post.publishedAt)}</div>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </Link>
    </article>
  );
}

export default function BlogPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isOpen, currentVariant, openForm, closeForm, handleSubmit } = useFormModal();
  const t = getTranslations('en');

  // Category filtering state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Newsletter subscription state
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const featuredPosts = getFeaturedPosts();

  // Filter posts based on selected category
  const filteredPosts = selectedCategory === 'All'
    ? blogPosts.filter(post => !post.featured) // Exclude featured posts to avoid duplication
    : blogPosts.filter(post => post.category === selectedCategory);

  // Categories with "All" option
  const allCategories = ['All', ...blogCategories];

  // Newsletter subscription handler
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      setSubscriptionStatus('error');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSubscriptionStatus('idle');

    try {
      // Create newsletter subscription data
      const submissionData = {
        email,
        formType: 'newsletter',
        firstName: '',
        lastName: ''
      };

      // Send to Google Sheets via Apps Script
      const appsScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;

      if (!appsScriptUrl || appsScriptUrl === 'YOUR_APPS_SCRIPT_URL_HERE') {
        console.warn('Google Apps Script URL not configured');
        setSubscriptionStatus('success');
        setEmail('');
        return;
      }

      await fetch(appsScriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
        mode: 'no-cors' // Required for Google Apps Script
      });

      console.log('Newsletter subscription sent to Google Sheets');
      setSubscriptionStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Error submitting newsletter subscription:', error);
      setSubscriptionStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const navItems = [
    { label: t.nav.home, href: '/', active: false },
    { label: t.nav.about, href: '/about', active: false },
    { label: t.nav.services, href: '/services', active: false },
    { label: t.nav.blog, href: '/blog', active: true },
    { label: t.nav.contact, href: '/contact', active: false },
  ];

  return (
    <>
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
                  <MagneticHover key={item.label} strength={0.2}>
                    <Link
                      href={item.href}
                      className={`relative py-1 transition-colors group ${
                        item.active
                          ? 'text-gradient-brand font-semibold'
                          : 'text-foreground/70 hover:text-foreground'
                      }`}
                    >
                      {item.label}
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-brand-500 to-accent transition-all duration-300 ${
                          item.active ? 'w-full' : 'w-0 group-hover:w-full'
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
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          className={`block py-3 text-lg transition-colors ${
                            item.active
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
          <div className="container mx-auto px-4 py-16 relative z-10">
            <FadeInView>
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                  Marketing Insights That{' '}
                  <span className="text-gradient-brand">Drive Results</span>
                </h1>
                <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Proven strategies and actionable tactics from managing $35M+ in campaigns across 100+ successful funnels with 10 years in business.
                </p>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  {allCategories.map((category) => {
                    const isActive = selectedCategory === category;

                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                          isActive
                            ? 'text-white shadow-lg'
                            : 'glass hover:text-foreground'
                        }`}
                        style={isActive ? {
                          background: 'linear-gradient(135deg, var(--brand-500), var(--brand-600))',
                        } : undefined}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>
            </FadeInView>
          </div>
        </section>

        {/* ==========================================
            FEATURED POSTS
           ========================================== */}
        {featuredPosts.length > 0 && (
          <section className="container mx-auto px-4 mb-16">
            <FadeInView>
              <h2 className="font-display text-3xl font-extrabold tracking-tight mb-8">Featured Articles</h2>
            </FadeInView>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredPosts.map((post, index) => (
                <FadeInView key={post.id} delay={index * 0.1}>
                  <BlogPostCard
                    post={post}
                    featured={index === 0}
                  />
                </FadeInView>
              ))}
            </div>
          </section>
        )}

        {/* ==========================================
            FILTERED POSTS
           ========================================== */}
        <section className="container mx-auto px-4 mb-16">
          <FadeInView>
            <div className="mb-8">
              <h2 className="font-display text-3xl font-extrabold tracking-tight">
                {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
              </h2>
            </div>
          </FadeInView>

          {filteredPosts.length === 0 ? (
            <FadeInView>
              <div className="text-center py-12">
                <div className="text-foreground/60 text-lg mb-4">
                  No articles found in the &ldquo;{selectedCategory}&rdquo; category.
                </div>
                <AnimatedButton
                  onClick={() => setSelectedCategory('All')}
                  variant="primary"
                >
                  View All Articles
                </AnimatedButton>
              </div>
            </FadeInView>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>

        {/* ==========================================
            NEWSLETTER SIGNUP
           ========================================== */}
        <section style={{ background: 'var(--background-secondary)' }} className="py-16">
          <div className="container mx-auto px-4 text-center">
            <FadeInView>
              <div className="max-w-2xl mx-auto">
                <h3 className="font-display text-3xl font-extrabold tracking-tight mb-4">
                  Get Weekly Marketing Insights
                </h3>
                <p className="text-xl text-foreground/80 mb-8">
                  Join 5,000+ marketers getting actionable strategies, case studies, and industry insights delivered every Tuesday.
                </p>

                {subscriptionStatus === 'success' ? (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                    <div className="text-green-600 text-xl mb-2">Success!</div>
                    <p className="text-green-700 dark:text-green-300">
                      Thanks for subscribing! You&apos;ll receive our first newsletter this Tuesday.
                    </p>
                    <button
                      onClick={() => setSubscriptionStatus('idle')}
                      className="text-green-600 hover:text-green-700 font-semibold mt-2 cursor-pointer"
                    >
                      Subscribe another email &rarr;
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-lg border border-foreground/20 bg-background focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        required
                      />
                      <AnimatedButton
                        type="submit"
                        variant="primary"
                        disabled={isSubmitting}
                        loading={isSubmitting}
                      >
                        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                      </AnimatedButton>
                    </div>

                    {subscriptionStatus === 'error' && (
                      <p className="text-red-600 text-sm mt-2">
                        {errorMessage || 'Something went wrong. Please try again.'}
                      </p>
                    )}

                    <p className="text-sm text-foreground/60 mt-4">
                      No spam. Unsubscribe anytime.
                    </p>
                  </form>
                )}
              </div>
            </FadeInView>
          </div>
        </section>

        {/* ==========================================
            CATEGORY GRID
           ========================================== */}
        <section className="container mx-auto px-4 py-16">
          <FadeInView>
            <h2 className="font-display text-3xl font-extrabold tracking-tight mb-8 text-center">Browse by Category</h2>
          </FadeInView>
          <StaggerContainer className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto" staggerDelay={0.08}>
            {allCategories.map((category) => {
              const isActive = selectedCategory === category;

              return (
                <SpotlightCard key={category}>
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full p-6 text-left transition-all duration-200 cursor-pointer ${
                      isActive ? 'ring-2 ring-brand-500' : ''
                    }`}
                  >
                    <h3 className="font-display font-semibold text-gradient-brand">
                      {category}
                    </h3>
                  </button>
                </SpotlightCard>
              );
            })}
          </StaggerContainer>
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
