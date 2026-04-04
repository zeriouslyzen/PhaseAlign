import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { ShopHero } from "@/components/sections/ShopHero";
import { getCategories, getProducts, getProductsByCategory } from "@/lib/products";
import { Product } from "@/lib/types";
import { ShopFilters } from "./ShopFilters";
import { ShopSearch } from "./ShopSearch";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop herbal blends, performance supplements, health tech. TCM, adaptogens, recovery, sleep, stress. Physiology-first. No fluff, no backdoors.",
  openGraph: {
    title: "Shop | Phase Alignment",
    description:
      "Herbal blends, performance supplements, health tech. Physiology-first, evidence-based.",
    url: canonical("/shop"),
  },
  alternates: { canonical: canonical("/shop") },
};

type SearchParams = { 
  cat?: string; 
  q?: string; 
  tradition?: string;
  element?: string;
  organ?: string;
  planet?: string;
  sign?: string;
};

function filterProducts(
  products: Product[],
  params: SearchParams
) {
  let filtered = products;
  const { q, tradition, element, organ, planet, sign } = params;

  if (q?.trim()) {
    const lower = q.trim().toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.shortDescription.toLowerCase().includes(lower)
    );
  }

  if (tradition?.trim()) {
    const t = tradition.trim();
    filtered = filtered.filter((p) => p.traditions?.includes(t));
  }

  if (element?.trim()) {
    const e = element.trim().toLowerCase();
    filtered = filtered.filter((p) => 
      p.elements?.tcm?.some((te: string) => te.toLowerCase() === e) || 
      p.elements?.vedic?.some((ve: string) => ve.toLowerCase() === e) ||
      p.elements?.tcm?.includes(e) || p.elements?.vedic?.includes(e)
    );
  }

  if (organ?.trim()) {
    const o = organ.trim().toLowerCase();
    filtered = filtered.filter((p) => 
      p.organs?.some((org: string) => org.toLowerCase() === o)
    );
  }

  if (planet?.trim()) {
    const pl = planet.trim().toLowerCase();
    filtered = filtered.filter((p) => 
      p.astrology?.planets?.some((pnt: string) => pnt.toLowerCase() === pl)
    );
  }

  if (sign?.trim()) {
    const s = sign.trim().toLowerCase();
    filtered = filtered.filter((p) => 
      p.astrology?.signs?.some((sg: string) => sg.toLowerCase() === s)
    );
  }

  return filtered;
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const categories = getCategories();
  const catSlug = typeof params.cat === "string" ? params.cat : undefined;
  
  const currentCategory = catSlug ? getCategories().find(c => c.slug === catSlug) : null;
  const pageTitle = currentCategory ? currentCategory.name : "Shop";
  const pageDescription = currentCategory 
    ? `Explore our range of ${currentCategory.name}.`
    : "Herbs, performance, health tech. Physiology-first.";

  const rawProducts = catSlug
    ? getProductsByCategory(catSlug)
    : getProducts();
  
  const products = filterProducts(rawProducts, params);

  const shopHint =
    "Search by name, pick a quick goal below, or open advanced filters for tradition, support, and celestial tags.";

  return (
    <div className="min-h-screen">
      <ShopHero
        title={pageTitle}
        description={pageDescription}
        hint={shopHint}
      />
      <Suspense fallback={null}>
        <div className="border-b border-[var(--border)] bg-[var(--bg-card)] py-5 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
          <ShopSearch />
        </div>
        <ShopFilters currentCat={catSlug} categories={categories} />
      </Suspense>
      <ProductGrid products={products} />
    </div>
  );
}
