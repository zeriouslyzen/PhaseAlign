"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CompactProductCard } from "@/components/ui/CompactProductCard";
import type { Product } from "@/lib/types";

interface ProductStripProps {
  title: string;
  href: string;
  products: Product[];
}

export function ProductStrip({ title, href, products }: ProductStripProps) {
  if (products.length === 0) return null;

  return (
    <motion.section
      className="border-b border-[var(--border)] py-6 sm:py-8"
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
    >
      <div className="px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex items-center justify-between">
            <motion.h2
              className="font-display text-lg font-bold text-[var(--fg)]"
              initial={false}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h2>
            <Link
              href={href}
              className="text-sm font-medium text-[var(--link)] hover:text-[var(--link-hover)] transition-colors"
            >
              View all
            </Link>
          </div>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.slice(0, 4).map((product, i) => (
              <CompactProductCard key={product.id} product={product} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
}
