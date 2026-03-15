"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const SCROLL_COLLAPSE_THRESHOLD = 72;

export function PhaseAlignmentLogo() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    function onScroll() {
      setCollapsed(window.scrollY > SCROLL_COLLAPSE_THRESHOLD);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logoStyle = {
    fontFamily: "var(--font-logo)",
    paddingBottom: "6px",
    display: "inline-block",
    overflow: "visible",
    lineHeight: 1.1,
    whiteSpace: "nowrap" as const,
  };

  return (
    <Link
      href="/"
      className="logo-pulse relative z-10 inline-block min-w-[4ch] text-sm font-bold text-white sm:text-base leading-tight overflow-visible"
      style={logoStyle}
      aria-label="Phase Alignment – Home"
    >
      <AnimatePresence initial={false} mode="wait">
        {collapsed ? (
          <motion.span
            key="align"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            Align
          </motion.span>
        ) : (
          <motion.span
            key="full"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            Phase Alignment
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}
