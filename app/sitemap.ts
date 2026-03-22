import { MetadataRoute } from "next";
import { getProducts, getCategories } from "@/lib/products";
import { BASE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getProducts();
  const categories = getCategories();

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/shop?cat=${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...categoryEntries,
    ...productEntries,
  ];
}
