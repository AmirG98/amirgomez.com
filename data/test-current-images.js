const https = require('https');
const fs = require('fs');
const path = require('path');

// Read the actual blog-posts.ts file
const filePath = path.join(__dirname, 'blog-posts.ts');
const fileContent = fs.readFileSync(filePath, 'utf8');
const lines = fileContent.split('\n');

// Extract all Unsplash image URLs from the file
const markdownImageRegex = /!\[([^\]]*)\]\((https:\/\/images\.unsplash\.com\/[^)]+)\)/g;
const featuredImageRegex = /featuredImage:\s*["'](https:\/\/images\.unsplash\.com\/[^"']+)["']/g;

const markdownImages = [];
const featuredImages = [];

lines.forEach((line, index) => {
  const lineNumber = index + 1;

  // Find markdown images
  let match;
  while ((match = markdownImageRegex.exec(line)) !== null) {
    const url = match[2];
    const photoIdMatch = url.match(/photo-([^?]+)/);
    const photoId = photoIdMatch ? photoIdMatch[0] : 'unknown';
    markdownImages.push({
      line: lineNumber,
      url: url,
      id: photoId,
      type: 'markdown',
      alt: match[1]
    });
  }

  // Find featured images
  while ((match = featuredImageRegex.exec(line)) !== null) {
    const url = match[1];
    const photoIdMatch = url.match(/photo-([^?]+)/);
    const photoId = photoIdMatch ? photoIdMatch[0] : 'unknown';
    featuredImages.push({
      line: lineNumber,
      url: url,
      id: photoId,
      type: 'featured'
    });
  }
});

const allImages = [...markdownImages, ...featuredImages];

console.log(`Found ${allImages.length} Unsplash images in current file:`);
console.log(`- ${markdownImages.length} markdown images`);
console.log(`- ${featuredImages.length} featured images\n`);

function testUrl(urlObj) {
  return new Promise((resolve) => {
    const url = new URL(urlObj.url);
    const options = {
      method: 'HEAD',
      hostname: url.hostname,
      path: url.pathname + url.search,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };

    const req = https.request(options, (res) => {
      resolve({
        ...urlObj,
        status: res.statusCode,
        working: res.statusCode >= 200 && res.statusCode < 400
      });
    });

    req.on('error', (error) => {
      resolve({
        ...urlObj,
        status: 'ERROR',
        working: false,
        error: error.message
      });
    });

    req.setTimeout(5000, () => {
      req.destroy();
      resolve({
        ...urlObj,
        status: 'TIMEOUT',
        working: false
      });
    });

    req.end();
  });
}

async function testAllUrls() {
  console.log('=== TESTING CURRENT IMAGES ===\n');

  const results = [];
  for (let i = 0; i < allImages.length; i++) {
    const result = await testUrl(allImages[i]);
    results.push(result);

    const status = result.working ? '✓ OK' : '✗ BROKEN';
    const typeLabel = result.type === 'featured' ? '[FEATURED]' : '[CONTENT]';
    console.log(`[${i + 1}/${allImages.length}] ${typeLabel} Line ${result.line}: ${status} (${result.status}) - ${result.id}`);

    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n=== SUMMARY ===');
  const broken = results.filter(r => !r.working);
  const working = results.filter(r => r.working);
  const brokenMarkdown = broken.filter(r => r.type === 'markdown');
  const brokenFeatured = broken.filter(r => r.type === 'featured');

  console.log(`Total URLs tested: ${results.length}`);
  console.log(`Working: ${working.length}`);
  console.log(`Broken: ${broken.length}`);
  console.log(`  - Markdown images: ${brokenMarkdown.length}`);
  console.log(`  - Featured images: ${brokenFeatured.length}`);

  if (broken.length > 0) {
    console.log('\n=== BROKEN IMAGES ===');
    brokenMarkdown.forEach(b => {
      console.log(`[MARKDOWN] Line ${b.line}: ${b.id}`);
      console.log(`  Alt text: "${b.alt}"`);
      console.log(`  URL: ${b.url}`);
      console.log(`  Status: ${b.status}\n`);
    });
    brokenFeatured.forEach(b => {
      console.log(`[FEATURED - CRITICAL] Line ${b.line}: ${b.id}`);
      console.log(`  URL: ${b.url}`);
      console.log(`  Status: ${b.status}\n`);
    });
  } else {
    console.log('\n✓ All images are working!');
  }

  return { results, broken, working, brokenMarkdown, brokenFeatured };
}

testAllUrls().catch(console.error);
