import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

interface PageParams {
  slug: string;
}

interface PageProps {
  params: Promise<PageParams>;
}

// Featured blog posts data (same as services page)
const BLOG_POSTS = {
  'google-ads-mastery': {
    title: 'Google Ads Mastery: From Zero to $100k Revenue',
    excerpt: 'Complete guide to building profitable Google Ads campaigns that scale from startup to enterprise level.',
    content: {
      introduction: `After managing over $2 million in Google Ads spend across 200+ campaigns, I've identified the exact strategies that separate profitable campaigns from money-drains. This comprehensive guide covers everything you need to build, optimize, and scale Google Ads campaigns that generate real revenue.

Whether you're starting from scratch or looking to improve existing campaigns, this guide provides the frameworks, strategies, and tactics used by top-performing advertisers to achieve consistent profitability.`,
      
      sections: [
        {
          title: 'Foundation: Campaign Structure That Scales',
          content: `The biggest mistake I see advertisers make is cramming everything into single campaigns. Proper campaign structure is the foundation of scalable, profitable advertising.

**The SKAG Method Enhanced:**
Single Keyword Ad Groups (SKAGs) provide maximum control over your keywords, ad copy, and landing pages. Here's how to implement them effectively:

• **Exact Match Keywords**: Start with exact match to maintain control
• **Single Theme Ad Groups**: Group closely related keywords (2-3 max)
• **Dedicated Landing Pages**: Each ad group should have a specific landing page
• **Granular Bid Control**: Set bids based on keyword performance

**Campaign Types by Intent:**
- **Brand Campaigns**: Protect your branded traffic (Average CPC: $0.50-$2.00)
- **Competitor Campaigns**: Target competitor terms strategically
- **Generic Campaigns**: Broad category terms with careful management
- **Long-tail Campaigns**: Specific, high-intent queries (Best conversion rates)

**Real Example:**
A SaaS client increased conversions by 340% by restructuring their single campaign into 12 targeted campaigns, each with specific ad copy and landing pages tailored to user intent.`,
          actionItems: [
            'Audit your current campaign structure',
            'Separate campaigns by match type and intent',
            'Create dedicated ad groups for top-performing keywords',
            'Implement negative keyword lists to prevent overlap'
          ]
        },
        {
          title: 'Advanced Keyword Research & Strategy',
          content: `Effective keyword research goes beyond Google Keyword Planner. The real opportunities lie in data sources your competitors aren't using.

**Advanced Research Methods:**

**1. Customer Language Mining**
Analyze support tickets, sales calls, and reviews for exact language customers use. This reveals:
- Pain points in customer's own words
- Alternative product names and descriptions
- Common questions and concerns
- Buying decision factors

**2. Competitor Gap Analysis**
Use tools like SEMrush or Ahrefs to find:
- Keywords competitors rank for organically but don't advertise on
- Ad copy variations your competitors are testing
- Landing page strategies for high-value keywords
- Seasonal trends in competitor advertising

**3. YouTube & Forum Mining**
- YouTube search suggestions reveal long-tail keywords with commercial intent
- Reddit and forum discussions show problem-specific language
- Q&A sites like Quora reveal customer questions and pain points

**Search Intent Classification:**
Understanding search intent is crucial for keyword selection and campaign structure:

- **Informational**: "How to..." (Low commercial intent, good for content marketing)
- **Navigational**: Brand searches (High conversion, protect with branded campaigns)
- **Commercial Investigation**: "Best [product]" (Mid-funnel, comparison content)
- **Transactional**: "Buy," "Price," "Near me" (High commercial intent, priority keywords)

**Match Type Strategy 2025:**
Google's close variants have changed how match types work:
- **Exact Match**: Still most controlled, but broader than before
- **Phrase Match**: Now captures more variations, good for mid-volume keywords
- **Broad Match**: Powerful with Smart Bidding but requires extensive negative lists`,
          actionItems: [
            'Conduct customer interview sessions for language mining',
            'Set up competitor monitoring using SEMrush or Ahrefs',
            'Create intent-based keyword categories',
            'Build comprehensive negative keyword lists'
          ]
        },
        {
          title: 'Smart Bidding & Budget Optimization',
          content: `Smart Bidding has evolved significantly, but success requires understanding when and how to use each strategy effectively.

**Bidding Strategy Selection Framework:**

**Target CPA (Cost Per Acquisition):**
- Best for: Consistent conversion values, lead generation
- Requirements: 30+ conversions monthly
- Use when: You have a clear cost per acquisition target
- Pros: Predictable costs, good for budget planning
- Cons: May limit volume if target is too aggressive

**Target ROAS (Return on Ad Spend):**
- Best for: E-commerce with varying order values
- Requirements: Revenue tracking, 50+ conversions monthly
- Use when: Profitability is more important than volume
- Pros: Focuses on profitable traffic
- Cons: May exclude potentially profitable lower-value customers

**Maximize Conversions:**
- Best for: Lead generation with flexible budgets
- Requirements: Sufficient budget and conversion data
- Use when: Volume is priority over cost efficiency
- Pros: Maximizes conversion volume
- Cons: Less cost control

**Enhanced CPC:**
- Best for: Advertisers wanting manual control with automation assist
- Requirements: Manual bid management capability
- Use when: Testing new campaigns or specific bid control needed
- Pros: Maintains manual control with Smart Bidding benefits
- Cons: Requires more management time

**The Bidding Strategy Maturation Process:**

**Week 1-2: Learning Phase**
- Expect volatility and higher costs
- Don't make changes during this period
- Monitor for obvious issues but let the algorithm learn

**Week 3-4: Stabilization**
- Performance begins to stabilize
- Gradual improvements in efficiency
- Fine-tune with bid adjustments if needed

**Week 5+: Optimization**
- Optimal performance achieved
- Make strategic adjustments based on data
- Scale successful campaigns

**Budget Distribution Strategy:**
- **80/20 Rule**: 80% budget on proven campaigns, 20% on testing
- **Campaign Priority**: Brand > High-Intent > Broad > Testing
- **Time-of-Day Adjustments**: Analyze performance by hour and day
- **Geographic Performance**: Allocate budget based on location performance`,
          actionItems: [
            'Analyze current bidding strategy performance',
            'Test Target CPA vs Target ROAS for your goals',
            'Implement bid adjustments based on performance data',
            'Set up automated rules for budget management'
          ]
        }
      ],
      
      conclusion: `Google Ads mastery comes from understanding the balance between automation and strategic control. While Google's machine learning handles tactical optimization, your role is providing strategic direction through proper campaign structure, compelling ad copy, and clear conversion goals.

The key to reaching $100k+ in revenue is systematic scaling of what works. Start with these fundamentals, test rigorously, and scale successful elements while maintaining profitability.

Remember: every successful Google Ads account started with a single profitable campaign. Focus on getting that first campaign right, then scale methodically.`
    },
    category: 'Google Ads',
    readTime: '12 min read',
    publishDate: 'Dec 15, 2025',
    image: '🎯',
    tags: ['Google Ads', 'PPC', 'Strategy', 'Revenue Growth'],
    author: 'Amir Gomez',
    relatedPosts: ['facebook-advertising-blueprint', 'conversion-optimization-guide', 'scaling-profitable-campaigns']
  },
  
  'facebook-advertising-blueprint': {
    title: 'Facebook Advertising Blueprint for E-commerce',
    excerpt: 'Step-by-step framework for creating Facebook ad campaigns that drive sales and build customer loyalty.',
    content: {
      introduction: `Facebook advertising for e-commerce has become increasingly complex with iOS 14.5+ changes, but the opportunities are still massive. This blueprint covers the exact strategies I use to help e-commerce clients achieve 300-500% ROAS consistently.`,
      sections: [
        {
          title: 'Campaign Structure for E-commerce Success',
          content: `Proper campaign structure is crucial for e-commerce Facebook advertising. Here's the framework that consistently delivers results...`,
          actionItems: ['Set up campaign structure', 'Create audience segments', 'Design creative assets']
        }
      ],
      conclusion: `Facebook advertising success for e-commerce requires systematic testing, proper tracking, and consistent optimization based on data.`
    },
    category: 'Social Media',
    readTime: '10 min read',
    publishDate: 'Dec 12, 2025',
    image: '📱',
    tags: ['Facebook Ads', 'E-commerce', 'Social Media', 'ROAS'],
    author: 'Amir Gomez',
    relatedPosts: ['google-ads-mastery', 'conversion-optimization-guide']
  },

  'conversion-optimization-guide': {
    title: 'Conversion Rate Optimization: Double Your Sales',
    excerpt: 'Proven CRO strategies and tactics that helped 200+ businesses increase their conversion rates by 150%+.',
    content: {
      introduction: `Conversion Rate Optimization (CRO) is the highest-leverage activity in digital marketing. Small improvements in conversion rate compound dramatically over time.`,
      sections: [
        {
          title: 'CRO Fundamentals That Drive Results',
          content: `The foundation of successful CRO lies in understanding user behavior and systematic testing...`,
          actionItems: ['Conduct conversion audit', 'Implement tracking', 'Create testing roadmap']
        }
      ],
      conclusion: `CRO is a systematic process that requires patience, testing, and data-driven decisions. The results compound over time.`
    },
    category: 'Conversion',
    readTime: '15 min read',
    publishDate: 'Dec 10, 2025',
    image: '📊',
    tags: ['CRO', 'Landing Pages', 'A/B Testing', 'Optimization'],
    author: 'Amir Gomez',
    relatedPosts: ['google-ads-mastery', 'facebook-advertising-blueprint']
  }
};

