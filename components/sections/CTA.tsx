"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <motion.section
      className="px-4 py-12 sm:px-6 sm:py-16"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-display text-xl font-bold text-[var(--fg)] sm:text-2xl">
          Ready to align?
        </h2>
        <p className="mt-2 text-sm text-[var(--gray-600)]">
          Quick pay. No account required.
        </p>
        <motion.div
          className="mt-5"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button href="/shop" size="lg">
            Browse the shop
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
