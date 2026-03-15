import type { Product, Category } from "@/lib/types";
import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";

const categories = categoriesData as Category[];
const products = productsData as Product[];

export function getCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProducts(): Product[] {
  return products;
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.categoryIds.includes(categoryId));
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(limit = 6): Product[] {
  return products.slice(0, limit);
}
