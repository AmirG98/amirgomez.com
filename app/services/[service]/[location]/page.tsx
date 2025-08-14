import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PageParams {
  service: string;
  location: string;
}

interface PageProps {
  params: Promise<PageParams>;
}

// Valid services and locations for SEO
const VALID_SERVICES = [
  'web-development',
  'consulting',
  'app-development',
  'ui-design',
  'seo-optimization'
];

const VALID_LOCATIONS = [
  'san-francisco',
  'new-york',
  'los-angeles',
  'chicago',
  'austin',
  'seattle',
  'boston',
  'miami',
  'denver',
  'remote'
];

// Service data for content generation
const SERVICE_DATA = {
  'web-development': {
    title: 'Web Development',
    description: 'Custom web application development using modern technologies',
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js'],
    startingPrice: '$5,000'
  },
  'consulting': {
    title: 'Technical Consulting',
    description: 'Strategic technology consulting and architecture guidance',
    technologies: ['System Architecture', 'Cloud Solutions', 'DevOps'],
    startingPrice: '$150/hour'
  },
  'app-development': {
    title: 'App Development',
    description: 'Native and cross-platform mobile application development',
    technologies: ['React Native', 'Swift', 'Kotlin', 'Flutter'],
    startingPrice: '$8,000'
  },
  'ui-design': {
    title: 'UI/UX Design',
    description: 'User-centered design for web and mobile applications',
    technologies: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
    startingPrice: '$3,000'
  },
  'seo-optimization': {
    title: 'SEO Optimization',
    description: 'Search engine optimization and digital marketing strategies',
    technologies: ['Technical SEO', 'Content Strategy', 'Analytics'],
    startingPrice: '$2,000'
  }
};

const LOCATION_DATA = {
  'san-francisco': { name: 'San Francisco', state: 'CA', region: 'Bay Area' },
  'new-york': { name: 'New York', state: 'NY', region: 'Northeast' },
  'los-angeles': { name: 'Los Angeles', state: 'CA', region: 'Southern California' },
  'chicago': { name: 'Chicago', state: 'IL', region: 'Midwest' },
  'austin': { name: 'Austin', state: 'TX', region: 'Southwest' },
  'seattle': { name: 'Seattle', state: 'WA', region: 'Pacific Northwest' },
  'boston': { name: 'Boston', state: 'MA', region: 'Northeast' },
  'miami': { name: 'Miami', state: 'FL', region: 'Southeast' },
  'denver': { name: 'Denver', state: 'CO', region: 'Mountain West' },
  'remote': { name: 'Remote', state: '', region: 'Anywhere' }
};

export async function generateStaticParams() {
  const params = [];
  
  for (const service of VALID_SERVICES) {
    for (const location of VALID_LOCATIONS) {
      params.push({ service, location });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service, location } = await params;
  
  if (!VALID_SERVICES.includes(service) || !VALID_LOCATIONS.includes(location)) {
    return {
      title: 'Page Not Found'
    };
  }

  const serviceInfo = SERVICE_DATA[service as keyof typeof SERVICE_DATA];
  const locationInfo = LOCATION_DATA[location as keyof typeof LOCATION_DATA];

  const title = `${serviceInfo.title} Services in ${locationInfo.name}${locationInfo.state ? `, ${locationInfo.state}` : ''} | Amir Gomez`;
  const description = `Professional ${serviceInfo.title.toLowerCase()} services in ${locationInfo.name}. ${serviceInfo.description}. Starting at ${serviceInfo.startingPrice}.`;

  return {
    title,
    description,
    keywords: [
      serviceInfo.title.toLowerCase(),
      locationInfo.name.toLowerCase(),
      ...serviceInfo.technologies.map(tech => tech.toLowerCase()),
      'freelancer',
      'developer'
    ],
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    }
  };
}

export default async function ServiceLocationPage({ params }: PageProps) {
  const { service, location } = await params;

  // Validate params
  if (!VALID_SERVICES.includes(service) || !VALID_LOCATIONS.includes(location)) {
    notFound();
  }

  const serviceInfo = SERVICE_DATA[service as keyof typeof SERVICE_DATA];
  const locationInfo = LOCATION_DATA[location as keyof typeof LOCATION_DATA];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {serviceInfo.title} in {locationInfo.name}
            {locationInfo.state && `, ${locationInfo.state}`}
          </h1>
          <p className="text-xl text-foreground/80 mb-8">
            {serviceInfo.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-foreground text-background px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
              Get Started - {serviceInfo.startingPrice}
            </button>
            <button className="border border-foreground/20 px-8 py-3 rounded-full font-semibold hover:bg-foreground/5 transition-colors">
              View Portfolio
            </button>
          </div>
        </div>

        {/* Services Overview */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8">
            Why Choose {serviceInfo.title} in {locationInfo.name}?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Local Expertise</h3>
                <p className="text-foreground/80">
                  Understanding the {locationInfo.region} market and business landscape 
                  to deliver solutions that resonate with your local audience.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Modern Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {serviceInfo.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="bg-foreground/10 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
                <p className="text-foreground/80">
                  Delivered successful {serviceInfo.title.toLowerCase()} projects 
                  for businesses across {locationInfo.region}.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Flexible Engagement</h3>
                <p className="text-foreground/80">
                  {location === 'remote' 
                    ? 'Remote collaboration with clients worldwide using modern communication tools.'
                    : `Available for on-site meetings in ${locationInfo.name} or remote collaboration.`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-2xl mx-auto text-center bg-foreground/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Start Your {serviceInfo.title} Project?
          </h2>
          <p className="text-foreground/80 mb-6">
            Get a free consultation and project estimate for your {serviceInfo.title.toLowerCase()} needs 
            in {locationInfo.name}.
          </p>
          <button className="bg-foreground text-background px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
            Contact Amir Today
          </button>
        </div>
      </div>
    </div>
  );
}