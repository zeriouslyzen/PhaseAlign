"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { getProductDisplayImage } from "@/lib/product-image";

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

interface ProductCardProps {
  product: Product;
  className?: string;
  index?: number;
}

export function ProductCard({ product, className = "", index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      whileHover={{ y: -4 }}
    >
      <Link
        href={`/products/${product.slug}`}
        className={`group block rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] p-3 transition-all duration-300 hover:border-[var(--brand)] hover:shadow-xl ${className}`}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius)] bg-black flex items-center justify-center p-4 text-center">
          {/* Abstract Background Elements */}
          <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
            <div className="absolute inset-0 flex items-center justify-center font-mono text-[10vw] font-bold text-white/5 whitespace-nowrap select-none">
              ∑ ∫ π φ
            </div>
          </div>
          
          <div className="relative z-10">
            <span className="font-display text-xs font-bold leading-snug text-white line-clamp-3">
              {product.name}
            </span>
          </div>
          <div className="absolute inset-0 bg-[var(--fg)] opacity-0 transition-opacity duration-300 group-hover:opacity-[0.03]" />
        </div>
        <h3 className="mt-3 font-display text-sm font-semibold text-[var(--fg)] line-clamp-2 group-hover:text-[var(--brand)] transition-colors duration-300">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-[var(--gray-500)] line-clamp-2 leading-relaxed">
          {product.shortDescription}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-base font-bold text-[var(--fg)]">
              {formatPrice(product.price)}
            </span>
            {product.variants && product.variants.length > 1 && (
              <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--gray-400)]">
                + variants
              </span>
            )}
          </div>
          {product.compareAtPrice != null && (
            <span className="text-xs text-[var(--gray-400)] line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
