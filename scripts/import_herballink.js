const fs = require('fs');
const path = require('path');

const srcDir = '/Users/jackdanger/Desktop/Projects/HerbalLink/data';
const targetFile = '/Users/jackdanger/Desktop/Projects/Phase Alignment/data/products.json';

const existingProducts = JSON.parse(fs.readFileSync(targetFile, 'utf8'));

const sourceFiles = [
  'extract-powder.json',
  'gum-and-resin.json',
  'herbal-powder.json',
  'raw-herbs.json',
  'root.json',
  'seed.json',
  'shilajit.json'
];

let addedCount = 0;

for (const file of sourceFiles) {
  const filePath = path.join(srcDir, file);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    continue;
  }
  
  const categoryStr = file.replace('.json', '');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  for (const item of data) {
    const fullDesc = item.description || '';
    const firstSentenceMatch = fullDesc.match(/[^.!?]+[.!?]+/);
    const shortDesc = firstSentenceMatch ? firstSentenceMatch[0].trim() : fullDesc.slice(0, 100).trim();
    
    let priceCents = 0;
    if (item.price) {
      priceCents = Math.round(parseFloat(String(item.price).replace(/,/g, '')) * 100);
    }

    // Attempt to extract amount from handle (e.g. 1-kg, 500-g)
    let amount = "1kg"; // default assumption for wholesale
    const match = (item.handle || '').match(/(\d+)[-_\s]?(kg|g|lb|oz)/i);
    if (match) {
      amount = `${match[1]}${match[2].toLowerCase()}`;
    }

    // Clean up title to prevent duplicates of amount
    let cleanTitle = item.title.replace(/\s*-\s*\d+\s*(kg|g|lb|oz)/i, '').trim();

    const newProduct = {
      id: item.handle || `gen-${item.id}`,
      slug: item.handle || `gen-${item.id}`,
      name: `${cleanTitle} (${amount})`,
      shortDescription: shortDesc || cleanTitle,
      longDescription: fullDesc,
      categoryIds: [categoryStr],
      price: priceCents,
      images: item.image ? [item.image] : [],
      type: "physical",
      wholesale: true
    };
    
    existingProducts.push(newProduct);
    addedCount++;
  }
}

fs.writeFileSync(targetFile, JSON.stringify(existingProducts, null, 2), 'utf8');
console.log(`Successfully imported ${addedCount} products.`);
