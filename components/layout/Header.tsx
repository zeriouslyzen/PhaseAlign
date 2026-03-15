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

  const headerHeight = "3.5rem";
  return (
    <motion.header
      className="sticky top-0 z-[100] w-full"
      style={{ height: headerHeight, minHeight: headerHeight, overflow: "visible" }}
    >
      {/* Bar = only this SVG; curve bulges down */}
      <svg
        width="100%"
        height="56"
        viewBox="0 0 1000 42"
        preserveAspectRatio="none"
        className="absolute left-0 top-0 block w-full pointer-events-none"
        style={{ height: headerHeight }}
        aria-hidden
      >
        <defs>
          <clipPath id="nav-bar-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0 0 L 1 0 L 1 0.75 Q 0.5 1 0 0.75 Z" />
          </clipPath>
        </defs>
        <path
          d="M 0 0 L 1000 0 L 1000 28 Q 500 42 0 28 Z"
          fill="#000"
        />
      </svg>
      {/* Formulas layer – clipped to bar curve */}
      <div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        style={{ clipPath: "url(#nav-bar-clip)" }}
      >
        <NavBarBackground />
      </div>
      {/* Nav: one flex row so logo and menu are siblings with align-items: center = same horizontal line */}
      <div
        className="absolute inset-0 z-10 flex overflow-visible px-4 sm:px-6 items-center justify-between"
        style={{ minHeight: headerHeight }}
      >
        <div className="flex-1 min-w-0" aria-hidden />
        <div className="logo-wrapper-nav flex items-center justify-center flex-1 min-h-9 min-w-0">
          <PhaseAlignmentLogo />
        </div>
        <div className="flex items-center justify-end flex-1 min-h-9 min-w-0 -mt-5" ref={menuRef}>
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="nav-menu-trigger flex items-center gap-[var(--nav-menu-gap)] text-sm font-medium text-white/80 hover:text-white transition-colors rounded h-9 px-3 py-2 leading-none"
              style={{ letterSpacing: "0.06em", fontFamily: "var(--font-logo)" }}
              aria-expanded={open}
              aria-haspopup="true"
              aria-label="Menu"
            >
              Menu
              <svg
                className={`w-4 h-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="nav-dropdown-panel absolute right-0 top-full z-50"
                  style={{ marginTop: "var(--nav-dropdown-gap)" }}
                  role="menu"
                >
                  {links.map((item, i) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      onClick={() => setOpen(false)}
                      className="nav-dropdown-item"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="nav-dropdown-divider" />
                  <div className="nav-dropdown-cart [&_a]:text-white/85 [&_a]:hover:text-white [&_a]:text-[0.8125rem] [&_a]:font-medium [&_a]:tracking-[0.04em]">
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
