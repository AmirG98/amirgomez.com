import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PageParams {
  category: string;
  topic: string;
}

interface PageProps {
  params: Promise<PageParams>;
}

// Valid categories and topics for SEO
const VALID_CATEGORIES = [
  'web-development',
  'javascript',
  'react',
  'nextjs',
  'typescript',
  'career',
  'freelancing',
  'tutorials'
];

const BLOG_DATA = {
  'web-development': {
    name: 'Web Development',
    description: 'Modern web development techniques and best practices',
    topics: [
      'best-practices',
      'performance-optimization',
      'accessibility',
      'modern-frameworks',
      'responsive-design'
    ]
  },
  'javascript': {
    name: 'JavaScript',
    description: 'JavaScript fundamentals and advanced concepts',
    topics: [
      'es6-features',
      'async-programming',
      'dom-manipulation',
      'testing-strategies',
      'performance-tips'
    ]
  },
  'react': {
    name: 'React',
    description: 'React development patterns and techniques',
    topics: [
      'hooks-guide',
      'state-management',
      'component-patterns',
      'testing-react',
      'performance-optimization'
    ]
  },
  'nextjs': {
    name: 'Next.js',
    description: 'Next.js framework tips and tutorials',
    topics: [
      'app-router-guide',
      'server-components',
      'static-generation',
      'api-routes',
      'deployment-strategies'
    ]
  },
  'typescript': {
    name: 'TypeScript',
    description: 'TypeScript best practices and patterns',
    topics: [
      'getting-started',
      'advanced-types',
      'generics-guide',
      'migration-strategies',
      'tooling-setup'
    ]
  },
  'career': {
    name: 'Career Development',
    description: 'Professional growth and career advice for developers',
    topics: [
      'skill-development',
      'portfolio-building',
      'interview-preparation',
      'networking-tips',
      'salary-negotiation'
    ]
  },
  'freelancing': {
    name: 'Freelancing',
    description: 'Tips and strategies for successful freelancing',
    topics: [
      'getting-started',
      'client-management',
      'pricing-strategies',
      'project-management',
      'business-development'
    ]
  },
  'tutorials': {
    name: 'Tutorials',
    description: 'Step-by-step coding tutorials and guides',
    topics: [
      'beginner-projects',
      'advanced-concepts',
      'tool-comparisons',
      'setup-guides',
      'troubleshooting'
    ]
  }
};

// Content generation based on category and topic
const generateContent = (category: string, topic: string) => {
  const categoryData = BLOG_DATA[category as keyof typeof BLOG_DATA];
  const topicTitle = topic.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return {
    title: `${topicTitle} in ${categoryData.name}`,
    intro: `A comprehensive guide to ${topic.replace(/-/g, ' ')} in ${categoryData.name.toLowerCase()}.`,
    sections: [
      {
        title: 'Introduction',
        content: `Understanding ${topic.replace(/-/g, ' ')} is crucial for modern ${categoryData.name.toLowerCase()} development.`
      },
      {
        title: 'Key Concepts',
        content: `Let's explore the fundamental concepts behind ${topic.replace(/-/g, ' ')}.`
      },
      {
        title: 'Best Practices',
        content: `Here are the industry best practices for implementing ${topic.replace(/-/g, ' ')}.`
      },
      {
        title: 'Common Pitfalls',
        content: `Avoid these common mistakes when working with ${topic.replace(/-/g, ' ')}.`
      },
      {
        title: 'Conclusion',
        content: `${topicTitle} is an essential skill for ${categoryData.name.toLowerCase()} developers.`
      }
    ]
  };
};

export async function generateStaticParams() {
  const params = [];
  
  for (const [category, data] of Object.entries(BLOG_DATA)) {
    for (const topic of data.topics) {
      params.push({ category, topic });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, topic } = await params;
  
  if (!VALID_CATEGORIES.includes(category) || 
      !BLOG_DATA[category as keyof typeof BLOG_DATA]?.topics.includes(topic)) {
    return {
      title: 'Page Not Found'
    };
  }

  const categoryData = BLOG_DATA[category as keyof typeof BLOG_DATA];
  const content = generateContent(category, topic);

  const title = `${content.title} | Amir Gomez Blog`;
  const description = `${content.intro} Learn ${categoryData.name.toLowerCase()} with practical examples and expert insights.`;

  return {
    title,
    description,
    keywords: [
      category,
      topic.replace(/-/g, ' '),
      categoryData.name.toLowerCase(),
      'tutorial',
      'guide',
      'development'
    ],
    openGraph: {
      title,
      description,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    }
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { category, topic } = await params;

  // Validate params
  if (!VALID_CATEGORIES.includes(category) || 
      !BLOG_DATA[category as keyof typeof BLOG_DATA]?.topics.includes(topic)) {
    notFound();
  }

  const categoryData = BLOG_DATA[category as keyof typeof BLOG_DATA];
  const content = generateContent(category, topic);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        <article className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-foreground/60">
              <a href="/blog" className="hover:text-foreground">Blog</a>
              <span>/</span>
              <a href={`/blog/${category}`} className="hover:text-foreground capitalize">
                {categoryData.name}
              </a>
              <span>/</span>
              <span className="text-foreground">{topic.replace(/-/g, ' ')}</span>
            </div>
          </nav>

          {/* Article Header */}
          <header className="mb-12">
            <div className="mb-4">
              <span className="bg-foreground/10 text-foreground px-3 py-1 rounded-full text-sm font-medium">
                {categoryData.name}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {content.title}
            </h1>
            <p className="text-xl text-foreground/80 mb-6">
              {content.intro}
            </p>
            <div className="flex items-center text-sm text-foreground/60">
              <span>By Amir Gomez</span>
              <span className="mx-2">•</span>
              <span>5 min read</span>
              <span className="mx-2">•</span>
              <time>Updated recently</time>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {content.sections.map((section, index) => (
              <section key={index} className="mb-10">
                <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                <p className="text-foreground/80 leading-relaxed mb-6">
                  {section.content}
                </p>
                {/* Add placeholder for more detailed content */}
                <div className="bg-foreground/5 rounded-lg p-6 mb-6">
                  <p className="text-foreground/70 italic">
                    [This section would contain detailed explanations, code examples, 
                    and practical insights about {topic.replace(/-/g, ' ')} in {categoryData.name.toLowerCase()}.]
                  </p>
                </div>
              </section>
            ))}
          </div>

          {/* Related Topics */}
          <div className="mt-16 pt-8 border-t border-foreground/10">
            <h3 className="text-xl font-bold mb-6">Related Topics</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {categoryData.topics
                .filter(t => t !== topic)
                .slice(0, 4)
                .map((relatedTopic) => (
                <a
                  key={relatedTopic}
                  href={`/blog/${category}/${relatedTopic}`}
                  className="block p-4 rounded-lg border border-foreground/10 hover:border-foreground/20 transition-colors"
                >
                  <h4 className="font-semibold mb-2 capitalize">
                    {relatedTopic.replace(/-/g, ' ')}
                  </h4>
                  <p className="text-sm text-foreground/60">
                    Learn about {relatedTopic.replace(/-/g, ' ')} in {categoryData.name.toLowerCase()}
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 bg-foreground/5 rounded-lg p-8 text-center">
            <h3 className="text-xl font-bold mb-4">Need Help with {categoryData.name}?</h3>
            <p className="text-foreground/80 mb-6">
              Get personalized guidance and hands-on help with your {categoryData.name.toLowerCase()} projects.
            </p>
            <button className="bg-foreground text-background px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
              Schedule a Consultation
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}