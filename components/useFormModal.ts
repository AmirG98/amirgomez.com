'use client';

import { useState } from 'react';
import { FormVariant } from './MultiStepForm';
import { formVariants } from './form-variants';

export function useFormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentVariant, setCurrentVariant] = useState<FormVariant | null>(null);

  const openForm = (variantId: keyof typeof formVariants) => {
    setCurrentVariant(formVariants[variantId]);
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
    setCurrentVariant(null);
  };

  const handleSubmit = async (data: Record<string, string>) => {
    console.log('Form submitted:', data);
    
    try {
      // Add form type to the data
      const submissionData = {
        ...data,
        formType: currentVariant?.id
      };

      // Send to Google Sheets via Apps Script
      const appsScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;
      
      if (!appsScriptUrl || appsScriptUrl === 'YOUR_APPS_SCRIPT_URL_HERE') {
        console.warn('Google Apps Script URL not configured');
        return;
      }

      const response = await fetch(appsScriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
        mode: 'no-cors' // Required for Google Apps Script
      });

      // Note: With mode: 'no-cors', we can't read the response
      // But the data will still be sent to the spreadsheet
      console.log('Form data sent to Google Sheets');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      // Don't throw error to prevent user-facing issues
      // The form will still show success message
    }

    // Small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  return {
    isOpen,
    currentVariant,
    openForm,
    closeForm,
    handleSubmit
  };
}