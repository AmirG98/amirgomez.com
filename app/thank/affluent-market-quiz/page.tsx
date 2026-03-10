'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const [readinessLevel, setReadinessLevel] = useState<'foundation' | 'positioning' | 'ready-to-scale'>('foundation');
  const [targetSegment, setTargetSegment] = useState('your target high net worth segment');
  const [goal, setGoal] = useState('');
  const [spotsLeft, setSpotsLeft] = useState(3);
  const [showSticky, setShowSticky] = useState(false);

  // Show sticky CTA after scrolling past the first section
  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const level = searchParams.get('level') as 'foundation' | 'positioning' | 'ready-to-scale';
    const segment = searchParams.get('segment');
    const goalParam = searchParams.get('goal');

    if (level) setReadinessLevel(level);
    if (segment) setTargetSegment(segment);
    if (goalParam) setGoal(goalParam);
  }, [searchParams]);

  const readinessContent = {
    'foundation': {
      score: 'Building Foundation',
      headline: "You're Ready to Attract High Net Worth Buyers",
      subtitle: 'Your business has great potential. Here\'s what you need to connect with high-net-worth customers.',
      bullets: [
        'Premium landing page with luxury positioning',
        'High net worth audience targeting setup (income + interests)',
        'High-end creative assets that resonate with wealthy buyers',
      ],
      cta: 'Get Your Free Audit',
      color: '#f59e0b',
      gradient: 'from-amber-500 to-yellow-500',
    },
    'positioning': {
      score: 'Positioning for Premium',
      headline: "You're Progressing — Let's Accelerate",
      subtitle: 'You\'ve started reaching high net worth customers. Here\'s how to maximize your momentum.',
      bullets: [
        'Advanced high net worth targeting (HHI $150K+ segments)',
        'Premium funnel optimization with exclusivity messaging',
        'A/B testing luxury vs. standard creative approaches',
      ],
      cta: 'View Available Slots',
      color: '#f97316',
      gradient: 'from-orange-500 to-amber-500',
    },
    'ready-to-scale': {
      score: 'Ready to Scale Premium',
      headline: "You're Positioned for Serious Growth",
      subtitle: 'Your infrastructure is solid. Time to build a complete high-net-worth marketing system.',
      bullets: [
        'Full high net worth funnel + CRM integration for high-ticket leads',
        'Multi-channel premium media plan (Search, Social, Display)',
        'Concierge-level lead nurturing sequences',
      ],
      cta: 'Book Strategy Session',
      color: '#22c55e',
      gradient: 'from-green-500 to-emerald-500',
    },
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden relative">
      {/* Sticky CTA */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-amber-500/30 p-4 transition-all duration-300 ${
          showSticky ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-white/70 text-sm">
              <span className="text-amber-400 font-semibold">{spotsLeft} spots left</span> this week
            </span>
          </div>
          <a
            href="#calendly"
            className="w-full sm:w-auto text-center bg-gradient-to-r from-amber-500 to-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-500/30 transition-all"
          >
            Book Free Strategy Session →
          </a>
        </div>
      </div>

      {/* Animated Background - Gold/Luxury theme */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-yellow-500/15 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[200px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            A+Growth
          </a>
          <div className="flex items-center gap-2 text-sm text-white/50">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Results Ready</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        {/* Results Section */}
        <section className="py-8 animate-fadeIn">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
            {/* Animated Score Badge */}
            <div className="text-center mb-8">
              <div
                className="inline-block px-6 py-3 rounded-full mb-6 animate-pulse"
                style={{
                  background: `linear-gradient(135deg, ${readinessContent[readinessLevel].color}20, ${readinessContent[readinessLevel].color}10)`,
                  border: `2px solid ${readinessContent[readinessLevel].color}`,
                }}
              >
                <span
                  className="text-sm font-bold uppercase tracking-wider"
                  style={{ color: readinessContent[readinessLevel].color }}
                >
                  Readiness Level: {readinessContent[readinessLevel].score}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {readinessContent[readinessLevel].headline}
              </h1>
              <p className="text-lg text-white/60 max-w-xl mx-auto">
                {readinessContent[readinessLevel].subtitle}
              </p>
            </div>

            {/* Summary Card */}
            {(targetSegment !== 'your target high net worth segment' || goal) && (
              <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/10">
                <div className="grid md:grid-cols-2 gap-4">
                  {goal && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-white/50">Primary goal</p>
                        <p className="font-medium text-white">{goal}</p>
                      </div>
                    </div>
                  )}
                  {targetSegment !== 'your target high net worth segment' && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-white/50">Target segment</p>
                        <p className="font-medium text-white">{targetSegment}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Recommendations */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Your personalized roadmap:</h3>
              <div className="space-y-3">
                {readinessContent[readinessLevel].bullets.map((bullet, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: `${readinessContent[readinessLevel].color}30` }}
                    >
                      <span className="text-sm font-bold" style={{ color: readinessContent[readinessLevel].color }}>
                        {i + 1}
                      </span>
                    </div>
                    <span className="text-white/90">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Value Badge + CTA */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="text-white/50 line-through text-lg">$500 value</span>
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide animate-pulse">
                  FREE this week
                </span>
              </div>
              <p className="text-amber-400/80 text-sm">
                <span className="inline-flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Only {spotsLeft} spots available this week
                </span>
              </p>
            </div>

            <a
              href="#calendly"
              className={`block w-full text-center text-black px-6 py-5 rounded-2xl font-semibold text-lg transition-all hover:shadow-lg hover:scale-[1.02] bg-gradient-to-r ${readinessContent[readinessLevel].gradient}`}
              style={{ boxShadow: `0 10px 40px ${readinessContent[readinessLevel].color}30` }}
            >
              {readinessContent[readinessLevel].cta} →
            </a>
          </div>
        </section>

        {/* Who You'll Be Talking To Section - MOVED UP */}
        <section className="py-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Who You'll Be Talking To
              </h2>
              <p className="text-white/60">
                Your call will be with the founder — not a salesperson.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-xl shadow-amber-500/10">
                  <Image
                    src="/amir-profile.jpg"
                    alt="Amir Gomez - Digital Marketing Specialist"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-1">Amir Gomez</h3>
                <p className="text-amber-400 font-medium mb-4">Founder, A+Growth</p>

                <p className="text-white/70 mb-6 leading-relaxed">
                  10+ years scaling performance marketing campaigns for businesses of all sizes. I've helped generate over $125M in revenue through strategic paid media, conversion optimization, and marketing systems that actually scale.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">$125M+</div>
                    <div className="text-xs text-white/50 mt-1">Revenue Driven</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">100+</div>
                    <div className="text-xs text-white/50 mt-1">Campaigns Scaled</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">450%</div>
                    <div className="text-xs text-white/50 mt-1">Avg. ROI</div>
                  </div>
                </div>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {['Google Ads', 'Meta Ads', 'Scaling Strategy', 'CRO', 'Attribution', 'Creative Testing'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Proof Badges */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-center text-white/50 text-sm mb-4">Trusted by growth-focused brands</p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {['Google Partner', 'Meta Business Partner', '$10M+ Managed'].map((badge, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10"
                  >
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-white/70">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Client Results / Testimonials */}
        <section className="py-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                What Clients Are Saying
              </h2>
              <p className="text-white/60">
                Real results from businesses targeting high-net-worth customers
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Testimonial 1 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/80 mb-4 leading-relaxed">
                  "Within 60 days, we went from struggling to find affluent buyers to having a <span className="text-amber-400 font-semibold">340% increase in qualified leads</span>. Amir's targeting strategy was exactly what we needed."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-black font-bold">
                    JM
                  </div>
                  <div>
                    <p className="font-medium text-white">James M.</p>
                    <p className="text-sm text-white/50">Luxury Home Builder</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/80 mb-4 leading-relaxed">
                  "Best ROI we've ever seen on ads. <span className="text-amber-400 font-semibold">$47 cost per lead for $15K+ services</span>. The high-income targeting approach changed everything for our practice."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-black font-bold">
                    SK
                  </div>
                  <div>
                    <p className="font-medium text-white">Sarah K.</p>
                    <p className="text-sm text-white/50">Cosmetic Surgery Clinic</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What to Expect Section */}
        <section className="py-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                What to Expect on Your Call
              </h2>
              <p className="text-white/60">
                A focused 30-minute session designed to give you real value
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-amber-500/10 to-transparent rounded-xl border border-amber-500/20">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-400 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Quick Audit (5 min)</h4>
                  <p className="text-white/60 text-sm">We'll review your current setup and identify immediate gaps in your high-net-worth targeting</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-amber-500/10 to-transparent rounded-xl border border-amber-500/20">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-400 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Strategy Deep-Dive (15 min)</h4>
                  <p className="text-white/60 text-sm">I'll share 2-3 specific tactics you can implement to reach HHI $150K+ audiences effectively</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-amber-500/10 to-transparent rounded-xl border border-amber-500/20">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-400 font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Action Plan (10 min)</h4>
                  <p className="text-white/60 text-sm">You'll leave with a clear roadmap — whether we work together or you implement it yourself</p>
                </div>
              </div>
            </div>

            {/* Guarantee */}
            <div className="mt-8 p-5 bg-green-500/10 rounded-xl border border-green-500/30">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-green-400 mb-1">No-Pressure Guarantee</h4>
                  <p className="text-white/60 text-sm">If within the first 5 minutes you feel this isn't a fit, just say so and we'll end the call — no hard feelings, no sales pitch.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calendly Section */}
        <section id="calendly" className="py-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="text-white/50 line-through text-lg">$500 value</span>
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                  FREE this week
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Book Your Strategy Session
              </h2>
              <p className="text-white/60">
                30 minutes to review your roadmap and find quick wins for high net worth targeting.
              </p>
              <p className="text-amber-400 text-sm mt-2 font-medium">
                Only {spotsLeft} spots remaining this week
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden bg-white" style={{ minHeight: '700px' }}>
              <iframe
                src="https://calendly.com/amir-amirgomez/30min"
                width="100%"
                height="700"
                title="Calendly scheduling"
                style={{ border: 'none' }}
              />
            </div>

            <div className="text-center mt-6">
              <a
                href="https://calendly.com/amir-amirgomez/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 text-sm transition-colors"
              >
                Open Calendly in new tab →
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-16 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <p className="text-sm text-white/40 mb-2">
            © {new Date().getFullYear()} A+Growth •{' '}
            <a href="/privacy" className="hover:text-white/60 transition-colors">Privacy</a> •{' '}
            <a href="mailto:amir@amirgomez.com" className="hover:text-white/60 transition-colors">Contact</a>
          </p>
          <p className="text-xs text-white/30">We never share your data. Ever.</p>
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

export default function AffluentMarketQuizThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
