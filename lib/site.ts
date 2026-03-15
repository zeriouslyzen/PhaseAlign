/**
 * Site-wide constants for SEO, canonical URLs, and structured data.
 * Set NEXT_PUBLIC_BASE_URL in production (e.g. https://phasealignment.com).
 */
export const BASE_URL =
  typeof process.env.NEXT_PUBLIC_BASE_URL === "string" &&
  process.env.NEXT_PUBLIC_BASE_URL.length > 0
    ? process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, "")
    : "https://phasealignment.com";

export const SITE_NAME = "Phase Alignment";
export const DEFAULT_DESCRIPTION =
  "Herbal blends, performance supplements, health tech, guides. East meets west. Physiology-first, science-backed. Build stacks. Partner program.";

export function canonical(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_URL}${p}`;
}

export function absoluteImage(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_URL}${p}`;
}
