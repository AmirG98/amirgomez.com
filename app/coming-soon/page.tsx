'use client';

import Link from 'next/link';

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-zinc-600 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">

        {/* Logo/Brand */}
        <div className="flex justify-center mb-8">
          <div className="text-6xl font-bold text-white">
            AG
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
          Estamos construyendo esta sección
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-gray-200 leading-relaxed max-w-xl mx-auto">
          Estamos trabajando en algo increíble para ti. Mientras tanto, conecta conmigo a través de mis redes sociales para no perderte ninguna novedad.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-6">

          {/* LinkedIn Button */}
          <Link
            href="https://linkedin.com/in/amir-gabriel-gomez"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-zinc-200 bg-white text-gray-800 px-8 py-4 rounded-2xl font-semibold text-lg shadow-sm hover:shadow hover:bg-zinc-300 transition w-full sm:w-auto justify-center"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span>LinkedIn</span>
          </Link>

          {/* Email Button */}
          <Link
            href="mailto:amir@amirgomez.com"
            className="flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-emerald-700 transition w-full sm:w-auto justify-center"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <span>Email</span>
          </Link>
        </div>

        {/* Closing Message */}
        <p className="text-gray-300 text-lg pt-8">
          Pronto tendremos novedades...
        </p>

        {/* Back to Home Link */}
        <div className="pt-4">
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors text-sm underline"
          >
            Volver al sitio principal
          </Link>
        </div>
      </div>
    </div>
  );
}
