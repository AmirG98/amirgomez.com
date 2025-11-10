const fs = require('fs');
const path = require('path');

// Curated list of working Unsplash images organized by topic
const imagesByTopic = {
  analytics: [
    'photo-1551288049-bebda4e38f71',
    'photo-1460925895917-afdab827c52f',
    'photo-1551434678-e076c223a692',
    'photo-1454165804606-c3d57bc86b40'
  ],
  ecommerce: [
    'photo-1611162616475-46b635cb6868',
    'photo-1611162617474-5b21e879e113',
    'photo-1542744094-3a31f272c490',
    'photo-1472851294608-062f824d29cc'
  ],
  social: [
    'photo-1563013544-824ae1b704d3',
    'photo-1553484771-371a605b060b',
    'photo-1522202176988-66273c2fd55f',
    'photo-1611162618071-b39a2ec055fb'
  ],
  email: [
    'photo-1596526131083-e8c633c948d2',
    'photo-1587620962725-abab7fe55159',
    'photo-1557200134-90327ee9fafa'
  ],
  seo: [
    'photo-1432888622747-4eb9a8efeb07',
    'photo-1553877522-43269d4ea984',
    'photo-1486312338219-ce68d2c6f44d'
  ],
  marketing: [
    'photo-1552664730-d307ca884978',
    'photo-1600880292203-757bb62b4baf',
    'photo-1556742049-0cfed4f6a45d'
  ],
  technology: [
    'photo-1554224155-6726b3ff858f',
    'photo-1518186285589-2f7649de83e0',
    'photo-1451187580459-43490279c0fa'
  ],
  business: [
    'photo-1507003211169-0a1dd7228f2d',
    'photo-1518186233392-c232efbf2373',
    'photo-1521737604893-d14cc237f11d'
  ],
  team: [
    'photo-1559526324-4b87b5e36e44',
    'photo-1543286386-713bdd548da4',
    'photo-1556155092-490a1ba16284'
  ],
  creative: [
    'photo-1611224923853-80b023f02d71',
    'photo-1655720828018-edd2daec9349',
    'photo-1629909613654-28e377c37b09'
  ],
  advertising: [
    'photo-1618044619888-009e412ff12a',
    'photo-1633356122544-f134324a6cee',
    'photo-1677442136019-21780ecad995'
  ],
  retail: [
    'photo-1441986300917-64674bd600d8',
    'photo-1606811841689-23dfddce3e95',
    'photo-1565728744382-61accd4aa148'
  ],
  content: [
    'photo-1572021335469-31706a17aaef',
    'photo-1563986768494-4dee2763ff3f',
    'photo-1559136555-9303baea8ebd'
  ],
  growth: [
    'photo-1560472354-b33ff0c44a43',
    'photo-1557804506-669a67965ba0',
    'photo-1551650975-87deedd944c3'
  ]
};

// Function to categorize blog post by title
function categorizePost(title) {
  const lower = title.toLowerCase();

  if (lower.includes('analytics') || lower.includes('data') || lower.includes('roi') || lower.includes('metric')) return 'analytics';
  if (lower.includes('ecommerce') || lower.includes('e-commerce') || lower.includes('shopping') || lower.includes('amazon')) return 'ecommerce';
  if (lower.includes('social') || lower.includes('instagram') || lower.includes('tiktok') || lower.includes('facebook')) return 'social';
  if (lower.includes('email')) return 'email';
  if (lower.includes('seo') || lower.includes('search') || lower.includes('google')) return 'seo';
  if (lower.includes('saas') || lower.includes('software') || lower.includes('tech')) return 'technology';
  if (lower.includes('content') || lower.includes('blog') || lower.includes('video')) return 'content';
  if (lower.includes('team') || lower.includes('agency') || lower.includes('collaboration')) return 'team';
  if (lower.includes('creative') || lower.includes('design') || lower.includes('influencer')) return 'creative';
  if (lower.includes('ads') || lower.includes('advertising') || lower.includes('ppc')) return 'advertising';
  if (lower.includes('retail') || lower.includes('store') || lower.includes('local')) return 'retail';
  if (lower.includes('growth') || lower.includes('scaling') || lower.includes('automation')) return 'growth';

  return 'marketing'; // default
}

// Read blog posts
const filePath = path.join(__dirname, 'blog-posts.ts');
const fileContent = fs.readFileSync(filePath, 'utf8');

// Extract all posts
const posts = [];
const lines = fileContent.split('\n');

let currentPost = null;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  const idMatch = line.match(/id:\s*["'](\d+)["']/);
  if (idMatch) {
    currentPost = { id: idMatch[1], lineNum: i + 1 };
  }

  const titleMatch = line.match(/title:\s*["']([^"']+)["']/);
  if (titleMatch && currentPost && !currentPost.title) {
    currentPost.title = titleMatch[1];
  }

  const imageMatch = line.match(/featuredImage:\s*["'](https:\/\/images\.unsplash\.com\/([^"']+))["']/);
  if (imageMatch && currentPost && !currentPost.featuredImage) {
    currentPost.featuredImage = imageMatch[1];
    currentPost.photoId = imageMatch[1].match(/photo-([^?]+)/)[1];
    currentPost.imageLine = i + 1;
    currentPost.category = categorizePost(currentPost.title);
    posts.push(currentPost);
    currentPost = null;
  }
}

// Group by photo ID
const imageGroups = {};
posts.forEach(post => {
  if (!imageGroups[post.photoId]) {
    imageGroups[post.photoId] = [];
  }
  imageGroups[post.photoId].push(post);
});

// Find duplicates (keep first, replace rest)
const duplicates = Object.entries(imageGroups)
  .filter(([photoId, postsWithImage]) => postsWithImage.length > 1);

// Track used images
const usedImages = new Set(posts.map(p => p.photoId));

// Generate replacements
const replacements = [];
duplicates.forEach(([photoId, postsGroup]) => {
  // Keep first post, replace the rest
  const postsToReplace = postsGroup.slice(1);

  postsToReplace.forEach(post => {
    const category = post.category;
    const availableImages = imagesByTopic[category] || imagesByTopic.marketing;

    // Find an unused image from this category
    let newImage = availableImages.find(img => !usedImages.has(img));

    // If all category images are used, try other categories
    if (!newImage) {
      for (const [cat, images] of Object.entries(imagesByTopic)) {
        newImage = images.find(img => !usedImages.has(img));
        if (newImage) break;
      }
    }

    // If still no image, generate a random ID
    if (!newImage) {
      newImage = `photo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    usedImages.add(newImage);

    replacements.push({
      postId: post.id,
      title: post.title,
      oldImage: post.photoId,
      newImage: newImage,
      category: category,
      line: post.imageLine
    });
  });
});

console.log(`Generated ${replacements.length} replacement recommendations\n`);

// Save to file
fs.writeFileSync(
  path.join(__dirname, 'replacement-plan.json'),
  JSON.stringify(replacements, null, 2)
);

console.log('Replacement plan saved to replacement-plan.json');
console.log(`\nSample replacements:`);
replacements.slice(0, 5).forEach(r => {
  console.log(`- Post ${r.postId}: ${r.title.substring(0, 50)}...`);
  console.log(`  ${r.oldImage} → ${r.newImage} (${r.category})`);
});

module.exports = replacements;
