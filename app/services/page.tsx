import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Marketing Services & Packages - ROI-Focused Solutions | Amir Gomez',
  description: 'Professional digital marketing services including Google Ads management, Facebook advertising, email marketing, and conversion optimization with proven ROI.',
  keywords: [
    'digital marketing services',
    'Google Ads management',
    'Facebook advertising',
    'email marketing',
    'conversion optimization',
    'marketing packages',
    'ROI marketing'
  ],
  openGraph: {
    title: 'Digital Marketing Services & Packages - ROI-Focused Solutions',
    description: 'Professional marketing services with proven track record of 340% average ROI increase.',
    type: 'website',
  }
};

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
    pricing: 'From $2,500/month + ad spend',
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
    pricing: 'From $2,000/month + ad spend',
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
    pricing: 'From $1,500/month',
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
    pricing: 'From $3,000/month',
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
    pricing: 'From $1,000/month',
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
    pricing: 'From $5,000/project',
    icon: '🚀',
    results: '+250% strategic clarity'
  }
];

const packages = [
  {
    name: 'Growth Starter',
    price: '$3,500/month',
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
    price: '$7,500/month',
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
    price: 'Custom pricing',
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
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-foreground/10 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              AG
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/" className="hover:text-foreground/80 transition-colors">Home</Link>
              <Link href="/about" className="hover:text-foreground/80 transition-colors">About</Link>
              <Link href="/services" className="text-orange-600 font-semibold">Services</Link>
              <Link href="/blog" className="hover:text-foreground/80 transition-colors">Blog</Link>
              <Link href="/contact" className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition-colors">
                Get Free Consultation
              </Link>
            </div>
          </div>
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
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
              <div className="text-2xl font-bold text-orange-600 mb-2">340%</div>
              <div className="text-sm text-foreground/70">Average ROI Increase</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
              <div className="text-2xl font-bold text-green-600 mb-2">$2M+</div>
              <div className="text-sm text-foreground/70">Ad Spend Managed</div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <div className="text-2xl font-bold text-blue-600 mb-2">200+</div>
              <div className="text-sm text-foreground/70">Successful Campaigns</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
              <div className="text-2xl font-bold text-purple-600 mb-2">97%</div>
              <div className="text-sm text-foreground/70">Client Satisfaction</div>
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
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-lg font-semibold">{service.pricing}</div>
                    <div className="text-sm text-green-600 font-medium">{service.results}</div>
                  </div>
                  <Link 
                    href="/contact"
                    className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors text-center block"
                  >
                    Learn More
                  </Link>
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
                Choose Your Growth Package
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
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <div className="text-3xl font-bold text-orange-600 mb-4">{pkg.price}</div>
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
                  
                  <Link 
                    href="/contact"
                    className={`w-full py-3 rounded-lg font-semibold transition-colors text-center block ${
                      pkg.popular 
                        ? 'bg-orange-600 text-white hover:bg-orange-700' 
                        : 'border border-orange-600 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-foreground/60 mb-4">
                Need a custom solution? Let's discuss your specific requirements.
              </p>
              <Link 
                href="/contact"
                className="text-orange-600 hover:text-orange-700 font-semibold"
              >
                Schedule Custom Consultation →
              </Link>
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
              <Link 
                href="/contact"
                className="bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-700 transition-colors"
              >
                Schedule Free Consultation
              </Link>
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