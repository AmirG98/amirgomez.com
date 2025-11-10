const fs = require('fs');
const path = require('path');

// Verified working Unsplash images (from our previous tests)
const workingImages = [
  'photo-1655393001768-d946c97d6fd1',
  'photo-1633356122544-f134324a6cee',
  'photo-1611262588019-db6cc2032da3',
  'photo-1677442136019-21780ecad995',
  'photo-1516321318423-f06f85e504b3',
  'photo-1454165804606-c3d57bc86b40',
  'photo-1441986300917-64674bd600d8',
  'photo-1618044619888-009e412ff12a',
  'photo-1655720828018-edd2daec9349',
  'photo-1596526131083-e8c633c948d2',
  'photo-1574375927938-d5a98e8ffe85',
  'photo-1507003211169-0a1dd7228f2d',
  'photo-1518186285589-2f7649de83e0',
  'photo-1560518883-ce09059eeffa',
  'photo-1486406146926-c627a92ad1ab',
  'photo-1582407947304-fd86f028f716',
  'photo-1485827404703-89b55fcc595e',
  'photo-1518186233392-c232efbf2373',
  'photo-1606811841689-23dfddce3e95',
  'photo-1629909613654-28e377c37b09',
  'photo-1551601651-2a8555f1a136',
  'photo-1553877522-43269d4ea984',
  'photo-1552664730-d307ca884978',
  'photo-1460472178825-e5240623afd5',
  'photo-1551650975-87deedd944c3',
  'photo-1557804506-669a67965ba0',
  'photo-1504639725590-34d0984388bd',
  'photo-1486312338219-ce68d2c6f44d',
  'photo-1572021335469-31706a17aaef',
  'photo-1563986768494-4dee2763ff3f',
  'photo-1521737604893-d14cc237f11d',
  'photo-1543286386-713bdd548da4',
  'photo-1559526324-4b87b5e36e44',
  'photo-1556155092-490a1ba16284',
  'photo-1565728744382-61accd4aa148',
  'photo-1432888498266-38ffec3eaf0a',
  'photo-1600880292203-757bb62b4baf',
  'photo-1542744173-8e7e53415bb0',
  'photo-1560472354-b33ff0c44a43',
  'photo-1559136555-9303baea8ebd',
  'photo-1556761175-b413da4baf72',
  'photo-1512941937669-90a1b58e7e9c',
  'photo-1562577309-2592ab84b1bc',
  'photo-1589149098258-3e9102cd63d3',
  'photo-1573496359142-b8d87734a5a2',
  'photo-1593508512255-86ab42a8e620',
  'photo-1494526585095-c41746248156',
  'photo-1498050108023-c5249f4df085',
  'photo-1589829545856-d10d557cf95f',
  'photo-1451187580459-43490279c0fa',
  'photo-1432888622747-4eb9a8efeb07',
  'photo-1611162616305-c69b3fa7fbe0',
  'photo-1562577309-4932fdd64cd1',
  'photo-1563986768609-322da13575f3',
  'photo-1522202176988-66273c2fd55f',
  'photo-1611162618071-b39a2ec055fb',
  'photo-1611162616475-46b635cb6868',
  'photo-1611162617213-7d7a39e9b1d7',
  'photo-1611605698335-8b1569810432',
  'photo-1460925895917-afdab827c52f',
  'photo-1551288049-bebda4e38f71',
  'photo-1492619375914-88005aa9e8fb',
  'photo-1519389950473-47ba0277781c',
  'photo-1611224923853-80b023f02d71',
  'photo-1556742049-0cfed4f6a45d',
  'photo-1551434678-e076c223a692',
  'photo-1586023492125-27b2c045efd7',
  'photo-1563013544-824ae1b704d3',
  'photo-1554224155-6726b3ff858f',
  'photo-1542744094-3a31f272c490',
  'photo-1553484771-371a605b060b',
  'photo-1611162617474-5b21e879e113',
  'photo-1472851294608-062f824d29cc'
];

// Read the file
const filePath = path.join(__dirname, 'blog-posts.ts');
let fileContent = fs.readFileSync(filePath, 'utf8');

// Track used images
const usedImages = new Set();

// First pass: collect all current images
const currentImageMatches = fileContent.matchAll(/featuredImage:\s*["']https:\/\/images\.unsplash\.com\/photo-([^?"']+)/g);
for (const match of currentImageMatches) {
  usedImages.add(match[1]);
}

console.log(`Currently using ${usedImages.size} unique images`);

// Find duplicates
const imageCounts = new Map();
const imageOccurrences = [...fileContent.matchAll(/featuredImage:\s*["'](https:\/\/images\.unsplash\.com\/photo-([^?"']+)[^"']*)["']/g)];

imageOccurrences.forEach(match => {
  const photoId = match[2];
  if (!imageCounts.has(photoId)) {
    imageCounts.set(photoId, []);
  }
  imageCounts.set(photoId, [...imageCounts.get(photoId), match]);
});

const duplicates = Array.from(imageCounts.entries())
  .filter(([id, matches]) => matches.length > 1)
  .sort((a, b) => b[1].length - a[1].length);

console.log(`Found ${duplicates.length} duplicate images\n`);

let replacementCount = 0;
let availableImages = [...workingImages].filter(img => !usedImages.has(img));

// Replace duplicates (keep first, replace rest)
duplicates.forEach(([photoId, matches]) => {
  console.log(`Replacing ${matches.length - 1} occurrences of photo-${photoId}`);

  // Skip the first match, replace the rest
  for (let i = 1; i < matches.length; i++) {
    const oldUrl = matches[i][1];

    // Get a new image
    if (availableImages.length === 0) {
      console.log('  ⚠ Running out of unique images!');
      break;
    }

    const newPhotoId = availableImages.shift();
    const newUrl = `https://images.unsplash.com/photo-${newPhotoId}?w=800&h=450&fit=crop&auto=format`;

    // Replace in file content
    fileContent = fileContent.replace(
      `featuredImage: "${oldUrl}"`,
      `featuredImage: "${newUrl}"`
    );

    replacementCount++;
  }
});

// Write back
fs.writeFileSync(filePath, fileContent, 'utf8');

console.log(`\n✓ Successfully replaced ${replacementCount} duplicate images`);
console.log(`✓ Remaining unique images available: ${availableImages.length}`);

// Verify
const newContent = fs.readFileSync(filePath, 'utf8');
const newImageMatches = [...newContent.matchAll(/featuredImage:\s*["']https:\/\/images\.unsplash\.com\/photo-([^?"']+)/g)];
const newUniqueImages = new Set(newImageMatches.map(m => m[1]));

console.log(`\n=== VERIFICATION ===`);
console.log(`Total featured images: ${newImageMatches.length}`);
console.log(`Unique images after replacement: ${newUniqueImages.size}`);
console.log(`Duplicates remaining: ${newImageMatches.length - newUniqueImages.size}`);
