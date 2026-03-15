"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

export function CartCount() {
  const { count } = useCart();

  return (
    <Link
      href="/cart"
      className="relative flex items-center text-sm font-medium text-[var(--gray-700)] hover:text-[var(--fg)] transition-colors"
      aria-label={`Cart: ${count} items`}
    >
      Cart
      {count > 0 && (
        <motion.span
          className="ml-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--accent)] px-1.5 text-xs font-bold text-[var(--gray-900)]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {count > 99 ? "99+" : count}
        </motion.span>
      )}
    </Link>
  );
}
