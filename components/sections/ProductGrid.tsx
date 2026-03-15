"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/ui/Card";
import { CompactProductCard } from "@/components/ui/CompactProductCard";
import type { Product } from "@/lib/types";

interface ProductGridProps {
  products: Product[];
  title?: string;
  className?: string;
}

export function ProductGrid({ products, title, className = "" }: ProductGridProps) {
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  return (
    <motion.section
      className={`px-4 py-8 sm:px-6 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto max-w-6xl">
        {(title || products.length > 0) && (
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            {title && (
              <motion.h2
                className="font-display text-lg font-bold text-[var(--fg)]"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {title}
              </motion.h2>
            )}
            {products.length > 0 && (
              <div className="flex gap-1 rounded-[var(--radius)] border border-[var(--border)] p-0.5">
                <button
                  type="button"
                  onClick={() => setLayout("grid")}
                  className={`rounded px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    layout === "grid"
                      ? "bg-[var(--fg)] text-[var(--bg)]"
                      : "text-[var(--gray-600)] hover:bg-[var(--gray-100)]"
                  }`}
                  aria-pressed={layout === "grid"}
                >
                  Grid
                </button>
                <button
                  type="button"
                  onClick={() => setLayout("list")}
                  className={`rounded px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    layout === "list"
                      ? "bg-[var(--fg)] text-[var(--bg)]"
                      : "text-[var(--gray-600)] hover:bg-[var(--gray-100)]"
                  }`}
                  aria-pressed={layout === "list"}
                >
                  List
                </button>
              </div>
            )}
          </div>
        )}
        {products.length === 0 ? (
          <motion.p
            className="py-12 text-center text-sm text-[var(--gray-500)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No products match. Try another category or search.
          </motion.p>
        ) : layout === "grid" ? (
          <motion.ul
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
            layout
            initial="hidden"
            animate="show"
            variants={{
              show: {
                transition: { staggerChildren: 0.03 },
              },
            }}
          >
            {products.map((product, i) => (
              <motion.li key={product.id} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
                <ProductCard product={product} index={i} />
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <motion.ul
            className="grid grid-cols-1 gap-2 sm:grid-cols-2"
            layout
            initial="hidden"
            animate="show"
            variants={{
              show: {
                transition: { staggerChildren: 0.02 },
              },
            }}
          >
            {products.map((product, i) => (
              <motion.li
                key={product.id}
                variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}
              >
                <CompactProductCard product={product} index={i} />
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </motion.section>
  );
}
