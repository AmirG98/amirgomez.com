import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { blogPosts, getPostBySlug, getRelatedPosts } from '@/data/blog-posts';

interface PageParams {
  slug: string;
}

interface PageProps {
  params: Promise<PageParams>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.seo.metaTitle,
    description: post.seo.metaDescription,
    keywords: post.seo.keywords,
    openGraph: {
      title: post.seo.metaTitle,
      description: post.seo.metaDescription,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo.metaTitle,
      description: post.seo.metaDescription,
    }
  };
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function BlogContent({ content }: { content: string }) {
  const sections = content.split('\n\n');
  
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-bold prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-foreground/80 prose-p:leading-relaxed prose-strong:text-foreground prose-code:bg-foreground/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-foreground/5 prose-pre:border prose-pre:border-foreground/10">
      {sections.map((section, index) => {
        if (section.startsWith('# ')) {
          return <h1 key={index} className="text-4xl font-bold mb-6 mt-8 first:mt-0">{section.replace('# ', '')}</h1>;
        } else if (section.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-bold mb-4 mt-8">{section.replace('## ', '')}</h2>;
        } else if (section.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-bold mb-3 mt-6">{section.replace('### ', '')}</h3>;
        } else if (section.startsWith('**') && section.endsWith('**')) {
          return <p key={index} className="font-bold text-lg mb-4">{section.replace(/\*\*/g, '')}</p>;
        } else if (section.includes('```')) {
          const codeMatch = section.match(/```(\w+)?\n([\s\S]*?)\n```/);
          if (codeMatch) {
            return (
              <pre key={index} className="bg-foreground/5 border border-foreground/10 rounded-lg p-4 overflow-x-auto my-6">
                <code className="text-sm">{codeMatch[2]}</code>
              </pre>
            );
          }
        } else if (section.startsWith('- ')) {
          const items = section.split('\n').filter(item => item.startsWith('- '));
          return (
            <ul key={index} className="list-disc list-inside space-y-2 mb-6">
              {items.map((item, itemIndex) => (
                <li key={itemIndex} className="text-foreground/80">{item.replace('- ', '')}</li>
              ))}
            </ul>
          );
        } else if (section.trim()) {
          return <p key={index} className="text-foreground/80 leading-relaxed mb-6">{section}</p>;
        }
        return null;
      })}
    </div>
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category, 3);

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
              <Link href="/blog" className="hover:text-foreground/80 transition-colors">Blog</Link>
              <Link href="/contact" className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition-colors">
                Get Consultation
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-foreground/60">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-foreground">Blog</Link>
          <span>/</span>
          <span className="text-foreground">{post.title}</span>
        </div>
      </div>

      <article className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <span className="text-sm text-foreground/60">
                {post.readingTime} min read
              </span>
              {post.featured && (
                <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author and Meta */}
            <div className="flex items-center justify-between border-b border-foreground/10 pb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                <div>
                  <div className="font-semibold text-lg">{post.author.name}</div>
                  <div className="text-foreground/60 mb-1">{post.author.bio}</div>
                  <div className="text-sm text-foreground/60">
                    Published {formatDate(post.publishedAt)}
                    {post.updatedAt && post.updatedAt !== post.publishedAt && (
                      <span> • Updated {formatDate(post.updatedAt)}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Social Share */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-foreground/60">Share:</span>
                <button className="text-foreground/60 hover:text-blue-600 transition-colors">
                  Twitter
                </button>
                <button className="text-foreground/60 hover:text-blue-800 transition-colors">
                  LinkedIn
                </button>
                <button className="text-foreground/60 hover:text-foreground transition-colors">
                  Copy Link
                </button>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="mb-12">
            <BlogContent content={post.content} />
          </div>

          {/* Tags */}
          <div className="border-t border-foreground/10 pt-8 mb-12">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag.toLowerCase().replace(' ', '-')}`}
                  className="bg-foreground/5 hover:bg-orange-100 dark:hover:bg-orange-900/30 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:text-orange-600"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-8 text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Implement These Strategies?
            </h3>
            <p className="text-foreground/80 mb-6 text-lg">
              Get personalized guidance on implementing these tactics for your specific business goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors">
                Schedule Free Consultation
              </button>
              <Link 
                href="/services"
                className="border border-orange-600 text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
              >
                View All Services
              </Link>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <article key={relatedPost.id} className="group">
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <div className="bg-background rounded-xl border border-foreground/10 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-orange-500/20">
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 px-2 py-1 rounded text-xs font-medium">
                            {relatedPost.category}
                          </span>
                          <span className="text-xs text-foreground/60">
                            {relatedPost.readingTime} min read
                          </span>
                        </div>

                        <h3 className="font-bold mb-3 group-hover:text-orange-600 transition-colors">
                          {relatedPost.title}
                        </h3>

                        <p className="text-foreground/80 text-sm mb-4 leading-relaxed">
                          {relatedPost.excerpt.substring(0, 120)}...
                        </p>

                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                          <div>
                            <div className="font-medium text-sm">{relatedPost.author.name}</div>
                            <div className="text-xs text-foreground/60">{formatDate(relatedPost.publishedAt)}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </article>

      {/* Newsletter Signup */}
      <section className="bg-foreground/5 py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              Get More Insights Like This
            </h3>
            <p className="text-xl text-foreground/80 mb-8">
              Join 5,000+ marketers getting weekly strategies, case studies, and tactics delivered to their inbox.
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
              No spam. Unsubscribe anytime.
            </p>
          </div>
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
              <Link href="#" className="text-foreground/60 hover:text-foreground transition-colors">LinkedIn</Link>
              <Link href="#" className="text-foreground/60 hover:text-foreground transition-colors">Twitter</Link>
              <Link href="#" className="text-foreground/60 hover:text-foreground transition-colors">Email</Link>
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