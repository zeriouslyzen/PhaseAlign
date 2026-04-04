import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { HomePathways } from "@/components/sections/HomePathways";
import { ProductStrip } from "@/components/sections/ProductStrip";
import { TrustBar } from "@/components/sections/TrustBar";
import { CTA } from "@/components/sections/CTA";
import { getProductsByCategory } from "@/lib/products";
import { canonical, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: SITE_NAME,
  description:
    "Physiology-first performance: herbal blends, supplements, health tech. Learn frameworks (TCM, Ayurveda, Western)—shop stacks, blends, essentials.",
  openGraph: {
    title: `${SITE_NAME} | Herbs, Performance, Health Tech`,
    description:
      "Inside-out performance with science-backed herbs and tools. Frameworks, stacks, and a catalog that respects tradition and mechanism.",
    url: canonical("/"),
  },
  alternates: { canonical: canonical("/") },
};

export default function Home() {
  const herbal = getProductsByCategory("herbal-blends");
  const performance = getProductsByCategory("performance");
  const tech = getProductsByCategory("health-tech");

  return (
    <>
      <Hero />
      <HomePathways />
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
