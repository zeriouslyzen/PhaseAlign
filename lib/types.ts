export type ProductType = "physical" | "digital";

export interface ProductVariant {
  id: string;
  sku?: string;
  barcode?: string;
  name: string;
  price: number;
  compareAtPrice?: number;
}

export interface Product {
  id: string;
  sku?: string;
  barcode?: string;
  metaTitle?: string;
  metaDescription?: string;
  brand?: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  categoryIds: string[];
  price: number;
  compareAtPrice?: number;
  images: string[];
  variants?: ProductVariant[];
  type: ProductType;
  wholesale?: boolean;
  subscription?: boolean;
  /** Dropship source URL (Temu, AliExpress, Alibaba, etc.) */
  sourceUrl?: string;
  /** e.g. "Temu", "AliExpress", "Alibaba" */
  sourceName?: string;
  /** Tradition(s) for classification: TCM, Native American, Vedic, Western */
  traditions?: string[];
  /** Cultural framework classification (e.g. "Qi tonifying", "Single herb — warming") */
  culturalClassification?: string;
  /** Scientific: key molecules, mechanisms. Used on stacks and product detail. */
  mechanismSummary?: string;
  /** Organs supported: Liver, Heart, Spleen, Lung, Kidney, etc. */
  organs?: string[];
  /** Physiological systems: Nervous, Circulatory, Immune, etc. */
  systems?: string[];
  /** Elemental energetics for TCM and Vedic frameworks */
  elements?: {
    tcm?: string[]; // Wood, Fire, Earth, Metal, Water
    vedic?: string[]; // Earth, Water, Fire, Air, Space
  };
  /** Molecular chemistry and compound data for AI-ready blending */
  chemistry?: {
    compounds: string[];
    molecularActions?: string[];
    bioavailability?: string;
  };
  /** Specific herbal effects: Tonifying, Warming, Relaxing, etc. */
  effects?: string[];
  /** Geographical origins and optimal growth environments */
  geography?: {
    location?: string[]; // e.g. Himalayas, Amazon, Sichuan
    environment?: string; // e.g. High Altitude, Rainforest
    climate?: string; // e.g. Monsoon, Arid, Alpine
  };
  /** Celestial and Astrological correspondences */
  astrology?: {
    planets?: string[]; // e.g. Mars, Jupiter, Sun
    signs?: string[]; // e.g. Aries, Leo, Sagittarius
  };
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
}
