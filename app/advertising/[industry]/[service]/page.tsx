import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PageParams {
  industry: string;
  service: string;
}

interface PageProps {
  params: Promise<PageParams>;
}

const INDUSTRIES = [
  'healthcare',
  'ecommerce',
  'saas',
  'restaurants',
  'real-estate',
  'fitness',
  'finance',
  'education',
  'legal',
  'manufacturing'
];

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

// Industry-specific data with unique insights and regulations
const INDUSTRY_DATA = {
  'healthcare': {
    name: 'Healthcare',
    description: 'HIPAA-compliant advertising strategies for medical practices and health services',
    icon: '🏥',
    marketSize: '$180B',
    avgCpc: '$2.85',
    regulations: ['HIPAA Compliance', 'Medical Claims Verification', 'FDA Guidelines'],
    challenges: [
      'Strict regulatory compliance requirements',
      'Patient privacy and data protection',
      'Medical accuracy in advertising claims',
      'Building trust in sensitive health topics'
    ],
    opportunities: [
      'Growing telehealth market worth $396B by 2027',
      'Aging population driving healthcare demand',
      'Preventive care awareness increasing',
      'Digital health adoption accelerated by COVID-19'
    ],
    keyMetrics: ['Patient Acquisition Cost', 'Lifetime Patient Value', 'Appointment Bookings', 'Treatment Adherence'],
    targetAudience: 'Patients, caregivers, and healthcare decision-makers aged 30-65',
    bestPlatforms: ['Google Ads (health searches)', 'Facebook (health communities)', 'YouTube (educational content)']
  },
  'ecommerce': {
    name: 'E-commerce',
    description: 'Performance-driven advertising for online retail and digital commerce brands',
    icon: '🛒',
    marketSize: '$870B',
    avgCpc: '$1.45',
    regulations: ['FTC Advertising Guidelines', 'Consumer Protection Laws', 'Data Privacy Regulations'],
    challenges: [
      'High competition and rising ad costs',
      'Cart abandonment rates (70% average)',
      'Customer acquisition vs. retention balance',
      'Seasonal demand fluctuations'
    ],
    opportunities: [
      'Global market reach and 24/7 sales potential',
      'Advanced targeting based on purchase behavior',
      'Retargeting abandoned cart visitors',
      'Cross-selling and upselling automation'
    ],
    keyMetrics: ['Return on Ad Spend (ROAS)', 'Customer Lifetime Value', 'Conversion Rate', 'Average Order Value'],
    targetAudience: 'Online shoppers across all demographics, mobile-first consumers',
    bestPlatforms: ['Facebook Ads (product catalogs)', 'Google Shopping', 'Instagram Shopping', 'Amazon PPC']
  },
  'saas': {
    name: 'SaaS',
    description: 'Growth-focused marketing strategies for software and technology companies',
    icon: '💻',
    marketSize: '$195B',
    avgCpc: '$3.20',
    regulations: ['Software Licensing', 'Data Security Standards', 'International Data Laws'],
    challenges: [
      'Long sales cycles and complex buyer journeys',
      'High customer acquisition costs',
      'Freemium model optimization',
      'Technical feature communication'
    ],
    opportunities: [
      'Subscription model provides predictable revenue',
      'Global scalability with digital distribution',
      'Data-driven optimization capabilities',
      'High-value B2B customer relationships'
    ],
    keyMetrics: ['Monthly Recurring Revenue (MRR)', 'Customer Acquisition Cost (CAC)', 'Churn Rate', 'Product Qualified Leads'],
    targetAudience: 'Business decision-makers, IT professionals, and department heads',
    bestPlatforms: ['LinkedIn Ads (B2B targeting)', 'Google Ads (software searches)', 'Content marketing', 'Webinar marketing']
  },
  'restaurants': {
    name: 'Restaurants',
    description: 'Local marketing strategies to drive foot traffic and online ordering',
    icon: '🍽️',
    marketSize: '$320B',
    avgCpc: '$1.65',
    regulations: ['Food Safety Marketing', 'Local Business Regulations', 'Alcohol Advertising Laws'],
    challenges: [
      'Highly competitive local markets',
      'Seasonal and weather-dependent demand',
      'Online review management',
      'Rising food delivery competition'
    ],
    opportunities: [
      'Location-based mobile advertising',
      'Food photography and visual marketing',
      'Loyalty program integration',
      'Event and catering opportunities'
    ],
    keyMetrics: ['Foot Traffic', 'Online Orders', 'Average Ticket Size', 'Customer Retention'],
    targetAudience: 'Local diners, families, young professionals, and food enthusiasts',
    bestPlatforms: ['Google My Business', 'Instagram (food photos)', 'Facebook Local', 'Yelp Advertising']
  },
  'real-estate': {
    name: 'Real Estate',
    description: 'Lead generation and brand building for real estate professionals and agencies',
    icon: '🏠',
    marketSize: '$230B',
    avgCpc: '$2.40',
    regulations: ['Real Estate Advertising Laws', 'Fair Housing Act', 'License Display Requirements'],
    challenges: [
      'High-value, infrequent purchase decisions',
      'Local market expertise demonstration',
      'Lead quality vs. quantity balance',
      'Market timing and seasonality'
    ],
    opportunities: [
      'Virtual tours and video marketing',
      'Geo-targeted neighborhood campaigns',
      'First-time buyer education content',
      'Investment property targeting'
    ],
    keyMetrics: ['Lead Generation', 'Listing Views', 'Property Inquiries', 'Closing Rate'],
    targetAudience: 'Homebuyers, sellers, investors, and renters aged 25-55',
    bestPlatforms: ['Facebook Ads (detailed targeting)', 'Google Ads (local searches)', 'Zillow Premier Agent', 'YouTube tours']
  },
  'fitness': {
    name: 'Fitness',
    description: 'Health and wellness marketing to build communities and drive memberships',
    icon: '💪',
    marketSize: '$96B',
    avgCpc: '$1.85',
    regulations: ['Health Claims Regulations', 'Fitness Professional Certifications', 'Before/After Photo Guidelines'],
    challenges: [
      'Seasonal membership fluctuations',
      'High member churn rates',
      'Results expectation management',
      'Competition from home fitness apps'
    ],
    opportunities: [
      'Online fitness and hybrid memberships',
      'Wearable device integration',
      'Nutrition and lifestyle expansion',
      'Corporate wellness programs'
    ],
    keyMetrics: ['Membership Sign-ups', 'Class Attendance', 'Member Retention', 'Personal Training Sales'],
    targetAudience: 'Health-conscious individuals, athletes, and wellness seekers aged 20-50',
    bestPlatforms: ['Instagram (fitness content)', 'TikTok (workout videos)', 'YouTube (fitness channels)', 'Google Local']
  },
  'finance': {
    name: 'Financial Services',
    description: 'Compliant financial marketing for banks, credit unions, and financial advisors',
    icon: '💰',
    marketSize: '$450B',
    avgCpc: '$4.25',
    regulations: ['SEC Regulations', 'FINRA Compliance', 'Consumer Financial Protection', 'Banking Advertising Rules'],
    challenges: [
      'Strict regulatory compliance requirements',
      'Building trust in financial products',
      'Complex product explanation',
      'Risk disclosure requirements'
    ],
    opportunities: [
      'Digital banking adoption growth',
      'Retirement planning demand',
      'Fintech innovation marketing',
      'Financial education content'
    ],
    keyMetrics: ['Account Openings', 'Loan Applications', 'Investment Consultations', 'Assets Under Management'],
    targetAudience: 'Working professionals, retirees, small business owners, and investors',
    bestPlatforms: ['LinkedIn (professional targeting)', 'Google Ads (financial searches)', 'YouTube (education)', 'Email marketing']
  },
  'education': {
    name: 'Education',
    description: 'Student recruitment and educational program marketing strategies',
    icon: '🎓',
    marketSize: '$78B',
    avgCpc: '$2.10',
    regulations: ['Educational Marketing Standards', 'Student Privacy Laws', 'Accreditation Requirements'],
    challenges: [
      'Long enrollment decision cycles',
      'ROI measurement difficulties',
      'Competition from online education',
      'Changing demographics and preferences'
    ],
    opportunities: [
      'Online and hybrid program growth',
      'Adult learner and upskilling markets',
      'Professional certification programs',
      'International student recruitment'
    ],
    keyMetrics: ['Enrollment Numbers', 'Application Completion', 'Information Requests', 'Student Retention'],
    targetAudience: 'Students, parents, working professionals, and career changers',
    bestPlatforms: ['Google Ads (program searches)', 'Facebook (demographic targeting)', 'LinkedIn (professional development)', 'YouTube (campus tours)']
  },
  'legal': {
    name: 'Legal Services',
    description: 'Ethical legal marketing to attract clients and build law firm reputation',
    icon: '⚖️',
    marketSize: '$345B',
    avgCpc: '$6.45',
    regulations: ['Attorney Advertising Rules', 'State Bar Guidelines', 'Solicitation Restrictions'],
    challenges: [
      'Strict ethical advertising constraints',
      'High-stakes client acquisition',
      'Reputation management importance',
      'Complex legal topic communication'
    ],
    opportunities: [
      'Local SEO for legal searches',
      'Content marketing for expertise',
      'Referral network building',
      'Specialized practice area targeting'
    ],
    keyMetrics: ['Client Consultations', 'Case Inquiries', 'Referral Volume', 'Retainer Agreements'],
    targetAudience: 'Individuals with legal needs, businesses, and other attorneys for referrals',
    bestPlatforms: ['Google Ads (legal searches)', 'LinkedIn (B2B legal services)', 'Local directories', 'Content marketing']
  },
  'manufacturing': {
    name: 'Manufacturing',
    description: 'B2B marketing strategies for industrial and manufacturing companies',
    icon: '🏭',
    marketSize: '$520B',
    avgCpc: '$2.95',
    regulations: ['Industrial Safety Standards', 'Environmental Regulations', 'B2B Contract Laws'],
    challenges: [
      'Complex B2B sales cycles',
      'Technical product communication',
      'Multiple decision-maker involvement',
      'Supply chain relationship management'
    ],
    opportunities: [
      'Digital transformation adoption',
      'Trade show and industry events',
      'Technical content marketing',
      'Supply chain partnership marketing'
    ],
    keyMetrics: ['Lead Quality Score', 'Sales Pipeline Value', 'Trade Show ROI', 'Partnership Agreements'],
    targetAudience: 'Procurement managers, engineers, C-suite executives, and operations directors',
    bestPlatforms: ['LinkedIn (B2B networking)', 'Trade publications', 'Industry websites', 'Email marketing']
  }
};

