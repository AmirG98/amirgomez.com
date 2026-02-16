'use client';

import Image from 'next/image';

export default function MeetTheTeamPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden relative">
      {/* Animated Background - Gold/Luxury theme */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-yellow-500/15 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[200px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            A+Growth
          </a>
          <div className="flex items-center gap-2 text-sm text-white/50">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span>Full-Funnel Marketing</span>
          </div>
        </div>
      </header>

      {/* Important Notice Banner */}
      <div className="relative z-10 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-y border-amber-500/30">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm md:text-base text-white/90 leading-relaxed">
                <span className="font-bold text-amber-400">IMPORTANT:</span> You were redirected to this page because you booked a call. Please go to your email and accept the invite so we can save your slot.
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fadeIn">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span className="text-sm font-medium text-amber-400">Meet Your Growth Partner</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Data-Driven Marketing
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent">
              Results-Focused Partnership
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto">
            More than 10 years helping brands scale with full-funnel marketing strategies that generate real ROI.
          </p>
        </section>

        {/* Amir Gomez Section */}
        <section className="mb-16">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
              {/* Left: Image */}
              <div className="flex flex-col items-center md:items-start">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-4 border-amber-500/30 shadow-2xl shadow-amber-500/20 mb-6">
                  <Image
                    src="/amir-profile.jpg"
                    alt="Amir Gomez - Founder & Director, A+Growth"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                  <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">10+</div>
                    <div className="text-sm text-white/50 mt-1">Years Experience</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">$125M+</div>
                    <div className="text-sm text-white/50 mt-1">Revenue Driven</div>
                  </div>
                </div>
              </div>

              {/* Right: Bio & Info */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Amir Gomez</h2>
                <p className="text-xl text-amber-400 font-medium mb-6">Founder & Director, A+Growth</p>

                <div className="space-y-4 mb-8">
                  <p className="text-white/80 leading-relaxed">
                    With over a decade of experience in performance marketing, I've helped businesses across industries scale their revenue through strategic paid media, conversion optimization, and data-driven marketing systems.
                  </p>

                  <p className="text-white/80 leading-relaxed">
                    My approach combines deep market understanding with innovative marketing strategies that drive real business growth. I specialize in creating full-funnel systems that attract, convert, and retain high-value customers.
                  </p>
                </div>

                {/* Expertise Tags */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Full-Funnel Strategy',
                      'Multi-Channel Advertising',
                      'Google Ads',
                      'Meta Ads',
                      'High Net Worth Targeting',
                      'Conversion Optimization',
                      'Attribution Modeling',
                      'Creative Testing',
                      'Marketing Analytics'
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-sm font-medium bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Achievements */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">Key Achievements</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-white/80">Reduced cost per qualified appointment from $1,000 to $84 for financial advisors</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-white/80">Generated $65M pipeline in 6 months for construction funding company</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-white/80">Increased organic traffic by 5.3x for leading trailer company</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-white/80">Scaled ROI from 2x to 7x through UGC content strategy</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">What Clients Say</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <p className="text-white/80 italic mb-4">
                    "Amir possesses a deep understanding of market trends and customer behavior, and has a remarkable talent for creating innovative marketing strategies that drive business growth and increase revenue."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-amber-400">NK</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Nicolas Koriakos</p>
                      <p className="text-sm text-white/50">Marketing Director</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <p className="text-white/80 italic mb-4">
                    "Amir is one of the most talented marketers I've had the opportunity to work with. I strongly recommend him."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-amber-400">SP</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Steven Page</p>
                      <p className="text-sm text-white/50">Business Owner</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <p className="text-white/80 italic mb-4">
                    "Amir is a great coworker with a strong ability to visualize and develop effective marketing strategies, solve problems, adapt quickly to changes, and professionally handle challenges."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-amber-400">AM</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Alan Mathieu</p>
                      <p className="text-sm text-white/50">Growth Partner</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <p className="text-white/80 italic mb-4">
                    "Whatever the sprint task we are working on, I trust in his ability to succeed in any project we take on."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-amber-400">AO</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Agustin Oliva</p>
                      <p className="text-sm text-white/50">Project Manager</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Request Case Studies CTA */}
        <section className="mb-16">
          <div className="text-center">
            <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-8 md:p-12 shadow-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Want to See More Results?
              </h2>
              <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
                Get detailed case studies showing exactly how we've helped businesses scale their revenue and reduce acquisition costs.
              </p>
              <a
                href="mailto:amir@amirgomez.com?subject=Request%20for%20Case%20Studies&body=Hi%20Amir%2C%0A%0AI'd%20like%20to%20request%20detailed%20case%20studies%20to%20learn%20more%20about%20your%20work.%0A%0AThank%20you!"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-black px-8 py-5 rounded-2xl font-bold text-lg hover:from-amber-600 hover:to-yellow-600 transition-all hover:shadow-lg hover:shadow-amber-500/25 hover:scale-105 transform"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                REQUEST CASE STUDIES
              </a>
              <p className="text-sm text-white/40 mt-6">
                We'll send you detailed case studies via email within 24 hours
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-16">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Why Choose A+Growth?</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Data-Driven Loops</h3>
                    <p className="text-white/70">Using data to execute rapid growth loops that continuously optimize and scale your marketing efforts.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Customer-Focused</h3>
                    <p className="text-white/70">Building long-term relationships based on trust, transparency, and mutual success.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Proven Track Record</h3>
                    <p className="text-white/70">Years of experience delivering measurable results for brands across multiple industries.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Results-Oriented</h3>
                    <p className="text-white/70">Focused on generating real ROI for our clients, not vanity metrics.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Trusted by Leading Brands</h2>
            <p className="text-lg text-white/60">
              More than 10 years working with brands that lead their industries across the globe.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all">
              <h3 className="text-2xl font-bold text-white mb-3">Ethan Allen</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Global leader in home furnishings. Ran multi-channel campaigns across Meta, Google, YouTube, Pinterest, Native, and offline-to-online.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all">
              <h3 className="text-2xl font-bold text-white mb-3">Dirt King</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Leading company in the auto parts market with $130M+ in annual revenue. Launched full funnels and managed site with both B2B and B2C initiatives.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all">
              <h3 className="text-2xl font-bold text-white mb-3">Giant Partners</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Marketing, advertising, and data agency with 20+ years of experience. Led the growth team and launched multi-channel funnels.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-8 md:p-12 shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">Scale Your Growth?</span>
            </h2>
            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
              Let's build all the pieces your funnel needs and set everything up so the systems work smoothly together, helping you welcome new clients with confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:amir@amirgomez.com"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-black px-8 py-4 rounded-2xl font-semibold text-lg hover:from-amber-600 hover:to-yellow-600 transition-all hover:shadow-lg hover:shadow-amber-500/25"
              >
                Get in Touch
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              <a
                href="/"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/5 transition-all"
              >
                Learn More
              </a>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex items-center justify-center gap-6 flex-wrap text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>10+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>$125M+ Revenue Driven</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Proven Results</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-16 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center">
          <p className="text-sm text-white/40 mb-2">
            © {new Date().getFullYear()} A+Growth •{' '}
            <a href="/privacy" className="hover:text-white/60 transition-colors">Privacy</a> •{' '}
            <a href="mailto:amir@amirgomez.com" className="hover:text-white/60 transition-colors">Contact</a>
          </p>
          <p className="text-xs text-white/30">Full-Funnel Marketing • www.amirgomez.com</p>
        </div>
      </footer>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
