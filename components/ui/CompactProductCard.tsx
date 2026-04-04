"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";

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

export function CompactProductCard({ product }: CompactProductCardProps) {
  return (
    <li>
      <Link
        href={`/products/${product.slug}`}
        className="group flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] p-3 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--gray-50)]"
      >
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[var(--radius)] bg-black flex items-center justify-center p-1 text-center">
          {/* Abstract Background Elements */}
          <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
            <div className="absolute inset-0 flex items-center justify-center font-mono text-[4vw] font-bold text-white/5 whitespace-nowrap select-none">
              ∑ ∫ π φ
            </div>
          </div>
          <div className="relative z-10">
            <span className="font-display text-[8px] font-bold leading-tight text-white line-clamp-2">
              {product.name}
            </span>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <span className="block truncate font-display text-sm font-semibold text-[var(--fg)] group-hover:text-[var(--link)] transition-colors">
            {product.name}
          </span>
          <span className="block text-xs text-[var(--gray-500)]">
            {product.variants && product.variants.length > 1 ? "From " : ""}
            {formatPrice(product.price)}
          </span>
        </div>
        <span className="shrink-0 text-xs font-medium text-[var(--gray-400)] transition-transform duration-200 group-hover:translate-x-0.5">
          →
        </span>
      </Link>
    </li>
  );
}
