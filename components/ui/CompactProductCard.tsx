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

interface CompactProductCardProps {
  product: Product;
  index?: number;
}

export function CompactProductCard({ product, index = 0 }: CompactProductCardProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="group flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] p-3 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--gray-50)]"
      >
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-[var(--radius)] bg-[var(--gray-100)]">
          <img
            src={getProductDisplayImage(product)}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="min-w-0 flex-1">
          <span className="block truncate font-display text-sm font-semibold text-[var(--fg)] group-hover:text-[var(--link)] transition-colors">
            {product.name}
          </span>
          <span className="block text-xs text-[var(--gray-500)]">
            {formatPrice(product.price)}
          </span>
        </div>
        <span className="shrink-0 text-xs font-medium text-[var(--gray-400)] transition-transform duration-200 group-hover:translate-x-0.5">
          →
        </span>
      </Link>
    </motion.li>
  );
}
