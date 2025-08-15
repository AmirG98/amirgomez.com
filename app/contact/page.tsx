import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Amir Gomez - Free Marketing Consultation & Strategy Session',
  description: 'Get in touch with Amir Gomez for a free 30-minute marketing consultation. Discuss your business goals and discover growth opportunities.',
  keywords: [
    'contact Amir Gomez',
    'marketing consultation',
    'free strategy session',
    'digital marketing expert',
    'Google Ads consultation',
    'marketing strategy call'
  ],
  openGraph: {
    title: 'Contact Amir Gomez - Free Marketing Consultation',
    description: 'Schedule a free 30-minute strategy session to discuss your marketing challenges and growth opportunities.',
    type: 'website',
  }
};

export default function ContactPage() {
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
              <Link href="/contact" className="text-orange-600 font-semibold">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Let's Discuss Your 
            <span className="text-orange-600"> Growth Strategy</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Ready to turn your marketing spend into profitable growth? Schedule a free 30-minute strategy session 
            to discuss your challenges and explore opportunities.
          </p>
          
          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
              <div className="text-2xl mb-3">🎯</div>
              <h3 className="font-semibold mb-2">Custom Strategy</h3>
              <p className="text-sm text-foreground/70">Tailored approach based on your specific business goals and challenges</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <div className="text-2xl mb-3">📊</div>
              <h3 className="font-semibold mb-2">Performance Audit</h3>
              <p className="text-sm text-foreground/70">Free analysis of your current marketing performance and opportunities</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
              <div className="text-2xl mb-3">🚀</div>
              <h3 className="font-semibold mb-2">Actionable Plan</h3>
              <p className="text-sm text-foreground/70">Walk away with specific next steps to improve your marketing ROI</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div className="bg-background border border-foreground/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Schedule Your Free Consultation</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Acme Corp"
                  />
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium mb-2">
                    Website URL
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    className="w-full px-4 py-3 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div>
                  <label htmlFor="monthlyBudget" className="block text-sm font-medium mb-2">
                    Monthly Marketing Budget
                  </label>
                  <select
                    id="monthlyBudget"
                    name="monthlyBudget"
                    className="w-full px-4 py-3 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-1k">Under $1,000</option>
                    <option value="1k-5k">$1,000 - $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k-plus">$50,000+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="challenges" className="block text-sm font-medium mb-2">
                    What's your biggest marketing challenge? *
                  </label>
                  <textarea
                    id="challenges"
                    name="challenges"
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Tell me about your current marketing situation, what you've tried, and what's not working..."
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="goals" className="block text-sm font-medium mb-2">
                    What would success look like for you?
                  </label>
                  <textarea
                    id="goals"
                    name="goals"
                    rows={3}
                    className="w-full px-4 py-3 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Specific revenue goals, lead targets, or other success metrics..."
                  ></textarea>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    className="mt-1"
                  />
                  <label htmlFor="newsletter" className="text-sm text-foreground/80">
                    Yes, I'd like to receive weekly marketing insights and case studies
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-orange-700 transition-colors"
                >
                  Schedule My Free Consultation
                </button>

                <p className="text-xs text-foreground/60 text-center">
                  By submitting this form, you agree to receive communication from Amir Gomez. 
                  You can unsubscribe at any time.
                </p>
              </form>
            </div>

            {/* Contact Information & Calendar */}
            <div className="space-y-8">
              
              {/* Calendar Embed Placeholder */}
              <div className="bg-background border border-foreground/10 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-4">Book Directly on My Calendar</h3>
                <p className="text-foreground/80 mb-6">
                  Prefer to book directly? Choose a time that works for you from my calendar below.
                </p>
                
                {/* Calendly Integration */}
                <div className="rounded-lg overflow-hidden" style={{ height: '600px' }}>
                  <iframe
                    src="https://calendly.com/amir-amirgomez/30min?embed_domain=amirgomez-com.vercel.app&embed_type=Inline"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Schedule a meeting with Amir Gomez"
                    style={{ border: 'none' }}
                  ></iframe>
                </div>
              </div>

              {/* Contact Details */}
              <div className="bg-background border border-foreground/10 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-6">Other Ways to Reach Me</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                      <span className="text-orange-600">📧</span>
                    </div>
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-foreground/60">amir@amirgomez.com</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600">💼</span>
                    </div>
                    <div>
                      <div className="font-semibold">LinkedIn</div>
                      <div className="text-foreground/60">linkedin.com/in/amirgomez</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <span className="text-green-600">⏰</span>
                    </div>
                    <div>
                      <div className="font-semibold">Response Time</div>
                      <div className="text-foreground/60">Within 24 hours</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-background border border-foreground/10 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-6">Frequently Asked Questions</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">What happens during the consultation?</h4>
                    <p className="text-sm text-foreground/70">
                      We'll review your current marketing performance, discuss your goals, and I'll provide 
                      specific recommendations for improvement. You'll leave with actionable next steps.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Is there really no cost?</h4>
                    <p className="text-sm text-foreground/70">
                      Yes, the initial consultation is completely free. My goal is to provide value upfront 
                      and help you understand how I can help your business grow.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">What if I'm not ready to hire anyone?</h4>
                    <p className="text-sm text-foreground/70">
                      No problem! I'll still provide valuable insights you can implement yourself. 
                      There's no pressure to work together beyond the initial consultation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-foreground/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-8">Join 200+ Businesses That Trust My Expertise</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background rounded-lg p-6">
                <div className="text-2xl font-bold text-orange-600 mb-2">97%</div>
                <div className="text-sm text-foreground/60">Client Satisfaction Rate</div>
              </div>
              <div className="bg-background rounded-lg p-6">
                <div className="text-2xl font-bold text-orange-600 mb-2">340%</div>
                <div className="text-sm text-foreground/60">Average ROI Increase</div>
              </div>
              <div className="bg-background rounded-lg p-6">
                <div className="text-2xl font-bold text-orange-600 mb-2">$2M+</div>
                <div className="text-sm text-foreground/60">Ad Spend Managed</div>
              </div>
            </div>
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