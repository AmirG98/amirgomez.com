const fs = require('fs');
const path = require('path');

// Read the blog-posts.ts file
const filePath = path.join(__dirname, 'blog-posts.ts');
const fileContent = fs.readFileSync(filePath, 'utf8');

// Extract blog posts by finding objects with id, title, slug pattern
const posts = [];
const postMatches = fileContent.matchAll(/\{\s*id:\s*["'](\d+)["'],\s*title:\s*["']([^"']+)["'],\s*slug:\s*["']([^"']+)["']/g);

for (const match of postMatches) {
  posts.push({
    id: match[1],
    title: match[2],
    slug: match[3]
  });
}

console.log(`Total blog posts found: ${posts.length}\n`);

// Find duplicates by ID
const idMap = new Map();
const duplicateIds = [];
posts.forEach(post => {
  if (idMap.has(post.id)) {
    duplicateIds.push({
      id: post.id,
      posts: [idMap.get(post.id), post]
    });
  } else {
    idMap.set(post.id, post);
  }
});

// Find duplicates by title
const titleMap = new Map();
const duplicateTitles = [];
posts.forEach(post => {
  const normalizedTitle = post.title.toLowerCase().trim();
  if (titleMap.has(normalizedTitle)) {
    const existing = titleMap.get(normalizedTitle);
    if (!duplicateTitles.find(d => d.title === normalizedTitle)) {
      duplicateTitles.push({
        title: normalizedTitle,
        posts: [existing, post]
      });
    } else {
      duplicateTitles.find(d => d.title === normalizedTitle).posts.push(post);
    }
  } else {
    titleMap.set(normalizedTitle, post);
  }
});

// Find duplicates by slug
const slugMap = new Map();
const duplicateSlugs = [];
posts.forEach(post => {
  if (slugMap.has(post.slug)) {
    const existing = slugMap.get(post.slug);
    if (!duplicateSlugs.find(d => d.slug === post.slug)) {
      duplicateSlugs.push({
        slug: post.slug,
        posts: [existing, post]
      });
    } else {
      duplicateSlugs.find(d => d.slug === post.slug).posts.push(post);
    }
  } else {
    slugMap.set(post.slug, post);
  }
});

// Report findings
console.log('=== DUPLICATE ANALYSIS ===\n');

if (duplicateIds.length > 0) {
  console.log(`⚠ Found ${duplicateIds.length} duplicate IDs:\n`);
  duplicateIds.forEach(dup => {
    console.log(`ID: ${dup.id}`);
    dup.posts.forEach((post, i) => {
      console.log(`  ${i + 1}. "${post.title}"`);
      console.log(`     Slug: ${post.slug}`);
    });
    console.log('');
  });
} else {
  console.log('✓ No duplicate IDs found\n');
}

if (duplicateTitles.length > 0) {
  console.log(`⚠ Found ${duplicateTitles.length} duplicate titles:\n`);
  duplicateTitles.forEach(dup => {
    console.log(`Title: "${dup.title}"`);
    dup.posts.forEach((post, i) => {
      console.log(`  ${i + 1}. ID: ${post.id}, Slug: ${post.slug}`);
    });
    console.log('');
  });
} else {
  console.log('✓ No duplicate titles found\n');
}

if (duplicateSlugs.length > 0) {
  console.log(`⚠ Found ${duplicateSlugs.length} duplicate slugs:\n`);
  duplicateSlugs.forEach(dup => {
    console.log(`Slug: ${dup.slug}`);
    dup.posts.forEach((post, i) => {
      console.log(`  ${i + 1}. ID: ${post.id}, Title: "${post.title}"`);
    });
    console.log('');
  });
} else {
  console.log('✓ No duplicate slugs found\n');
}

// Summary
const totalDuplicates = duplicateIds.length + duplicateTitles.length + duplicateSlugs.length;
console.log('=== SUMMARY ===');
console.log(`Total posts: ${posts.length}`);
console.log(`Unique posts: ${idMap.size}`);
console.log(`Duplicate IDs: ${duplicateIds.length}`);
console.log(`Duplicate titles: ${duplicateTitles.length}`);
console.log(`Duplicate slugs: ${duplicateSlugs.length}`);

if (totalDuplicates === 0) {
  console.log('\n✓ No duplicates found! Your blog is clean.');
} else {
  console.log(`\n⚠ Total duplicate issues found: ${totalDuplicates}`);
}
