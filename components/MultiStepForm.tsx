'use client';

import { useState } from 'react';

export interface FormVariant {
  id: string;
  title: string;
  subtitle: string;
  step1Title: string;
  step1Subtitle: string;
  step2Fields: FormField[];
  submitText: string;
  successMessage: string;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'url' | 'select' | 'textarea';
  required?: boolean;
  placeholder?: string;
  options?: string[];
}

interface MultiStepFormProps {
  variant: FormVariant;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, string>) => void;
}

export default function MultiStepForm({ variant, isOpen, onClose, onSubmit }: MultiStepFormProps) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle escape key to close modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setFormData({ email });
      
      // Capture partial submission when email is entered
      try {
        const partialData = {
          email,
          formType: `${variant.id}_partial`,
          status: 'partial_submission'
        };

        // Send partial data to Google Sheets
        const appsScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;
        
        if (appsScriptUrl && appsScriptUrl !== 'YOUR_APPS_SCRIPT_URL_HERE') {
          await fetch(appsScriptUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(partialData),
            mode: 'no-cors'
          });
          console.log('Partial submission tracked for:', email);
        }
      } catch (error) {
        console.error('Error tracking partial submission:', error);
        // Don't block the form flow if tracking fails
      }
      
      setStep(2);
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const finalData = { ...formData, email, status: 'completed' };
      await onSubmit(finalData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setEmail('');
    setFormData({});
    setIsSubmitting(false);
    setIsSubmitted(false);
    onClose();
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="bg-background rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-foreground/10 p-6 rounded-t-xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{variant.title}</h2>
              <p className="text-sm text-foreground/70 mt-1">{variant.subtitle}</p>
            </div>
            <button 
              onClick={handleClose}
              className="text-foreground/60 hover:text-foreground text-2xl leading-none"
              aria-label="Close form"
            >
              ×
            </button>
          </div>
          
          {!isSubmitted && (
            <div className="mt-4">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= 1 ? 'bg-orange-600 text-white' : 'bg-foreground/10 text-foreground/60'
                }`}>
                  {step > 1 ? '✓' : '1'}
                </div>
                <div className={`flex-1 h-1 rounded ${
                  step > 1 ? 'bg-orange-600' : 'bg-foreground/10'
                }`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= 2 ? 'bg-orange-600 text-white' : 'bg-foreground/10 text-foreground/60'
                }`}>
                  2
                </div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-foreground/60">
                <span>Email</span>
                <span>Details</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-green-600 mb-2">Success!</h3>
              <p className="text-foreground/80 mb-6">{variant.successMessage}</p>
              <button 
                onClick={handleClose}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Close
              </button>
            </div>
          ) : step === 1 ? (
            <form onSubmit={handleStep1Submit} className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">{variant.step1Title}</h3>
                <p className="text-foreground/70 mb-6">{variant.step1Subtitle}</p>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="your@email.com"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={!email}
                className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:bg-foreground/20 disabled:cursor-not-allowed"
              >
                Continue →
              </button>
              
              <p className="text-xs text-foreground/60 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          ) : (
            <form onSubmit={handleStep2Submit} className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Almost Done!</h3>
                <p className="text-foreground/70 mb-6">Just a few more details to personalize your experience.</p>
                
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3 mb-6">
                  <div className="text-sm text-foreground/70">Email:</div>
                  <div className="font-semibold text-foreground">{email}</div>
                </div>
              </div>

              {variant.step2Fields.map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="block text-sm font-medium text-foreground mb-2">
                    {field.label} {field.required && '*'}
                  </label>
                  
                  {field.type === 'select' ? (
                    <select
                      id={field.name}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      required={field.required}
                      className="w-full px-4 py-3 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">{field.placeholder || `Select ${field.label.toLowerCase()}`}</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      required={field.required}
                      rows={3}
                      className="w-full px-4 py-3 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      required={field.required}
                      className="w-full px-4 py-3 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 border border-foreground/20 py-3 rounded-lg font-semibold hover:bg-foreground/5 transition-colors"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:bg-orange-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : variant.submitText}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}