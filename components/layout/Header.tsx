"use client";

import { motion } from "framer-motion";
import { PhaseAlignmentLogo } from "@/components/ui/PhaseAlignmentLogo";
import { NavBarBackground } from "./NavBarBackground";

export function Header() {
  const headerHeight = "3.5rem";
  return (
    <motion.header
      role="banner"
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
      {/* Nav: logo centered only. Menu moved to bottom nav. */}
      <div
        className="absolute inset-0 z-10 flex flex-nowrap overflow-visible px-4 sm:px-6 items-center"
        style={{ minHeight: headerHeight }}
      >
        <div className="flex-1 min-w-0 shrink-0" aria-hidden />
        <div className="flex flex-1 min-w-0 items-center justify-center min-h-9 pt-2">
          <div className="logo-wrapper-nav flex shrink-0 items-center justify-center min-h-9">
            <PhaseAlignmentLogo />
          </div>
        </div>
        <div className="flex-1 min-w-0 shrink-0" aria-hidden />
      </div>
    </motion.header>
  );
}
