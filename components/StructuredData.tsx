export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Amir Gomez - Digital Marketing Specialist",
    "description": "Digital marketing specialist helping businesses grow through Google Ads, Facebook advertising, email marketing, and conversion optimization.",
    "url": "https://amirgomez-com.vercel.app",
    "logo": "https://amirgomez-com.vercel.app/amir-profile.jpg",
    "image": "https://amirgomez-com.vercel.app/amir-profile.jpg",
    "founder": {
      "@type": "Person",
      "name": "Amir Gomez",
      "jobTitle": "Digital Marketing Specialist",
      "image": "https://amirgomez-com.vercel.app/amir-profile.jpg",
      "url": "https://amirgomez-com.vercel.app/about"
    },
    "serviceType": [
      "Google Ads Management",
      "Facebook Advertising",
      "Email Marketing",
      "Conversion Rate Optimization",
      "Digital Marketing Consulting"
    ],
    "areaServed": {
      "@type": "Place",
      "name": "Worldwide"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "100",
      "bestRating": "5"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Steven Page"
        },
        "reviewBody": "Amir is one of the most talented marketers I've had the opportunity to work with. I strongly recommend him."
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Nick Koriakos"
        },
        "reviewBody": "Amir possesses a deep understanding of market trends and customer behavior, and has a remarkable talent for creating innovative strategies that drive business growth and increase revenue."
      }
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "",
      "contactType": "customer service",
      "availableLanguage": ["English", "Spanish"]
    },
    "sameAs": [
      "https://linkedin.com/in/amir-gabriel-gomez"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}