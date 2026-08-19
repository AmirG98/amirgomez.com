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
    const submissionData = {
      ...data,
      formType: currentVariant?.id
    };

    // Sheet: mismo Apps Script de siempre (keepalive para sobrevivir a la navegación)
    const appsScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;
    if (appsScriptUrl && appsScriptUrl !== 'YOUR_APPS_SCRIPT_URL_HERE') {
      fetch(appsScriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
        mode: 'no-cors',
        keepalive: true
      }).catch(() => {});
    }

    // Mail a Amir en cada submit (Resend)
    fetch('/api/notify-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submissionData),
      keepalive: true
    }).catch(() => {});

    // Sin modal de thank-you: directo al calendario
    closeForm();
    window.location.href = '/meet-amir';
  };

  return {
    isOpen,
    currentVariant,
    openForm,
    closeForm,
    handleSubmit
  };
}