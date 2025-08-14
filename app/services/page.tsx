import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marketing Services & Insights | Amir Gomez',
  description: 'Explore my marketing services and read expert insights on digital advertising, conversion optimization, and growth strategies.',
  keywords: ['marketing services', 'digital advertising', 'conversion optimization', 'marketing insights', 'business growth'],
};

// Featured blog posts (manually curated, not programmatic)
const FEATURED_POSTS = [
  {
    id: 'google-ads-mastery',
    title: 'Google Ads Mastery: From Zero to $100k Revenue',
    excerpt: 'Complete guide to building profitable Google Ads campaigns that scale from startup to enterprise level.',
    category: 'Google Ads',
    readTime: '12 min read',
    publishDate: 'Dec 15, 2024',
    image: '🎯',
    featured: true,
    tags: ['Google Ads', 'PPC', 'Strategy']
  },
  {
    id: 'facebook-advertising-blueprint',
    title: 'Facebook Advertising Blueprint for E-commerce',
    excerpt: 'Step-by-step framework for creating Facebook ad campaigns that drive sales and build customer loyalty.',
    category: 'Social Media',
    readTime: '10 min read',
    publishDate: 'Dec 12, 2024',
    image: '📱',
    featured: true,
    tags: ['Facebook Ads', 'E-commerce', 'Social Media']
  },
  {
    id: 'conversion-optimization-guide',
    title: 'Conversion Rate Optimization: Double Your Sales',
    excerpt: 'Proven CRO strategies and tactics that helped 200+ businesses increase their conversion rates by 150%+.',
    category: 'Conversion',
    readTime: '15 min read',
    publishDate: 'Dec 10, 2024',
    image: '📊',
    featured: true,
    tags: ['CRO', 'Landing Pages', 'A/B Testing']
  },
  {
    id: 'email-marketing-automation',
    title: 'Email Marketing Automation That Converts',
    excerpt: 'Build email sequences that nurture leads and turn subscribers into paying customers automatically.',
    category: 'Email Marketing',
    readTime: '8 min read',
    publishDate: 'Dec 8, 2024',
    image: '📧',
    featured: true,
    tags: ['Email Marketing', 'Automation', 'Lead Nurturing']
  },
  {
    id: 'analytics-setup-guide',
    title: 'Marketing Analytics Setup for Beginners',
    excerpt: 'Everything you need to track, measure, and optimize your marketing campaigns for maximum ROI.',
    category: 'Analytics',
    readTime: '11 min read',
    publishDate: 'Dec 5, 2024',
    image: '🔍',
    featured: true,
    tags: ['Analytics', 'Tracking', 'ROI']
  },
  {
    id: 'scaling-profitable-campaigns',
    title: 'How to Scale Profitable Ad Campaigns',
    excerpt: 'Advanced strategies for scaling successful campaigns without losing profitability or performance.',
    category: 'Strategy',
    readTime: '14 min read',
    publishDate: 'Dec 3, 2024',
    image: '🚀',
    featured: true,
    tags: ['Scaling', 'Campaign Management', 'Growth']
  }
];

const CATEGORIES = [
  'All Services',
  'Google Ads',
  'Social Media',
  'Conversion',
  'Email Marketing',
  'Analytics',
  'Strategy'
];

export default function ServicesPage() {
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
              <Link href="/services" className="text-orange-600 font-semibold">Services</Link>
              <button className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition-colors">
                Get Free Consultation
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Marketing Services & 
            <span className="text-orange-600"> Expert Insights</span>
          </h1>
          <p className="text-xl text-foreground/80 mb-8 max-w-3xl mx-auto">
            Comprehensive marketing services backed by proven strategies and real results. 
            Learn from case studies, tutorials, and insights from $2M+ in managed ad spend.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors">
              Start Your Campaign
            </button>
            <button className="border border-foreground/20 px-8 py-3 rounded-full font-semibold hover:bg-foreground/5 transition-colors">
              Browse All Insights
            </button>
          </div>
        </div>
      </section>

      {/* Featured Services Overview */}
      <section className="bg-foreground/5 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Marketing Services</h2>
            <p className="text-foreground/80 max-w-2xl mx-auto">
              End-to-end marketing solutions designed to grow your business with measurable results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-background rounded-lg p-6 text-center shadow-sm">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3">Paid Advertising</h3>
              <p className="text-foreground/80 text-sm mb-4">
                Google Ads, Facebook, Instagram, LinkedIn campaigns that drive qualified leads and sales
              </p>
              <span className="text-orange-600 font-semibold">From $2,500/month</span>
            </div>

            <div className="bg-background rounded-lg p-6 text-center shadow-sm">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3">Conversion Optimization</h3>
              <p className="text-foreground/80 text-sm mb-4">
                Landing page optimization, A/B testing, and CRO strategies to maximize ROI
              </p>
              <span className="text-orange-600 font-semibold">From $1,500/month</span>
            </div>

            <div className="bg-background rounded-lg p-6 text-center shadow-sm">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-3">Marketing Strategy</h3>
              <p className="text-foreground/80 text-sm mb-4">
                Custom marketing strategies, competitive analysis, and growth planning
              </p>
              <span className="text-orange-600 font-semibold">From $3,000/project</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full border transition-colors ${
                  category === 'All Services'
                    ? 'bg-orange-600 text-white border-orange-600'
                    : 'border-foreground/20 hover:border-orange-600 hover:text-orange-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Insights */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Marketing Insights</h2>
            <p className="text-foreground/80 max-w-2xl mx-auto">
              In-depth guides, case studies, and strategies from real campaigns and results
            </p>
          </div>

          {/* Featured Post (Large) */}
          <div className="mb-12">
            <Link 
              href={`/services/${FEATURED_POSTS[0].id}`}
              className="block bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="md:flex">
                <div className="md:w-1/3 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center p-12">
                  <div className="text-8xl">{FEATURED_POSTS[0].image}</div>
                </div>
                <div className="md:w-2/3 p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                      {FEATURED_POSTS[0].category}
                    </span>
                    <span className="text-sm text-foreground/60">{FEATURED_POSTS[0].readTime}</span>
                    <span className="text-sm text-foreground/60">{FEATURED_POSTS[0].publishDate}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-orange-600 transition-colors">
                    {FEATURED_POSTS[0].title}
                  </h3>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    {FEATURED_POSTS[0].excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {FEATURED_POSTS[0].tags.map((tag) => (
                      <span 
                        key={tag}
                        className="bg-foreground/10 px-3 py-1 rounded-full text-sm text-foreground/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Grid Posts */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_POSTS.slice(1).map((post) => (
              <Link
                key={post.id}
                href={`/services/${post.id}`}
                className="block bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-8 text-center">
                  <div className="text-5xl">{post.image}</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 px-2 py-1 rounded text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-xs text-foreground/60">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3 group-hover:text-orange-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-foreground/80 text-sm mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span 
                        key={tag}
                        className="bg-foreground/10 px-2 py-1 rounded text-xs text-foreground/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More / Newsletter */}
          <div className="text-center mt-12">
            <div className="bg-foreground/5 rounded-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold mb-4">Get Marketing Insights Weekly</h3>
              <p className="text-foreground/80 mb-6">
                Join 1,000+ marketers getting actionable strategies, case studies, and growth tips delivered every Tuesday.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="your-email@company.com"
                  className="flex-1 px-4 py-3 rounded-lg border border-foreground/20 bg-background"
                />
                <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                  Subscribe Free
                </button>
              </div>
              <p className="text-xs text-foreground/60 mt-3">
                No spam. Unsubscribe anytime. Used by marketers at Google, Meta, and 500+ startups.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}