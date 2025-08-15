import Link from 'next/link';
import type { Metadata } from 'next';
import { caseStudies, getFeaturedCaseStudies, getAllIndustries } from '@/data/case-studies';

export const metadata: Metadata = {
  title: 'Client Success Stories & Case Studies - Proven Marketing Results | Amir Gomez',
  description: 'Real case studies showing how businesses achieved 300-450% ROI increases, reduced acquisition costs, and scaled revenue through strategic digital marketing.',
  keywords: [
    'marketing case studies',
    'client success stories',
    'ROI improvement',
    'Google Ads results',
    'Facebook advertising success',
    'email marketing results',
    'digital marketing proof'
  ],
  openGraph: {
    title: 'Client Success Stories & Case Studies - Proven Marketing Results',
    description: 'Real case studies showing dramatic improvements in ROI, lead quality, and revenue growth.',
    type: 'website',
  }
};

function CaseStudyCard({ study, featured = false }: { study: typeof caseStudies[0], featured?: boolean }) {
  const primaryResult = study.results[0];
  
  return (
    <article className={`group ${featured ? 'md:col-span-2 lg:col-span-1' : ''}`}>
      <Link href={`/case-studies/${study.slug}`}>
        <div className="bg-background rounded-xl border border-foreground/10 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-orange-500/20 h-full">
          {featured && (
            <div className="bg-orange-600 text-white px-4 py-2 text-sm font-semibold">
              Featured Success Story
            </div>
          )}
          
          <div className="p-6">
            {/* Industry and Company Size */}
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                {study.client.industry}
              </span>
              <span className="text-sm text-foreground/60">
                {study.client.size}
              </span>
            </div>

            {/* Title */}
            <h2 className={`font-bold mb-3 group-hover:text-orange-600 transition-colors ${featured ? 'text-xl lg:text-2xl' : 'text-lg'}`}>
              {study.title}
            </h2>

            {/* Challenge */}
            <p className="text-foreground/80 mb-4 leading-relaxed text-sm">
              {study.challenge.substring(0, featured ? 200 : 150)}...
            </p>

            {/* Key Result */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-4">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {primaryResult.improvement}
              </div>
              <div className="text-sm text-foreground/70">
                {primaryResult.metric} in {primaryResult.timeframe}
              </div>
            </div>

            {/* Services */}
            <div className="flex flex-wrap gap-2 mb-4">
              {study.services.slice(0, featured ? 4 : 3).map((service) => (
                <span key={service} className="text-xs bg-foreground/5 px-2 py-1 rounded">
                  {service}
                </span>
              ))}
            </div>

            {/* Client Info */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-sm">{study.client.name}</div>
                <div className="text-sm text-foreground/60">{study.duration} project</div>
              </div>
              <div className="text-orange-600 font-semibold">
                Read Case Study →
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default function CaseStudiesPage() {
  const featuredStudies = getFeaturedCaseStudies();
  const allStudies = caseStudies;
  const industries = getAllIndustries();

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
              <Link href="/case-studies" className="text-orange-600 font-semibold">Case Studies</Link>
              <Link href="/blog" className="hover:text-foreground/80 transition-colors">Blog</Link>
              <Link href="/contact" className="hover:text-foreground/80 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Real Results from 
            <span className="text-orange-600"> Real Businesses</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Don't just take my word for it. See how I've helped businesses across different industries 
            achieve dramatic improvements in ROI, lead quality, and revenue growth.
          </p>
          
          {/* Key Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
              <div className="text-2xl font-bold text-orange-600 mb-2">200+</div>
              <div className="text-sm text-foreground/70">Successful Campaigns</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
              <div className="text-2xl font-bold text-green-600 mb-2">340%</div>
              <div className="text-sm text-foreground/70">Average ROI Increase</div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <div className="text-2xl font-bold text-blue-600 mb-2">$2M+</div>
              <div className="text-sm text-foreground/70">Ad Spend Managed</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
              <div className="text-2xl font-bold text-purple-600 mb-2">97%</div>
              <div className="text-sm text-foreground/70">Client Satisfaction</div>
            </div>
          </div>

          {/* Industry Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              All Industries
            </button>
            {industries.map((industry) => (
              <button 
                key={industry}
                className="bg-foreground/5 hover:bg-orange-100 dark:hover:bg-orange-900/30 px-4 py-2 rounded-full text-sm font-medium transition-colors hover:text-orange-600"
              >
                {industry}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      {featuredStudies.length > 0 && (
        <section className="container mx-auto px-4 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Success Stories</h2>
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {featuredStudies.map((study) => (
              <CaseStudyCard 
                key={study.id} 
                study={study} 
                featured={true}
              />
            ))}
          </div>
        </section>
      )}

      {/* All Case Studies */}
      <section className="container mx-auto px-4 mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">All Case Studies</h2>
          <div className="text-sm text-foreground/60">
            Showing {allStudies.length} results
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {allStudies.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>
      </section>

      {/* Results Summary */}
      <section className="bg-foreground/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Consistent Results Across Industries</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2">73%</div>
                <div className="text-lg font-semibold mb-2">Average Cost Reduction</div>
                <div className="text-sm text-foreground/70">
                  Clients typically see significant decreases in cost per acquisition
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">4.2x</div>
                <div className="text-lg font-semibold mb-2">Average ROAS Improvement</div>
                <div className="text-sm text-foreground/70">
                  Return on ad spend improvements across all platforms
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">6 months</div>
                <div className="text-lg font-semibold mb-2">Average Time to Results</div>
                <div className="text-sm text-foreground/70">
                  Most clients see significant improvements within 6 months
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Become the Next Success Story?
            </h2>
            <p className="text-xl text-foreground/80 mb-8">
              Let's discuss your marketing challenges and create a custom strategy that delivers 
              the same kind of results you see in these case studies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-700 transition-colors"
              >
                Schedule Free Consultation
              </Link>
              <Link 
                href="/services"
                className="border border-orange-600 text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
              >
                View Services & Pricing
              </Link>
            </div>
            <p className="text-sm text-foreground/60 mt-6">
              Free strategy session • No commitment required • Custom growth plan included
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