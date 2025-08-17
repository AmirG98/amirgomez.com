import Link from 'next/link';
import type { Metadata } from 'next';
import { blogPosts, blogCategories, getFeaturedPosts } from '@/data/blog-posts';

export const metadata: Metadata = {
  title: 'Marketing Blog - Digital Marketing Insights & Strategies | Amir Gomez',
  description: 'Expert digital marketing insights, strategies, and case studies. Learn Google Ads, Facebook advertising, email marketing, and conversion optimization.',
  keywords: [
    'digital marketing blog',
    'marketing strategies',
    'google ads',
    'facebook advertising',
    'email marketing',
    'conversion optimization',
    'marketing insights'
  ],
  openGraph: {
    title: 'Marketing Blog - Digital Marketing Insights & Strategies',
    description: 'Expert digital marketing insights, strategies, and case studies from Amir Gomez.',
    type: 'website',
  }
};

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
          {/* Featured badge */}
          {featured && (
            <div className="bg-orange-600 text-white px-4 py-2 text-sm font-semibold">
              Featured Article
            </div>
          )}
          
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
  const featuredPosts = getFeaturedPosts();
  const recentPosts = blogPosts.filter(post => !post.featured).slice(0, 6);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-foreground/10 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              Amir Gomez
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/" className="hover:text-foreground/80 transition-colors">Home</Link>
              <Link href="/about" className="hover:text-foreground/80 transition-colors">About</Link>
              <Link href="/services" className="hover:text-foreground/80 transition-colors">Services</Link>
              <Link href="/case-studies" className="hover:text-foreground/80 transition-colors">Case Studies</Link>
              <Link href="/blog" className="text-orange-600 font-semibold">Blog</Link>
              <Link href="/contact" className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition-colors">
                Get Consultation
              </Link>
            </div>
          </div>
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
            Proven strategies, real case studies, and actionable tactics from managing $2M+ in ad spend across 200+ campaigns.
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

      {/* Recent Posts */}
      <section className="container mx-auto px-4 mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Latest Articles</h2>
          <div className="text-foreground/60 text-sm">
            Showing {blogPosts.length} articles
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
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
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                Subscribe
              </button>
            </div>
            
            <p className="text-sm text-foreground/60 mt-4">
              No spam. Unsubscribe anytime. 📧 ✨
            </p>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Browse by Category</h2>
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
                  {categoryPosts.length} article{categoryPosts.length !== 1 ? 's' : ''}
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
              <p className="text-foreground/60">Digital Marketing Specialist</p>
            </div>
            <div className="flex space-x-6">
              <Link href="https://linkedin.com/in/amirgomez" className="text-foreground/60 hover:text-foreground transition-colors">LinkedIn</Link>
              <Link href="mailto:amir@amirgomez.com" className="text-foreground/60 hover:text-foreground transition-colors">Email</Link>
            </div>
          </div>
          <div className="border-t border-foreground/10 mt-8 pt-8 text-center text-foreground/60">
            <p>&copy; 2024 Amir Gomez. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}