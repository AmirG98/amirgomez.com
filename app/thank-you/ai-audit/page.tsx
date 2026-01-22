'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FadeInView } from '@/components/animations';

export default function AIAuditThankYouPage() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Google Tag Manager */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5HKRKM7F');`,
        }}
      />

      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-5HKRKM7F"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        {/* Background effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[128px] pointer-events-none" />

        <div className="container mx-auto max-w-2xl px-4 relative">
          <FadeInView>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-8">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h1 className="text-5xl sm:text-6xl font-bold mb-6">
                Thank You!
              </h1>

              <p className="text-xl text-white/60 mb-12 max-w-lg mx-auto">
                Your free AI readiness audit request has been received. We'll be in touch within 24 hours.
              </p>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 inline-block">
                <p className="text-white/50">
                  Redirecting to homepage in <span className="text-orange-400 font-bold text-xl">{countdown}</span> seconds...
                </p>
              </div>

              <div className="mt-8">
                <Link
                  href="/"
                  className="text-white/40 hover:text-white text-sm transition-colors underline"
                >
                  Go to homepage now
                </Link>
              </div>
            </div>
          </FadeInView>
        </div>
      </div>
    </>
  );
}
