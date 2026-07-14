'use client';

import AGrowthHome from '@/components/AGrowthHome';

export default function Home() {
  // GTM is loaded globally in app/layout.tsx; the A+ Growth landing pushes its
  // data-event conversions into the same dataLayer.
  return <AGrowthHome />;
}