// Service data adapted for industry contexts
const SERVICE_INDUSTRY_COMBINATIONS = {
  'google-ads': {
    healthcare: {
      title: 'Healthcare Google Ads',
      approach: 'HIPAA-compliant search campaigns targeting medical conditions and treatments',
      specialFeatures: ['Medical keyword research', 'Compliance monitoring', 'Patient-focused landing pages'],
      caseStudy: 'Increased qualified patient leads by 340% for multi-location medical practice'
    },
    ecommerce: {
      title: 'E-commerce Google Ads',
      approach: 'Product-focused shopping campaigns with dynamic remarketing',
      specialFeatures: ['Product feed optimization', 'Shopping campaign setup', 'Performance Max campaigns'],
      caseStudy: 'Achieved 450% ROAS for fashion e-commerce brand during peak season'
    },
    saas: {
      title: 'SaaS Google Ads',
      approach: 'B2B search campaigns targeting software buyers and decision-makers',
      specialFeatures: ['Free trial optimization', 'B2B keyword targeting', 'Demo request campaigns'],
      caseStudy: 'Reduced CAC by 60% while increasing MRR by 280% for project management SaaS'
    }
  },
  'facebook-ads': {
    restaurants: {
      title: 'Restaurant Facebook Advertising',
      approach: 'Visual food marketing with local targeting and event promotion',
      specialFeatures: ['Food photography campaigns', 'Event promotion', 'Local audience targeting'],
      caseStudy: 'Increased foot traffic by 85% and online orders by 220% for local restaurant chain'
    },
    fitness: {
      title: 'Fitness Facebook Marketing',
      approach: 'Community-building campaigns showcasing transformations and classes',
      specialFeatures: ['Before/after showcases', 'Class promotion', 'Community engagement'],
      caseStudy: 'Grew gym membership by 150% with 90% retention rate through targeted campaigns'
    }
  }
};

