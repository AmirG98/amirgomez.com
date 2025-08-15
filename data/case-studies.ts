export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client: {
    name: string;
    industry: string;
    size: string;
    website?: string;
  };
  challenge: string;
  solution: string;
  results: {
    metric: string;
    before: string;
    after: string;
    improvement: string;
    timeframe: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    position: string;
  };
  services: string[];
  duration: string;
  budget: string;
  featured: boolean;
  publishedAt: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "How TechStart Solutions Increased ROI by 450% with Strategic Google Ads",
    slug: "techstart-solutions-google-ads-roi-increase",
    client: {
      name: "TechStart Solutions",
      industry: "B2B SaaS",
      size: "50-100 employees",
      website: "techstartsolutions.com"
    },
    challenge: "TechStart Solutions was spending $15,000/month on Google Ads with break-even ROI. Their campaigns generated leads but weren't profitable, and they couldn't identify which keywords and campaigns were driving actual revenue.",
    solution: "I implemented a complete campaign restructuring with proper conversion tracking, audience segmentation, and bid optimization. The strategy focused on high-intent keywords, improved landing pages, and sophisticated attribution modeling.",
    results: [
      {
        metric: "Return on Ad Spend (ROAS)",
        before: "1.0x (break-even)",
        after: "4.5x",
        improvement: "450% increase",
        timeframe: "4 months"
      },
      {
        metric: "Cost per Acquisition",
        before: "$450",
        after: "$120",
        improvement: "73% decrease",
        timeframe: "4 months"
      },
      {
        metric: "Monthly Revenue from Ads",
        before: "$15,000",
        after: "$67,500",
        improvement: "350% increase",
        timeframe: "4 months"
      },
      {
        metric: "Lead Quality Score",
        before: "6.2/10",
        after: "8.9/10",
        improvement: "44% increase",
        timeframe: "4 months"
      }
    ],
    testimonial: {
      quote: "Amir transformed our Google Ads from a money pit into our most profitable marketing channel. His systematic approach and clear reporting made all the difference. We went from break-even to 450% ROI in just 4 months.",
      author: "Sarah Johnson",
      position: "CEO, TechStart Solutions"
    },
    services: ["Google Ads Management", "Conversion Tracking", "Landing Page Optimization", "Analytics Setup"],
    duration: "6 months",
    budget: "$15,000/month ad spend",
    featured: true,
    publishedAt: "2024-07-15",
    seo: {
      metaTitle: "Case Study: 450% ROI Increase with Google Ads - TechStart Solutions",
      metaDescription: "Discover how TechStart Solutions increased their Google Ads ROI by 450% and decreased cost per acquisition by 73% in just 4 months.",
      keywords: ["Google Ads case study", "ROI improvement", "B2B SaaS marketing", "conversion optimization", "PPC success story"]
    }
  },
  {
    id: "2",
    title: "E-commerce Plus: $200k Revenue Boost Through Email Marketing Automation",
    slug: "ecommerce-plus-email-marketing-automation-success",
    client: {
      name: "E-commerce Plus",
      industry: "E-commerce",
      size: "10-50 employees",
      website: "ecommerceplus.com"
    },
    challenge: "E-commerce Plus had a growing email list of 50,000 subscribers but was only sending occasional newsletters. They were missing out on automated revenue opportunities and had a high cart abandonment rate of 78%.",
    solution: "I designed and implemented a comprehensive email automation system including welcome sequences, abandoned cart recovery, post-purchase follow-ups, and customer segmentation based on purchase behavior and engagement levels.",
    results: [
      {
        metric: "Email Revenue",
        before: "$8,000/month",
        after: "$55,000/month",
        improvement: "587% increase",
        timeframe: "6 months"
      },
      {
        metric: "Cart Abandonment Recovery",
        before: "22% recovery rate",
        after: "61% recovery rate",
        improvement: "177% increase",
        timeframe: "6 months"
      },
      {
        metric: "Customer Lifetime Value",
        before: "$185",
        after: "$340",
        improvement: "84% increase",
        timeframe: "6 months"
      },
      {
        metric: "Email Open Rates",
        before: "18.5%",
        after: "34.2%",
        improvement: "85% increase",
        timeframe: "6 months"
      }
    ],
    testimonial: {
      quote: "Amir's email automation sequences alone generated an additional $200k in revenue this year. His understanding of customer psychology and timing is incredible. Every email feels personal and relevant.",
      author: "Mike Chen",
      position: "Founder, E-commerce Plus"
    },
    services: ["Email Marketing Automation", "Customer Segmentation", "A/B Testing", "Revenue Attribution"],
    duration: "8 months",
    budget: "$5,000/month management fee",
    featured: true,
    publishedAt: "2024-06-20",
    seo: {
      metaTitle: "Case Study: $200k Revenue Boost Through Email Automation - E-commerce Plus",
      metaDescription: "Learn how E-commerce Plus increased email revenue by 587% and improved cart recovery by 177% with strategic email automation.",
      keywords: ["email marketing case study", "e-commerce automation", "cart abandonment", "email revenue", "customer retention"]
    }
  },
  {
    id: "3",
    title: "HealthCare Pro: 300% Lead Quality Improvement with Facebook Ads",
    slug: "healthcare-pro-facebook-ads-lead-quality-improvement",
    client: {
      name: "HealthCare Pro",
      industry: "Healthcare Services",
      size: "100-500 employees",
      website: "healthcarepro.com"
    },
    challenge: "HealthCare Pro was generating high volumes of leads through Facebook Ads but struggling with lead quality. 85% of leads weren't converting to appointments, and the sales team was frustrated with unqualified prospects.",
    solution: "I redesigned their Facebook advertising strategy with advanced audience targeting, qualification questions in lead forms, and a sophisticated lead scoring system. We also implemented retargeting campaigns for website visitors.",
    results: [
      {
        metric: "Lead Quality Score",
        before: "3.2/10",
        after: "8.7/10",
        improvement: "172% increase",
        timeframe: "5 months"
      },
      {
        metric: "Lead-to-Appointment Rate",
        before: "15%",
        after: "52%",
        improvement: "247% increase",
        timeframe: "5 months"
      },
      {
        metric: "Cost per Qualified Lead",
        before: "$180",
        after: "$65",
        improvement: "64% decrease",
        timeframe: "5 months"
      },
      {
        metric: "Monthly Revenue",
        before: "$125,000",
        after: "$285,000",
        improvement: "128% increase",
        timeframe: "5 months"
      }
    ],
    testimonial: {
      quote: "Finally found someone who understands both the technical and strategic sides of digital marketing. Amir didn't just increase our lead volume - he transformed the quality of our prospects. Our sales team actually thanks us now!",
      author: "Dr. Lisa Martinez",
      position: "Marketing Director, HealthCare Pro"
    },
    services: ["Facebook Ads Management", "Lead Generation", "Audience Research", "Conversion Optimization"],
    duration: "7 months",
    budget: "$12,000/month ad spend",
    featured: true,
    publishedAt: "2024-05-10",
    seo: {
      metaTitle: "Case Study: 300% Lead Quality Improvement with Facebook Ads - HealthCare Pro",
      metaDescription: "Discover how HealthCare Pro improved lead quality by 172% and increased lead-to-appointment rate by 247% with strategic Facebook advertising.",
      keywords: ["Facebook Ads case study", "lead quality improvement", "healthcare marketing", "B2B lead generation", "social media advertising"]
    }
  },
  {
    id: "4",
    title: "Local Service Company: 500% Local Search Visibility Increase",
    slug: "local-service-company-search-visibility-increase",
    client: {
      name: "Elite Home Services",
      industry: "Home Services",
      size: "10-25 employees"
    },
    challenge: "Elite Home Services was struggling to compete with larger companies in local search results. They had minimal online presence and were losing potential customers to competitors who appeared higher in Google searches.",
    solution: "I implemented a comprehensive local SEO and Google Ads strategy, optimizing their Google My Business profile, creating location-specific landing pages, and launching targeted local advertising campaigns.",
    results: [
      {
        metric: "Local Search Visibility",
        before: "12% share of voice",
        after: "67% share of voice",
        improvement: "458% increase",
        timeframe: "6 months"
      },
      {
        metric: "Monthly Service Calls",
        before: "45 calls",
        after: "185 calls",
        improvement: "311% increase",
        timeframe: "6 months"
      },
      {
        metric: "Google My Business Views",
        before: "1,200/month",
        after: "8,500/month",
        improvement: "608% increase",
        timeframe: "6 months"
      },
      {
        metric: "Monthly Revenue",
        before: "$35,000",
        after: "$125,000",
        improvement: "257% increase",
        timeframe: "6 months"
      }
    ],
    testimonial: {
      quote: "Amir completely transformed our online presence. We went from being invisible in local searches to dominating our market. The phone hasn't stopped ringing since we started working together.",
      author: "Tom Rodriguez",
      position: "Owner, Elite Home Services"
    },
    services: ["Local SEO", "Google My Business Optimization", "Google Ads", "Website Optimization"],
    duration: "9 months",
    budget: "$3,500/month management + ad spend",
    featured: false,
    publishedAt: "2024-04-05",
    seo: {
      metaTitle: "Case Study: 500% Local Search Visibility Increase - Elite Home Services",
      metaDescription: "Learn how Elite Home Services increased local search visibility by 458% and monthly revenue by 257% with strategic local SEO and Google Ads.",
      keywords: ["local SEO case study", "Google My Business optimization", "home services marketing", "local search visibility", "small business growth"]
    }
  }
];

export const getFeaturedCaseStudies = () => caseStudies.filter(study => study.featured);

export const getCaseStudyBySlug = (slug: string) => 
  caseStudies.find(study => study.slug === slug);

export const getCaseStudiesByIndustry = (industry: string) => 
  caseStudies.filter(study => study.client.industry === industry);

export const getRelatedCaseStudies = (currentSlug: string, industry: string, limit: number = 2) => 
  caseStudies
    .filter(study => study.slug !== currentSlug && study.client.industry === industry)
    .slice(0, limit);

export const getAllIndustries = () => {
  const industries = new Set<string>();
  caseStudies.forEach(study => industries.add(study.client.industry));
  return Array.from(industries).sort();
};