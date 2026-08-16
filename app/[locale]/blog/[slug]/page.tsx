import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { blogPosts, getPostBySlug, getRelatedPosts } from '@/data/blog-posts';
import TableOfContents from '@/components/TableOfContents';
import BlogContent from '@/components/BlogContent';
import NewsletterSignup from '@/components/NewsletterSignup';
import PageShell from '@/components/PageShell';
import { FadeInView, AnimatedButton } from '@/components/animations';
import SpotlightCard from '@/components/effects/SpotlightCard';

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
    alternates: {
      canonical: `https://www.amirgomez.com/blog/${post.slug}`,
    },
    robots: {
      index: false,
      follow: true,
    },
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
    <PageShell activeNav="blog">
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
          <FadeInView>
            <header className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-brand-50 dark:bg-brand-900/20 text-brand-600 px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <span className="text-sm text-foreground/60">
                  {post.readingTime} min read
                </span>
                {post.featured && (
                  <span className="bg-accent-soft dark:bg-accent/20 text-brand-700 dark:text-accent px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                )}
              </div>

              <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                {post.title}
              </h1>

              <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Author and Meta */}
              <div className="flex items-center border-b border-border-default pb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-200 dark:border-brand-800/40">
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
          </FadeInView>

          {/* Table of Contents */}
          <TableOfContents content={post.content} />

          {/* Article Content */}
          <div className="mb-12">
            <BlogContent content={post.content} />
          </div>

          {/* Tags */}
          <FadeInView>
            <div className="border-t border-border-default pt-8 mb-12">
              <h3 className="font-display text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-foreground/5 px-3 py-2 rounded-lg text-sm font-medium text-brand-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </FadeInView>

          {/* CTA Section */}
          <FadeInView>
            <div className="bg-brand-50 dark:bg-brand-900/20 border border-border-default rounded-2xl p-8 text-center mb-12">
              <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-4">
                Ready to Implement These Strategies?
              </h3>
              <p className="text-foreground/80 mb-6 text-lg">
                Get personalized guidance on implementing these tactics for your specific business goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AnimatedButton variant="primary" size="lg">
                  <Link
                    href="https://calendly.com/amir-amirgomez"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Schedule Free Consultation
                  </Link>
                </AnimatedButton>
                <AnimatedButton variant="secondary" size="lg">
                  <Link href="/services">
                    View All Services
                  </Link>
                </AnimatedButton>
              </div>
            </div>
          </FadeInView>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="max-w-6xl mx-auto">
            <FadeInView>
              <h2 className="font-display text-3xl font-extrabold tracking-tight mb-8">Related Articles</h2>
            </FadeInView>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <FadeInView key={relatedPost.id} delay={index * 0.1}>
                  <article className="group h-full">
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <SpotlightCard className="h-full">
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="bg-brand-50 dark:bg-brand-900/20 text-brand-600 px-2 py-1 rounded text-xs font-medium">
                              {relatedPost.category}
                            </span>
                            <span className="text-xs text-foreground/60">
                              {relatedPost.readingTime} min read
                            </span>
                          </div>

                          <h3 className="font-display font-bold mb-3 group-hover:text-brand-500 transition-colors">
                            {relatedPost.title}
                          </h3>

                          <p className="text-foreground/70 text-sm mb-4 leading-relaxed">
                            {relatedPost.excerpt.substring(0, 120)}...
                          </p>

                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-brand-200 dark:border-brand-800/40">
                              <img
                                src="/amir-profile.jpg"
                                alt={relatedPost.author.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium text-sm">{relatedPost.author.name}</div>
                              <div className="text-xs text-foreground/50">{formatDate(relatedPost.publishedAt)}</div>
                            </div>
                          </div>
                        </div>
                      </SpotlightCard>
                    </Link>
                  </article>
                </FadeInView>
              ))}
            </div>
          </section>
        )}
      </article>

      {/* Newsletter Signup */}
      <section style={{ background: 'var(--background-secondary)' }} className="py-16 mt-16">
        <div className="container mx-auto px-4">
          <FadeInView>
            <NewsletterSignup />
          </FadeInView>
        </div>
      </section>
    </PageShell>
  );
}
