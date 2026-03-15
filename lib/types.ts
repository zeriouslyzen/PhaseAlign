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
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
}
