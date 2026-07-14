export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "A+ Growth",
    "description": "A+ Growth turns scattered paid media, funnels and analytics into one clean acquisition signal, calibrating demand before you scale spend.",
    "url": "https://www.amirgomez.com",
    "logo": "https://www.amirgomez.com/amir-profile.jpg",
    "image": "https://www.amirgomez.com/amir-profile.jpg",
    "founder": {
      "@type": "Person",
      "name": "Amir Gómez",
      "jobTitle": "Founder & Growth Lead",
      "image": "https://www.amirgomez.com/amir-profile.jpg",
      "url": "https://www.amirgomez.com/about"
    },
    "serviceType": [
      "Full-funnel paid media",
      "Creative & UGC (+AI)",
      "SEO + GEO",
      "Funnels, webinars & VSL",
      "Data & full-funnel analytics"
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
      "telephone": "+54-9-3541-370209",
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