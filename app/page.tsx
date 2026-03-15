import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { CategoryStrip } from "@/components/sections/CategoryStrip";
import { ProductStrip } from "@/components/sections/ProductStrip";
import { TrustBar } from "@/components/sections/TrustBar";
import { CTA } from "@/components/sections/CTA";
import {
  getCategories,
  getProductsByCategory,
} from "@/lib/products";
import { canonical, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: SITE_NAME,
  description:
    "Herbal blends, performance supplements, health tech, guides. East meets west. Physiology-first, science-backed. Shop stacks, learn frameworks, partner with us.",
  openGraph: {
    title: `${SITE_NAME} | Herbs, Performance, Health Tech`,
    description:
      "Herbal blends, performance supplements, health tech, guides. East meets west. Physiology-first, science-backed.",
    url: canonical("/"),
  },
  alternates: { canonical: canonical("/") },
};

export default function Home() {
  const categories = getCategories();
  const herbal = getProductsByCategory("herbal-blends");
  const performance = getProductsByCategory("performance");
  const tech = getProductsByCategory("health-tech");

  return (
    <>
      <Hero />
      <CategoryStrip categories={categories} />
      <ProductStrip
        title="Herbal blends"
        href="/shop?cat=herbal-blends"
        products={herbal}
      />
      <ProductStrip
        title="Performance"
        href="/shop?cat=performance"
        products={performance}
      />
      <ProductStrip
        title="Health tech"
        href="/shop?cat=health-tech"
        products={tech}
      />
      <TrustBar />
      <CTA />
    </>
  );
}
