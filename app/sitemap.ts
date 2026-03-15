import { MetadataRoute } from "next";
import { readProducts } from "@/lib/admin/products-data";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://phasealignment.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let products: Awaited<ReturnType<typeof readProducts>>;
  try {
    products = await readProducts();
  } catch {
    products = [];
  }
  const productUrls = products.map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/shop`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/learn`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE_URL}/stacks`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE_URL}/partner`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/cart`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/account`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  return [...staticPages, ...productUrls];
}
