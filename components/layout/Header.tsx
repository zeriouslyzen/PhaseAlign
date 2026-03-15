"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { CartCount } from "@/components/cart/CartCount";
import { PhaseAlignmentLogo } from "@/components/ui/PhaseAlignmentLogo";
import { NavBarBackground } from "./NavBarBackground";

const menuItems = [
  { href: "/shop", label: "Shop" },
  { href: "/account", label: "Account" },
];

export function Header() {
  const { data: session } = useSession();
  const links = session?.user
    ? [...menuItems, { href: "/admin", label: "Admin" }]
    : menuItems;
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  return (
    <motion.header
      className="sticky top-0 z-50 w-full overflow-visible"
      style={{ height: "3.25rem", minHeight: "3.25rem" }}
    >
      {/* Bar = only this SVG; curve bulges down */}
      <svg
        width="100%"
        height="52"
        viewBox="0 0 1000 52"
        preserveAspectRatio="none"
        className="absolute left-0 top-0 block w-full overflow-visible pointer-events-none"
        style={{ height: "3.25rem" }}
        aria-hidden
      >
        <defs>
          <clipPath id="nav-bar-clip" clipPathUnits="objectBoundingBox">
            {/* Same curve as bar: 36/52 ≈ 0.692, 500/1000=0.5 */}
            <path d="M 0 0 L 1 0 L 1 0.692 Q 0.5 1 0 0.692 Z" />
          </clipPath>
        </defs>
        <path
          d="M 0 0 L 1000 0 L 1000 36 Q 500 52 0 36 Z"
          fill="#000"
        />
      </svg>
      {/* Formulas layer – clipped to bar curve so they don't spill past */}
      <div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        style={{ clipPath: "url(#nav-bar-clip)" }}
      >
        <NavBarBackground />
      </div>
      {/* Nav: logo centered, dropdown right; py allows descenders (g) to show */}
      <div className="absolute inset-x-0 top-0 z-10 flex min-h-[3.25rem] max-w-6xl mx-auto px-4 sm:px-6 items-center">
        <div className="flex-1 min-w-0" aria-hidden />
        <div className="absolute left-1/2 -translate-x-1/2 flex-shrink-0 py-1">
          <PhaseAlignmentLogo />
        </div>
        <div className="flex-1 flex justify-end min-w-0" ref={menuRef}>
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors py-1.5 px-2 rounded"
              aria-expanded={open}
              aria-haspopup="true"
              aria-label="Menu"
            >
              Menu
              <svg
                className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-1 py-1.5 min-w-[8rem] rounded-md bg-black/95 border border-white/10 shadow-xl z-50"
                  role="menu"
                >
                  {links.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="border-t border-white/10 my-1" />
                  <div className="px-4 py-2 [&_a]:text-white/80 [&_a]:hover:text-white [&_a]:text-sm [&_a]:font-medium">
                    <CartCount />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
