'use client';

import { useState } from 'react';

interface NewsletterSignupProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

export default function NewsletterSignup({
  title = "Get More Insights Like This",
  subtitle = "Join 5,000+ marketers getting weekly strategies, case studies, and tactics delivered to their inbox.",
  placeholder = "Enter your email",
  buttonText = "Subscribe",
  className = ""
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Create newsletter subscription data
      const submissionData = {
        email,
        formType: 'newsletter',
        // Extract first name from email if possible, otherwise leave empty
        firstName: '',
        lastName: ''
      };

      // Send to Google Sheets via Apps Script
      const appsScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;
      
      if (!appsScriptUrl || appsScriptUrl === 'YOUR_APPS_SCRIPT_URL_HERE') {
        console.warn('Google Apps Script URL not configured');
        setIsSubmitted(true);
        return;
      }

      await fetch(appsScriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
        mode: 'no-cors' // Required for Google Apps Script
      });

      console.log('Newsletter subscription sent to Google Sheets');
      setIsSubmitted(true);
      setEmail('');
      
    } catch (error) {
      console.error('Error submitting newsletter subscription:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`text-center ${className}`}>
        <div className="max-w-2xl mx-auto">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <div className="text-green-600 dark:text-green-400 text-5xl mb-4">✓</div>
            <h3 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
              Welcome to the community!
            </h3>
            <p className="text-green-700 dark:text-green-300">
              Check your email for confirmation and your first marketing insights.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`text-center ${className}`}>
      <div className="max-w-2xl mx-auto">
        <h3 className="text-3xl font-bold mb-4">
          {title}
        </h3>
        <p className="text-xl text-foreground/80 mb-8">
          {subtitle}
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            disabled={isSubmitting}
            className="flex-1 px-4 py-3 rounded-lg border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50"
            required
          />
          <button 
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Subscribing...' : buttonText}
          </button>
        </form>
        
        {error && (
          <p className="text-red-600 text-sm mt-2">{error}</p>
        )}
        
        <p className="text-sm text-foreground/60 mt-4">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}