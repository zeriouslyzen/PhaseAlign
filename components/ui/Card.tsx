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
    >
      <Link
        href={`/products/${product.slug}`}
        className={`group block rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] p-3 transition-colors hover:border-[var(--border-strong)] hover:shadow-md ${className}`}
      >
        <div className="aspect-[4/3] w-full overflow-hidden rounded-[var(--radius)] bg-[var(--gray-100)]">
          <motion.img
            src={getProductDisplayImage(product)}
            alt=""
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <h3 className="mt-2.5 font-display text-sm font-semibold text-[var(--fg)] line-clamp-2 group-hover:text-[var(--link)] transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-[var(--gray-500)] line-clamp-2">
          {product.shortDescription}
        </p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-display text-sm font-semibold text-[var(--fg)]">
            {formatPrice(product.price)}
          </span>
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
