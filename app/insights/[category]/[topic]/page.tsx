import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

interface PageParams {
  category: string;
  topic: string;
}

interface PageProps {
  params: Promise<PageParams>;
}

// Programmatic content structure (SEO-focused, not featured)
const SEO_CATEGORIES = [
  'digital-marketing',
  'social-media',
  'email-marketing',
  'content-marketing',
  'seo-optimization',
  'ppc-advertising',
  'analytics',
  'automation'
];

const TOPIC_DATA = {
  'digital-marketing': [
    'strategy-guide', 'roi-optimization', 'budget-planning', 'channel-selection',
    'performance-tracking', 'competitor-analysis', 'market-research', 'campaign-setup'
  ],
  'social-media': [
    'facebook-advertising', 'instagram-marketing', 'linkedin-b2b', 'twitter-engagement',
    'tiktok-strategy', 'youtube-marketing', 'content-creation', 'influencer-marketing'
  ],
  'email-marketing': [
    'automation-setup', 'list-building', 'segmentation', 'personalization',
    'deliverability', 'design-optimization', 'testing-strategies', 'retention-campaigns'
  ],
  'content-marketing': [
    'blog-strategy', 'video-marketing', 'podcast-growth', 'seo-content',
    'content-calendar', 'distribution-channels', 'engagement-tactics', 'repurposing'
  ],
  'seo-optimization': [
    'keyword-research', 'on-page-seo', 'technical-seo', 'link-building',
    'local-seo', 'mobile-optimization', 'site-speed', 'content-optimization'
  ],
  'ppc-advertising': [
    'google-ads-setup', 'facebook-ads-optimization', 'bid-management', 'ad-copy-testing',
    'landing-page-optimization', 'conversion-tracking', 'audience-targeting', 'budget-optimization'
  ]
};

// Generate content based on category and topic
const generateContent = (category: string, topic: string) => {
  const categoryName = category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  const topicName = topic.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return {
    title: `${topicName} for ${categoryName}: Complete Guide`,
    description: `Comprehensive guide to ${topic.replace('-', ' ')} in ${category.replace('-', ' ')}. Expert strategies, tools, and implementation tips.`,
    introduction: `Master ${topic.replace('-', ' ')} with this comprehensive guide covering strategy, implementation, and optimization techniques used by successful marketers.`,
    sections: [
      {
        title: `Understanding ${topicName}`,
        content: `${topicName} is a crucial component of modern ${category.replace('-', ' ')} strategies. This section covers the fundamentals and why it matters for your business growth.`
      },
      {
        title: `Implementation Strategy`,
        content: `Step-by-step approach to implementing ${topic.replace('-', ' ')} effectively. Learn the proven methods and avoid common pitfalls.`
      },
      {
        title: `Optimization Techniques`,
        content: `Advanced optimization strategies to maximize results from your ${topic.replace('-', ' ')} efforts. Data-driven approaches for continuous improvement.`
      },
      {
        title: `Measuring Success`,
        content: `Key metrics and KPIs to track for ${topic.replace('-', ' ')}. Learn how to measure ROI and optimize based on performance data.`
      }
    ]
  };
};

export async function generateStaticParams() {
  const params = [];
  for (const [category, topics] of Object.entries(TOPIC_DATA)) {
    for (const topic of topics) {
      params.push({ category, topic });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, topic } = await params;
  
  if (!SEO_CATEGORIES.includes(category) || 
      !TOPIC_DATA[category as keyof typeof TOPIC_DATA]?.includes(topic)) {
    return { title: 'Page Not Found' };
  }

  const content = generateContent(category, topic);

  return {
    title: `${content.title} | Marketing Insights`,
    description: content.description,
    keywords: [
      category.replace('-', ' '),
      topic.replace('-', ' '),
      'marketing strategy',
      'digital marketing',
      'business growth'
    ],
    openGraph: {
      title: content.title,
      description: content.description,
      type: 'article',
    }
  };
}

export default async function InsightPage({ params }: PageProps) {
  const { category, topic } = await params;

  if (!SEO_CATEGORIES.includes(category) || 
      !TOPIC_DATA[category as keyof typeof TOPIC_DATA]?.includes(topic)) {
    notFound();
  }

  const content = generateContent(category, topic);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Simple Navigation */}
      <nav className="border-b border-foreground/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              Amir Gomez
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/" className="hover:text-foreground/80 transition-colors">Home</Link>
              <Link href="/services" className="hover:text-foreground/80 transition-colors">Services</Link>
              <button className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition-colors">
                Get Consultation
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
          <span className="hover:text-foreground">Insights</span>
          <span>/</span>
          <span className="hover:text-foreground capitalize">{category.replace('-', ' ')}</span>
          <span>/</span>
          <span className="text-foreground capitalize">{topic.replace('-', ' ')}</span>
        </div>
      </div>

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 px-3 py-1 rounded-full text-sm font-medium capitalize">
              {category.replace('-', ' ')}
            </span>
            <span className="text-sm text-foreground/60">Expert Guide</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {content.title}
          </h1>
          
          <p className="text-xl text-foreground/80 mb-8">
            {content.description}
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="mb-8">
            <p className="text-lg text-foreground/80 leading-relaxed">
              {content.introduction}
            </p>
          </div>

          {content.sections.map((section, index) => (
            <section key={index} className="mb-10">
              <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
              <p className="text-foreground/80 leading-relaxed mb-6">
                {section.content}
              </p>
              <div className="bg-foreground/5 rounded-lg p-6">
                <p className="text-foreground/70 italic">
                  [This section would contain detailed strategies, step-by-step instructions, 
                  and practical examples for {topic.replace('-', ' ')} in {category.replace('-', ' ')}.]
                </p>
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-orange-50 dark:bg-orange-900/20 rounded-lg p-8 text-center">
          <h3 className="text-xl font-bold mb-4">
            Need Help with {topic.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}?
          </h3>
          <p className="text-foreground/80 mb-6">
            Get personalized guidance and implementation support for your {category.replace('-', ' ')} strategy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors">
              Schedule Consultation
            </button>
            <Link 
              href="/services"
              className="border border-orange-600 text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}