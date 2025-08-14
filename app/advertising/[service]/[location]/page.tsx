import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PageParams {
  service: string;
  location: string;
}

interface PageProps {
  params: Promise<PageParams>;
}

const ADVERTISING_SERVICES = [
  'google-ads',
  'facebook-ads',
  'instagram-marketing',
  'linkedin-advertising',
  'tiktok-ads',
  'youtube-advertising',
  'amazon-ppc',
  'email-marketing',
  'conversion-optimization',
  'brand-strategy'
];

const LOCATIONS = [
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

// Service-specific data with unique selling propositions
const SERVICE_DATA = {
  'google-ads': {
    title: 'Google Ads Management',
    description: 'Data-driven Google Ads campaigns that maximize ROI and drive qualified leads',
    shortDesc: 'Strategic Google Ads management for measurable growth',
    technologies: ['Google Ads', 'Google Analytics', 'Conversion Tracking', 'Keyword Research'],
    startingPrice: '$1,500/month',
    setupFee: '$500',
    icon: '🎯',
    benefits: ['Average 300% ROI increase', '24/7 campaign monitoring', 'Advanced audience targeting'],
    deliverables: ['Campaign setup & optimization', 'Landing page recommendations', 'Monthly performance reports']
  },
  'facebook-ads': {
    title: 'Facebook Advertising',
    description: 'High-converting Facebook and Instagram ad campaigns with advanced audience targeting',
    shortDesc: 'Meta advertising campaigns that drive engagement and sales',
    technologies: ['Meta Business Manager', 'Facebook Pixel', 'Audience Insights', 'Creative Studio'],
    startingPrice: '$1,200/month',
    setupFee: '$400',
    icon: '📘',
    benefits: ['Precise demographic targeting', 'Creative A/B testing', 'Cross-platform integration'],
    deliverables: ['Custom audience creation', 'Ad creative development', 'Pixel implementation']
  },
  'instagram-marketing': {
    title: 'Instagram Marketing',
    description: 'Visual storytelling and influencer marketing strategies for Instagram growth',
    shortDesc: 'Instagram marketing that builds brand awareness and engagement',
    technologies: ['Instagram Business', 'Stories Ads', 'Reels Advertising', 'Shopping Features'],
    startingPrice: '$900/month',
    setupFee: '$300',
    icon: '📸',
    benefits: ['Visual brand development', 'Influencer partnerships', 'Story engagement tactics'],
    deliverables: ['Content calendar creation', 'Hashtag strategy', 'Engagement optimization']
  },
  'linkedin-advertising': {
    title: 'LinkedIn Advertising',
    description: 'B2B focused LinkedIn campaigns targeting decision-makers and professionals',
    shortDesc: 'Professional LinkedIn advertising for B2B lead generation',
    technologies: ['LinkedIn Campaign Manager', 'Lead Gen Forms', 'Matched Audiences', 'InMail'],
    startingPrice: '$1,800/month',
    setupFee: '$600',
    icon: '💼',
    benefits: ['Professional audience targeting', 'High-value lead generation', 'Industry-specific campaigns'],
    deliverables: ['B2B campaign strategy', 'Professional ad creative', 'Lead nurturing sequences']
  },
  'tiktok-ads': {
    title: 'TikTok Advertising',
    description: 'Viral marketing campaigns on TikTok for Gen Z and millennial audiences',
    shortDesc: 'TikTok advertising that captures younger demographics',
    technologies: ['TikTok Ads Manager', 'Spark Ads', 'Brand Takeovers', 'Hashtag Challenges'],
    startingPrice: '$1,000/month',
    setupFee: '$350',
    icon: '🎵',
    benefits: ['Viral content potential', 'Young audience reach', 'Trend-based marketing'],
    deliverables: ['Viral campaign concepts', 'Influencer collaborations', 'Trend analysis reports']
  },
  'youtube-advertising': {
    title: 'YouTube Advertising',
    description: 'Video marketing campaigns on YouTube for maximum reach and engagement',
    shortDesc: 'YouTube ads that drive views, subscribers, and conversions',
    technologies: ['YouTube Ads', 'Google Video Partners', 'TrueView', 'Bumper Ads'],
    startingPrice: '$1,400/month',
    setupFee: '$450',
    icon: '📺',
    benefits: ['Massive video reach', 'Engaging ad formats', 'Detailed viewer analytics'],
    deliverables: ['Video ad production', 'Channel optimization', 'Audience development']
  },
  'amazon-ppc': {
    title: 'Amazon PPC Management',
    description: 'Amazon advertising campaigns to boost product visibility and sales',
    shortDesc: 'Amazon PPC optimization for increased product sales',
    technologies: ['Amazon Advertising Console', 'Sponsored Products', 'Brand Store', 'DSP'],
    startingPrice: '$1,300/month',
    setupFee: '$400',
    icon: '📦',
    benefits: ['Increased product visibility', 'Higher conversion rates', 'Competitor analysis'],
    deliverables: ['Product listing optimization', 'Keyword research', 'Bid management']
  },
  'email-marketing': {
    title: 'Email Marketing',
    description: 'Automated email campaigns that nurture leads and drive customer retention',
    shortDesc: 'Email marketing automation for customer engagement',
    technologies: ['Mailchimp', 'Klaviyo', 'ConvertKit', 'Automation Workflows'],
    startingPrice: '$800/month',
    setupFee: '$250',
    icon: '📧',
    benefits: ['High ROI potential', 'Personalized messaging', 'Automated sequences'],
    deliverables: ['Email template design', 'Automation setup', 'Performance analytics']
  },
  'conversion-optimization': {
    title: 'Conversion Rate Optimization',
    description: 'Data-driven CRO strategies to maximize website conversions and revenue',
    shortDesc: 'CRO services that turn more visitors into customers',
    technologies: ['Google Optimize', 'Hotjar', 'A/B Testing', 'Analytics'],
    startingPrice: '$2,000/month',
    setupFee: '$700',
    icon: '📊',
    benefits: ['Increased conversion rates', 'Better user experience', 'Data-driven insights'],
    deliverables: ['Conversion audit', 'A/B test implementation', 'UX recommendations']
  },
  'brand-strategy': {
    title: 'Brand Strategy & Positioning',
    description: 'Comprehensive brand development and strategic positioning for market leadership',
    shortDesc: 'Brand strategy that differentiates and drives recognition',
    technologies: ['Brand Guidelines', 'Market Research', 'Competitor Analysis', 'Positioning Maps'],
    startingPrice: '$2,500/month',
    setupFee: '$1,000',
    icon: '🎨',
    benefits: ['Clear brand differentiation', 'Market positioning', 'Consistent messaging'],
    deliverables: ['Brand audit', 'Strategy document', 'Implementation roadmap']
  }
};

// Location-specific data with unique market insights and facts
const LOCATION_DATA = {
  'san-francisco': {
    name: 'San Francisco',
    state: 'CA',
    region: 'Bay Area',
    population: '873K',
    marketFacts: [
      'Home to 40+ unicorn startups, requiring sophisticated digital marketing',
      'Highest tech worker concentration in the US (25% of workforce)',
      'Average household income $126K enables premium advertising strategies',
      'Mobile-first city with 89% smartphone adoption rate'
    ],
    industries: ['Technology', 'Fintech', 'Biotech', 'Real Estate'],
    adSpend: '$4.2B annually',
    competitorInsight: 'Highly competitive market requires advanced targeting and premium creative',
    opportunity: 'Tech-savvy audience responds well to data-driven, innovative ad formats'
  },
  'new-york': {
    name: 'New York',
    state: 'NY',
    region: 'Northeast',
    population: '8.3M',
    marketFacts: [
      'Global advertising capital with $12B+ annual ad spend',
      'Fashion and finance industries drive luxury advertising demand',
      'Diverse demographics require multi-cultural marketing approaches',
      '67% of residents use public transit, boosting mobile ad engagement'
    ],
    industries: ['Finance', 'Fashion', 'Media', 'Real Estate'],
    adSpend: '$12.1B annually',
    competitorInsight: 'Premium market with sophisticated audiences expecting high-quality creative',
    opportunity: 'Multiple industry verticals allow for specialized campaign strategies'
  },
  'los-angeles': {
    name: 'Los Angeles',
    state: 'CA',
    region: 'Southern California',
    population: '4.0M',
    marketFacts: [
      'Entertainment capital drives creative and influencer marketing',
      'Hispanic population (48%) requires bilingual campaign strategies',
      'Car culture creates unique geo-targeting opportunities',
      'Social media usage 23% higher than national average'
    ],
    industries: ['Entertainment', 'Tourism', 'Fashion', 'Technology'],
    adSpend: '$8.7B annually',
    competitorInsight: 'Visual-first market emphasizing creative quality and cultural relevance',
    opportunity: 'Strong influencer ecosystem enables authentic brand partnerships'
  },
  'chicago': {
    name: 'Chicago',
    state: 'IL',
    region: 'Midwest',
    population: '2.7M',
    marketFacts: [
      'Manufacturing hub with B2B advertising opportunities',
      'Cost-effective market with 30% lower CPCs than coastal cities',
      'Strong local loyalty requires community-focused messaging',
      'Winter weather patterns create seasonal advertising opportunities'
    ],
    industries: ['Manufacturing', 'Healthcare', 'Transportation', 'Finance'],
    adSpend: '$3.8B annually',
    competitorInsight: 'Value-conscious market prioritizing ROI and practical benefits',
    opportunity: 'Lower competition allows for market share capture at reduced costs'
  },
  'austin': {
    name: 'Austin',
    state: 'TX',
    region: 'Southwest',
    population: '965K',
    marketFacts: [
      'Fastest-growing tech hub with 45% population increase since 2010',
      '"Keep Austin Weird" culture values authentic, creative messaging',
      'SXSW brings global attention and seasonal advertising spikes',
      'Young demographic (median age 33) highly active on social media'
    ],
    industries: ['Technology', 'Music', 'Food & Beverage', 'Healthcare'],
    adSpend: '$1.9B annually',
    competitorInsight: 'Growing market with increasing competition from tech companies',
    opportunity: 'Creative, unconventional campaigns perform exceptionally well'
  },
  'seattle': {
    name: 'Seattle',
    state: 'WA',
    region: 'Pacific Northwest',
    population: '750K',
    marketFacts: [
      'Coffee culture creates unique lifestyle marketing opportunities',
      'Amazon HQ drives e-commerce and cloud services advertising',
      'Environmentally conscious consumers favor sustainable brands',
      'High education levels (60% college degrees) enable complex messaging'
    ],
    industries: ['Technology', 'E-commerce', 'Aerospace', 'Coffee'],
    adSpend: '$2.8B annually',
    competitorInsight: 'Educated, environmentally conscious audience values authenticity',
    opportunity: 'Sustainability-focused campaigns resonate strongly with local values'
  },
  'boston': {
    name: 'Boston',
    state: 'MA',
    region: 'Northeast',
    population: '685K',
    marketFacts: [
      'Biotech and healthcare hub with specialized B2B opportunities',
      'Student population (250K+) creates seasonal marketing patterns',
      'Historical pride influences local brand loyalty and messaging',
      'High smartphone usage (92%) supports mobile-first strategies'
    ],
    industries: ['Healthcare', 'Education', 'Biotech', 'Financial Services'],
    adSpend: '$2.3B annually',
    competitorInsight: 'Educated market requires evidence-based, credible advertising',
    opportunity: 'Healthcare and education verticals offer high-value B2B opportunities'
  },
  'miami': {
    name: 'Miami',
    state: 'FL',
    region: 'Southeast',
    population: '470K',
    marketFacts: [
      'Gateway to Latin America with 70% Hispanic population',
      'Tourism drives hospitality and luxury advertising demand',
      'Bilingual campaigns essential (Spanish/English)',
      'Beach lifestyle influences visual aesthetics and messaging tone'
    ],
    industries: ['Tourism', 'Real Estate', 'International Trade', 'Entertainment'],
    adSpend: '$1.7B annually',
    competitorInsight: 'Luxury-focused market with international audience considerations',
    opportunity: 'Latin American market entry point with bilingual capabilities'
  },
  'denver': {
    name: 'Denver',
    state: 'CO',
    region: 'Mountain West',
    population: '715K',
    marketFacts: [
      'Cannabis industry creates unique regulatory advertising challenges',
      'Outdoor lifestyle drives adventure and wellness marketing',
      'Craft beer culture (400+ breweries) supports local business advertising',
      'Young professional influx creates tech startup advertising opportunities'
    ],
    industries: ['Cannabis', 'Outdoor Recreation', 'Technology', 'Craft Beer'],
    adSpend: '$1.4B annually',
    competitorInsight: 'Outdoor-oriented market values authenticity and local connections',
    opportunity: 'Emerging cannabis market with evolving advertising regulations'
  },
  'remote': {
    name: 'Remote',
    state: '',
    region: 'Global',
    population: 'Worldwide',
    marketFacts: [
      'Global workforce enables 24/7 campaign management across time zones',
      'Digital-first approach allows advanced automation and scaling',
      'Cost-effective operations with 40% lower overhead than traditional agencies',
      'Access to worldwide talent and diverse market perspectives'
    ],
    industries: ['All Industries', 'Global E-commerce', 'SaaS', 'Digital Services'],
    adSpend: 'Variable by market',
    competitorInsight: 'Requires strong digital presence and proven remote collaboration skills',
    opportunity: 'Serve clients globally with specialized expertise and competitive pricing'
  }
};

export async function generateStaticParams() {
  const params = [];
  for (const service of ADVERTISING_SERVICES) {
    for (const location of LOCATIONS) {
      params.push({ service, location });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service, location } = await params;
  
  if (!ADVERTISING_SERVICES.includes(service) || !LOCATIONS.includes(location)) {
    return { title: 'Page Not Found' };
  }

  const serviceInfo = SERVICE_DATA[service as keyof typeof SERVICE_DATA];
  const locationInfo = LOCATION_DATA[location as keyof typeof LOCATION_DATA];

  const title = `${serviceInfo.title} in ${locationInfo.name}${locationInfo.state ? `, ${locationInfo.state}` : ''} | Expert Digital Marketing`;
  const description = `Professional ${serviceInfo.title.toLowerCase()} services in ${locationInfo.name}. ${serviceInfo.shortDesc}. Starting at ${serviceInfo.startingPrice}. Local market expertise with proven results.`;

  return {
    title,
    description,
    keywords: [
      serviceInfo.title.toLowerCase(),
      `${service.replace('-', ' ')} ${locationInfo.name.toLowerCase()}`,
      'digital marketing',
      'advertising agency',
      ...serviceInfo.technologies.map(tech => tech.toLowerCase())
    ],
    openGraph: { title, description, type: 'website' },
    twitter: { card: 'summary_large_image', title, description }
  };
}

export default async function AdvertisingServiceLocationPage({ params }: PageProps) {
  const { service, location } = await params;

  if (!ADVERTISING_SERVICES.includes(service) || !LOCATIONS.includes(location)) {
    notFound();
  }

  const serviceInfo = SERVICE_DATA[service as keyof typeof SERVICE_DATA];
  const locationInfo = LOCATION_DATA[location as keyof typeof LOCATION_DATA];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Breadcrumb Navigation */}
      <nav className="border-b border-foreground/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-foreground/60">
            <a href="/" className="hover:text-foreground">Home</a>
            <span>/</span>
            <a href="/advertising" className="hover:text-foreground">Advertising</a>
            <span>/</span>
            <a href={`/advertising/${service}`} className="hover:text-foreground capitalize">
              {serviceInfo.title}
            </a>
            <span>/</span>
            <span className="text-foreground">{locationInfo.name}</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="text-6xl mb-4">{serviceInfo.icon}</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {serviceInfo.title} in {locationInfo.name}
            {locationInfo.state && `, ${locationInfo.state}`}
          </h1>
          <p className="text-xl text-foreground/80 mb-8">
            {serviceInfo.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-foreground text-background px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
              Start Campaign - {serviceInfo.startingPrice}
            </button>
            <button className="border border-foreground/20 px-8 py-3 rounded-full font-semibold hover:bg-foreground/5 transition-colors">
              Free Strategy Call
            </button>
          </div>
          <div className="text-sm text-foreground/60">
            Setup Fee: {serviceInfo.setupFee} • {locationInfo.population} Population Market
          </div>
        </div>

        {/* Market Insights */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8">
            {locationInfo.name} Market Insights
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-foreground/5 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                📊 Market Overview
              </h3>
              <div className="space-y-3">
                <p><strong>Annual Ad Spend:</strong> {locationInfo.adSpend}</p>
                <p><strong>Key Industries:</strong> {locationInfo.industries.join(', ')}</p>
                <p><strong>Market Opportunity:</strong> {locationInfo.opportunity}</p>
              </div>
            </div>
            <div className="bg-foreground/5 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                🎯 Local Strategy
              </h3>
              <p className="text-foreground/80 mb-4">{locationInfo.competitorInsight}</p>
              <div className="space-y-2">
                <h4 className="font-semibold">Market Facts:</h4>
                <ul className="text-sm text-foreground/70 space-y-1">
                  {locationInfo.marketFacts.slice(0, 2).map((fact, index) => (
                    <li key={index}>• {fact}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Service Benefits */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8">
            Why Choose Our {serviceInfo.title} Services?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Key Benefits</h3>
              <ul className="space-y-2">
                {serviceInfo.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-foreground/80">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Technologies</h3>
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
            <div>
              <h3 className="text-xl font-semibold mb-4">Deliverables</h3>
              <ul className="space-y-2">
                {serviceInfo.deliverables.map((deliverable, index) => (
                  <li key={index} className="text-foreground/80 text-sm">
                    • {deliverable}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Local Expertise */}
        <div className="max-w-4xl mx-auto mb-16 bg-foreground/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">
            Local {locationInfo.name} Expertise
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Market Specialization</h3>
              <p className="text-foreground/80 mb-4">
                {location === 'remote' 
                  ? 'Serving clients globally with expertise across all major markets and time zones. Our remote-first approach enables 24/7 campaign optimization and international market penetration.'
                  : `Deep understanding of the ${locationInfo.name} market dynamics, local consumer behavior, and competitive landscape in the ${locationInfo.region} region.`
                }
              </p>
              <div className="space-y-2">
                {locationInfo.marketFacts.slice(2).map((fact, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">📍</span>
                    <span className="text-sm text-foreground/70">{fact}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Campaign Approach</h3>
              <p className="text-foreground/80 mb-4">
                Our {serviceInfo.title.toLowerCase()} campaigns in {locationInfo.name} are 
                tailored to local preferences, seasonal patterns, and cultural nuances that 
                drive {location === 'remote' ? 'international' : 'regional'} success.
              </p>
              <div className="bg-background rounded p-4 border border-foreground/10">
                <h4 className="font-semibold text-sm mb-2">Success Metrics</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-foreground/60">Avg. ROI:</span>
                    <span className="font-semibold ml-2">285%</span>
                  </div>
                  <div>
                    <span className="text-foreground/60">Client Retention:</span>
                    <span className="font-semibold ml-2">94%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-3xl mx-auto text-center bg-foreground/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Dominate {locationInfo.name} with {serviceInfo.title}?
          </h2>
          <p className="text-foreground/80 mb-6">
            Get a custom {serviceInfo.title.toLowerCase()} strategy designed specifically for 
            the {locationInfo.name} market. Free consultation includes competitor analysis 
            and market opportunity assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-foreground text-background px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
              Start Your Campaign Today
            </button>
            <button className="border border-foreground/20 px-8 py-3 rounded-full font-semibold hover:bg-foreground/5 transition-colors">
              Download Market Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}