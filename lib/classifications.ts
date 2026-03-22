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

/** 5-Element Theory (TCM) */
export const ELEMENTS_TCM = [
  { id: "wood", label: "Wood", color: "#10b981" },
  { id: "fire", label: "Fire", color: "#ef4444" },
  { id: "earth", label: "Earth", color: "#b45309" },
  { id: "metal", label: "Metal", color: "#9ca3af" },
  { id: "water", label: "Water", color: "#3b82f6" },
];

/** 5-Element Theory (Vedic/Ayurvedic) */
export const ELEMENTS_VEDIC = [
  { id: "earth", label: "Earth", color: "#78350f" },
  { id: "water", label: "Water", color: "#2563eb" },
  { id: "fire", label: "Fire", color: "#dc2626" },
  { id: "air", label: "Air", color: "#38bdf8" },
  { id: "space", label: "Space / Ether", color: "#a855f7" },
];

/** Organ Networks & Physiological Systems */
export const ORGANS = [
  { id: "heart", label: "Heart / HT", system: "Circulatory" },
  { id: "liver", label: "Liver / LV", system: "Metabolic" },
  { id: "lung", label: "Lung / LU", system: "Respiratory" },
  { id: "spleen", label: "Spleen / SP", system: "Digestive" },
  { id: "kidney", label: "Kidney / KD", system: "Endocrine/Renal" },
  { id: "nervous", label: "Nervous System", system: "Neurological" },
  { id: "immune", label: "Immune System", system: "Defense" },
];

/** Celestial Correspondences (Planetary) */
export const PLANETS = [
  { id: "sun", label: "Sun", symbol: "☉", color: "#f7d102" },
  { id: "moon", label: "Moon", symbol: "☽", color: "#e2e8f0" },
  { id: "mercury", label: "Mercury", symbol: "☿", color: "#94a3b8" },
  { id: "venus", label: "Venus", symbol: "♀", color: "#f472b6" },
  { id: "mars", label: "Mars", symbol: "♂", color: "#ef4444" },
  { id: "jupiter", label: "Jupiter", symbol: "♃", color: "#fb923c" },
  { id: "saturn", label: "Saturn", symbol: "♄", color: "#4b5563" },
];

/** Zodiac Correspondences */
export const SIGNS = [
  { id: "aries", label: "Aries", symbol: "♈︎", element: "Fire" },
  { id: "taurus", label: "Taurus", symbol: "♉︎", element: "Earth" },
  { id: "gemini", label: "Gemini", symbol: "♊︎", element: "Air" },
  { id: "cancer", label: "Cancer", symbol: "♋︎", element: "Water" },
  { id: "leo", label: "Leo", symbol: "♌︎", element: "Fire" },
  { id: "virgo", label: "Virgo", symbol: "♍︎", element: "Earth" },
  { id: "libra", label: "Libra", symbol: "♎︎", element: "Air" },
  { id: "scorpio", label: "Scorpio", symbol: "♏︎", element: "Water" },
  { id: "sagittarius", label: "Sagittarius", symbol: "♐︎", element: "Fire" },
  { id: "capricorn", label: "Capricorn", symbol: "♑︎", element: "Earth" },
  { id: "aquarius", label: "Aquarius", symbol: "♒︎", element: "Air" },
  { id: "pisces", label: "Pisces", symbol: "♓︎", element: "Water" },
];
