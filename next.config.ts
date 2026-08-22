import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 301 de posts duplicados hacia la versión que conservamos.
  // Consolida la señal de SEO en una sola URL por tema.
  async redirects() {
    return [
      // URL vieja del training (compartida antes del renombre)
      { source: '/training-long-form.html', destination: '/long-form-training-es', permanent: false },
      // Portal de entrenamientos: canonizar sin .html
      { source: '/entrenamientos.html', destination: '/entrenamientos', permanent: false },
      {
        source: '/blog/marketing-attribution-models-guide-2026',
        destination: '/blog/marketing-attribution-models-guide-2026-284',
        permanent: true
      },
      {
        source: '/blog/marketing-attribution-models-guide-2026-376',
        destination: '/blog/marketing-attribution-models-guide-2026-284',
        permanent: true
      },
      {
        source: '/blog/marketing-attribution-models-guide-2026-347',
        destination: '/blog/marketing-attribution-models-guide-2026-284',
        permanent: true
      },
      {
        source: '/blog/claude-for-business-operations-guide-247',
        destination: '/blog/claude-for-business-operations-guide',
        permanent: true
      },
      {
        source: '/blog/ai-powered-customer-segmentation-guide-2026',
        destination: '/blog/ai-powered-customer-segmentation-guide',
        permanent: true
      },
      {
        source: '/blog/ppc-campaign-management-guide-2026-399',
        destination: '/blog/ppc-campaign-management-guide-2026',
        permanent: true
      },
      {
        source: '/blog/email-marketing-automation-strategy-guide',
        destination: '/blog/email-marketing-automation-guide',
        permanent: true
      },
      {
        source: '/blog/email-marketing-automation-strategy-guide-303',
        destination: '/blog/email-marketing-automation-guide',
        permanent: true
      },
      {
        source: '/blog/ai-tools-for-small-business-340',
        destination: '/blog/ai-tools-for-small-business',
        permanent: true
      },
      {
        source: '/blog/google-ads-optimization-2026-strategy',
        destination: '/blog/google-ads-optimization-2026-guide',
        permanent: true
      },
      {
        source: '/blog/ai-video-generation-for-ads',
        destination: '/blog/ai-video-generation-ads-guide',
        permanent: true
      },
      {
        source: '/blog/bootstrapping-vs-venture-capital-guide',
        destination: '/blog/bootstrapping-vs-venture-capital-guide-295',
        permanent: true
      },
      {
        source: '/blog/rag-for-business-applications-guide-256',
        destination: '/blog/rag-for-business-applications-guide',
        permanent: true
      },
    ];
  },
  async rewrites() {
    return [
      // Training long-form: URLs limpias hacia los estáticos de /public
      { source: '/long-form-training', destination: '/long-form-training.html' },
      { source: '/long-form-training-es', destination: '/long-form-training-es.html' },
      { source: '/interno-web-claude', destination: '/interno-web-claude.html' },
      { source: '/entrenamientos', destination: '/entrenamientos.html' },
      {
        source: '/clients/:client',
        destination: '/clients/:client.html'
      },
      {
        source: '/case-studies',
        destination: '/case-studies.html'
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