export async function generateStaticParams() {
  const params = [];
  for (const industry of INDUSTRIES) {
    for (const service of ADVERTISING_SERVICES) {
      params.push({ industry, service });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { industry, service } = await params;
  
  if (!INDUSTRIES.includes(industry) || !ADVERTISING_SERVICES.includes(service)) {
    return { title: 'Page Not Found' };
  }

  const industryInfo = INDUSTRY_DATA[industry as keyof typeof INDUSTRY_DATA];
  const serviceName = service.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

  const title = `${serviceName} for ${industryInfo.name} Industry | Specialized Digital Marketing`;
  const description = `Expert ${serviceName.toLowerCase()} campaigns designed specifically for ${industryInfo.name.toLowerCase()} businesses. ${industryInfo.description}`;

  return {
    title,
    description,
    keywords: [
      `${serviceName.toLowerCase()} ${industryInfo.name.toLowerCase()}`,
      `${industryInfo.name.toLowerCase()} digital marketing`,
      `${industryInfo.name.toLowerCase()} advertising`,
      serviceName.toLowerCase(),
      'industry-specific marketing'
    ],
    openGraph: { title, description, type: 'website' },
    twitter: { card: 'summary_large_image', title, description }
  };
}

export default async function IndustryServicePage({ params }: PageProps) {
  const { industry, service } = await params;

  if (!INDUSTRIES.includes(industry) || !ADVERTISING_SERVICES.includes(service)) {
    notFound();
  }

  const industryInfo = INDUSTRY_DATA[industry as keyof typeof INDUSTRY_DATA];
  const serviceName = service.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  // Get specific combination data if available
  const combinationData = SERVICE_INDUSTRY_COMBINATIONS[service as keyof typeof SERVICE_INDUSTRY_COMBINATIONS]?.[industry as keyof typeof SERVICE_INDUSTRY_COMBINATIONS[keyof typeof SERVICE_INDUSTRY_COMBINATIONS]];

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
            <a href={`/advertising/${industry}`} className="hover:text-foreground capitalize">
              {industryInfo.name}
            </a>
            <span>/</span>
            <span className="text-foreground">{serviceName}</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="text-6xl mb-4">{industryInfo.icon}</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {serviceName} for {industryInfo.name}
          </h1>
          <p className="text-xl text-foreground/80 mb-8">
            {combinationData?.title || `Specialized ${serviceName.toLowerCase()} campaigns designed for ${industryInfo.name.toLowerCase()} businesses`}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-foreground text-background px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
              Start Campaign - From $1,500/month
            </button>
            <button className="border border-foreground/20 px-8 py-3 rounded-full font-semibold hover:bg-foreground/5 transition-colors">
              Industry Case Study
            </button>
          </div>
          <div className="grid grid-cols-3 gap-8 text-center text-sm">
            <div>
              <div className="font-semibold">Market Size</div>
              <div className="text-foreground/60">{industryInfo.marketSize}</div>
            </div>
            <div>
              <div className="font-semibold">Avg. CPC</div>
              <div className="text-foreground/60">{industryInfo.avgCpc}</div>
            </div>
            <div>
              <div className="font-semibold">Best Platforms</div>
              <div className="text-foreground/60">{industryInfo.bestPlatforms.length}+ channels</div>
            </div>
          </div>
        </div>

        {/* Industry Expertise */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8">
            {industryInfo.name} Industry Expertise
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-foreground/5 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                🎯 Our Approach
              </h3>
              <p className="text-foreground/80 mb-4">
                {combinationData?.approach || `Our ${serviceName.toLowerCase()} strategies are specifically tailored for ${industryInfo.name.toLowerCase()} businesses, addressing industry-specific challenges and opportunities.`}
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold">Special Features:</h4>
                <ul className="text-sm text-foreground/70 space-y-1">
                  {(combinationData?.specialFeatures || ['Industry-specific targeting', 'Compliance monitoring', 'Specialized landing pages']).map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-foreground/5 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                📊 Success Story
              </h3>
              <p className="text-foreground/80 mb-4">
                {combinationData?.caseStudy || `We've helped ${industryInfo.name.toLowerCase()} businesses achieve significant growth through targeted ${serviceName.toLowerCase()} campaigns.`}
              </p>
              <div className="bg-background rounded p-4 border border-foreground/10">
                <h4 className="font-semibold text-sm mb-2">Key Metrics</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {industryInfo.keyMetrics.slice(0, 2).map((metric, index) => (
                    <div key={index}>
                      <span className="text-foreground/60">{metric}:</span>
                      <span className="font-semibold ml-2 text-green-600">+{150 + index * 50}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Industry Challenges & Solutions */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8">
            {industryInfo.name} Challenges & Our Solutions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-red-600 dark:text-red-400">
                Industry Challenges
              </h3>
              <ul className="space-y-3">
                {industryInfo.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">⚠️</span>
                    <span className="text-foreground/80">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">
                Our Solutions
              </h3>
              <ul className="space-y-3">
                {industryInfo.opportunities.map((opportunity, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-foreground/80">{opportunity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Compliance & Regulations */}
        <div className="max-w-4xl mx-auto mb-16 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center text-yellow-800 dark:text-yellow-200">
            ⚖️ Compliance & Regulations
          </h2>
          <p className="text-yellow-700 dark:text-yellow-300 mb-4">
            We ensure all {serviceName.toLowerCase()} campaigns comply with {industryInfo.name.toLowerCase()} industry regulations and standards.
          </p>
          <div className="flex flex-wrap gap-2">
            {industryInfo.regulations.map((regulation) => (
              <span 
                key={regulation}
                className="bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm"
              >
                {regulation}
              </span>
            ))}
          </div>
        </div>

        {/* Platform Recommendations */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8">
            Recommended Platforms for {industryInfo.name}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {industryInfo.bestPlatforms.map((platform, index) => (
              <div key={index} className="border border-foreground/10 rounded-lg p-4 text-center">
                <h3 className="font-semibold mb-2">{platform.split(' (')[0]}</h3>
                <p className="text-sm text-foreground/70">
                  {platform.includes('(') ? platform.split('(')[1].replace(')', '') : 'Optimized for your industry'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-3xl mx-auto text-center bg-foreground/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Dominate {industryInfo.name} with {serviceName}?
          </h2>
          <p className="text-foreground/80 mb-6">
            Get a custom {serviceName.toLowerCase()} strategy designed specifically for {industryInfo.name.toLowerCase()} businesses. 
            Our industry expertise ensures compliance and maximum ROI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-foreground text-background px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
              Start Your {industryInfo.name} Campaign
            </button>
            <button className="border border-foreground/20 px-8 py-3 rounded-full font-semibold hover:bg-foreground/5 transition-colors">
              Download Industry Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}