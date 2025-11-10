'use client';

import Link from 'next/link';
import { useState } from 'react';
import { blogPosts, blogCategories, getFeaturedPosts } from '@/data/blog-posts';
import { getTranslations } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useFormModal } from '@/components/useFormModal';
import MultiStepForm from '@/components/MultiStepForm';

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
    <article className={`group ${featured ? 'md:col-span-2' : ''}`}>
      <Link href={`/blog/${post.slug}`}>
        <div className="bg-background rounded-xl border border-foreground/10 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-orange-500/20">
          {/* Featured Image */}
          <div className="relative overflow-hidden aspect-[16/9] bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30">
            <img 
              src={post.featuredImage || 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=450&fit=crop&auto=format'} 
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Featured badge */}
            {featured && (
              <div className="absolute top-4 left-4 bg-orange-600 text-white px-4 py-2 text-sm font-semibold rounded-lg">
                Featured Article
              </div>
            )}
          </div>
          
          <div className="p-6">
            {/* Category and reading time */}
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <span className="text-sm text-foreground/60">
                {post.readingTime} min read
              </span>
            </div>

            {/* Title */}
            <h2 className={`font-bold mb-3 group-hover:text-orange-600 transition-colors ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="text-foreground/80 mb-4 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author and date */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-100 dark:border-orange-900/30">
                  <img 
                    src="/amir-profile.jpg" 
                    alt={post.author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-sm">{post.author.name}</div>
                  <div className="text-sm text-foreground/60">{formatDate(post.publishedAt)} • {post.readingTime} min read</div>
                </div>
              </div>
              
              {/* Tags */}
              <div className="flex gap-2">
                {post.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-xs bg-foreground/5 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
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

  return (
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
              <Link href="/blog" className="text-orange-600 font-semibold">{t.nav.blog}</Link>
              <Link href="/contact" className="hover:text-foreground/80 transition-colors">{t.nav.contact}</Link>
              <LanguageSwitcher currentLocale="en" />
              <button 
                onClick={() => openForm('consultation')}
                className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition-colors"
              >
                {t.nav.getConsultation}
              </button>
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
                <Link href="/blog" className="block py-2 text-orange-600 font-semibold">{t.nav.blog}</Link>
                <Link href="/contact" className="block py-2 hover:text-orange-600 transition-colors">{t.nav.contact}</Link>
                <div className="pt-4 border-t border-foreground/10">
                  <button 
                    onClick={() => {
                      openForm('consultation');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors"
                  >
                    {t.nav.getConsultation}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Marketing Insights That 
            <span className="text-orange-600"> Drive Results</span>
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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-orange-600 text-white' 
                      : 'bg-foreground/5 hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:text-orange-600'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="container mx-auto px-4 mb-16">
          <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <BlogPostCard 
                key={post.id} 
                post={post} 
                featured={index === 0}
              />
            ))}
          </div>
        </section>
      )}

      {/* Filtered Posts */}
      <section className="container mx-auto px-4 mb-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">
            {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
          </h2>
        </div>
        
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-foreground/60 text-lg mb-4">
              No articles found in the "{selectedCategory}" category.
            </div>
            <button 
              onClick={() => setSelectedCategory('All')}
              className="bg-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors"
            >
              View All Articles
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* Newsletter Signup */}
      <section className="bg-foreground/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              Get Weekly Marketing Insights
            </h3>
            <p className="text-xl text-foreground/80 mb-8">
              Join 5,000+ marketers getting actionable strategies, case studies, and industry insights delivered every Tuesday.
            </p>
            
            {subscriptionStatus === 'success' ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                <div className="text-green-600 text-xl mb-2">🎉 Success!</div>
                <p className="text-green-700 dark:text-green-300">
                  Thanks for subscribing! You'll receive our first newsletter this Tuesday.
                </p>
                <button 
                  onClick={() => setSubscriptionStatus('idle')}
                  className="text-green-600 hover:text-green-700 font-semibold mt-2"
                >
                  Subscribe another email →
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
                    className="flex-1 px-4 py-3 rounded-lg border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:bg-orange-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </div>
                
                {subscriptionStatus === 'error' && (
                  <p className="text-red-600 text-sm mt-2">
                    {errorMessage || 'Something went wrong. Please try again.'}
                  </p>
                )}
                
                <p className="text-sm text-foreground/60 mt-4">
                  No spam. Unsubscribe anytime. 📧 ✨
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Browse by Category</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {allCategories.map((category) => {
            const isActive = selectedCategory === category;
            
            return (
              <button 
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`bg-background border rounded-lg p-6 text-left transition-all duration-200 hover:shadow-lg ${
                  isActive 
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' 
                    : 'border-foreground/10 hover:border-orange-300'
                }`}
              >
                <h3 className="font-semibold text-orange-600">
                  {category}
                </h3>
              </button>
            );
          })}
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
  );
}