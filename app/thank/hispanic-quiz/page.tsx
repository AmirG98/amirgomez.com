'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const [readinessLevel, setReadinessLevel] = useState<'getting-started' | 'building-momentum' | 'ready-to-scale'>('getting-started');
  const [targetMarket, setTargetMarket] = useState('your target market');
  const [goal, setGoal] = useState('');

  useEffect(() => {
    const level = searchParams.get('level') as 'getting-started' | 'building-momentum' | 'ready-to-scale';
    const market = searchParams.get('market');
    const goalParam = searchParams.get('goal');

    if (level) setReadinessLevel(level);
    if (market) setTargetMarket(market);
    if (goalParam) setGoal(goalParam);
  }, [searchParams]);

  const readinessContent = {
    'getting-started': {
      score: 'Getting Started',
      headline: "You're Ready to Tap Into the Hispanic Market",
      subtitle: "Your business has strong potential—here's what you need to connect with Spanish-speaking audiences.",
      bullets: [
        'ES/EN landing page + 5 bilingual ad creatives',
        'Basic Spanish tracking setup (calls/forms)',
        'Spanish search campaign for your target GEO',
      ],
      cta: 'Get Your Free Readiness Audit',
      color: '#3b82f6',
      gradient: 'from-blue-500 to-blue-600',
    },
    'building-momentum': {
      score: 'Building Momentum',
      headline: "You're Making Progress—Let's Accelerate",
      subtitle: "You've started reaching Hispanic audiences. Here's how to maximize your momentum.",
      bullets: [
        'Spanish Search + Meta campaigns (5–10 ads)',
        'Optimized ES landing with CRO best practices',
        'Weekly ES vs EN performance reporting',
      ],
      cta: 'See Available Launch Slots',
      color: '#f97316',
      gradient: 'from-orange-500 to-orange-600',
    },
    'ready-to-scale': {
      score: 'Ready to Scale',
      headline: "You're Positioned for Serious Growth",
      subtitle: 'Your infrastructure is strong. Time to build a full-funnel Hispanic marketing system.',
      bullets: [
        'Full ES/EN funnel + WhatsApp handoff',
        'DMA media plan for your GEO in 48h',
        'Call tracking + CRM split attribution',
      ],
      cta: 'Schedule Strategy Session',
      color: '#22c55e',
      gradient: 'from-green-500 to-green-600',
    },
  };

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
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-5HKRKM7F"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden relative">
        {/* Animated Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[200px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Header */}
        <header className="relative z-10 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
            <a href="/" className="text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
              A+Growth
            </a>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>ES/EN</span>
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
                    Hispanic Market Readiness: {readinessContent[readinessLevel].score}
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
              {(targetMarket || goal) && (
                <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/10">
                  <div className="grid md:grid-cols-2 gap-4">
                    {targetMarket && targetMarket !== 'your target market' && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                          <span className="text-orange-400">📍</span>
                        </div>
                        <div>
                          <p className="text-sm text-white/50">Target market</p>
                          <p className="font-medium text-white">{targetMarket}</p>
                        </div>
                      </div>
                    )}
                    {goal && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                          <span className="text-orange-400">🎯</span>
                        </div>
                        <div>
                          <p className="text-sm text-white/50">Primary goal</p>
                          <p className="font-medium text-white">{goal}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Recommended next steps:</h3>
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
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          style={{ color: readinessContent[readinessLevel].color }}
                        >
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-white/90">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#calendly"
                className={`block w-full text-center text-white px-6 py-5 rounded-2xl font-semibold text-lg transition-all hover:shadow-lg bg-gradient-to-r ${readinessContent[readinessLevel].gradient}`}
                style={{ boxShadow: `0 10px 40px ${readinessContent[readinessLevel].color}30` }}
              >
                {readinessContent[readinessLevel].cta} →
              </a>
            </div>
          </section>

          {/* Calendly Section */}
          <section id="calendly" className="py-8">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Book a 30-minute session
                </h2>
                <p className="text-white/60">
                  {`We'll review your readiness score and next steps for ${targetMarket}.`}
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden bg-white" style={{ minHeight: '700px' }}>
                <iframe
                  src="https://calendly.com/amir-amirgomez/30min"
                  width="100%"
                  height="700"
                  frameBorder="0"
                  scrolling="yes"
                  title="Calendly scheduling"
                  style={{ border: 'none' }}
                />
              </div>

              <div className="text-center mt-6">
                <a
                  href="https://calendly.com/amir-amirgomez/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:text-orange-300 text-sm transition-colors"
                >
                  Open Calendly in new tab →
                </a>
              </div>
            </div>
          </section>

          {/* Who You'll Be Talking To Section */}
          <section className="py-8">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Who You'll Be Talking To
                </h2>
                <p className="text-white/60">
                  Your call will be with the founder, not a sales rep.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-2 border-orange-500/30 shadow-xl shadow-orange-500/10">
                    <Image
                      src="/amir-profile.jpg"
                      alt="Amir Gomez - Hispanic Marketing Specialist"
                      width={192}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-1">Amir Gomez</h3>
                  <p className="text-orange-400 font-medium mb-4">Founder, A+Growth</p>

                  <p className="text-white/70 mb-6 leading-relaxed">
                    Native Spanish speaker with 10+ years in performance marketing. I've helped businesses generate over $125M in revenue through bilingual campaigns that actually convert. My specialty? Building ES/EN funnels that capture the Hispanic market without the guesswork.
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">$125M+</div>
                      <div className="text-xs text-white/50 mt-1">Revenue Generated</div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">100+</div>
                      <div className="text-xs text-white/50 mt-1">Funnels Built</div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">450%</div>
                      <div className="text-xs text-white/50 mt-1">Avg. ROI</div>
                    </div>
                  </div>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {['Google Ads', 'Meta Ads', 'ES/EN Funnels', 'CRO', 'WhatsApp Marketing', 'Call Tracking'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-center text-white/50 text-sm mb-4">Trusted by brands targeting Hispanic audiences</p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {['Google Partner', 'Meta Business Partner', 'Bilingual Certified'].map((badge, i) => (
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
    </>
  );
}

export default function HispanicQuizThankYouPage() {
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
