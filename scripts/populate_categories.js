const fs = require('fs');
const path = require('path');

const PRODUCTS_PATH = path.join(__dirname, '../data/products.json');

const newProducts = [
  {
    "id": "peak-electrolytes",
    "slug": "peak-electrolytes",
    "name": "Peak Performance Electrolytes",
    "shortDescription": "Optimized mineral ratio for cellular hydration.",
    "longDescription": "A precise blend of sodium, potassium, and magnesium malate designed for high-output athletes and deep hydration protocols. Zero fillers, zero sugar.",
    "categoryIds": ["performance"],
    "price": 3499,
    "variants": [
      { "id": "30-servings", "name": "30 Servings", "price": 3499, "sku": "PERF-ELEC-30" },
      { "id": "90-servings", "name": "90 Servings", "price": 8999, "sku": "PERF-ELEC-90" }
    ],
    "organs": ["kidney", "liver"],
    "elements": { "tcm": ["water", "fire"] },
    "astrology": { "planets": ["mars", "sun"], "signs": ["aries"] },
    "traditions": ["Western"],
    "systems": ["Musculoskeletal", "Circulatory"],
    "chemistry": {
      "compounds": ["Magnesium Malate", "Potassium Citrate", "Sodium Chloride"],
      "molecularActions": ["ATP Production", "Cellular Hydration"]
    }
  },
  {
    "id": "recovery-magnesium",
    "slug": "recovery-magnesium",
    "name": "Recovery Magnesium Matrix",
    "shortDescription": "Triple-form magnesium for deep muscle recovery.",
    "longDescription": "Combining Magnesium Glycinate, Taurate, and Malate to target both physical muscle tension and nervous system regulation post-training.",
    "categoryIds": ["performance"],
    "price": 2999,
    "variants": [
      { "id": "60-caps", "name": "60 Capsules", "price": 2999, "sku": "PERF-MAG-60" },
      { "id": "180-caps", "name": "120 Capsules", "price": 4999, "sku": "PERF-MAG-120" }
    ],
    "organs": ["nervous", "heart"],
    "elements": { "vedic": ["space"] },
    "astrology": { "planets": ["saturn", "moon"], "signs": ["cancer"] },
    "traditions": ["Western"],
    "systems": ["Nervous", "Musculoskeletal"],
    "chemistry": {
      "compounds": ["Magnesium Glycinate", "Magnesium Taurate"],
      "molecularActions": ["Muscle Relaxation", "GABA Modulation"]
    }
  },
  {
    "id": "emf-shield-case",
    "slug": "emf-shield-case",
    "name": "EMF Shield Smartphone Case",
    "shortDescription": "Laboratory-tested silver lining for radiation protection.",
    "longDescription": "Handcrafted with premium leather and a high-attenuation silver mesh lining that blocks up to 99% of RF radiation without affecting signal quality.",
    "categoryIds": ["health-tech"],
    "price": 7900,
    "variants": [
      { "id": "iphone-15", "name": "iPhone 15 Pro", "price": 7900, "sku": "TECH-EMF-I15" },
      { "id": "pixel-8", "name": "Pixel 8 Pro", "price": 7900, "sku": "TECH-EMF-P8" }
    ],
    "traditions": ["Western"],
    "systems": ["Defense"],
    "chemistry": {
      "compounds": ["Silver Mesh", "Full Grain Leather"],
      "molecularActions": ["Radiation Attenuation"]
    }
  },
  {
    "id": "circadian-red-light",
    "slug": "circadian-red-light",
    "name": "Circadian Red Light Panel",
    "shortDescription": "660nm/850nm dual-frequency for ATP optimization.",
    "longDescription": "A professional-grade photobiomodulation device designed for daily circadian rhythm alignment and cellular energy production.",
    "categoryIds": ["health-tech"],
    "price": 24900,
    "variants": [
      { "id": "desktop", "name": "Desktop Mini", "price": 24900, "sku": "TECH-RL-MINI" },
      { "id": "full-body", "name": "Full Body", "price": 89900, "sku": "TECH-RL-FULL" }
    ],
    "traditions": ["Western"],
    "systems": ["Mitochondrial", "Circulatory"],
    "chemistry": {
      "compounds": ["GaAs LEDs", "Aluminum Heat Sink"],
      "molecularActions": ["Cytochrome c oxidase activation"]
    }
  }
];

function populate() {
  console.log('Loading products...');
  let products = JSON.parse(fs.readFileSync(PRODUCTS_PATH, 'utf8'));
  
  // Remove existing if any (to avoid duplicates if script re-run)
  const newIds = newProducts.map(p => p.id);
  products = products.filter(p => !newIds.includes(p.id));
  
  const finalProducts = [...products, ...newProducts];

  fs.writeFileSync(PRODUCTS_PATH, JSON.stringify(finalProducts, null, 2));
  console.log(`Successfully added ${newProducts.length} premium products to Performance and Health Tech.`);
}

populate();
