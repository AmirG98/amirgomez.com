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
    
    // Here you would typically send the data to your backend/API
    // For now, we'll just log it and simulate a successful submission
    
    // Example API call:
    // try {
    //   const response = await fetch('/api/submit-form', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ ...data, formType: currentVariant?.id })
    //   });
    //   if (!response.ok) throw new Error('Submission failed');
    // } catch (error) {
    //   throw error; // This will be caught by the form component
    // }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return {
    isOpen,
    currentVariant,
    openForm,
    closeForm,
    handleSubmit
  };
}