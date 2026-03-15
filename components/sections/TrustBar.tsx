"use client";

import { motion } from "framer-motion";

const items = [
  "Lab-tested ingredients",
  "No banned substances",
  "Open-source where it matters",
  "Fast shipping",
];

export function TrustBar() {
  return (
    <motion.section
      className="border-y border-[var(--border)] bg-[var(--bg-card)] px-4 py-6 sm:px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4 }}
    >
      <div className="mx-auto max-w-6xl">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs sm:text-sm text-[var(--gray-600)]">
          {items.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              className="flex items-center gap-2"
            >
              <motion.span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                aria-hidden
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              />
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
