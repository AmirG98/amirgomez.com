const fs = require('fs');
const path = require('path');

// Read the blog-posts.ts file
const filePath = path.join(__dirname, 'blog-posts.ts');
const fileContent = fs.readFileSync(filePath, 'utf8');

// Regular expression to match markdown images with Unsplash URLs
// Pattern: ![anything](https://images.unsplash.com/...)
const markdownImageRegex = /!\[([^\]]*)\]\(https:\/\/images\.unsplash\.com\/[^)]+\)\s*\n*/g;

// Count matches before removal
const matches = fileContent.match(markdownImageRegex);
const count = matches ? matches.length : 0;

console.log(`Found ${count} markdown images to remove\n`);

if (count > 0) {
  // Show first few examples
  console.log('Examples of images being removed:');
  matches.slice(0, 5).forEach((match, i) => {
    console.log(`${i + 1}. ${match.trim()}`);
  });
  console.log(`... and ${count - 5} more\n`);
}

// Remove all markdown images
const updatedContent = fileContent.replace(markdownImageRegex, '');

// Write the updated content back to the file
fs.writeFileSync(filePath, updatedContent, 'utf8');

console.log(`✓ Successfully removed ${count} markdown images from blog-posts.ts`);

// Verify removal
const verifyContent = fs.readFileSync(filePath, 'utf8');
const remainingImages = verifyContent.match(markdownImageRegex);
const remainingCount = remainingImages ? remainingImages.length : 0;

console.log(`\nVerification: ${remainingCount} markdown images remaining`);

if (remainingCount === 0) {
  console.log('✓ All markdown images successfully removed!');
} else {
  console.log(`⚠ Warning: ${remainingCount} images still found`);
}
