export type ProductType = "physical" | "digital";

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
}

export interface Product {
  id: string;
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
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
}
