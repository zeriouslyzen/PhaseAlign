import path from "path";
import fs from "fs/promises";
import type { Product } from "@/lib/types";

export function productsFilePath(): string {
  return path.join(process.cwd(), "data", "products.json");
}

export async function readProducts(): Promise<Product[]> {
  const raw = await fs.readFile(productsFilePath(), "utf-8");
  return JSON.parse(raw) as Product[];
}

export async function writeProducts(products: Product[]): Promise<void> {
  await fs.writeFile(productsFilePath(), JSON.stringify(products, null, 2), "utf-8");
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function uniqueSlug(base: string, existing: string[]): string {
  let slug = base;
  let n = 1;
  while (existing.includes(slug)) {
    slug = `${base}-${n}`;
    n++;
  }
  return slug;
}
