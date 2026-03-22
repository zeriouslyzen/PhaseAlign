const fs = require('fs');
const path = require('path');

async function fetchAllShopifyProducts() {
    let allProducts = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
        console.log(`Fetching page ${page} from TheWholesaler...`);
        try {
            const url = `https://thewholesaler.in/products.json?limit=250&page=${page}`;
            const res = await fetch(url);
            const data = await res.json();
            
            if (data.products && data.products.length > 0) {
                allProducts = allProducts.concat(data.products);
                page++;
            } else {
                hasMore = false;
            }
        } catch (e) {
            console.error('Error fetching data:', e);
            hasMore = false;
        }
    }
    
    return allProducts;
}

function simplifyVariantName(name) {
    if (!name) return name;
    const parts = name.split('/');
    if (parts.length > 0) {
        const firstPart = parts[0].trim();
        const weightMatch = firstPart.match(/^([\d.]+\s*[a-zA-Z]+)/);
        const simplifiedWeight = weightMatch ? weightMatch[1].toUpperCase() : firstPart.toUpperCase();
        
        if (parts.length > 2) {
            const modifier = parts.slice(2).join('/').trim();
            if (modifier) {
                return `${simplifiedWeight} - ${modifier}`;
            }
        } else if (parts.length === 2) {
            const secondPart = parts[1].trim().toLowerCase();
            if (!secondPart.includes('lbs') && !secondPart.includes('oz')) {
                 return `${simplifiedWeight} - ${parts[1].trim()}`;
            }
        }
        return simplifiedWeight;
    }
    return name;
}

function isOverAPound(name) {
    const gMatch = name.match(/([\d.]+)\s*G/i);
    if (gMatch) return parseFloat(gMatch[1]) >= 450;
    
    const kgMatch = name.match(/([\d.]+)\s*KG/i);
    if (kgMatch) return parseFloat(kgMatch[1]) >= 0.45;
    
    const lbMatch = name.match(/([\d.]+)\s*LB/i);
    if (lbMatch) return parseFloat(lbMatch[1]) >= 1;
    
    const ozMatch = name.match(/([\d.]+)\s*OZ/i);
    if (ozMatch) return parseFloat(ozMatch[1]) >= 16;
    
    return true; // Keep if parsed unknown
}

function isUnderAPound(name) {
    const gMatch = name.match(/([\d.]+)\s*G/i);
    if (gMatch) return parseFloat(gMatch[1]) <= 450;
    
    const kgMatch = name.match(/([\d.]+)\s*KG/i);
    if (kgMatch) return parseFloat(kgMatch[1]) < 0.45;
    
    const lbMatch = name.match(/([\d.]+)\s*LB/i);
    if (lbMatch) return parseFloat(lbMatch[1]) < 1;
    
    const ozMatch = name.match(/([\d.]+)\s*OZ/i);
    if (ozMatch) return parseFloat(ozMatch[1]) < 16;
    
    return true; // Keep if parsed unknown (like "sample")
}

// ... inside run() mapped data
async function run() {
    console.log('Fetching live product variants...');
    const liveProducts = await fetchAllShopifyProducts();
    console.log(`Fetched ${liveProducts.length} live products.`);

    const variantMap = {};
    liveProducts.forEach(lp => {
        if (lp.variants && lp.variants.length > 0) {
            // INR to USD conversion (approx 83.33)
            const exchangeRate = 83.33;
            
            let variants = lp.variants.map(v => ({
                id: v.id.toString(),
                name: simplifyVariantName(v.title),
                sku: v.sku || `hl-${v.id}`,
                barcode: v.barcode || '',
                price: Math.round((parseFloat(v.price) / exchangeRate) * 100)
            }));

            // Exclude wholesale quantities (>= 1 lb)
            variants = variants.filter(v => isUnderAPound(v.name));
            
            // Sort by price ascending
            variants.sort((a, b) => a.price - b.price);

            // only show the lowest 2 sizes/prices
            variants = variants.slice(0, 2);

            if (variants.length > 0) {
                variantMap[lp.handle] = {
                    vendor: lp.vendor,
                    variants: variants
                };
            }
        }
    });

    const productsFile = path.join(__dirname, '../data/products.json');
    if (!fs.existsSync(productsFile)) {
        console.error('products.json not found!');
        return;
    }
    
    console.log('Reading local products.json...');
    const localData = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
    let matchedCount = 0;
    
    localData.forEach(p => {
        p.name = p.name.replace(/\s*\(\d+k?g\)$/i, '');
        
        const originalHandle = p.slug.replace('hl-', '');
        const handleMatch = originalHandle.match(/^(.+)-1-?kg-5-?kg/i);
        const searchHandle = handleMatch ? handleMatch[1] : originalHandle;
        
        let mappedData = variantMap[originalHandle];
        if (!mappedData) {
             mappedData = variantMap[searchHandle];
        }

        if (mappedData) {
            p.variants = mappedData.variants;
            const minPrice = Math.min(...mappedData.variants.map(v => v.price));
            p.price = minPrice;
            p.sku = p.variants[0]?.sku?.replace(`-${p.variants[0]?.id}`, '') || `hl-${originalHandle}`;
            p.brand = mappedData.vendor || 'Phase Alignment';
            p.metaTitle = p.name;
            p.metaDescription = p.shortDescription ? p.shortDescription.substring(0, 155) : '';
            matchedCount++;
        } else {
            // For standard non-herballink products (like Recovery Blend)
            if (!p.sku) p.sku = `pa-${p.slug}`;
            if (!p.brand) p.brand = 'Phase Alignment';
            if (!p.metaTitle) p.metaTitle = p.name;
            if (!p.metaDescription) p.metaDescription = p.shortDescription ? p.shortDescription.substring(0, 155) : '';
        }
    });

    fs.writeFileSync(productsFile, JSON.stringify(localData, null, 2), 'utf8');
    console.log(`Updated ${matchedCount} products with variant pricing.`);
}

run();
