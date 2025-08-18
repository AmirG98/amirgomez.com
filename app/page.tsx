'use client';

import Link from 'next/link';
import { getFeaturedPosts } from '@/data/blog-posts';
import MultiStepForm from '@/components/MultiStepForm';
import { useFormModal } from '@/components/useFormModal';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useState } from 'react';

export default function Home() {
  const { isOpen, currentVariant, openForm, closeForm, handleSubmit } = useFormModal();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Google Tag Manager */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5HKRKM7F');`,
        }}
      />
      {/* End Google Tag Manager */}
      
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-5HKRKM7F"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      {/* End Google Tag Manager (noscript) */}
      
      <div className="min-h-screen bg-background text-foreground">
        {/* Navigation */}
      <nav className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-foreground/10 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              AG
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/about" className="hover:text-foreground/80 transition-colors">About</Link>
              <Link href="/services" className="hover:text-foreground/80 transition-colors">Services</Link>
              <Link href="/blog" className="hover:text-foreground/80 transition-colors">Blog</Link>
              <Link href="/contact" className="hover:text-foreground/80 transition-colors">Contact</Link>
              <LanguageSwitcher currentLocale="en" />
              <button 
                onClick={() => openForm('consultation')}
                className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition-colors"
              >
                Get Free Consultation
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-4">
              <LanguageSwitcher currentLocale="en" />
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-foreground hover:text-foreground/80 p-2"
                aria-label="Toggle mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-foreground/10 shadow-lg">
              <div className="container mx-auto px-4 py-4 space-y-4">
                <Link href="/about" className="block py-2 hover:text-orange-600 transition-colors">About</Link>
                <Link href="/services" className="block py-2 hover:text-orange-600 transition-colors">Services</Link>
                <Link href="/blog" className="block py-2 hover:text-orange-600 transition-colors">Blog</Link>
                <Link href="/contact" className="block py-2 hover:text-orange-600 transition-colors">Contact</Link>
                <div className="pt-4 border-t border-foreground/10">
                  <button 
                    onClick={() => {
                      openForm('consultation');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors"
                  >
                    Get Free Consultation
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
                Grow Your Business with 
                <span className="text-orange-600"> Proven Marketing</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 mb-8 leading-relaxed">
                I help businesses increase revenue through data-driven advertising strategies.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <button 
                  onClick={() => openForm('audit')}
                  className="bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-orange-700 transition-colors shadow-lg"
                >
                  Get Free Marketing Audit
                </button>
                <button 
                  onClick={() => openForm('caseStudies')}
                  className="border-2 border-foreground/20 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-foreground/5 transition-colors"
                >
                  Grab Growth Playbook
                </button>
              </div>
              
              {/* Trust Indicators */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 text-sm text-foreground/60">
                  <div className="flex items-center gap-2">
                    <span className="text-orange-500">✓</span>
                    <span>$35M+ Generated with Campaigns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-500">✓</span>
                    <span>100+ Successful Funnels</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-500">✓</span>
                    <span>Average 450% ROI</span>
                  </div>
                </div>
                
                {/* Years in Business Tagline */}
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-orange-50 dark:bg-orange-900/20 px-4 py-2 rounded-full text-orange-600 font-semibold text-sm">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    10 years in business
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Profile Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-orange-100 dark:border-orange-900/30">
                <img 
                  src="/amir-profile.jpg" 
                  alt="Amir Gomez - Digital Marketing Specialist"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-foreground/5 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Marketing Services That Drive Results
            </h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Comprehensive digital marketing solutions tailored to your business goals
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-background rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-5xl mb-6">🎯</div>
              <h3 className="text-2xl font-bold mb-4">Google Ads Management</h3>
              <p className="text-foreground/80 mb-4 leading-relaxed">
                Strategic Google Ads campaigns that target your ideal customers 
                and maximize your advertising budget with proven optimization techniques.
              </p>
              <ul className="text-sm text-foreground/70 space-y-2">
                <li>• Keyword research & strategy</li>
                <li>• Campaign setup & optimization</li>
                <li>• Performance tracking & reporting</li>
              </ul>
            </div>

            <div className="bg-background rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-5xl mb-6">📱</div>
              <h3 className="text-2xl font-bold mb-4">Social Media Advertising</h3>
              <p className="text-foreground/80 mb-4 leading-relaxed">
                Facebook, Instagram, and LinkedIn advertising that builds brand awareness 
                and drives qualified leads through advanced targeting strategies.
              </p>
              <ul className="text-sm text-foreground/70 space-y-2">
                <li>• Audience research & targeting</li>
                <li>• Creative development & testing</li>
                <li>• Campaign optimization</li>
              </ul>
            </div>

            <div className="bg-background rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-5xl mb-6">📊</div>
              <h3 className="text-2xl font-bold mb-4">Conversion Optimization</h3>
              <p className="text-foreground/80 mb-4 leading-relaxed">
                Landing page optimization and conversion rate improvements that turn 
                more visitors into customers through data-driven testing.
              </p>
              <ul className="text-sm text-foreground/70 space-y-2">
                <li>• Landing page design & testing</li>
                <li>• A/B testing & analytics</li>
                <li>• User experience optimization</li>
              </ul>
            </div>

            <div className="bg-background rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-5xl mb-6">📧</div>
              <h3 className="text-2xl font-bold mb-4">Email Marketing</h3>
              <p className="text-foreground/80 mb-4 leading-relaxed">
                Automated email sequences and campaigns that nurture leads and 
                increase customer lifetime value through personalized messaging.
              </p>
              <ul className="text-sm text-foreground/70 space-y-2">
                <li>• Email automation setup</li>
                <li>• List building & segmentation</li>
                <li>• Performance optimization</li>
              </ul>
            </div>

            <div className="bg-background rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-5xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold mb-4">Marketing Analytics</h3>
              <p className="text-foreground/80 mb-4 leading-relaxed">
                Comprehensive tracking and reporting that provides clear insights 
                into campaign performance and ROI measurement.
              </p>
              <ul className="text-sm text-foreground/70 space-y-2">
                <li>• Analytics setup & tracking</li>
                <li>• Performance reporting</li>
                <li>• Data-driven recommendations</li>
              </ul>
            </div>

            <div className="bg-background rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-5xl mb-6">🚀</div>
              <h3 className="text-2xl font-bold mb-4">Marketing Strategy</h3>
              <p className="text-foreground/80 mb-4 leading-relaxed">
                Comprehensive marketing strategies and consulting that align with 
                your business goals and competitive positioning.
              </p>
              <ul className="text-sm text-foreground/70 space-y-2">
                <li>• Marketing strategy development</li>
                <li>• Competitive analysis</li>
                <li>• Growth planning & execution</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => openForm('campaign')}
              className="bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-700 transition-colors"
            >
              Start Your Marketing Campaign
            </button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              My Proven 4-Step Process
            </h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              A systematic approach that has helped 200+ businesses achieve their marketing goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-orange-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Audit & Analysis</h3>
              <p className="text-foreground/80">
                Comprehensive analysis of your current marketing performance, 
                competitors, and growth opportunities.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-orange-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Strategy Development</h3>
              <p className="text-foreground/80">
                Custom marketing strategy creation based on your specific business 
                goals, target audience, and budget.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Campaign Launch</h3>
              <p className="text-foreground/80">
                Implementation of campaigns across selected platforms with 
                proper tracking and optimization systems in place.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Optimize & Scale</h3>
              <p className="text-foreground/80">
                Continuous optimization based on performance data to maximize 
                ROI and scale successful campaigns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-foreground/5 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Clients Say
            </h2>
            <p className="text-xl text-foreground/80">
              Real results from real businesses
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-background rounded-xl p-8 shadow-sm border border-foreground/10 hover:shadow-lg transition-shadow">
              <div className="mb-6">
                <div className="text-orange-400 text-xl mb-4">★★★★★</div>
                <p className="text-foreground/80 mb-6 text-lg leading-relaxed italic">
                  "Amir is one of the most talented marketers I've had the opportunity to work with. I strongly recommend him."
                </p>
              </div>
              <div className="border-t border-foreground/10 pt-6">
                <div className="font-semibold text-foreground">Steven Page</div>
                <div className="text-sm text-orange-600 font-medium">VP of Marketing at Giant Partners</div>
              </div>
            </div>

            <div className="bg-background rounded-xl p-8 shadow-sm border border-foreground/10 hover:shadow-lg transition-shadow">
              <div className="mb-6">
                <div className="text-orange-400 text-xl mb-4">★★★★★</div>
                <p className="text-foreground/80 mb-6 text-lg leading-relaxed italic">
                  "Amir possesses a deep understanding of market trends and customer behavior, and has a remarkable talent for creating innovative strategies that drive business growth and increase revenue."
                </p>
              </div>
              <div className="border-t border-foreground/10 pt-6">
                <div className="font-semibold text-foreground">Nick Koriakos</div>
                <div className="text-sm text-orange-600 font-medium">Founder of Stack Force</div>
              </div>
            </div>

            <div className="bg-background rounded-xl p-8 shadow-sm border border-foreground/10 hover:shadow-lg transition-shadow">
              <div className="mb-6">
                <div className="text-orange-400 text-xl mb-4">★★★★★</div>
                <p className="text-foreground/80 mb-6 text-lg leading-relaxed italic">
                  "I deeply trust Amir's ability to drive business growth, simplifying complex scenarios into actionable strategies."
                </p>
              </div>
              <div className="border-t border-foreground/10 pt-6">
                <div className="font-semibold text-foreground">Agustin Oliva</div>
                <div className="text-sm text-orange-600 font-medium">General Manager of RollerShow</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Grow Your Business?
            </h2>
            <p className="text-xl text-foreground/80 mb-8">
              Get a free marketing audit and custom growth strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button 
                onClick={() => openForm('consultation')}
                className="bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-700 transition-colors shadow-lg"
              >
                Get Free Consultation
              </button>
              <button 
                onClick={() => openForm('caseStudies')}
                className="border-2 border-foreground/20 px-8 py-4 rounded-full font-semibold text-lg hover:bg-foreground/5 transition-colors"
              >
                Grab My Free Growth Playbook
              </button>
            </div>
            <p className="text-sm text-foreground/60">
              Free consultation • No commitment
            </p>
          </div>
        </div>
      </section>

      {/* Blog Highlights Section */}
      <section className="bg-foreground/5 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Latest Marketing Insights
            </h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Proven strategies and real case studies from managing $2M+ in ad spend
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {getFeaturedPosts().slice(0, 3).map((post) => (
              <article key={post.id} className="group">
                <Link href={`/blog/${post.slug}`}>
                  <div className="bg-background rounded-xl border border-foreground/10 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-orange-500/20">
                    {/* Featured Image */}
                    <div className="relative overflow-hidden aspect-[16/9] bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30">
                      <img 
                        src={post.featuredImage || 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=450&fit=crop&auto=format'} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                        <span className="text-sm text-foreground/60">
                          {post.readingTime} min read
                        </span>
                      </div>

                      <h3 className="text-xl font-bold mb-3 group-hover:text-orange-600 transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-foreground/80 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-100 dark:border-orange-900/30">
                          <img 
                            src={post.author.avatar} 
                            alt={post.author.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{post.author.name}</div>
                          <div className="text-sm text-foreground/60">
                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/blog"
              className="bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-700 transition-colors inline-flex items-center gap-2"
            >
              Read All Articles
              <span>→</span>
            </Link>
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
              <a href="https://linkedin.com/in/amirgomez" className="text-foreground/60 hover:text-foreground transition-colors">LinkedIn</a>
              <a href="mailto:amir@amirgomez.com" className="text-foreground/60 hover:text-foreground transition-colors">Email</a>
            </div>
          </div>
          <div className="border-t border-foreground/10 mt-8 pt-8 text-center text-foreground/60">
            <p>&copy; 2024 Amir Gomez. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Multi-Step Form Modal */}
      {currentVariant && (
        <MultiStepForm
          variant={currentVariant}
          isOpen={isOpen}
          onClose={closeForm}
          onSubmit={handleSubmit}
        />
      )}
      </div>
    </>
  );
}
