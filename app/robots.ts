import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/private/',
        '/_next/',
        '/api/',
        '/.git/',
        '/admin/',
      ],
    },
    sitemap: 'https://amirgomez-com.vercel.app/sitemap.xml',
  }
}