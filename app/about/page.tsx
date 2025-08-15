import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Amir Gomez - Digital Marketing Specialist & Growth Expert',
  description: 'Learn about Amir Gomez, a digital marketing specialist with 8+ years of experience helping businesses scale through Google Ads, Facebook advertising, and conversion optimization.',
  keywords: [
    'Amir Gomez',
    'digital marketing expert',
    'Google Ads specialist',
    'Facebook advertising expert',
    'conversion optimization specialist',
    'marketing consultant',
    'growth marketing'
  ],
  openGraph: {
    title: 'About Amir Gomez - Digital Marketing Specialist',
    description: 'Digital marketing specialist with 8+ years helping businesses scale through data-driven strategies and proven frameworks.',
    type: 'website',
  }
};

export default function AboutPage() {
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
              <Link href="/about" className="text-orange-600 font-semibold">About</Link>
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Turning Marketing Spend Into 
                <span className="text-orange-600"> Profitable Growth</span>
              </h1>
              <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                I'm Amir Gomez, and for the past 8 years, I've helped 200+ businesses transform their marketing from cost centers into profit drivers. My approach is simple: data-driven strategies, proven frameworks, and results that speak for themselves.
              </p>
              <div className="flex items-center gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">$2M+</div>
                  <div className="text-sm text-foreground/60">Ad Spend Managed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">200+</div>
                  <div className="text-sm text-foreground/60">Campaigns Launched</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">340%</div>
                  <div className="text-sm text-foreground/60">Average ROI Increase</div>
                </div>
              </div>
              <Link 
                href="/contact"
                className="bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-700 transition-colors inline-flex items-center gap-2"
              >
                Let's Talk Strategy
                <span>→</span>
              </Link>
            </div>
            <div className="relative">
              {/* Placeholder for professional photo */}
              <div className="w-full h-96 bg-gray-200 rounded-xl flex items-center justify-center" role="img" aria-label="Professional headshot placeholder for Amir Gomez">
                <div className="text-center">
                  <div className="text-4xl mb-2">📸</div>
                  <p className="text-gray-600">Professional Photo</p>
                  <p className="text-sm text-gray-500">(Upload your headshot here)</p>
                </div>
              </div>
              {/* Floating stats card */}
              <div className="absolute -bottom-6 -left-6 bg-background border border-foreground/10 rounded-lg p-6 shadow-lg">
                <div className="text-sm text-foreground/60 mb-1">Client Success Rate</div>
                <div className="text-2xl font-bold text-green-600">97%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Story Section */}
      <section className="bg-foreground/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">My Story</h2>
            
            <div className="prose prose-lg max-w-none">
              <div className="text-xl text-foreground/80 leading-relaxed space-y-6">
                <p>
                  My journey into digital marketing started like many others – with a failing campaign and a shrinking budget. 
                  Back in 2016, I was helping a local business with their first Google Ads campaign. After burning through 
                  $5,000 in two weeks with zero conversions, I realized I needed to get serious about understanding 
                  what actually works.
                </p>
                
                <p>
                  That failure became my education. I spent the next year studying every successful campaign I could find, 
                  taking apart landing pages, analyzing ad copy, and testing everything. The breakthrough came when I 
                  shifted focus from vanity metrics to revenue attribution. Suddenly, campaigns that looked "unsuccessful" 
                  on the surface were actually driving profitable customer acquisition.
                </p>
                
                <p>
                  Over the past 8 years, I've had the privilege of working with businesses ranging from local service 
                  providers to 8-figure e-commerce brands. Each campaign taught me something new, and each success built 
                  on the framework that I now use with every client.
                </p>
                
                <p>
                  Today, my approach combines rigorous data analysis with creative strategy. I don't just run ads – 
                  I build systems that scale, optimize for long-term customer value, and turn marketing spend into 
                  predictable business growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials & Expertise */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Expertise & Credentials</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <div className="bg-background border border-foreground/10 rounded-xl p-6">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-3">Google Ads Certified</h3>
                <p className="text-foreground/80">
                  Google Ads certified professional with expertise in Search, Display, Shopping, and YouTube advertising.
                </p>
              </div>
              
              <div className="bg-background border border-foreground/10 rounded-xl p-6">
                <div className="text-3xl mb-4">📱</div>
                <h3 className="text-xl font-bold mb-3">Meta Blueprint Certified</h3>
                <p className="text-foreground/80">
                  Facebook and Instagram advertising specialist with advanced certifications in campaign optimization.
                </p>
              </div>
              
              <div className="bg-background border border-foreground/10 rounded-xl p-6">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-xl font-bold mb-3">Analytics Expert</h3>
                <p className="text-foreground/80">
                  Google Analytics certified with expertise in conversion tracking, attribution modeling, and data analysis.
                </p>
              </div>
              
              <div className="bg-background border border-foreground/10 rounded-xl p-6">
                <div className="text-3xl mb-4">🎓</div>
                <h3 className="text-xl font-bold mb-3">Continuous Learning</h3>
                <p className="text-foreground/80">
                  Regular attendee at industry conferences and ongoing education in emerging marketing technologies.
                </p>
              </div>
              
              <div className="bg-background border border-foreground/10 rounded-xl p-6">
                <div className="text-3xl mb-4">💼</div>
                <h3 className="text-xl font-bold mb-3">8+ Years Experience</h3>
                <p className="text-foreground/80">
                  Hands-on experience managing campaigns across every major advertising platform and industry vertical.
                </p>
              </div>
              
              <div className="bg-background border border-foreground/10 rounded-xl p-6">
                <div className="text-3xl mb-4">🏆</div>
                <h3 className="text-xl font-bold mb-3">Proven Results</h3>
                <p className="text-foreground/80">
                  Track record of increasing client ROI by an average of 340% within the first 6 months of engagement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Approach */}
      <section className="bg-foreground/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">My Approach</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6">What I Believe</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">✓</span>
                    <span>Marketing should be measurable and accountable to revenue</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">✓</span>
                    <span>Data beats opinions every time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">✓</span>
                    <span>Customer lifetime value is more important than acquisition cost</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">✓</span>
                    <span>Transparency builds trust and better results</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">✓</span>
                    <span>Continuous testing leads to continuous improvement</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-6">How I Work</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1">→</span>
                    <span>Start with comprehensive audit and strategic planning</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1">→</span>
                    <span>Implement tracking and measurement systems first</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1">→</span>
                    <span>Launch campaigns with clear success metrics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1">→</span>
                    <span>Optimize based on performance data, not assumptions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1">→</span>
                    <span>Scale what works, eliminate what doesn't</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Success Stories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Clients Say</h2>
            <p className="text-xl text-foreground/80 mb-12">
              Don't just take my word for it – here's what business owners say about working together
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-background border border-foreground/10 rounded-xl p-8">
                <div className="text-orange-400 mb-4">★★★★★</div>
                <p className="text-foreground/80 mb-6 italic">
                  "Amir transformed our Google Ads from a money pit into our most profitable marketing channel. 
                  ROI went from break-even to 450% in just 4 months. His systematic approach and clear reporting 
                  made all the difference."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full" role="img" aria-label="Client avatar"></div>
                  <div className="text-left">
                    <div className="font-semibold">Sarah Johnson</div>
                    <div className="text-sm text-foreground/60">CEO, TechStart Solutions</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-background border border-foreground/10 rounded-xl p-8">
                <div className="text-orange-400 mb-4">★★★★★</div>
                <p className="text-foreground/80 mb-6 italic">
                  "Finally found someone who understands both the technical and strategic sides of digital marketing. 
                  Amir's email automation sequences alone generated an additional $200k in revenue this year."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full" role="img" aria-label="Client avatar"></div>
                  <div className="text-left">
                    <div className="font-semibold">Mike Chen</div>
                    <div className="text-sm text-foreground/60">Founder, E-commerce Plus</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <Link 
                href="/case-studies"
                className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-2 justify-center"
              >
                Read More Success Stories
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-50 dark:bg-orange-900/20 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Scale Your Business?
            </h2>
            <p className="text-xl text-foreground/80 mb-8">
              Let's discuss your marketing challenges and create a custom strategy that drives real growth for your business.
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
              Free 30-minute strategy session • No commitment required • Results-focused approach
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
              <Link href="https://twitter.com/amirgomez" className="text-foreground/60 hover:text-foreground transition-colors">Twitter</Link>
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