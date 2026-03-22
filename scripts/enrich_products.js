const fs = require('fs');
const path = require('path');

const PRODUCTS_PATH = path.join(__dirname, '../data/products.json');

const enrichments = {
  "turmeric": {
    "organs": ["Liver", "Gallbladder", "Spleen"],
    "systems": ["Circulatory", "Immune", "Musculoskeletal"],
    "elements": {
      "tcm": ["fire", "earth"],
      "vedic": ["fire", "earth"]
    },
    "chemistry": {
      "compounds": ["Curcuminoids", "Curcumin", "Demethoxycurcumin", "Bisdemethoxycurcumin"],
      "molecularActions": ["NF-kB inhibition", "TNF-alpha suppression"],
      "bioavailability": "Enhanced with Piperine (Black Pepper)"
    },
    "effects": ["Move Blood", "Anti-inflammatory", "Cleansing"],
    "geography": {
      "location": ["South Asia", "India", "Vietnam"],
      "environment": "Tropical",
      "climate": "Monsoon / Humid"
    },
    "astrology": {
      "planets": ["mars", "sun"],
      "signs": ["aries", "leo"]
    }
  },
  "ginger": {
    "organs": ["Spleen", "Stomach", "Lung"],
    "systems": ["Digestive", "Circulatory"],
    "elements": {
      "tcm": ["earth", "fire"],
      "vedic": ["fire"]
    },
    "chemistry": {
      "compounds": ["Gingerols", "Shogaols", "Zingerone"],
      "molecularActions": ["COX-2 inhibition", "TRPV1 activation"]
    },
    "effects": ["Warming", "Digestive Stimulant"],
    "geography": {
      "location": ["Southeast Asia", "Nigeria", "China"],
      "environment": "Tropical",
      "climate": "Humid / Warm"
    },
    "astrology": {
      "planets": ["mars", "sun"],
      "signs": ["aries", "scorpio"]
    }
  },
  "bulk-ashwagandha": {
    "organs": ["Kidney", "Brain", "Adrenals"],
    "systems": ["Endocrine", "Nervous", "Reproductive"],
    "elements": {
      "vedic": ["earth", "air"]
    },
    "chemistry": {
      "compounds": ["Withanolides", "Withaferin A", "Alkaloids"],
      "molecularActions": ["GABAergic modulation", "Cortisol reduction"]
    },
    "effects": ["Rasayana", "Adaptogen", "Anxiolytic"],
    "geography": {
      "location": ["India", "Himalayas", "Middle East"],
      "environment": "Arid / High Altitude",
      "climate": "Dry / Sub-tropical"
    },
    "astrology": {
      "planets": ["saturn", "moon"],
      "signs": ["capricorn", "cancer"]
    }
  },
  "qi-support-blend": {
    "organs": ["Spleen", "Lung"],
    "systems": ["Metabolic", "Respiratory", "Digestive"],
    "elements": {
      "tcm": ["earth", "metal"]
    },
    "chemistry": {
      "compounds": ["Ginsenosides", "Polysaccharides", "Atractylenolides"],
      "molecularActions": ["ATP production", "Immune modulation"]
    },
    "effects": ["Qi Tonifying", "Energy", "Digestive Support"],
    "geography": {
      "location": ["Northeast Asia", "China", "Korea"],
      "environment": "Mountainous / Forest",
      "climate": "Temperate"
    },
    "astrology": {
      "planets": ["sun"],
      "signs": ["leo"]
    }
  },
  "calm-spirit-blend": {
    "organs": ["Heart", "Liver"],
    "systems": ["Nervous", "Circulatory"],
    "elements": {
      "tcm": ["fire", "wood"]
    },
    "chemistry": {
      "compounds": ["Flavonoids", "Triterpene Saponins", "Jujubosides"],
      "molecularActions": ["GABA receptor binding", "Melatonin pathway support"]
    },
    "effects": ["Calm Spirit", "Anxiolytic", "Nourish Heart"],
    "geography": {
      "location": ["East Asia"],
      "environment": "Verdant / River Valleys",
      "climate": "Mild"
    },
    "astrology": {
      "planets": ["moon", "venus"],
      "signs": ["cancer", "pisces"]
    }
  }
};

function enrich() {
  console.log('Loading products...');
  const products = JSON.parse(fs.readFileSync(PRODUCTS_PATH, 'utf8'));
  
  let updatedCount = 0;
  const updatedProducts = products.map(p => {
    if (enrichments[p.id]) {
      updatedCount++;
      return { ...p, ...enrichments[p.id] };
    }
    return p;
  });

  fs.writeFileSync(PRODUCTS_PATH, JSON.stringify(updatedProducts, null, 2));
  console.log(`Successfully enriched ${updatedCount} products with deep mapping.`);
}

enrich();
