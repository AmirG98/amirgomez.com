'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getTranslations } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useFormModal } from '@/components/useFormModal';
import MultiStepForm from '@/components/MultiStepForm';

const services = [
  {
    id: 'google-ads-management',
    title: 'Google Ads Management',
    description: 'Strategic Google Ads campaigns that target your ideal customers and maximize your advertising budget with proven optimization techniques.',
    features: [
      'Keyword research & strategy development',
      'Campaign setup & ongoing optimization',
      'Performance tracking & detailed reporting',
      'Landing page optimization recommendations',
      'Conversion tracking implementation'
    ],
    icon: '🎯',
    results: '+450% average ROI increase'
  },
  {
    id: 'facebook-advertising',
    title: 'Facebook & Instagram Advertising',
    description: 'Facebook and Instagram advertising that builds brand awareness and drives qualified leads through advanced targeting strategies.',
    features: [
      'Audience research & precise targeting',
      'Creative development & A/B testing',
      'Campaign optimization & scaling',
      'Retargeting campaign setup',
      'Cross-platform attribution tracking'
    ],
    icon: '📱',
    results: '+300% lead quality improvement'
  },
  {
    id: 'email-marketing-automation',
    title: 'Email Marketing Automation',
    description: 'Automated email sequences and campaigns that nurture leads and increase customer lifetime value through personalized messaging.',
    features: [
      'Email automation setup & strategy',
      'List building & segmentation',
      'Performance optimization & testing',
      'Customer journey mapping',
      'Revenue attribution tracking'
    ],
    icon: '📧',
    results: '+587% email revenue increase'
  },
  {
    id: 'conversion-optimization',
    title: 'Conversion Rate Optimization',
    description: 'Landing page optimization and conversion rate improvements that turn more visitors into customers through data-driven testing.',
    features: [
      'Landing page design & testing',
      'A/B testing & analytics setup',
      'User experience optimization',
      'Conversion funnel analysis',
      'Performance monitoring & reporting'
    ],
    icon: '📊',
    results: '+187% conversion improvement'
  },
  {
    id: 'marketing-analytics',
    title: 'Marketing Analytics & Tracking',
    description: 'Comprehensive tracking and reporting that provides clear insights into campaign performance and ROI measurement.',
    features: [
      'Analytics setup & configuration',
      'Custom dashboard creation',
      'Performance reporting & insights',
      'Data-driven recommendations',
      'Attribution modeling setup'
    ],
    icon: '🔍',
    results: '+340% data accuracy improvement'
  },
  {
    id: 'marketing-strategy',
    title: 'Marketing Strategy Consulting',
    description: 'Comprehensive marketing strategies and consulting that align with your business goals and competitive positioning.',
    features: [
      'Marketing strategy development',
      'Competitive analysis & positioning',
      'Growth planning & execution roadmap',
      'Team training & implementation',
      'Ongoing strategic guidance'
    ],
    icon: '🚀',
    results: '+250% strategic clarity'
  }
];

const packages = [
  {
    name: 'Growth Starter',
    description: 'Perfect for small businesses ready to scale their marketing',
    features: [
      'Google Ads or Facebook Ads management',
      'Basic email marketing automation',
      'Monthly performance reports',
      'Quarterly strategy sessions',
      'Email & chat support'
    ],
    popular: false
  },
  {
    name: 'Growth Accelerator',
    description: 'Comprehensive marketing for growing businesses',
    features: [
      'Multi-platform advertising (Google + Facebook)',
      'Advanced email marketing automation',
      'Conversion rate optimization',
      'Bi-weekly strategy calls',
      'Priority support & dedicated account manager'
    ],
    popular: true
  },
  {
    name: 'Enterprise Growth',
    description: 'Full-service marketing for established businesses',
    features: [
      'Complete marketing strategy & execution',
      'Advanced analytics & attribution modeling',
      'Custom automation & integrations',
      'Weekly strategy sessions',
      'Dedicated marketing team'
    ],
    popular: false
  }
];

