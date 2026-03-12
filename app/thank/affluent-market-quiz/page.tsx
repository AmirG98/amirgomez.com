'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const [readinessLevel, setReadinessLevel] = useState<'foundation' | 'positioning' | 'ready-to-scale'>('foundation');
  const [targetSegment, setTargetSegment] = useState('your target high net worth segment');
  const [goal, setGoal] = useState('');
  const [email, setEmail] = useState('');
  const [showSticky, setShowSticky] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    const emailParam = searchParams.get('email');

    if (level) setReadinessLevel(level);
    if (segment) setTargetSegment(segment);
    if (goalParam) setGoal(goalParam);
    if (emailParam) setEmail(emailParam);
  }, [searchParams]);

  const handleRequestRoadmap = async () => {
    if (isSubmitting || isSubmitted) return;

    setIsSubmitting(true);

    try {
      await fetch('/api/request-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          readinessLevel,
          targetSegment,
          goal,
          source: 'affluent-market-quiz',
        }),
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to send request:', error);
      // Still show success to user - we'll get the notification
      setIsSubmitted(true);
    }
  };

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
      cta: 'Get My Free Roadmap',
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
      cta: 'Get My Free Roadmap',
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
      cta: 'Get My Free Roadmap',
      color: '#22c55e',
      gradient: 'from-green-500 to-emerald-500',
    },
  };

  // Success state
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden relative">
        {/* Animated Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-green-500/20 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 max-w-lg mx-auto px-6 py-8 text-center">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Request Received!
            </h1>

            <p className="text-white/70 mb-6 leading-relaxed">
              I'll personally review your quiz results and send you a custom roadmap for targeting high-net-worth customers within <span className="text-green-400 font-semibold">24 hours</span>.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-6">
              <p className="text-sm text-white/60">
                Check your inbox for an email from <span className="text-amber-400">amir@amirgomez.com</span>
              </p>
            </div>

          </div>

          {/* Book a call header */}
          <div className="mt-8 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
              Or Book a Call to Discuss Your Roadmap Live
            </h2>
            <p className="text-white/60 text-sm">Skip the wait — let's talk strategy now</p>
          </div>

          {/* Calendly Embed */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 md:p-6 shadow-2xl mt-6">
            <div className="rounded-2xl overflow-hidden bg-white" style={{ minHeight: '600px' }}>
              <iframe
                src="https://calendly.com/amir-amirgomez/30min"
                width="100%"
                height="600"
                title="Calendly scheduling"
                style={{ border: 'none' }}
              />
            </div>
            <p className="text-white/40 text-xs mt-3 text-center">30-min strategy call • No obligation</p>
          </div>

          <a
            href="/"
            className="inline-block text-white/50 hover:text-white/70 text-sm transition-colors mt-6"
          >
            ← Back to homepage
          </a>
        </div>
      </div>
    );
  }

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
              <span className="text-amber-400 font-semibold">Free personalized roadmap</span>
            </span>
          </div>
          <button
            onClick={handleRequestRoadmap}
            disabled={isSubmitting}
            className="w-full sm:w-auto text-center bg-gradient-to-r from-amber-500 to-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-500/30 transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : 'Get My Free Roadmap →'}
          </button>
        </div>
      </div>

      {/* Animated Background - Gold/Luxury theme */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-yellow-500/15 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[200px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header - Compact */}
      <header className="relative z-10 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <a href="/" className="text-lg font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            A+Growth
          </a>
          <div className="flex items-center gap-2 text-xs text-white/50">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Results Ready</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-4 py-4">
        {/* Results Section */}
        <section className="animate-fadeIn">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 md:p-8 shadow-2xl">
            {/* Header + CTA Above the Fold */}
            <div className="text-center mb-6">
              <div
                className="inline-block px-4 py-2 rounded-full mb-4"
                style={{
                  background: `linear-gradient(135deg, ${readinessContent[readinessLevel].color}20, ${readinessContent[readinessLevel].color}10)`,
                  border: `2px solid ${readinessContent[readinessLevel].color}`,
                }}
              >
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: readinessContent[readinessLevel].color }}
                >
                  {readinessContent[readinessLevel].score}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {readinessContent[readinessLevel].headline}
              </h1>
              <p className="text-base text-white/60 max-w-xl mx-auto mb-4">
                {readinessContent[readinessLevel].subtitle}
              </p>

              {/* CTA - ABOVE THE FOLD */}
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="text-white/50 line-through">$500 value</span>
                <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-xs font-bold uppercase">
                  FREE
                </span>
              </div>

              <button
                onClick={handleRequestRoadmap}
                disabled={isSubmitting}
                className={`block w-full text-center text-black px-6 py-4 rounded-2xl font-semibold text-lg transition-all hover:shadow-lg hover:scale-[1.02] bg-gradient-to-r ${readinessContent[readinessLevel].gradient} mb-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                style={{ boxShadow: `0 10px 40px ${readinessContent[readinessLevel].color}30` }}
              >
                {isSubmitting ? 'Sending Request...' : readinessContent[readinessLevel].cta + ' →'}
              </button>

              <p className="text-amber-400/80 text-xs">
                <span className="inline-flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  I'll send your personalized roadmap within 24 hours
                </span>
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-white/10 my-6" />

            {/* Summary Card - Compact */}
            {(targetSegment !== 'your target high net worth segment' || goal) && (
              <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
                <div className="flex flex-wrap gap-4 justify-center">
                  {goal && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-white/70">Goal: <span className="text-white font-medium">{goal}</span></span>
                    </div>
                  )}
                  {targetSegment !== 'your target high net worth segment' && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm text-white/70">Segment: <span className="text-white font-medium">{targetSegment}</span></span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Recommendations - Compact */}
            <div>
              <h3 className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wide">Your Roadmap Preview</h3>
              <div className="space-y-2">
                {readinessContent[readinessLevel].bullets.map((bullet, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${readinessContent[readinessLevel].color}30` }}
                    >
                      <span className="text-xs font-bold" style={{ color: readinessContent[readinessLevel].color }}>
                        {i + 1}
                      </span>
                    </div>
                    <span className="text-sm text-white/80">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Who You'll Be Talking To Section */}
        <section className="py-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Who's Behind Your Roadmap
              </h2>
              <p className="text-white/60">
                Your roadmap will be created personally by the founder.
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

        {/* What You'll Get Section */}
        <section className="py-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                What's In Your Free Roadmap
              </h2>
              <p className="text-white/60">
                A personalized action plan delivered to your inbox within 24 hours
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-amber-500/10 to-transparent rounded-xl border border-amber-500/20">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Custom Targeting Strategy</h4>
                  <p className="text-white/60 text-sm">Specific audience segments for your business to reach HNW individuals</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-amber-500/10 to-transparent rounded-xl border border-amber-500/20">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Quick Win Opportunities</h4>
                  <p className="text-white/60 text-sm">2-3 tactics you can implement immediately based on your current setup</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-amber-500/10 to-transparent rounded-xl border border-amber-500/20">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Premium Positioning Tips</h4>
                  <p className="text-white/60 text-sm">How to position your brand to attract high-net-worth customers</p>
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className="mt-8 text-center">
              <button
                onClick={handleRequestRoadmap}
                disabled={isSubmitting}
                className={`w-full md:w-auto bg-gradient-to-r ${readinessContent[readinessLevel].gradient} text-black px-8 py-4 rounded-2xl font-semibold text-lg transition-all hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? 'Sending Request...' : 'Get My Free Roadmap →'}
              </button>
              <p className="text-white/50 text-xs mt-3">No call required. Delivered straight to your inbox.</p>
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
