import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Development Blog | Tutorials, Tips & Industry Insights | Amir Gomez',
  description: 'Expert web development tutorials, JavaScript guides, React tips, and industry insights. Stay updated with modern development practices.',
  keywords: ['web development blog', 'JavaScript tutorials', 'React guides', 'Next.js tips', 'programming tutorials'],
};

const BLOG_CATEGORIES = [
  {
    id: 'web-development',
    name: 'Web Development',
    description: 'Modern web development techniques and best practices',
    icon: '🌐',
    postCount: 5,
    featured: [
      { topic: 'best-practices', title: 'Web Development Best Practices' },
      { topic: 'performance-optimization', title: 'Performance Optimization Guide' }
    ]
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'JavaScript fundamentals and advanced concepts',
    icon: '⚡',
    postCount: 5,
    featured: [
      { topic: 'es6-features', title: 'ES6 Features Every Developer Should Know' },
      { topic: 'async-programming', title: 'Mastering Async Programming' }
    ]
  },
  {
    id: 'react',
    name: 'React',
    description: 'React development patterns and techniques',
    icon: '⚛️',
    postCount: 5,
    featured: [
      { topic: 'hooks-guide', title: 'Complete Guide to React Hooks' },
      { topic: 'state-management', title: 'React State Management Strategies' }
    ]
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    description: 'Next.js framework tips and tutorials',
    icon: '▲',
    postCount: 5,
    featured: [
      { topic: 'app-router-guide', title: 'Next.js App Router Complete Guide' },
      { topic: 'server-components', title: 'Understanding Server Components' }
    ]
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    description: 'TypeScript best practices and patterns',
    icon: '🔷',
    postCount: 5,
    featured: [
      { topic: 'getting-started', title: 'Getting Started with TypeScript' },
      { topic: 'advanced-types', title: 'Advanced TypeScript Types' }
    ]
  },
  {
    id: 'career',
    name: 'Career Development',
    description: 'Professional growth and career advice for developers',
    icon: '📈',
    postCount: 5,
    featured: [
      { topic: 'skill-development', title: 'Essential Skills for Modern Developers' },
      { topic: 'portfolio-building', title: 'Building a Standout Developer Portfolio' }
    ]
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Development Blog
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Tutorials, tips, and insights on modern web development. 
            Learn JavaScript, React, Next.js, and advance your developer career.
          </p>
        </div>

        {/* Featured Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {BLOG_CATEGORIES.map((category) => (
            <div key={category.id} className="border border-foreground/10 rounded-lg p-6 hover:border-foreground/20 transition-colors">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{category.icon}</span>
                <div>
                  <h3 className="text-xl font-bold">{category.name}</h3>
                  <span className="text-sm text-foreground/60">{category.postCount} posts</span>
                </div>
              </div>
              <p className="text-foreground/80 mb-6">{category.description}</p>
              
              {/* Featured Posts */}
              <div className="space-y-2 mb-4">
                <h4 className="font-semibold text-sm">Featured Posts:</h4>
                {category.featured.map((post) => (
                  <Link 
                    key={post.topic}
                    href={`/blog/${category.id}/${post.topic}`}
                    className="block text-sm text-foreground/70 hover:text-foreground transition-colors"
                  >
                    • {post.title}
                  </Link>
                ))}
              </div>
              
              <Link 
                href={`/blog/${category.id}/${category.featured[0].topic}`}
                className="inline-block bg-foreground text-background px-4 py-2 rounded-full text-sm hover:opacity-90 transition-opacity"
              >
                Read Posts
              </Link>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="bg-foreground/5 rounded-lg p-8 mb-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
            Get the latest tutorials and development insights delivered to your inbox. 
            No spam, just valuable content to help you grow as a developer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="your-email@example.com"
              className="px-4 py-2 rounded-full border border-foreground/20 bg-background flex-1"
            />
            <button className="bg-foreground text-background px-6 py-2 rounded-full font-semibold hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Need Custom Development Help?</h2>
          <p className="text-foreground/80 mb-8 max-w-2xl mx-auto">
            Beyond tutorials and tips, I offer professional development services 
            to bring your projects to life with modern technologies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/services"
              className="bg-foreground text-background px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              View Services
            </Link>
            <button className="border border-foreground/20 px-8 py-3 rounded-full font-semibold hover:bg-foreground/5 transition-colors">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}