"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { Category } from "@/lib/types";

interface CategoryStripProps {
  categories: Category[];
}

function CategoryPill({ category, index }: { category: Category; index: number }) {
  return (
    <motion.li
      key={category.id}
      className="shrink-0 snap-start"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.12 + index * 0.03 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        href={`/shop?cat=${category.slug}`}
        className="relative inline-block whitespace-nowrap rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2 text-sm font-medium text-[var(--gray-700)] transition-colors hover:border-[var(--link)] hover:text-[var(--fg)]"
      >
        {category.name}
        <motion.span
          className="absolute bottom-0 left-1/2 h-0.5 rounded-full bg-[var(--link)]"
          initial={{ width: 0 }}
          whileHover={{ width: "60%" }}
          transition={{ duration: 0.2 }}
          style={{ transform: "translateX(-50%)" }}
        />
      </Link>
    </motion.li>
  );
}

export function CategoryStrip({ categories }: CategoryStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.6;
    el.scrollBy({ left: direction === "left" ? -step : step, behavior: "smooth" });
  }

  return (
    <motion.section
      className="border-b border-[var(--border)] bg-[var(--gray-50)] py-5 sm:py-5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      aria-label="Categories"
    >
      <div className="relative mx-auto max-w-6xl">
        {/* Scroll left (desktop) */}
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] p-2 text-[var(--gray-600)] shadow-sm transition-colors hover:border-[var(--border-strong)] hover:text-[var(--fg)] sm:block"
          aria-label="Scroll categories left"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        {/* Scroll right (desktop) */}
        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] p-2 text-[var(--gray-600)] shadow-sm transition-colors hover:border-[var(--border-strong)] hover:text-[var(--fg)] sm:block"
          aria-label="Scroll categories right"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="scrollbar-hide flex items-center gap-2 overflow-x-auto px-12 py-1 sm:gap-2.5 sm:px-14"
          style={{ scrollSnapType: "x proximity", WebkitOverflowScrolling: "touch" }}
        >
          <ul className="flex items-center gap-2 sm:gap-2.5">
            {categories.map((cat, i) => (
              <CategoryPill key={cat.id} category={cat} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
}
