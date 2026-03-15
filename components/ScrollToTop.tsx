"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scrolls the window to the top on every client-side navigation.
 * Fixes preserved scroll position when navigating between pages.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
