/**
 * Classifications for stacks and products: traditions (culture-honoring) and Western/science framing.
 * Used for filtering, color-coding, and educational copy. Honors origin culture; adds mechanism language.
 */

export interface Tradition {
  id: string;
  label: string;
  /** Short description for UI. */
  description: string;
  /** Hex for badges, borders, stack UI. */
  color: string;
}

/** Traditions we classify by. Culture-first; Western science as additive framework. */
export const TRADITIONS: Tradition[] = [
  {
    id: "TCM",
    label: "Chinese medicine",
    description: "Formula and single-herb framework. Qi, Blood, Spirit, organ networks.",
    color: "#c41e3a",
  },
  {
    id: "Vedic",
    label: "Vedic / Ayurvedic",
    description: "Rasayana, adaptogens. Constitution and season.",
    color: "#d97706",
  },
  {
    id: "Native American",
    label: "Native American",
    description: "Plant medicines. Relationship and place.",
    color: "#059669",
  },
  {
    id: "Western",
    label: "Western botanical",
    description: "Evidence-based mechanisms. Isolates and extracts.",
    color: "#2563eb",
  },
];

/** Fallback when product has no tradition (e.g. tech). */
export const TRADITION_NEUTRAL = "#6b6964";

export function getTradition(id: string): Tradition | undefined {
  return TRADITIONS.find((t) => t.id === id);
}

export function getTraditionColor(id: string): string {
  return getTradition(id)?.color ?? TRADITION_NEUTRAL;
}