export async function generateStaticParams() {
  return Object.keys(BLOG_POSTS).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS[slug as keyof typeof BLOG_POSTS];
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | Amir Gomez`,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    }
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS[slug as keyof typeof BLOG_POSTS];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-foreground/10 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              AG
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/" className="hover:text-foreground/80 transition-colors">Home</Link>
              <Link href="/services" className="hover:text-foreground/80 transition-colors">Services</Link>
              <button className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition-colors">
                Get Free Consultation
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-foreground/60">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-foreground">Services</Link>
          <span>/</span>
          <span className="text-foreground">{post.title}</span>
        </div>
      </div>

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
              {post.category}
            </span>
            <span className="text-sm text-foreground/60">{post.readTime}</span>
            <span className="text-sm text-foreground/60">•</span>
            <span className="text-sm text-foreground/60">{post.publishDate}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between border-b border-foreground/10 pb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold">AG</span>
              </div>
              <div>
                <div className="font-semibold">{post.author}</div>
                <div className="text-sm text-foreground/60">Marketing Specialist</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span 
                  key={tag}
                  className="bg-foreground/10 px-3 py-1 rounded-full text-sm text-foreground/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <div className="mb-12">
            <p className="text-lg leading-relaxed text-foreground/80">
              {post.content.introduction}
            </p>
          </div>

          {/* Sections */}
          {post.content.sections.map((section, index) => (
            <section key={index} className="mb-12">
              <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
              <div className="whitespace-pre-line text-foreground/80 leading-relaxed mb-8">
                {section.content}
              </div>
              
              {section.actionItems && (
                <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-400 p-6 mb-8">
                  <h4 className="font-semibold mb-4 text-orange-800 dark:text-orange-200">
                    🎯 Action Items:
                  </h4>
                  <ul className="space-y-2">
                    {section.actionItems.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-orange-700 dark:text-orange-300 flex items-start">
                        <span className="mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}

          {/* Conclusion */}
          <div className="bg-foreground/5 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Key Takeaways</h2>
            <p className="text-foreground/80 leading-relaxed">
              {post.content.conclusion}
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-8 text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">Ready to Implement These Strategies?</h3>
          <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
            Get personalized help implementing these {post.category.toLowerCase()} strategies for your business. 
            Free consultation includes custom recommendations and action plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors">
              Get Free Strategy Session
            </button>
            <Link 
              href="/services"
              className="border border-orange-600 text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
            >
              Explore All Services
            </Link>
          </div>
        </div>

        {/* Related Posts */}
        {post.relatedPosts && (
          <div className="border-t border-foreground/10 pt-12">
            <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {post.relatedPosts.slice(0, 2).map((relatedSlug) => {
                const relatedPost = BLOG_POSTS[relatedSlug as keyof typeof BLOG_POSTS];
                return (
                  <Link
                    key={relatedSlug}
                    href={`/services/${relatedSlug}`}
                    className="block p-6 rounded-lg border border-foreground/10 hover:border-orange-600/20 hover:bg-foreground/5 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{relatedPost.image}</span>
                      <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 px-2 py-1 rounded text-xs">
                        {relatedPost.category}
                      </span>
                    </div>
                    <h4 className="font-bold mb-2">{relatedPost.title}</h4>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {relatedPost.excerpt}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}