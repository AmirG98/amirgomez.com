'use client';

import { useState, useEffect } from 'react';

// Session ID management
const getSessionId = (): string => {
  if (typeof window === 'undefined') return '';
  let sessionId = sessionStorage.getItem('quiz_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('quiz_session_id', sessionId);
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
        formType: 'affluent_market_quiz_analytics',
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

export default function AffluentMarketQuizPage() {
  const [currentStep, setCurrentStep] = useState<'quiz' | 'leadgate'>('quiz');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
  });
  const [leadData, setLeadData] = useState({
    email: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Track page view on mount
  useEffect(() => {
    trackEvent('page_view', { page: 'affluent-market-quiz' });
    trackEvent('quiz_start', { question: 1 });
  }, []);

  const questions: {
    id: string;
    question: string;
    options: string[];
    hasOther: boolean;
    isOpenText?: boolean;
    placeholder?: string;
  }[] = [
    {
      id: 'q1',
      question: "What's your #1 goal with affluent customers?",
      options: [
        'Attract more luxury buyers - Grow your high-net-worth customer base',
        'Increase customer value - Higher spending, premium tiers, upsells',
        'Build luxury positioning - Elevate brand perception and prestige',
        'Expand into new markets - Reach untapped affluent audiences',
      ],
      hasOther: false,
    },
    {
      id: 'q2',
      question: 'Current premium targeting setup?',
      options: [
        'None (mass market approach)',
        'Some income-based targeting',
        'High net worth targeting + premium creative',
        'Full high-net-worth funnel with exclusivity',
        'Not sure',
      ],
      hasOther: false,
    },
    {
      id: 'q3',
      question: 'Which high net worth segment are you targeting?',
      isOpenText: true,
      placeholder: 'E.g., Luxury homeowners, C-suite executives, HENRY (High Earners Not Rich Yet)...',
      options: [],
      hasOther: false,
    },
    {
      id: 'q4',
      question: "What's your biggest challenge reaching wealthy buyers?",
      options: [
        "Don't know how to find them",
        "My brand doesn't feel premium enough",
        "Ads get ignored by high-income users",
        "Can't justify premium pricing",
        "Other",
      ],
      hasOther: true,
    },
  ];

  const progress = currentStep === 'quiz'
    ? ((currentQuestion + 1) / questions.length) * 80
    : 90;

  const calculateReadiness = (): 'foundation' | 'positioning' | 'ready-to-scale' => {
    let score = 0;

    // Q2: Current setup
    if (answers.q2 === 'Some income-based targeting') score += 1;
    else if (answers.q2 === 'Affluent targeting + premium creative') score += 2;
    else if (answers.q2 === 'Full high-net-worth funnel with exclusivity') score += 3;

    // Q4: Challenge (certain challenges indicate more readiness)
    if (answers.q4 === 'Ads get ignored by high-income users') score += 2;
    else if (answers.q4 === "Can't justify premium pricing") score += 1;

    if (score >= 4) return 'ready-to-scale';
    if (score >= 2) return 'positioning';
    return 'foundation';
  };

  const handleAnswer = (answer: string, autoAdvance = false) => {
    const questionId = questions[currentQuestion].id;
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    setErrors(prev => ({ ...prev, [questionId]: '' }));

    if (autoAdvance) {
      setTimeout(() => {
        advanceQuestion(questionId, answer);
      }, 400);
    }
  };

  const advanceQuestion = (questionId: string, answer: string) => {
    trackEvent('answer_question', {
      questionNumber: currentQuestion + 1,
      questionId,
      answer,
    });

    if (currentQuestion < questions.length - 1) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
      trackEvent('view_question', { questionNumber: nextQuestion + 1 });
    } else {
      trackEvent('complete_quiz', { answers: { ...answers, [questionId]: answer } });
      setCurrentStep('leadgate');
      trackEvent('view_leadgate', {});
    }
  };

  const handleNext = () => {
    const questionId = questions[currentQuestion].id;
    if (!answers[questionId]?.trim()) {
      setErrors(prev => ({ ...prev, [questionId]: 'Please select an option' }));
      return;
    }
    advanceQuestion(questionId, answers[questionId]);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!leadData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadData.email)) newErrors.email = 'Please enter a valid email';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const level = calculateReadiness();

    trackEvent('submit_lead', {
      email: leadData.email,
      readinessLevel: level,
      answers
    });

    // Send to Google Sheets
    const appsScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;
    if (appsScriptUrl && appsScriptUrl !== 'YOUR_APPS_SCRIPT_URL_HERE') {
      fetch(appsScriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'affluent_market_quiz',
          ...leadData,
          ...answers,
          readinessLevel: level,
        }),
        mode: 'no-cors',
      }).catch(console.error);
    }

    // Send email notification
    fetch('/api/notify-affluent-quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...leadData,
        ...answers,
        readinessLevel: level,
      }),
    }).catch(console.error);

    // Redirect to thank you page with results
    const params = new URLSearchParams({
      level,
      segment: answers.q3 || '',
      goal: answers.q1 || '',
    });
    window.location.href = `/thank/affluent-market-quiz?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden relative">
      {/* Animated Background - Gold/Luxury theme */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-yellow-500/15 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[200px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            A+Growth
          </a>
          <div className="flex items-center gap-2 text-sm text-white/50">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span>Premium</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-4 md:py-8">
        {/* Quiz Section */}
        {currentStep === 'quiz' && (
          <section className="py-2 md:py-8 animate-fadeIn">
            {/* Main Title - Only show on first question */}
            {currentQuestion === 0 && (
              <div className="text-center mb-4 md:mb-10">
                <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-3 md:mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                  </span>
                  <span className="text-xs md:text-sm font-medium text-amber-400">2-Minute Assessment</span>
                </div>
                <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 leading-tight tracking-tight">
                  Capture the{' '}
                  <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent">
                    High Net Worth Market
                  </span>
                </h1>
                <p className="text-sm md:text-lg text-white/60 max-w-xl mx-auto">
                  Answer 4 quick questions. Discover your readiness to attract high-net-worth buyers.
                </p>
              </div>
            )}

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-10 shadow-2xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/50">Question {currentQuestion + 1} of 4</span>
                <div className="flex gap-1">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`w-8 h-1 rounded-full transition-all duration-300 ${
                        i <= currentQuestion ? 'bg-amber-500' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <h2 className="text-xl md:text-3xl font-bold text-white mb-4 md:mb-8">
                {questions[currentQuestion].question}
              </h2>

              {questions[currentQuestion].isOpenText ? (
                <div>
                  <input
                    type="text"
                    value={answers[questions[currentQuestion].id] || ''}
                    onChange={(e) => handleAnswer(e.target.value)}
                    placeholder={questions[currentQuestion].placeholder}
                    className={`w-full px-4 md:px-6 py-3 md:py-4 bg-white/5 border ${
                      errors[questions[currentQuestion].id] ? 'border-red-500' : 'border-white/20'
                    } rounded-xl md:rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500 focus:bg-white/10 transition-all text-sm md:text-base`}
                  />
                  {errors[questions[currentQuestion].id] && (
                    <p className="text-red-400 text-sm mt-2">{errors[questions[currentQuestion].id]}</p>
                  )}
                </div>
              ) : (
                <div className="grid gap-2 md:gap-3">
                  {questions[currentQuestion].options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(option, true)}
                      className={`group px-4 md:px-6 py-3 md:py-4 text-left rounded-xl md:rounded-2xl border transition-all duration-300 ${
                        answers[questions[currentQuestion].id] === option
                          ? 'bg-amber-500/20 border-amber-500 text-white'
                          : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className={`w-4 md:w-5 h-4 md:h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                          answers[questions[currentQuestion].id] === option
                            ? 'border-amber-500 bg-amber-500'
                            : 'border-white/30 group-hover:border-white/50'
                        }`}>
                          {answers[questions[currentQuestion].id] === option && (
                            <svg className="w-2.5 md:w-3 h-2.5 md:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="font-medium text-sm md:text-base">{option}</span>
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
                      className="px-4 md:px-6 py-3 md:py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500 focus:bg-white/10 transition-all text-sm md:text-base"
                    />
                  )}
                  {errors[questions[currentQuestion].id] && (
                    <p className="text-red-400 text-sm">{errors[questions[currentQuestion].id]}</p>
                  )}
                </div>
              )}

              <div className="flex gap-3 md:gap-4 mt-6 md:mt-10">
                {currentQuestion > 0 && (
                  <button
                    onClick={() => setCurrentQuestion(prev => prev - 1)}
                    className="px-4 md:px-6 py-3 md:py-4 border border-white/20 rounded-xl md:rounded-2xl font-medium text-white/70 hover:bg-white/5 hover:text-white transition-all text-sm md:text-base"
                  >
                    ← Back
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-black px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold hover:from-amber-600 hover:to-yellow-600 transition-all hover:shadow-lg hover:shadow-amber-500/25 text-sm md:text-base"
                >
                  {currentQuestion < questions.length - 1 ? 'Next →' : 'See My Results →'}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Lead Gate Section */}
        {currentStep === 'leadgate' && (
          <section className="py-8 animate-fadeIn">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl max-w-md mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl mb-4">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Your results are ready!</h2>
                <p className="text-white/60">Enter your email to see your high net worth market readiness score.</p>
              </div>

              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Email</label>
                  <input
                    type="email"
                    value={leadData.email}
                    onChange={(e) => setLeadData(prev => ({ ...prev, email: e.target.value }))}
                    className={`w-full px-5 py-4 bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500 transition-all`}
                    placeholder="you@company.com"
                    autoFocus
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-black px-6 py-5 rounded-2xl font-semibold text-lg hover:from-amber-600 hover:to-yellow-600 transition-all hover:shadow-lg hover:shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : 'See My Results →'}
                </button>

                <p className="text-xs text-white/40 text-center pt-2">
                  We&apos;ll send your personalized roadmap to this email.
                </p>
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
  );
}
