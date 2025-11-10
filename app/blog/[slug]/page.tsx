import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { blogPosts, getPostBySlug, getRelatedPosts } from '@/data/blog-posts';
import TableOfContents from '@/components/TableOfContents';
import BlogContent from '@/components/BlogContent';
import NewsletterSignup from '@/components/NewsletterSignup';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BlogStructuredData from '@/components/BlogStructuredData';

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


export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Structured Data for SEO */}
      <BlogStructuredData post={post} />
      
      {/* Navigation */}
      <Navigation currentPage="/blog" />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center space-x-2 text-sm text-foreground/60 overflow-hidden">
          <Link href="/" className="hover:text-foreground whitespace-nowrap">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-foreground whitespace-nowrap">Blog</Link>
          <span>/</span>
          <span className="text-foreground truncate">{post.title}</span>
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

            {/* Featured Image */}
            {post.featuredImage && (
              <div className="relative overflow-hidden aspect-[16/9] rounded-xl mb-8 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30">
                <img 
                  src={post.featuredImage} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Author and Meta */}
            <div className="flex items-center border-b border-foreground/10 pb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-orange-100 dark:border-orange-900/30">
                  <img 
                    src="/amir-profile.jpg" 
                    alt={post.author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
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

            </div>
          </header>

          {/* Table of Contents */}
          <TableOfContents content={post.content} />

          {/* Article Content */}
          <div className="mb-12">
            <BlogContent content={post.content} kpiWidget={post.kpiWidget} />
          </div>

          {/* Tags */}
          <div className="border-t border-foreground/10 pt-8 mb-12">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-foreground/5 px-3 py-2 rounded-lg text-sm font-medium text-orange-600"
                >
                  #{tag}
                </span>
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
                          <div className="w-8 h-8 rounded-full overflow-hidden border border-orange-100 dark:border-orange-900/30">
                            <img 
                              src="/amir-profile.jpg" 
                              alt={relatedPost.author.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
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
        <div className="container mx-auto px-4">
          <NewsletterSignup />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}