const fs = require('fs');
const path = require('path');

// Read the blog-posts.ts file
const filePath = path.join(__dirname, 'blog-posts.ts');
const fileContent = fs.readFileSync(filePath, 'utf8');

// Extract all posts with their featured images
const posts = [];
const lines = fileContent.split('\n');

let currentPost = null;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Match id
  const idMatch = line.match(/id:\s*["'](\d+)["']/);
  if (idMatch) {
    currentPost = { id: idMatch[1], lineNum: i + 1 };
  }

  // Match title
  const titleMatch = line.match(/title:\s*["']([^"']+)["']/);
  if (titleMatch && currentPost && !currentPost.title) {
    currentPost.title = titleMatch[1];
  }

  // Match slug
  const slugMatch = line.match(/slug:\s*["']([^"']+)["']/);
  if (slugMatch && currentPost && !currentPost.slug) {
    currentPost.slug = slugMatch[1];
  }

  // Match featuredImage
  const imageMatch = line.match(/featuredImage:\s*["'](https:\/\/images\.unsplash\.com\/([^"']+))["']/);
  if (imageMatch && currentPost && !currentPost.featuredImage) {
    currentPost.featuredImage = imageMatch[1];
    currentPost.photoId = imageMatch[1].match(/photo-([^?]+)/)[1];
    currentPost.imageLine = i + 1;
    posts.push(currentPost);
    currentPost = null;
  }
}

console.log(`Total posts analyzed: ${posts.length}\n`);

// Group posts by featured image
const imageGroups = {};
posts.forEach(post => {
  if (!imageGroups[post.photoId]) {
    imageGroups[post.photoId] = [];
  }
  imageGroups[post.photoId].push(post);
});

// Find duplicates
const duplicates = Object.entries(imageGroups)
  .filter(([photoId, postsWithImage]) => postsWithImage.length > 1)
  .sort((a, b) => b[1].length - a[1].length);

console.log('=== DUPLICATE FEATURED IMAGES ===\n');

if (duplicates.length === 0) {
  console.log('✓ No duplicate featured images found! Each post has a unique image.\n');
} else {
  console.log(`⚠ Found ${duplicates.length} images used by multiple posts\n`);

  let totalDuplicatePosts = 0;
  duplicates.forEach(([photoId, postsWithImage], index) => {
    console.log(`${index + 1}. Image photo-${photoId} (used ${postsWithImage.length} times):`);
    console.log(`   URL: ${postsWithImage[0].featuredImage}\n`);

    postsWithImage.forEach((post, i) => {
      console.log(`   ${i + 1}. ID ${post.id} (Line ${post.imageLine}): "${post.title}"`);
    });
    console.log('');

    totalDuplicatePosts += postsWithImage.length;
  });

  console.log('=== SUMMARY ===');
  console.log(`Total posts: ${posts.length}`);
  console.log(`Unique images: ${Object.keys(imageGroups).length}`);
  console.log(`Duplicate images: ${duplicates.length}`);
  console.log(`Posts affected: ${totalDuplicatePosts}`);
  console.log(`Posts needing new images: ${totalDuplicatePosts - duplicates.length} (keep 1 per duplicate group)`);
}
