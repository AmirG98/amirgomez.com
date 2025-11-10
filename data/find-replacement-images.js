// Mapping of broken images to their blog post topics and suggested replacements
const replacements = [
  {
    line: 4232,
    oldUrl: "https://images.unsplash.com/photo-JKUTrJ4vK00?w=800&h=450&fit=crop&auto=format",
    topic: "Google Ads Performance Max Revolution 2025",
    theme: "Google Ads, PPC, digital advertising, performance marketing",
    suggestedImages: [
      "photo-1460925895917-afdab827c52f", // Charts/analytics
      "photo-1551288049-bebda4e38f71", // Data visualization
      "photo-1551434678-e076c223a692"  // Analytics dashboard
    ]
  },
  {
    line: 4402,
    oldUrl: "https://images.unsplash.com/photo-fyaTq-fIlro?w=800&h=450&fit=crop&auto=format",
    topic: "Amazon Advertising Transformation 2025",
    theme: "Amazon, e-commerce advertising, DSP, retail media",
    suggestedImages: [
      "photo-1611162616475-46b635cb6868", // Online shopping
      "photo-1611162617474-5b21e879e113", // E-commerce
      "photo-1542744094-3a31f272c490"  // Business/tech
    ]
  },
  {
    line: 4726,
    oldUrl: "https://images.unsplash.com/photo-1558618046-fbd81c7d2cd7?w=800&h=450&fit=crop&auto=format",
    topic: "Influencer Marketing Shakeup 2025",
    theme: "Influencer marketing, social media, content creation",
    suggestedImages: [
      "photo-1553484771-371a605b060b", // Social media on phone
      "photo-1563013544-824ae1b704d3", // Team collaboration
      "photo-1552664730-d307ca884978"  // Startup/teamwork
    ]
  },
  {
    line: 6619,
    oldUrl: "https://images.unsplash.com/photo-hpjSkU2UYSU?w=800&h=450&fit=crop&auto=format",
    topic: "GEO vs SEO 2025",
    theme: "SEO, GEO, search optimization, AI engines",
    suggestedImages: [
      "photo-1551434678-e076c223a692", // Analytics
      "photo-1554224155-6726b3ff858f", // Data/technology
      "photo-1460925895917-afdab827c52f"  // Charts
    ]
  },
  {
    line: 8288,
    oldUrl: "https://images.unsplash.com/photo-JKUTrJ4vK00?w=800&h=450&fit=crop&auto=format",
    topic: "Complete Guide to Google Ads ROI Optimization 2025",
    theme: "Google Ads, ROI, optimization, analytics",
    suggestedImages: [
      "photo-1460925895917-afdab827c52f", // Charts/analytics
      "photo-1551288049-bebda4e38f71", // Data visualization
      "photo-1551434678-e076c223a692"  // Analytics dashboard
    ]
  },
  {
    line: 12077,
    oldUrl: "https://images.unsplash.com/photo-1562577309-4fb6fb3fa5eb?w=800&h=450&fit=crop&auto=format",
    topic: "Instagram Marketing Strategy",
    theme: "Instagram, social media marketing, engagement",
    suggestedImages: [
      "photo-1553484771-371a605b060b", // Social media on phone
      "photo-1611605698335-8b1569810432", // Social engagement
      "photo-1563013544-824ae1b704d3"  // Team/business
    ]
  },
  {
    line: 13698,
    oldUrl: "https://images.unsplash.com/photo-eveI7MOcSmw?w=800&h=450&fit=crop&auto=format",
    topic: "E-commerce SEO Product Page Optimization",
    theme: "E-commerce, SEO, product pages, online shopping",
    suggestedImages: [
      "photo-1611162616475-46b635cb6868", // Online shopping
      "photo-1611162617474-5b21e879e113", // E-commerce
      "photo-1542744094-3a31f272c490"  // Business laptop
    ]
  },
  {
    line: 14897,
    oldUrl: "https://images.unsplash.com/photo-YZlkU7qHd3c?w=800&h=450&fit=crop&auto=format",
    topic: "E-commerce Conversion Rate Optimization",
    theme: "E-commerce, CRO, UX, online sales",
    suggestedImages: [
      "photo-1611162616475-46b635cb6868", // Online shopping
      "photo-1611162617474-5b21e879e113", // E-commerce
      "photo-1600880292203-757bb62b4baf"  // Business teamwork
    ]
  },
  {
    line: 17946,
    oldUrl: "https://images.unsplash.com/photo-0I21xHfgw0E?w=800&h=450&fit=crop&auto=format",
    topic: "Facebook Dynamic Product Ads Optimization",
    theme: "Facebook ads, dynamic ads, e-commerce advertising",
    suggestedImages: [
      "photo-1611162617474-5b21e879e113", // E-commerce
      "photo-1542744094-3a31f272c490", // Business/tech
      "photo-1460925895917-afdab827c52f"  // Analytics
    ]
  },
  {
    line: 18189,
    oldUrl: "https://images.unsplash.com/photo-06MHFfYv6YY?w=800&h=450&fit=crop&auto=format",
    topic: "Google Local Services Ads Management",
    theme: "Local services, Google Ads, local business",
    suggestedImages: [
      "photo-1600880292203-757bb62b4baf", // Business teamwork
      "photo-1552664730-d307ca884978", // Startup/teamwork
      "photo-1563013544-824ae1b704d3"  // Team collaboration
    ]
  },
  {
    line: 20239,
    oldUrl: "https://images.unsplash.com/photo-hpjSkU2UYSU?w=800&h=450&fit=crop&auto=format",
    topic: "SaaS Marketing Automation 2025",
    theme: "SaaS, marketing automation, software, technology",
    suggestedImages: [
      "photo-1554224155-6726b3ff858f", // Data/technology
      "photo-1542744094-3a31f272c490", // Business laptop
      "photo-1551434678-e076c223a692"  // Analytics
    ]
  },
  {
    line: 20406,
    oldUrl: "https://images.unsplash.com/photo-BQ9usyzHx_w?w=800&h=450&fit=crop&auto=format",
    topic: "E-commerce Conversion Rate Optimization 2025",
    theme: "E-commerce, CRO, online sales, conversion",
    suggestedImages: [
      "photo-1611162616475-46b635cb6868", // Online shopping
      "photo-1611162617474-5b21e879e113", // E-commerce
      "photo-1542744094-3a31f272c490"  // Business
    ]
  },
  {
    line: 21046,
    oldUrl: "https://images.unsplash.com/photo-dpbXgTh0Lac?w=800&h=450&fit=crop&auto=format",
    topic: "Marketing Technology Stack 2025",
    theme: "MarTech, marketing tools, software, technology",
    suggestedImages: [
      "photo-1554224155-6726b3ff858f", // Data/technology
      "photo-1542744094-3a31f272c490", // Business laptop
      "photo-1451187580459-43490279c0fa"  // Technology
    ]
  },
  {
    line: 22138,
    oldUrl: "https://images.unsplash.com/photo-yqaskj8lQBE?w=800&h=450&fit=crop&auto=format",
    topic: "Marketing Analytics Mastery 2025",
    theme: "Marketing analytics, data analysis, metrics, ROI",
    suggestedImages: [
      "photo-1460925895917-afdab827c52f", // Charts/analytics
      "photo-1551288049-bebda4e38f71", // Data visualization
      "photo-1551434678-e076c223a692"  // Analytics dashboard
    ]
  },
  {
    line: 23456,
    oldUrl: "https://images.unsplash.com/photo-Jrz9YXN1Vwc?w=800&h=450&fit=crop&auto=format",
    topic: "TikTok Ads for Local Businesses 2025",
    theme: "TikTok, social media ads, local business, mobile",
    suggestedImages: [
      "photo-1553484771-371a605b060b", // Social media on phone
      "photo-1563013544-824ae1b704d3", // Team collaboration
      "photo-1552664730-d307ca884978"  // Startup
    ]
  },
  {
    line: 22952,
    oldUrl: "https://images.unsplash.com/photo-w9coDxtsfts?w=800&h=450&fit=crop&auto=format",
    topic: "Advanced Conversion Rate Optimization 2025",
    theme: "CRO, A/B testing, psychology, optimization",
    suggestedImages: [
      "photo-1460925895917-afdab827c52f", // Charts/analytics
      "photo-1551288049-bebda4e38f71", // Data visualization
      "photo-1551434678-e076c223a692"  // Analytics
    ]
  },
  {
    line: 24678,
    oldUrl: "https://images.unsplash.com/photo-8wy9mGgmGoU?w=800&h=450&fit=crop&auto=format",
    topic: "Amazon PPC for Private Label 2025",
    theme: "Amazon PPC, private label, e-commerce, product launch",
    suggestedImages: [
      "photo-1611162616475-46b635cb6868", // Online shopping
      "photo-1611162617474-5b21e879e113", // E-commerce
      "photo-1542744094-3a31f272c490"  // Business
    ]
  }
];

console.log("=== REPLACEMENT IMAGE RECOMMENDATIONS ===\n");
console.log(`Total broken featured images: ${replacements.length}\n`);

replacements.forEach((item, index) => {
  console.log(`${index + 1}. Line ${item.line}: ${item.topic}`);
  console.log(`   Theme: ${item.theme}`);
  console.log(`   Old: ${item.oldUrl}`);
  console.log(`   Suggested: ${item.suggestedImages[0]}`);
  console.log(`   New URL: https://images.unsplash.com/${item.suggestedImages[0]}?w=800&h=450&fit=crop&auto=format\n`);
});

// Export for use
module.exports = replacements;
