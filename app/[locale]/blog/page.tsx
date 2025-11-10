'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { blogPosts, blogCategories, getFeaturedPosts } from '@/data/blog-posts';
import { getTranslations, type Locale } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useFormModal } from '@/components/useFormModal';
import MultiStepForm from '@/components/MultiStepForm';

interface BlogPageProps {
  params: Promise<{ locale: Locale }>
}

function formatDate(dateString: string, locale: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function BlogPostCard({ post, featured = false, locale, t }: { 
  post: typeof blogPosts[0], 
  featured?: boolean, 
  locale: Locale,
  t: any 
}) {
  return (
    <article className={`group ${featured ? 'md:col-span-2' : ''}`}>
      <Link href={locale === 'en' ? `/blog/${post.slug}` : `/${locale}/blog/${post.slug}`}>
        <div className="bg-background rounded-xl border border-foreground/10 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-orange-500/20">
          {featured && (
            <div className="bg-orange-600 text-white px-4 py-2 text-sm font-semibold">
              {t.common.featuredArticle}
            </div>
          )}
          
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <span className="text-sm text-foreground/60">
                {post.readingTime} {t.common.minRead}
              </span>
            </div>

            <h2 className={`font-bold mb-3 group-hover:text-orange-600 transition-colors ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
              {post.title}
            </h2>

            <p className="text-foreground/80 mb-4 leading-relaxed">
              {post.excerpt}
            </p>

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
                  <div className="text-sm text-foreground/60">
                    {formatDate(post.publishedAt, locale)} • {post.readingTime} {t.common.minRead}
                  </div>
                </div>
              </div>
              
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

export default function BlogPage({ params }: BlogPageProps) {
  const [translations, setTranslations] = useState<any>(null);
  const [locale, setLocale] = useState<Locale | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isOpen, currentVariant, openForm, closeForm, handleSubmit } = useFormModal(locale || 'en');

  useEffect(() => {
    const loadParams = async () => {
      const { locale: paramLocale } = await params;
      setLocale(paramLocale);
      const t = getTranslations(paramLocale);
      setTranslations(t);
    };
    loadParams();
  }, [params]);

  if (!translations || !locale) {
    return <div>Loading...</div>;
  }

  const t = translations;
  const featuredPosts = getFeaturedPosts();
  const recentPosts = blogPosts.filter(post => !post.featured).slice(0, 6);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-foreground/10 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href={locale === 'en' ? '/' : `/${locale}`} className="text-xl font-bold">
              AG
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href={locale === 'en' ? '/' : `/${locale}`} className="hover:text-foreground/80 transition-colors">{t.nav.home}</Link>
              <Link href={locale === 'en' ? '/about' : `/${locale}/about`} className="hover:text-foreground/80 transition-colors">{t.nav.about}</Link>
              <Link href={locale === 'en' ? '/services' : `/${locale}/services`} className="hover:text-foreground/80 transition-colors">{t.nav.services}</Link>
              <Link href={locale === 'en' ? '/blog' : `/${locale}/blog`} className="text-orange-600 font-semibold">{t.nav.blog}</Link>
              <Link href={locale === 'en' ? '/contact' : `/${locale}/contact`} className="hover:text-foreground/80 transition-colors">{t.nav.contact}</Link>
              <LanguageSwitcher currentLocale={locale} />
              <button 
                onClick={() => openForm('consultation')}
                className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition-colors"
              >
                {t.nav.getConsultation}
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-4">
              <LanguageSwitcher currentLocale={locale} />
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
                <Link href={locale === 'en' ? '/' : `/${locale}`} className="block py-2 hover:text-orange-600 transition-colors">{t.nav.home}</Link>
                <Link href={locale === 'en' ? '/about' : `/${locale}/about`} className="block py-2 hover:text-orange-600 transition-colors">{t.nav.about}</Link>
                <Link href={locale === 'en' ? '/services' : `/${locale}/services`} className="block py-2 hover:text-orange-600 transition-colors">{t.nav.services}</Link>
                <Link href={locale === 'en' ? '/blog' : `/${locale}/blog`} className="block py-2 text-orange-600 font-semibold">{t.nav.blog}</Link>
                <Link href={locale === 'en' ? '/contact' : `/${locale}/contact`} className="block py-2 hover:text-orange-600 transition-colors">{t.nav.contact}</Link>
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
            {t.blog.hero.title}
            <span className="text-orange-600"> {t.blog.hero.titleHighlight}</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t.blog.hero.subtitle}
          </p>
          
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {blogCategories.slice(0, 6).map((category) => (
              <button 
                key={category}
                className="bg-foreground/5 hover:bg-orange-100 dark:hover:bg-orange-900/30 px-4 py-2 rounded-full text-sm font-medium transition-colors hover:text-orange-600"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="container mx-auto px-4 mb-16">
          <h2 className="text-3xl font-bold mb-8">{t.common.featuredArticle}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <BlogPostCard 
                key={post.id} 
                post={post} 
                featured={index === 0}
                locale={locale}
                t={t}
              />
            ))}
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="container mx-auto px-4 mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">{t.common.latestArticles}</h2>
          <div className="text-foreground/60 text-sm">
            {t.blog.categories.showing.replace('{count}', blogPosts.length.toString())}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <BlogPostCard 
              key={post.id} 
              post={post} 
              locale={locale}
              t={t}
            />
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-foreground/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              {t.blog.newsletter.title}
            </h3>
            <p className="text-xl text-foreground/80 mb-8">
              {t.blog.newsletter.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder={t.blog.newsletter.placeholder}
                className="flex-1 px-4 py-3 rounded-lg border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                {t.blog.newsletter.button}
              </button>
            </div>
            
            <p className="text-sm text-foreground/60 mt-4">
              {t.blog.newsletter.privacy}
            </p>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">{t.blog.categories.title}</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {blogCategories.map((category) => {
            const categoryPosts = blogPosts.filter(post => post.category === category);
            return (
              <div 
                key={category}
                className="bg-background border border-foreground/10 rounded-lg p-6"
              >
                <h3 className="font-semibold mb-2 text-orange-600">
                  {category}
                </h3>
                <p className="text-sm text-foreground/60">
                  {categoryPosts.length} {categoryPosts.length === 1 ? 'artículo' : 'artículos'}
                </p>
              </div>
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
          locale={locale}
        />
      )}
    </div>
  );
}