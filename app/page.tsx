import { Hero } from "@/components/sections/Hero";
import { CategoryStrip } from "@/components/sections/CategoryStrip";
import { ProductStrip } from "@/components/sections/ProductStrip";
import { TrustBar } from "@/components/sections/TrustBar";
import { CTA } from "@/components/sections/CTA";
import {
  getCategories,
  getProductsByCategory,
} from "@/lib/products";

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