export default function ServicesPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isOpen, currentVariant, openForm, closeForm, handleSubmit } = useFormModal();
  const t = getTranslations('en');
  
  return (
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
              <Link href="/" className="hover:text-foreground/80 transition-colors">{t.nav.home}</Link>
              <Link href="/about" className="hover:text-foreground/80 transition-colors">{t.nav.about}</Link>
              <Link href="/services" className="text-orange-600 font-semibold">{t.nav.services}</Link>
              <Link href="/blog" className="hover:text-foreground/80 transition-colors">{t.nav.blog}</Link>
              <Link href="/contact" className="hover:text-foreground/80 transition-colors">{t.nav.contact}</Link>
              <LanguageSwitcher currentLocale="en" />
              <button 
                onClick={() => openForm('consultation')}
                className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition-colors"
              >
                {t.nav.getConsultation}
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
                <Link href="/" className="block py-2 hover:text-orange-600 transition-colors">{t.nav.home}</Link>
                <Link href="/about" className="block py-2 hover:text-orange-600 transition-colors">{t.nav.about}</Link>
                <Link href="/services" className="block py-2 text-orange-600 font-semibold">{t.nav.services}</Link>
                <Link href="/blog" className="block py-2 hover:text-orange-600 transition-colors">{t.nav.blog}</Link>
                <Link href="/contact" className="block py-2 hover:text-orange-600 transition-colors">{t.nav.contact}</Link>
                <div className="pt-4 border-t border-foreground/10">
                  <button 
                    onClick={() => {
                      openForm('consultation');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors"
                  >
                    {t.nav.getConsultation}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Marketing Services That 
            <span className="text-orange-600"> Drive Results</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Proven digital marketing solutions that turn ad spend into profitable growth. 
            No contracts, no fluff – just results-driven strategies with guaranteed ROI.
          </p>
          
          {/* Trust Indicators */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
              <div className="text-2xl font-bold text-orange-600 mb-2">$35M+</div>
              <div className="text-sm text-foreground/70">Generated with Campaigns</div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <div className="text-2xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-sm text-foreground/70">Successful Funnels</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
              <div className="text-2xl font-bold text-green-600 mb-2">450%</div>
              <div className="text-sm text-foreground/70">Average ROI</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 mb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Comprehensive Marketing Solutions
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-background rounded-xl border border-foreground/10 p-8 hover:shadow-lg transition-all duration-300 hover:border-orange-500/20">
                <div className="text-4xl mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-foreground/80 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="text-sm text-foreground/70 space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="border-t border-foreground/10 pt-6">
                  <div className="flex justify-center items-center mb-4">
                    <div className="text-sm text-green-600 font-medium">{service.results}</div>
                  </div>
                  <button 
                    onClick={() => openForm('consultation')}
                    className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors text-center block"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="bg-foreground/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Plans adapted to your needs
              </h2>
              <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
                Flexible packages designed to scale with your business growth and marketing needs
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <div key={index} className={`bg-background rounded-xl border-2 p-8 relative ${pkg.popular ? 'border-orange-500' : 'border-foreground/10'}`}>
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
                    <p className="text-foreground/80">{pkg.description}</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">✓</span>
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={() => openForm('consultation')}
                    className={`w-full py-3 rounded-lg font-semibold transition-colors text-center block ${
                      pkg.popular 
                        ? 'bg-orange-600 text-white hover:bg-orange-700' 
                        : 'border border-orange-600 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20'
                    }`}
                  >
                    Get Quote
                  </button>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-foreground/60 mb-4">
                Need a custom solution? Let's discuss your specific requirements.
              </p>
              <button 
                onClick={() => openForm('consultation')}
                className="text-orange-600 hover:text-orange-700 font-semibold"
              >
                Schedule Custom Consultation →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              How We Work Together
            </h2>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-orange-600">1</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Strategy Session</h3>
                <p className="text-foreground/80">
                  Free consultation to understand your goals, challenges, and opportunities for growth.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-orange-600">2</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Custom Plan</h3>
                <p className="text-foreground/80">
                  Detailed marketing strategy tailored to your business, budget, and growth objectives.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-orange-600">3</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Implementation</h3>
                <p className="text-foreground/80">
                  Launch campaigns with proper tracking, optimization systems, and performance monitoring.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-orange-600">4</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Scale & Optimize</h3>
                <p className="text-foreground/80">
                  Continuous optimization and scaling based on performance data to maximize ROI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-50 dark:bg-orange-900/20 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Scale Your Marketing?
            </h2>
            <p className="text-xl text-foreground/80 mb-8">
              Get a free marketing audit and custom growth strategy. No payment required until you see results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => openForm('consultation')}
                className="bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-700 transition-colors"
              >
                Schedule Free Consultation
              </button>
              <Link 
                href="/blog"
                className="border border-orange-600 text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
              >
                Read Marketing Insights
              </Link>
            </div>
            <p className="text-sm text-foreground/60 mt-6">
              Free consultation • No commitment • Results guaranteed
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
              <p className="text-foreground/60">{t.footer.tagline}</p>
            </div>
            <div className="flex space-x-6">
              <Link href="https://linkedin.com/in/amir-gabriel-gomez" className="text-foreground/60 hover:text-foreground transition-colors">{t.footer.links.linkedin}</Link>
              <Link href="mailto:amir@amirgomez.com" className="text-foreground/60 hover:text-foreground transition-colors">{t.footer.links.email}</Link>
            </div>
          </div>
          <div className="border-t border-foreground/10 mt-8 pt-8 text-center text-foreground/60">
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </footer>

      {/* Form Modal */}
      {currentVariant && (
        <MultiStepForm
          variant={currentVariant}
          isOpen={isOpen}
          onClose={closeForm}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}