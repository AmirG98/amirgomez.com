import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { caseStudies, getCaseStudyBySlug, getRelatedCaseStudies } from '@/data/case-studies';

interface PageParams {
  slug: string;
}

interface PageProps {
  params: Promise<PageParams>;
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  
  if (!study) {
    return { title: 'Case Study Not Found' };
  }

  return {
    title: study.seo.metaTitle,
    description: study.seo.metaDescription,
    keywords: study.seo.keywords,
    openGraph: {
      title: study.seo.metaTitle,
      description: study.seo.metaDescription,
      type: 'article',
      publishedTime: study.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: study.seo.metaTitle,
      description: study.seo.metaDescription,
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

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const relatedStudies = getRelatedCaseStudies(study.slug, study.client.industry, 2);

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
              <Link href="/contact" className="hover:text-foreground/80 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-foreground/60">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/case-studies" className="hover:text-foreground">Case Studies</Link>
          <span>/</span>
          <span className="text-foreground">{study.client.name}</span>
        </div>
      </div>

      <article className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                {study.client.industry}
              </span>
              <span className="text-sm text-foreground/60">
                {study.duration} • {study.budget}
              </span>
              {study.featured && (
                <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {study.title}
            </h1>
            
            {/* Client Info */}
            <div className="bg-foreground/5 rounded-xl p-6 mb-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-foreground/60 mb-1">Client</div>
                  <div className="font-semibold">{study.client.name}</div>
                </div>
                <div>
                  <div className="text-sm text-foreground/60 mb-1">Industry</div>
                  <div className="font-semibold">{study.client.industry}</div>
                </div>
                <div>
                  <div className="text-sm text-foreground/60 mb-1">Company Size</div>
                  <div className="font-semibold">{study.client.size}</div>
                </div>
              </div>
            </div>

            {/* Key Results Summary */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {study.results.map((result, index) => (
                <div key={index} className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {result.improvement}
                  </div>
                  <div className="text-sm text-foreground/70">
                    {result.metric}
                  </div>
                </div>
              ))}
            </div>
          </header>

          {/* Challenge Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              The Challenge
            </h2>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6">
              <p className="text-lg text-foreground/80 leading-relaxed">
                {study.challenge}
              </p>
            </div>
          </section>

          {/* Solution Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              The Solution
            </h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
              <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                {study.solution}
              </p>
              
              <div>
                <h3 className="font-semibold mb-3">Services Provided:</h3>
                <div className="flex flex-wrap gap-2">
                  {study.services.map((service) => (
                    <span key={service} className="bg-blue-100 dark:bg-blue-800/50 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Results Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              The Results
            </h2>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {study.results.map((result, index) => (
                  <div key={index} className="bg-background rounded-lg p-4">
                    <h4 className="font-semibold mb-3">{result.metric}</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-foreground/60">Before</div>
                        <div className="font-semibold text-red-600">{result.before}</div>
                      </div>
                      <div>
                        <div className="text-foreground/60">After</div>
                        <div className="font-semibold text-green-600">{result.after}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <div className="text-lg font-bold text-green-600">{result.improvement}</div>
                      <div className="text-xs text-foreground/60">in {result.timeframe}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonial */}
          <section className="mb-12">
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-8 text-center">
              <div className="text-orange-400 text-2xl mb-4">★★★★★</div>
              <blockquote className="text-xl text-foreground/80 mb-6 italic leading-relaxed">
                "{study.testimonial.quote}"
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="text-left">
                  <div className="font-semibold">{study.testimonial.author}</div>
                  <div className="text-sm text-foreground/60">{study.testimonial.position}</div>
                </div>
              </div>
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Key Takeaways</h2>
            <div className="bg-foreground/5 rounded-xl p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Strategic campaign restructuring can dramatically improve ROI within months</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Proper tracking and attribution are essential for optimization decisions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Data-driven approach consistently outperforms intuition-based marketing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Systematic testing and optimization compound results over time</span>
                </li>
              </ul>
            </div>
          </section>

          {/* CTA Section */}
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-8 text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Achieve Similar Results?
            </h3>
            <p className="text-foreground/80 mb-6 text-lg">
              Let's discuss how we can implement similar strategies for your business 
              and achieve the growth you're looking for.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="bg-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors"
              >
                Schedule Free Consultation
              </Link>
              <Link 
                href="/services"
                className="border border-orange-600 text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
              >
                View Services & Pricing
              </Link>
            </div>
          </div>
        </div>

        {/* Related Case Studies */}
        {relatedStudies.length > 0 && (
          <section className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">More {study.client.industry} Success Stories</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedStudies.map((relatedStudy) => (
                <article key={relatedStudy.id} className="group">
                  <Link href={`/case-studies/${relatedStudy.slug}`}>
                    <div className="bg-background rounded-xl border border-foreground/10 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-orange-500/20">
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                            {relatedStudy.client.industry}
                          </span>
                          <span className="text-xs text-foreground/60">
                            {relatedStudy.duration}
                          </span>
                        </div>

                        <h3 className="font-bold mb-3 group-hover:text-orange-600 transition-colors">
                          {relatedStudy.title}
                        </h3>

                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 mb-4">
                          <div className="text-lg font-bold text-green-600">
                            {relatedStudy.results[0].improvement}
                          </div>
                          <div className="text-xs text-foreground/70">
                            {relatedStudy.results[0].metric}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <div className="font-medium">{relatedStudy.client.name}</div>
                            <div className="text-foreground/60">{relatedStudy.client.size}</div>
                          </div>
                          <div className="text-orange-600 text-sm font-semibold">
                            Read Case Study →
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link 
                href="/case-studies"
                className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-2 justify-center"
              >
                View All Case Studies
                <span>→</span>
              </Link>
            </div>
          </section>
        )}
      </article>

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