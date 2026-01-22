'use client';

import { useState, useEffect } from 'react';

// Session ID management
const getSessionId = (): string => {
  if (typeof window === 'undefined') return '';
  let sessionId = sessionStorage.getItem('scaling_quiz_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('scaling_quiz_session_id', sessionId);
  }
  return sessionId;
};

// Production analytics - sends to Google Sheets
const trackEvent = (event: string, payload?: Record<string, unknown>) => {
  if (typeof window === 'undefined') return;

  const sessionId = getSessionId();
  const appsScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;

  // Send to Google Sheets
  if (appsScriptUrl && appsScriptUrl !== 'YOUR_APPS_SCRIPT_URL_HERE') {
    fetch(appsScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'scaling_assessment_analytics',
        event,
        sessionId,
        timestamp: new Date().toISOString(),
        ...payload,
      }),
      mode: 'no-cors',
    }).catch(console.error);
  }

  console.log(`[Analytics] ${event}`, { sessionId, ...payload });
};

export default function ScalingAssessmentPage() {
  const [currentStep, setCurrentStep] = useState<'quiz' | 'leadgate'>('quiz');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
  });
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    phone: '',
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Track page view on mount
  useEffect(() => {
    trackEvent('page_view', { page: 'scaling-assessment' });
    trackEvent('quiz_start', { question: 1 });
  }, []);

  const questions = [
    {
      id: 'q1',
      question: "What's your primary growth goal right now?",
      options: [
        'Generate more qualified leads',
        'Increase online revenue',
        'Lower customer acquisition cost',
        'Expand into new markets',
      ],
      hasOther: true,
    },
    {
      id: 'q2',
      question: 'What is your current monthly ad spend?',
      options: ['Under $5,000', '$5,000 - $15,000', '$15,000 - $50,000', '$50,000+', 'Not running ads yet'],
      hasOther: false,
    },
    {
      id: 'q3',
      question: 'Which channels are you currently using?',
      options: [
        'Google Ads only',
        'Meta (Facebook/Instagram) only',
        'Both Google & Meta',
        'Multiple channels (Google, Meta, TikTok, etc.)',
        'None yet',
      ],
      hasOther: false,
    },
    {
      id: 'q4',
      question: "What's your biggest marketing challenge?",
      options: [],
      isOpenText: true,
      placeholder: 'E.g., high CPL, low ROAS, scaling issues, attribution...',
    },
    {
      id: 'q5',
      question: 'How soon are you looking to scale?',
      options: ['Ready now - need help this week', 'Within the next 2-4 weeks', 'Planning for next quarter', 'Just researching options'],
      hasOther: true,
    },
  ];

  const progress = currentStep === 'quiz' ? ((currentQuestion + 1) / 5) * 60 : currentStep === 'leadgate' ? 80 : 100;

  const calculateScalingReadiness = (): 'foundation' | 'growth' | 'scale' => {
    const budget = answers.q2;
    const channels = answers.q3;
    const timeline = answers.q5;

    // Scale Ready: High budget + multi-channel + urgent timeline
    if (
      (budget === '$15,000 - $50,000' || budget === '$50,000+') &&
      (channels === 'Both Google & Meta' || channels === 'Multiple channels (Google, Meta, TikTok, etc.)') &&
      (timeline === 'Ready now - need help this week' || timeline === 'Within the next 2-4 weeks')
    ) {
      return 'scale';
    }

    // Growth Stage: Medium budget or multi-channel or active timeline
    if (
      budget === '$5,000 - $15,000' ||
      budget === '$15,000 - $50,000' ||
      channels === 'Both Google & Meta' ||
      timeline === 'Ready now - need help this week' ||
      timeline === 'Within the next 2-4 weeks'
    ) {
      return 'growth';
    }

    // Foundation: Just starting out
    return 'foundation';
  };

  const handleAnswer = (answer: string) => {
    const questionId = questions[currentQuestion].id;
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    const questionId = questions[currentQuestion].id;
    if (!answers[questionId]) {
      setErrors({ [questionId]: 'Please select or enter an answer' });
      return;
    }
    setErrors({});

    // Track answer for current question
    trackEvent('answer_question', {
      questionNumber: currentQuestion + 1,
      questionId,
      answer: answers[questionId]
    });

    if (currentQuestion < questions.length - 1) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
      // Track viewing the next question
      trackEvent('view_question', { questionNumber: nextQuestion + 1 });
    } else {
      // Quiz completed, moving to lead gate
      trackEvent('complete_quiz', { answers });
      setCurrentStep('leadgate');
      trackEvent('view_leadgate', {});
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!leadData.name.trim()) newErrors.name = 'Name is required';
    if (!leadData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadData.email)) newErrors.email = 'Please enter a valid email';
    if (!leadData.consent) newErrors.consent = 'Please agree to be contacted';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const level = calculateScalingReadiness();

    // Track lead submission
    trackEvent('submit_lead', {
      name: leadData.name,
      email: leadData.email,
      company: leadData.company,
      scalingLevel: level,
      answers
    });

    // Send to Google Sheets
    const appsScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;
    if (appsScriptUrl && appsScriptUrl !== 'YOUR_APPS_SCRIPT_URL_HERE') {
      fetch(appsScriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'scaling_assessment',
          ...leadData,
          ...answers,
          scalingLevel: level,
        }),
        mode: 'no-cors',
      }).catch(console.error);
    }

    // Redirect to thank you page with results
    const params = new URLSearchParams({
      level,
      challenge: answers.q4 || '',
      goal: answers.q1 || '',
    });
    window.location.href = `/thank/scaling-assessment?${params.toString()}`;
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
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[200px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Header */}
        <header className="relative z-10 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
            <a href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
              A+Growth
            </a>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Free Assessment</span>
            </div>
          </div>
        </header>

        <main className="relative z-10 max-w-4xl mx-auto px-6 py-8">
          {/* Quiz Section */}
          {currentStep === 'quiz' && (
            <section className="py-8 animate-fadeIn">
              {/* Main Title - Only show on first question */}
              {currentQuestion === 0 && (
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                    </span>
                    <span className="text-sm font-medium text-blue-400">2-Minute Assessment</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight tracking-tight">
                    Is Your Marketing{' '}
                    <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                      Ready to Scale?
                    </span>
                  </h1>
                  <p className="text-lg text-white/60 max-w-xl mx-auto">
                    Answer 5 quick questions. Get your personalized scaling roadmap instantly.
                  </p>
                </div>
              )}

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/50">Question {currentQuestion + 1} of 5</span>
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`w-8 h-1 rounded-full transition-all duration-300 ${
                          i <= currentQuestion ? 'bg-blue-500' : 'bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                  {questions[currentQuestion].question}
                </h2>

                {questions[currentQuestion].isOpenText ? (
                  <div>
                    <input
                      type="text"
                      value={answers[questions[currentQuestion].id] || ''}
                      onChange={(e) => handleAnswer(e.target.value)}
                      placeholder={questions[currentQuestion].placeholder}
                      className={`w-full px-6 py-4 bg-white/5 border ${
                        errors[questions[currentQuestion].id] ? 'border-red-500' : 'border-white/20'
                      } rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all`}
                    />
                    {errors[questions[currentQuestion].id] && (
                      <p className="text-red-400 text-sm mt-2">{errors[questions[currentQuestion].id]}</p>
                    )}
                  </div>
                ) : (
                  <div className="grid gap-3">
                    {questions[currentQuestion].options.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswer(option)}
                        className={`group px-6 py-4 text-left rounded-2xl border transition-all duration-300 ${
                          answers[questions[currentQuestion].id] === option
                            ? 'bg-blue-500/20 border-blue-500 text-white'
                            : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            answers[questions[currentQuestion].id] === option
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-white/30 group-hover:border-white/50'
                          }`}>
                            {answers[questions[currentQuestion].id] === option && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <span className="font-medium">{option}</span>
                        </div>
                      </button>
                    ))}
                    {questions[currentQuestion].hasOther && (
                      <input
                        type="text"
                        placeholder="Other (specify)"
                        value={
                          !questions[currentQuestion].options.includes(answers[questions[currentQuestion].id] || '')
                            ? answers[questions[currentQuestion].id] || ''
                            : ''
                        }
                        onChange={(e) => handleAnswer(e.target.value)}
                        className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all"
                      />
                    )}
                    {errors[questions[currentQuestion].id] && (
                      <p className="text-red-400 text-sm">{errors[questions[currentQuestion].id]}</p>
                    )}
                  </div>
                )}

                <div className="flex gap-4 mt-10">
                  {currentQuestion > 0 && (
                    <button
                      onClick={() => setCurrentQuestion(prev => prev - 1)}
                      className="px-6 py-4 border border-white/20 rounded-2xl font-medium text-white/70 hover:bg-white/5 hover:text-white transition-all"
                    >
                      Back
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-4 rounded-2xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    {currentQuestion < questions.length - 1 ? 'Next' : 'See My Results'}
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Lead Gate Section */}
          {currentStep === 'leadgate' && (
            <section className="py-8 animate-fadeIn">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Your scaling roadmap is ready!</h2>
                  <p className="text-white/60">Enter your details to see your personalized recommendations.</p>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Name *</label>
                      <input
                        type="text"
                        value={leadData.name}
                        onChange={(e) => setLeadData(prev => ({ ...prev, name: e.target.value }))}
                        className={`w-full px-5 py-4 bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 transition-all`}
                        placeholder="Your name"
                      />
                      {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Work Email *</label>
                      <input
                        type="email"
                        value={leadData.email}
                        onChange={(e) => setLeadData(prev => ({ ...prev, email: e.target.value }))}
                        className={`w-full px-5 py-4 bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 transition-all`}
                        placeholder="you@company.com"
                      />
                      {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Company</label>
                      <input
                        type="text"
                        value={leadData.company}
                        onChange={(e) => setLeadData(prev => ({ ...prev, company: e.target.value }))}
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 transition-all"
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Website</label>
                      <input
                        type="text"
                        value={leadData.website}
                        onChange={(e) => setLeadData(prev => ({ ...prev, website: e.target.value }))}
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 transition-all"
                        placeholder="yoursite.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={leadData.phone}
                      onChange={(e) => setLeadData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 transition-all"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={leadData.consent}
                      onChange={(e) => setLeadData(prev => ({ ...prev, consent: e.target.checked }))}
                      className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
                    />
                    <label htmlFor="consent" className="text-sm text-white/60">
                      I agree to receive my scaling roadmap and follow-up insights. *
                    </label>
                  </div>
                  {errors.consent && <p className="text-red-400 text-sm">{errors.consent}</p>}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-5 rounded-2xl font-semibold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                  >
                    {isSubmitting ? 'Processing...' : 'Get My Scaling Roadmap'}
                  </button>
                </form>
              </div>
            </section>
          )}

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
