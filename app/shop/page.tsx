import { Suspense } from "react";
import type { Metadata } from "next";
import { CategoryStrip } from "@/components/sections/CategoryStrip";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { getCategories, getProducts, getProductsByCategory } from "@/lib/products";
import { ShopFilters } from "./ShopFilters";
import { ShopSearch } from "./ShopSearch";

export const metadata: Metadata = {
  title: "Shop | Phase Alignment",
  description: "Herbal blends, wholesale herbs, performance supplements, health tech. No fluff, no backdoors.",
};

type SearchParams = { cat?: string; q?: string };

function filterByQuery(products: Awaited<ReturnType<typeof getProducts>>, q: string | undefined) {
  if (!q?.trim()) return products;
  const lower = q.trim().toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lower) ||
      p.shortDescription.toLowerCase().includes(lower)
  );
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const categories = getCategories();
  const catSlug = typeof params.cat === "string" ? params.cat : undefined;
  const rawProducts = catSlug
    ? getProductsByCategory(catSlug)
    : getProducts();
  const products = filterByQuery(rawProducts, typeof params.q === "string" ? params.q : undefined);

  return (
    <div className="min-h-screen">
      <div className="border-b border-[var(--border)] bg-[var(--bg)] px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-display text-xl font-bold text-[var(--fg)] sm:text-2xl">
            Shop
          </h1>
          <p className="mt-1 text-sm text-[var(--gray-600)]">
            Herbs, performance, health tech.
          </p>
        </div>
      </div>
      <CategoryStrip categories={categories} />
      <Suspense fallback={null}>
        <ShopFilters currentCat={catSlug} />
        <ShopSearch />
      </Suspense>
      <ProductGrid products={products} />
    </div>
  );
}
