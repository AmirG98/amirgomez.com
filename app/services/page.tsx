import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Professional Web Development & Consulting Services | Amir Gomez',
  description: 'Full-stack web development, consulting, and digital solutions. Available for projects nationwide and remote work.',
  keywords: ['web development', 'consulting', 'app development', 'UI design', 'SEO optimization'],
};

const SERVICES = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Custom web applications using React, Next.js, and modern technologies',
    icon: '🌐',
    startingPrice: '$5,000'
  },
  {
    id: 'consulting',
    title: 'Technical Consulting',
    description: 'Strategic technology guidance and architecture consulting',
    icon: '💡',
    startingPrice: '$150/hour'
  },
  {
    id: 'app-development',
    title: 'App Development',
    description: 'Native and cross-platform mobile applications',
    icon: '📱',
    startingPrice: '$8,000'
  },
  {
    id: 'ui-design',
    title: 'UI/UX Design',
    description: 'User-centered design for web and mobile applications',
    icon: '🎨',
    startingPrice: '$3,000'
  },
  {
    id: 'seo-optimization',
    title: 'SEO Optimization',
    description: 'Search engine optimization and digital marketing',
    icon: '📈',
    startingPrice: '$2,000'
  }
];

const LOCATIONS = [
  'San Francisco', 'New York', 'Los Angeles', 'Chicago', 'Austin',
  'Seattle', 'Boston', 'Miami', 'Denver', 'Remote'
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Professional Development Services
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Full-stack web development, technical consulting, and digital solutions
            for businesses of all sizes. Available nationwide and for remote work.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {SERVICES.map((service) => (
            <div key={service.id} className="border border-foreground/10 rounded-lg p-6 hover:border-foreground/20 transition-colors">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-foreground/80 mb-4">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-green-600 dark:text-green-400">
                  Starting at {service.startingPrice}
                </span>
                <Link 
                  href={`/services/${service.id}/san-francisco`}
                  className="text-sm bg-foreground text-background px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Location Coverage */}
        <div className="bg-foreground/5 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Service Areas</h2>
          <p className="text-center text-foreground/80 mb-6">
            Providing professional development services across major US cities and remote work worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {LOCATIONS.map((location) => (
              <span key={location} className="bg-background border border-foreground/20 px-4 py-2 rounded-full text-sm">
                {location}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-foreground/80 mb-8 max-w-2xl mx-auto">
            Get a free consultation and custom quote for your development needs.
            I work with businesses of all sizes to bring their digital ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-foreground text-background px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
              Schedule Free Consultation
            </button>
            <Link 
              href="/blog"
              className="border border-foreground/20 px-8 py-3 rounded-full font-semibold hover:bg-foreground/5 transition-colors"
            >
              View Portfolio & Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}