"use client";

import { motion } from "framer-motion";
import type { Product } from "@/lib/types";

interface ProductMediaProps {
  product: Product;
}

export function ProductMedia({ product }: ProductMediaProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
      className="relative aspect-square overflow-hidden rounded-[var(--radius-lg)] bg-black flex items-center justify-center p-8 text-center"
    >
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-full h-full rounded-full bg-gradient-to-br from-[var(--brand)] to-transparent blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 w-full h-full rounded-full bg-gradient-to-tl from-[var(--brand)] to-transparent blur-3xl" />
        <div className="absolute inset-0 flex items-center justify-center font-mono text-[20vw] font-bold text-white/5 whitespace-nowrap select-none">
          ∑ ∫ π φ
        </div>
      </div>

      <div className="relative z-10 space-y-4">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ delay: 0.2 }}
          className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--brand)]"
        >
          Physiology First
        </motion.span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
          {product.name}
        </h1>
        <div className="mx-auto h-0.5 w-12 bg-white/20" />
      </div>
    </motion.div>
  );
}
