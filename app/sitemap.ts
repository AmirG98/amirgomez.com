import { MetadataRoute } from 'next';

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

const BLOG_DATA = {
  'web-development': [
    'best-practices',
    'performance-optimization',
    'accessibility',
    'modern-frameworks',
    'responsive-design'
  ],
  'javascript': [
    'es6-features',
    'async-programming',
    'dom-manipulation',
    'testing-strategies',
    'performance-tips'
  ],
  'react': [
    'hooks-guide',
    'state-management',
    'component-patterns',
    'testing-react',
    'performance-optimization'
  ],
  'nextjs': [
    'app-router-guide',
    'server-components',
    'static-generation',
    'api-routes',
    'deployment-strategies'
  ],
  'typescript': [
    'getting-started',
    'advanced-types',
    'generics-guide',
    'migration-strategies',
    'tooling-setup'
  ],
  'career': [
    'skill-development',
    'portfolio-building',
    'interview-preparation',
    'networking-tips',
    'salary-negotiation'
  ],
  'freelancing': [
    'getting-started',
    'client-management',
    'pricing-strategies',
    'project-management',
    'business-development'
  ],
  'tutorials': [
    'beginner-projects',
    'advanced-concepts',
    'tool-comparisons',
    'setup-guides',
    'troubleshooting'
  ]
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://amirgomez-com.vercel.app';
  
  const sitemap: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];

  // Generate service/location pages
  for (const service of VALID_SERVICES) {
    for (const location of VALID_LOCATIONS) {
      sitemap.push({
        url: `${baseUrl}/services/${service}/${location}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  }

  // Generate blog pages
  for (const [category, topics] of Object.entries(BLOG_DATA)) {
    for (const topic of topics) {
      sitemap.push({
        url: `${baseUrl}/blog/${category}/${topic}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }

  return sitemap;
}