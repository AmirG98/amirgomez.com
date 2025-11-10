const https = require('https');
const http = require('http');

const imageUrls = [
  { line: 56, url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=600&fit=crop&auto=format', id: 'photo-1516321318423-f06f85e504b3' },
  { line: 160, url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&auto=format', id: 'photo-1460925895917-afdab827c52f' },
  { line: 440, url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop&auto=format', id: 'photo-1633356122544-f134324a6cee' },
  { line: 455, url: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=400&fit=crop&auto=format', id: 'photo-1611162616305-c69b3fa7fbe0' },
  { line: 485, url: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&h=400&fit=crop&auto=format', id: 'photo-1562577309-4932fdd64cd1' },
  { line: 507, url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop&auto=format', id: 'photo-1633356122544-f134324a6cee' },
  { line: 551, url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop&auto=format', id: 'photo-1563986768609-322da13575f3' },
  { line: 599, url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop&auto=format', id: 'photo-1522202176988-66273c2fd55f' },
  { line: 629, url: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&h=400&fit=crop&auto=format', id: 'photo-1611162618071-b39a2ec055fb' },
  { line: 671, url: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&h=400&fit=crop&auto=format', id: 'photo-1611162616475-46b635cb6868' },
  { line: 770, url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=400&fit=crop&auto=format', id: 'photo-1611162617213-7d7a39e9b1d7' },
  { line: 875, url: 'https://images.unsplash.com/photo-1611262588019-db6cc2032da3?w=1200&h=600&fit=crop&auto=format', id: 'photo-1611262588019-db6cc2032da3' },
  { line: 891, url: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&h=400&fit=crop&auto=format', id: 'photo-1611605698335-8b1569810432' },
  { line: 1372, url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&auto=format', id: 'photo-1460925895917-afdab827c52f' },
  { line: 1393, url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&auto=format', id: 'photo-1551288049-bebda4e38f71' },
  { line: 1427, url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop&auto=format', id: 'photo-1516321318423-f06f85e504b3' },
  { line: 1449, url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop&auto=format', id: 'photo-1563013544-824ae1b704d3' },
  { line: 1485, url: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&h=400&fit=crop&auto=format', id: 'photo-1492619375914-88005aa9e8fb' },
  { line: 1506, url: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=400&fit=crop&auto=format', id: 'photo-1518186285589-2f7649de83e0' },
  { line: 1526, url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&auto=format', id: 'photo-1551288049-bebda4e38f71' },
  { line: 1563, url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop&auto=format', id: 'photo-1563013544-824ae1b704d3' },
  { line: 1587, url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop&auto=format', id: 'photo-1519389950473-47ba0277781c' },
  { line: 1729, url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop&auto=format', id: 'photo-1611224923853-80b023f02d71' },
  { line: 1739, url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&auto=format', id: 'photo-1551288049-bebda4e38f71' },
  { line: 1776, url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop&auto=format', id: 'photo-1556742049-0cfed4f6a45d' },
  { line: 1804, url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop&auto=format', id: 'photo-1611224923853-80b023f02d71' },
  { line: 1869, url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop&auto=format', id: 'photo-1552664730-d307ca884978' },
  { line: 2230, url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&auto=format', id: 'photo-1460925895917-afdab827c52f' },
  { line: 2306, url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop&auto=format', id: 'photo-1551434678-e076c223a692' },
  { line: 2412, url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=400&fit=crop&auto=format', id: 'photo-1600880292203-757bb62b4baf' },
  { line: 2495, url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop&auto=format', id: 'photo-1586023492125-27b2c045efd7' },
  { line: 2643, url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&auto=format', id: 'photo-1551288049-bebda4e38f71' },
  { line: 2653, url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop&auto=format', id: 'photo-1563013544-824ae1b704d3' },
  { line: 2740, url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&auto=format', id: 'photo-1460925895917-afdab827c52f' },
  { line: 2839, url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop&auto=format', id: 'photo-1551434678-e076c223a692' },
  { line: 2925, url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&auto=format', id: 'photo-1460925895917-afdab827c52f' },
  { line: 3011, url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&auto=format', id: 'photo-1551288049-bebda4e38f71' },
  { line: 3122, url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&auto=format', id: 'photo-1460925895917-afdab827c52f' },
  { line: 3210, url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop&auto=format', id: 'photo-1551434678-e076c223a692' },
  { line: 3299, url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&auto=format', id: 'photo-1460925895917-afdab827c52f' },
  { line: 24632, url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop&auto=format', id: 'photo-1460925895917-afdab827c52f' },
  { line: 24656, url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop&auto=format', id: 'photo-1551288049-bebda4e38f71' },
  { line: 24692, url: 'https://images.unsplash.com/photo-1551635511-81fe7ad5c6ab?w=800&h=450&fit=crop&auto=format', id: 'photo-1551635511-81fe7ad5c6ab' },
  { line: 24730, url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=450&fit=crop&auto=format', id: 'photo-1600880292203-757bb62b4baf' },
  { line: 24766, url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop&auto=format', id: 'photo-1551288049-bebda4e38f71' },
  { line: 24803, url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop&auto=format', id: 'photo-1460925895917-afdab827c52f' },
  { line: 24866, url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop&auto=format', id: 'photo-1554224155-6726b3ff858f' },
  { line: 24942, url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop&auto=format', id: 'photo-1551288049-bebda4e38f71' },
  { line: 25019, url: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=450&fit=crop&auto=format', id: 'photo-1432888622747-4eb9a8efeb07' },
  { line: 25055, url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop&auto=format', id: 'photo-1460925895917-afdab827c52f' },
  { line: 25091, url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop&auto=format', id: 'photo-1551288049-bebda4e38f71' },
  { line: 25139, url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop&auto=format', id: 'photo-1554224155-6726b3ff858f' },
  { line: 25190, url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=450&fit=crop&auto=format', id: 'photo-1600880292203-757bb62b4baf' },
  { line: 25241, url: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=450&fit=crop&auto=format', id: 'photo-1542744094-3a31f272c490' },
  { line: 25289, url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop&auto=format', id: 'photo-1551288049-bebda4e38f71' },
  { line: 25337, url: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&h=450&fit=crop&auto=format', id: 'photo-1553484771-371a605b060b' },
  { line: 25372, url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop&auto=format', id: 'photo-1451187580459-43490279c0fa' },
  { line: 25409, url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop&auto=format', id: 'photo-1554224155-6726b3ff858f' },
  { line: 25467, url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop&auto=format', id: 'photo-1460925895917-afdab827c52f' },
  { line: 25550, url: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&h=450&fit=crop&auto=format', id: 'photo-1611162616475-46b635cb6868' },
  { line: 25586, url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop&auto=format', id: 'photo-1611162617474-5b21e879e113' },
  { line: 25634, url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop&auto=format', id: 'photo-1551288049-bebda4e38f71' },
  { line: 25682, url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop&auto=format', id: 'photo-1554224155-6726b3ff858f' },
  { line: 25736, url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop&auto=format', id: 'photo-1611162617474-5b21e879e113' },
  { line: 25790, url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=450&fit=crop&auto=format', id: 'photo-1600880292203-757bb62b4baf' },
  { line: 25850, url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop&auto=format', id: 'photo-1551288049-bebda4e38f71' },
  { line: 25900, url: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&h=450&fit=crop&auto=format', id: 'photo-1553484771-371a605b060b' },
  { line: 25935, url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop&auto=format', id: 'photo-1554224155-6726b3ff858f' },
  { line: 25981, url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop&auto=format', id: 'photo-1460925895917-afdab827c52f' },
  { line: 26064, url: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&h=450&fit=crop&auto=format', id: 'photo-1611162616475-46b635cb6868' },
  { line: 26100, url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop&auto=format', id: 'photo-1460925895917-afdab827c52f' },
  { line: 26149, url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop&auto=format', id: 'photo-1551288049-bebda4e38f71' },
  { line: 26197, url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop&auto=format', id: 'photo-1554224155-6726b3ff858f' },
  { line: 26250, url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop&auto=format', id: 'photo-1611162617474-5b21e879e113' },
  { line: 26304, url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=450&fit=crop&auto=format', id: 'photo-1600880292203-757bb62b4baf' },
  { line: 26358, url: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=450&fit=crop&auto=format', id: 'photo-1542744094-3a31f272c490' },
  { line: 26408, url: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&h=450&fit=crop&auto=format', id: 'photo-1553484771-371a605b060b' },
  { line: 26462, url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop&auto=format', id: 'photo-1551288049-bebda4e38f71' },
  { line: 26497, url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop&auto=format', id: 'photo-1554224155-6726b3ff858f' }
];

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
  console.log('Testing', imageUrls.length, 'image URLs...\n');

  const results = [];
  for (let i = 0; i < imageUrls.length; i++) {
    const result = await testUrl(imageUrls[i]);
    results.push(result);

    const status = result.working ? '✓ OK' : '✗ BROKEN';
    console.log(`[${i + 1}/${imageUrls.length}] Line ${result.line}: ${status} (${result.status}) - ${result.id}`);

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n=== SUMMARY ===');
  const broken = results.filter(r => !r.working);
  const working = results.filter(r => r.working);

  console.log(`Total URLs tested: ${results.length}`);
  console.log(`Working: ${working.length}`);
  console.log(`Broken: ${broken.length}`);

  if (broken.length > 0) {
    console.log('\n=== BROKEN IMAGES ===');
    broken.forEach(b => {
      console.log(`Line ${b.line}: ${b.id} (Status: ${b.status})`);
    });
  }

  // Get unique photo IDs
  const uniqueIds = [...new Set(results.map(r => r.id))];
  console.log(`\nUnique photo IDs: ${uniqueIds.length}`);
}

testAllUrls().catch(console.error);
