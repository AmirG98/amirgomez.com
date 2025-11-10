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

    // Redirect to appropriate thank you page after a brief delay
    setTimeout(() => {
      const formType = currentVariant?.id;
      if (formType) {
        // Map form types to their corresponding thank you pages
        const thankYouRoutes: Record<string, string> = {
          consultation: '/thank-you/consultation',
          audit: '/thank-you/audit',
          campaign: '/thank-you/campaign',
          caseStudies: '/thank-you/case-studies',
          newsletter: '/thank-you/newsletter'
        };

        const redirectUrl = thankYouRoutes[formType];
        if (redirectUrl) {
          // Close the modal first
          closeForm();
          // Then redirect to the thank you page
          window.location.href = redirectUrl;
        }
      }
    }, 1000); // 1 second delay to allow form submission to complete
  };

  return {
    isOpen,
    currentVariant,
    openForm,
    closeForm,
    handleSubmit
  };
}