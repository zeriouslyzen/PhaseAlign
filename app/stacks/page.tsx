import type { Metadata } from "next";
import { getProducts } from "@/lib/products";
import { getStackProductSlugs } from "@/lib/stacks";
import { StacksBuilder } from "./StacksBuilder";

export const metadata: Metadata = {
  title: "Build a stack | Phase Alignment",
  description:
    "Build a stack by goal, current state, or enhancement. Products matched to physiological targets: recovery, sleep, stress, energy, focus, environmental. Scientific framework.",
};

export default function StacksPage() {
  const allProducts = getProducts();
  const stackSlugs = getStackProductSlugs();
  const products = allProducts.filter((p) => stackSlugs.includes(p.slug));

  return <StacksBuilder products={products} />;
}
