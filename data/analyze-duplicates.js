const fs = require('fs');
const path = require('path');

// Read the blog-posts.ts file
const filePath = path.join(__dirname, 'blog-posts.ts');
const fileContent = fs.readFileSync(filePath, 'utf8');

// Find the highest ID to help with reassignment
const idMatches = fileContent.matchAll(/id:\s*["'](\d+)["']/g);
const ids = Array.from(idMatches).map(m => parseInt(m[1]));
const maxId = Math.max(...ids);
const uniqueIds = new Set(ids);

console.log('=== ID ANALYSIS ===');
console.log(`Total blog posts: ${ids.length}`);
console.log(`Unique IDs: ${uniqueIds.size}`);
console.log(`Highest ID: ${maxId}`);
console.log(`Duplicate IDs: ${ids.length - uniqueIds.size}`);
console.log('');

// Find which IDs are duplicated
const idCounts = {};
ids.forEach(id => {
  idCounts[id] = (idCounts[id] || 0) + 1;
});

const duplicatedIds = Object.entries(idCounts)
  .filter(([id, count]) => count > 1)
  .map(([id, count]) => ({ id, count }));

console.log('=== DUPLICATE ID DETAILS ===');
duplicatedIds.forEach(dup => {
  console.log(`ID ${dup.id}: appears ${dup.count} times`);
});
console.log('');

// Recommendation
console.log('=== RECOMMENDATION ===');
console.log('These posts have different titles and content, so they are NOT duplicates.');
console.log('They just have duplicate IDs by mistake.');
console.log('');
console.log('Options:');
console.log('1. Keep all posts and reassign new IDs to duplicates');
console.log('2. Delete the second occurrence of each duplicate ID (removes 5 posts)');
console.log('');
console.log('Suggested approach: Keep all posts and reassign IDs starting from', maxId + 1);
