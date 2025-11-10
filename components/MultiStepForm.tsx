'use client';

import { useState } from 'react';
import { AnimatedButton } from './animations';

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
  locale?: string;
}

export default function MultiStepForm({ variant, isOpen, onClose, onSubmit, locale = 'en' }: MultiStepFormProps) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isStep1Loading, setIsStep1Loading] = useState(false);

  const isSpanish = locale === 'es';
  const texts = {
    emailLabel: isSpanish ? 'Dirección de Email' : 'Email Address',
    emailPlaceholder: isSpanish ? 'tu@email.com' : 'your@email.com',
    continue: isSpanish ? 'Continuar →' : 'Continue →',
    loading: isSpanish ? 'Cargando...' : 'Loading...',
    almostDone: isSpanish ? '¡Casi Terminamos!' : 'Almost Done!',
    step2Subtitle: isSpanish ? 'Solo algunos detalles más para personalizar tu experiencia.' : 'Just a few more details to personalize your experience.',
    emailPrefix: isSpanish ? 'Email:' : 'Email:',
    back: isSpanish ? '← Atrás' : '← Back',
    submitting: isSpanish ? 'Enviando...' : 'Submitting...',
    privacy: isSpanish ? 'Respetamos tu privacidad. Cancela en cualquier momento.' : 'We respect your privacy. Unsubscribe at any time.',
    success: isSpanish ? '¡Éxito!' : 'Success!',
    close: isSpanish ? 'Cerrar' : 'Close',
    stepLabels: {
      email: isSpanish ? 'Email' : 'Email',
      details: isSpanish ? 'Detalles' : 'Details'
    },
    selectPlaceholder: isSpanish ? 'Seleccionar' : 'Select'
  };

  // Handle escape key to close modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Show loading state immediately
      setIsStep1Loading(true);
      
      setFormData({ email });
      
      // Small delay to show loading state, then advance
      setTimeout(() => {
        setStep(2);
        setIsStep1Loading(false);
      }, 200);
      
      // Capture partial submission in the background (non-blocking)
      const partialData = {
        email,
        formType: `${variant.id}_partial`,
        status: 'partial_submission'
      };

      // Send partial data to Google Sheets in background
      const appsScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;
      
      if (appsScriptUrl && appsScriptUrl !== 'YOUR_APPS_SCRIPT_URL_HERE') {
        fetch(appsScriptUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(partialData),
          mode: 'no-cors'
        }).then(() => {
          console.log('Partial submission tracked for:', email);
        }).catch((error) => {
          console.error('Error tracking partial submission:', error);
        });
      }
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
    setIsStep1Loading(false);
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
              <p className="text-sm text-foreground/90 mt-1">{variant.subtitle}</p>
            </div>
            <button 
              onClick={handleClose}
              className="text-foreground/80 hover:text-foreground text-2xl leading-none"
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
              <div className="flex justify-between mt-2 text-xs text-foreground/80">
                <span>{texts.stepLabels.email}</span>
                <span>{texts.stepLabels.details}</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-green-600 mb-2">{texts.success}</h3>
              <p className="text-foreground/95 mb-6">Redirecting you to complete your request...</p>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
              </div>
            </div>
          ) : step === 1 ? (
            <form onSubmit={handleStep1Submit} className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">{variant.step1Title}</h3>
                <p className="text-foreground/90 mb-6">{variant.step1Subtitle}</p>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  {texts.emailLabel} *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-foreground/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground"
                  placeholder={texts.emailPlaceholder}
                  autoFocus
                />
              </div>

              <AnimatedButton
                type="submit"
                disabled={!email || isStep1Loading}
                loading={isStep1Loading}
                variant="primary"
                className="w-full"
              >
                {texts.continue}
              </AnimatedButton>
              
              <p className="text-xs text-foreground/80 text-center">
                {texts.privacy}
              </p>
            </form>
          ) : (
            <form onSubmit={handleStep2Submit} className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">{texts.almostDone}</h3>
                <p className="text-foreground/90 mb-6">{texts.step2Subtitle}</p>
                
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3 mb-6">
                  <div className="text-sm text-foreground/90">{texts.emailPrefix}</div>
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
                      className="w-full px-4 py-3 border border-foreground/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground"
                    >
                      <option value="">{field.placeholder || `${texts.selectPlaceholder} ${field.label.toLowerCase()}`}</option>
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
                      className="w-full px-4 py-3 border border-foreground/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground"
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      required={field.required}
                      className="w-full px-4 py-3 border border-foreground/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground"
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}

              <div className="flex gap-3">
                <AnimatedButton
                  type="button"
                  onClick={() => setStep(1)}
                  variant="secondary"
                  className="flex-1"
                >
                  {texts.back}
                </AnimatedButton>
                <AnimatedButton
                  type="submit"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  variant="primary"
                  className="flex-1"
                >
                  {variant.submitText}
                </AnimatedButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}