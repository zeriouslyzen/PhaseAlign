"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HERBAL_BLENDS_CAT } from "@/lib/shop-intents";
import { ProductCard } from "@/components/ui/Card";
import { CompactProductCard } from "@/components/ui/CompactProductCard";
import type { Product } from "@/lib/types";

interface ProductGridProps {
  products: Product[];
  title?: string;
  className?: string;
}

function ProductGridContent({ products, title, className = "" }: ProductGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const initialLayout = (searchParams.get("view") as "grid" | "list") || "grid";
  const [layout, setLayout] = useState<"grid" | "list">(initialLayout);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 24;

  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Sync layout to URL
  const updateLayout = (newLayout: "grid" | "list") => {
    setLayout(newLayout);
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", newLayout);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Infinite Scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && page * PAGE_SIZE < products.length) {
          setPage((p) => p + 1);
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [products.length, page]);

  // Reset page when products change (e.g. search/filter)
  useEffect(() => {
    setPage(1);
  }, [products.length]);

  const displayedProducts = products.slice(0, page * PAGE_SIZE);
  const hasMore = page * PAGE_SIZE < products.length;

  return (
    <motion.section
      className={`px-4 py-8 sm:px-6 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
          <div className="min-w-0">
            {title && (
              <motion.h2
                className="font-display text-xl font-bold text-[var(--fg)]"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {title}
              </motion.h2>
            )}
            <p
              className={`text-sm font-semibold text-[var(--fg)] ${title ? "mt-1" : ""}`}
            >
              {products.length === 0
                ? "No matches"
                : `${products.length} ${products.length === 1 ? "product" : "products"}`}
            </p>
            {products.length > 0 && (
              <p className="mt-0.5 text-xs font-medium text-[var(--gray-500)]">
                Showing {Math.min(displayedProducts.length, products.length)} of{" "}
                {products.length}
              </p>
            )}
          </div>
          {products.length > 0 && (
            <div className="flex gap-1 rounded-lg border border-[var(--border)] bg-[var(--gray-50)] p-1">
              <button
                type="button"
                onClick={() => updateLayout("grid")}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  layout === "grid"
                    ? "bg-[var(--bg)] text-[var(--fg)] shadow-sm ring-1 ring-[var(--border)]"
                    : "text-[var(--gray-500)] hover:text-[var(--fg)]"
                }`}
                aria-label="Grid view"
                aria-pressed={layout === "grid" ? "true" : "false"}
              >
                Grid
              </button>
              <button
                type="button"
                onClick={() => updateLayout("list")}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  layout === "list"
                    ? "bg-[var(--bg)] text-[var(--fg)] shadow-sm ring-1 ring-[var(--border)]"
                    : "text-[var(--gray-500)] hover:text-[var(--fg)]"
                }`}
                aria-label="List view"
                aria-pressed={layout === "list" ? "true" : "false"}
              >
                List
              </button>
            </div>
          )}
        </div>

        {products.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center py-16 text-center sm:py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--gray-50)]">
              <svg className="h-8 w-8 text-[var(--gray-300)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[var(--fg)]">Nothing matches yet</h3>
            <p className="mt-1 max-w-md text-sm text-[var(--gray-500)]">
              Loosen or clear filters, try different search words, or browse ready-made blends.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-xl bg-[var(--fg)] px-4 py-2.5 text-sm font-semibold text-[var(--bg)] transition-opacity hover:opacity-90"
              >
                Clear all filters
              </Link>
              <Link
                href={`/shop?cat=${HERBAL_BLENDS_CAT}`}
                className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 text-sm font-semibold text-[var(--fg)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"
              >
                Browse blends
              </Link>
              <Link
                href="/shop#advanced-filters"
                className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm font-semibold text-[var(--gray-600)] transition-colors hover:border-[var(--fg)] hover:text-[var(--fg)]"
              >
                Open advanced filters
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="relative min-h-[400px]">
            <AnimatePresence mode="popLayout" initial={false}>
              {layout === "grid" ? (
                <motion.ul
                  key="grid"
                  className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                >
                  {displayedProducts.map((product, i) => (
                    <li key={product.id}>
                      <ProductCard product={product} index={i % PAGE_SIZE} />
                    </li>
                  ))}
                </motion.ul>
              ) : (
                <motion.ul
                  key="list"
                  className="flex flex-col gap-3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                >
                  {displayedProducts.map((product, i) => (
                    <li key={product.id}>
                      <CompactProductCard product={product} index={i % PAGE_SIZE} />
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>

            {hasMore && (
              <div 
                ref={loadMoreRef} 
                className="mt-12 flex items-center justify-center py-8"
              >
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--brand)] border-t-transparent" />
                <span className="ml-3 text-sm font-medium text-[var(--gray-500)]">Loading more products...</span>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.section>
  );
}

export function ProductGrid(props: ProductGridProps) {
  return (
    <Suspense fallback={null}>
      <ProductGridContent {...props} />
    </Suspense>
  );
}
