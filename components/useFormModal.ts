'use client';

import { useState } from 'react';
import { FormVariant } from './MultiStepForm';
import { formVariants } from './form-variants';
import { formVariantsEs } from './form-variants-es';

export function useFormModal(locale: string = 'en') {
  const [isOpen, setIsOpen] = useState(false);
  const [currentVariant, setCurrentVariant] = useState<FormVariant | null>(null);

  const openForm = (variantId: keyof typeof formVariants) => {
    const variants = locale === 'es' ? formVariantsEs : formVariants;
    setCurrentVariant(variants[variantId]);
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
    setCurrentVariant(null);
  };

  const handleSubmit = async (data: Record<string, string>) => {
    console.log('Form submitted:', data);
    
    // Add form type to the data
    const submissionData = {
      ...data,
      formType: currentVariant?.id
    };

    // Send to Google Sheets in background (non-blocking)
    const appsScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;
    
    if (appsScriptUrl && appsScriptUrl !== 'YOUR_APPS_SCRIPT_URL_HERE') {
      fetch(appsScriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
        mode: 'no-cors'
      }).then(() => {
        console.log('Form data sent to Google Sheets');
      }).catch((error) => {
        console.error('Error submitting form:', error);
      });
    } else {
      console.warn('Google Apps Script URL not configured');
    }
  };

  return {
    isOpen,
    currentVariant,
    openForm,
    closeForm,
    handleSubmit
  };
}