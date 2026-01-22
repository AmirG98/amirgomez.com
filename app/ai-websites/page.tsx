'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getTranslations } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { AnimatedButton, FadeInView, HoverLift, StaggerContainer, CountUpNumber } from '@/components/animations';

export default function AIWebsitesPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = getTranslations('en');

  // Multi-step form state
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    companyName: '',
    website: '',
    industry: '',
    companySize: '',
    currentChallenges: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const partialData = { ...formData, formType: 'aiWebsite_partial', status: 'partial_submission' };
    const appsScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;
    if (appsScriptUrl && appsScriptUrl !== 'YOUR_APPS_SCRIPT_URL_HERE') {
      fetch(appsScriptUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(partialData), mode: 'no-cors' }).catch(console.error);
    }
    setStep(2);
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const finalData = { ...formData, formType: 'aiWebsite', status: 'completed' };
    const appsScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;
    if (appsScriptUrl && appsScriptUrl !== 'YOUR_APPS_SCRIPT_URL_HERE') {
      fetch(appsScriptUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(finalData), mode: 'no-cors' }).catch(console.error);
    }
    // Redirect immediately to thank you page
    window.location.href = '/thank-you/ai-audit';
  };

  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
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

      <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              AG
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white/60 hover:text-white transition-colors text-sm">{t.nav.home}</Link>
              <Link href="/about" className="text-white/60 hover:text-white transition-colors text-sm">{t.nav.about}</Link>
              <Link href="/services" className="text-white/60 hover:text-white transition-colors text-sm">{t.nav.services}</Link>
              <Link href="/contact" className="text-white/60 hover:text-white transition-colors text-sm">{t.nav.contact}</Link>
              <button
                onClick={scrollToForm}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2 rounded-full font-medium text-sm hover:from-orange-600 hover:to-orange-700 transition-all hover:scale-105"
              >
                Get Started
              </button>
            </div>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-white p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5 p-4 space-y-4">
              <Link href="/" className="block py-2 text-white/60 hover:text-white">{t.nav.home}</Link>
              <Link href="/about" className="block py-2 text-white/60 hover:text-white">{t.nav.about}</Link>
              <Link href="/services" className="block py-2 text-white/60 hover:text-white">{t.nav.services}</Link>
              <Link href="/contact" className="block py-2 text-white/60 hover:text-white">{t.nav.contact}</Link>
              <button onClick={() => { scrollToForm(); setIsMobileMenuOpen(false); }} className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-3 rounded-full font-medium">
                Get Started
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative">
        {/* Background gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] pointer-events-none" />

        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeInView>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-sm font-semibold text-green-400">FREE AI READINESS AUDIT</span>
                </div>
              </FadeInView>

              <FadeInView delay={0.1}>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
                  Get Found by{' '}
                  <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                    AI Search
                  </span>
                </h1>
              </FadeInView>

              <FadeInView delay={0.2}>
                <p className="text-xl text-white/60 mb-10 leading-relaxed max-w-xl">
                  ChatGPT, Perplexity, and AI agents are replacing Google.
                  We build websites that AI understands, trusts, and recommends.
                </p>
              </FadeInView>

              <FadeInView delay={0.3}>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={scrollToForm}
                    className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-orange-600 hover:to-orange-700 transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
                  >
                    Get Your Free AI Audit
                    <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </FadeInView>
            </div>

            {/* Hero Form - Glassmorphism */}
            <FadeInView delay={0.4}>
              <div id="lead-form" className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-purple-500/20 rounded-3xl blur-xl" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-6">🎉</div>
                      <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
                      <p className="text-white/60">We'll be in touch within 24 hours.</p>
                    </div>
                  ) : (
                    <>
                      <div className="mb-6">
                        <div className="inline-block bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold px-3 py-1 rounded-full mb-3">
                          100% FREE AUDIT
                        </div>
                        <h2 className="text-2xl font-bold mb-2">
                          {step === 1 ? 'Get Your Free AI Audit' : 'Tell Us About Your Business'}
                        </h2>
                        <p className="text-white/50 text-sm">
                          {step === 1 ? 'We\'ll analyze your site\'s AI readiness. No cost, no commitment.' : 'Help us tailor your audit recommendations.'}
                        </p>
                      </div>

                      {/* Progress */}
                      <div className="mb-8">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= 1 ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-white/10'}`}>
                            {step > 1 ? '✓' : '1'}
                          </div>
                          <div className={`flex-1 h-1 rounded-full transition-all ${step > 1 ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-white/10'}`} />
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= 2 ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-white/10'}`}>
                            2
                          </div>
                        </div>
                      </div>

                      {step === 1 ? (
                        <form onSubmit={handleStep1Submit} className="space-y-4">
                          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="Email address" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all placeholder:text-white/30" />
                          <div className="grid grid-cols-2 gap-4">
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required placeholder="First name" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all placeholder:text-white/30" />
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required placeholder="Last name" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all placeholder:text-white/30" />
                          </div>
                          <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="Phone number" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all placeholder:text-white/30" />
                          <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all hover:scale-[1.02]">
                            Continue →
                          </button>
                        </form>
                      ) : (
                        <form onSubmit={handleStep2Submit} className="space-y-4">
                          <div className="bg-white/5 rounded-lg p-3 mb-2 text-sm text-white/50">
                            {formData.firstName} {formData.lastName} · {formData.email}
                          </div>
                          <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} required placeholder="Company name" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all placeholder:text-white/30" />
                          <input type="text" name="website" value={formData.website} onChange={handleInputChange} placeholder="Current website (optional)" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all placeholder:text-white/30" />
                          <select name="industry" value={formData.industry} onChange={handleInputChange} required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500/50 text-white/70 [&>option]:bg-[#1a1a1a] [&>option]:text-white">
                            <option value="">Select industry</option>
                            <option value="E-commerce">E-commerce</option>
                            <option value="SaaS/Technology">SaaS/Technology</option>
                            <option value="Professional Services">Professional Services</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Real Estate">Real Estate</option>
                            <option value="Finance/Insurance">Finance/Insurance</option>
                            <option value="Other">Other</option>
                          </select>
                          <select name="companySize" value={formData.companySize} onChange={handleInputChange} required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500/50 text-white/70 [&>option]:bg-[#1a1a1a] [&>option]:text-white">
                            <option value="">Company size</option>
                            <option value="Solo/Freelancer">Solo/Freelancer</option>
                            <option value="2-10">2-10 employees</option>
                            <option value="11-50">11-50 employees</option>
                            <option value="51-200">51-200 employees</option>
                            <option value="200+">200+ employees</option>
                          </select>
                          <textarea name="currentChallenges" value={formData.currentChallenges} onChange={handleInputChange} required rows={3} placeholder="What are your goals?" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all placeholder:text-white/30 resize-none" />
                          <div className="flex gap-3">
                            <button type="button" onClick={() => setStep(1)} className="flex-1 px-4 py-3 border border-white/10 rounded-xl font-medium hover:bg-white/5 transition-all">
                              ← Back
                            </button>
                            <button type="submit" disabled={isSubmitting} className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50">
                              {isSubmitting ? 'Sending...' : 'Get Free Website Audit'}
                            </button>
                          </div>
                        </form>
                      )}
                    </>
                  )}
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* Stats Bento Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4" staggerDelay={0.1}>
            {[
              { value: 65, suffix: '%', label: 'Gen Z prefer AI over Google' },
              { value: 100, suffix: 'M+', label: 'Weekly ChatGPT users' },
              { value: 25, suffix: '%', label: 'Searches via AI by 2026' },
              { value: 0, suffix: '', label: 'Clicks when AI answers', displayValue: 'Zero' }
            ].map((stat, i) => (
              <HoverLift key={i}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center h-full">
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent mb-2">
                    {stat.displayValue || <><CountUpNumber to={stat.value} />{stat.suffix}</>}
                  </div>
                  <p className="text-white/50 text-sm">{stat.label}</p>
                </div>
              </HoverLift>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Problem/Solution Bento */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <FadeInView>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                The Search Game Has <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Changed</span>
              </h2>
              <p className="text-white/50 text-lg max-w-2xl mx-auto">
                Traditional SEO won't save you. Here's what's different now.
              </p>
            </div>
          </FadeInView>

          <div className="grid md:grid-cols-2 gap-6">
            <FadeInView delay={0.1}>
              <HoverLift>
                <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 rounded-3xl p-8 h-full">
                  <div className="text-red-400 text-sm font-semibold mb-4 uppercase tracking-wider">The Old Way</div>
                  <h3 className="text-2xl font-bold mb-6 text-red-300">Dying Strategies</h3>
                  <ul className="space-y-4">
                    {['Keyword stuffing for rankings', 'Fighting for 10 blue links', 'Paying for ad placement', 'Gaming Google\'s algorithm'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-white/60">
                        <span className="text-red-400">✗</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </HoverLift>
            </FadeInView>

            <FadeInView delay={0.2}>
              <HoverLift>
                <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-3xl p-8 h-full">
                  <div className="text-green-400 text-sm font-semibold mb-4 uppercase tracking-wider">The New Way</div>
                  <h3 className="text-2xl font-bold mb-6 text-green-300">What Works Now</h3>
                  <ul className="space-y-4">
                    {['Semantic clarity AI understands', 'Being the trusted recommendation', 'Authority & expertise signals', 'Structured data AI can parse'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-white/60">
                        <span className="text-green-400">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </HoverLift>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <FadeInView>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                What We <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">Build</span>
              </h2>
              <p className="text-white/50 text-lg">Everything AI needs to recommend you.</p>
            </div>
          </FadeInView>

          <StaggerContainer className="grid md:grid-cols-3 gap-4" staggerDelay={0.1}>
            {/* Large Feature Card */}
            <HoverLift className="md:col-span-2 md:row-span-2">
              <div className="bg-gradient-to-br from-orange-500/10 via-transparent to-purple-500/10 border border-white/10 rounded-3xl p-8 h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all duration-500" />
                <div className="relative">
                  <div className="text-5xl mb-6">🏗️</div>
                  <h3 className="text-2xl font-bold mb-4">AI-First Architecture</h3>
                  <p className="text-white/60 mb-6">We rebuild your site from the ground up with AI crawlability in mind. Semantic HTML, optimized structure, lightning performance.</p>
                  <div className="grid grid-cols-2 gap-3">
                    {['Semantic HTML5', 'Core Web Vitals', 'Mobile-first', 'WCAG Accessible'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-white/50">
                        <span className="text-orange-400">✓</span> {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </HoverLift>

            {/* Smaller Feature Cards */}
            <HoverLift>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 h-full">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold mb-2">Structured Data</h3>
                <p className="text-white/50 text-sm">Complete schema markup so AI knows exactly what you offer.</p>
              </div>
            </HoverLift>

            <HoverLift>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 h-full">
                <div className="text-4xl mb-4">✍️</div>
                <h3 className="text-xl font-bold mb-2">AI-Optimized Content</h3>
                <p className="text-white/50 text-sm">Clear, authoritative content AI trusts and recommends.</p>
              </div>
            </HoverLift>

            <HoverLift>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 h-full">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-bold mb-2">Agent Ready</h3>
                <p className="text-white/50 text-sm">Prepared for AI agents that book, buy, and interact.</p>
              </div>
            </HoverLift>

            <HoverLift>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 h-full">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-bold mb-2">Trust Signals</h3>
                <p className="text-white/50 text-sm">Reviews, citations, and authority markers AI evaluates.</p>
              </div>
            </HoverLift>

            <HoverLift>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 h-full">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl font-bold mb-2">AI Analytics</h3>
                <p className="text-white/50 text-sm">Track your visibility across AI platforms.</p>
              </div>
            </HoverLift>
          </StaggerContainer>
        </div>
      </section>

      {/* Industries Bento */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <FadeInView>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Perfect For
              </h2>
              <p className="text-white/50 text-lg">Businesses that need to be discovered.</p>
            </div>
          </FadeInView>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4" staggerDelay={0.08}>
            {[
              { icon: '⚖️', name: 'Legal', desc: 'Get recommended for legal queries' },
              { icon: '🏥', name: 'Healthcare', desc: 'AI referrals for medical needs' },
              { icon: '🏠', name: 'Real Estate', desc: 'Found when AI helps home searches' },
              { icon: '💼', name: 'B2B Services', desc: 'Recommended to business buyers' },
              { icon: '🛠️', name: 'Home Services', desc: 'Local AI recommendations' },
              { icon: '🛍️', name: 'E-commerce', desc: 'Product recommendations by AI' }
            ].map((item, i) => (
              <HoverLift key={i}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center h-full group hover:border-orange-500/30 transition-colors">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h3 className="font-bold mb-1">{item.name}</h3>
                  <p className="text-white/40 text-sm">{item.desc}</p>
                </div>
              </HoverLift>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <FadeInView>
            <h2 className="text-4xl font-bold mb-12 text-center">FAQ</h2>
          </FadeInView>

          <StaggerContainer className="space-y-4" staggerDelay={0.1}>
            {[
              { q: 'How is this different from SEO?', a: 'SEO focuses on keywords and backlinks. AI optimization focuses on structured data, semantic clarity, and authority signals that AI systems evaluate when making recommendations.' },
              { q: 'Will this hurt my Google rankings?', a: 'No—most AI optimizations also improve traditional SEO. Structured data, fast load times, and clear content benefit both.' },
              { q: 'Do I need to rebuild my entire site?', a: 'Not necessarily. We can often implement AI optimizations on existing sites, though older sites may benefit from a rebuild.' },
              { q: 'Which AI platforms will this work for?', a: 'All major ones: ChatGPT, Perplexity, Claude, Google AI Overviews, Bing Chat, and emerging AI agents.' }
            ].map((faq, i) => (
              <HoverLift key={i}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="font-bold mb-2">{faq.q}</h3>
                  <p className="text-white/50 text-sm">{faq.a}</p>
                </div>
              </HoverLift>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <FadeInView>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-purple-500/30 rounded-3xl blur-xl" />
              <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-12 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Ready to Be Found by AI?
                </h2>
                <p className="text-white/80 mb-8 max-w-xl mx-auto">
                  Don't wait until competitors dominate AI search. Get your free consultation today.
                </p>
                <button
                  onClick={scrollToForm}
                  className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-50 transition-all hover:scale-105 inline-flex items-center gap-2"
                >
                  Get Your Free Assessment
                  <span>→</span>
                </button>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/40 text-sm">© 2026 Amir Gomez. All rights reserved.</div>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-white/40 hover:text-white text-sm transition-colors">Privacy</Link>
              <Link href="mailto:amir@amirgomez.com" className="text-white/40 hover:text-white text-sm transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
