/**
 * Preset shop URLs for goal-based discovery. Keys match /shop search params.
 */
export const HERBAL_BLENDS_CAT = "herbal-blends";

export type ShopFilterKey =
  | "cat"
  | "q"
  | "tradition"
  | "element"
  | "organ"
  | "planet"
  | "sign";

export interface ShopIntent {
  id: string;
  label: string;
  /** Micro-copy under chips */
  hint?: string;
  params: Partial<Record<ShopFilterKey, string>>;
}

export const SHOP_INTENTS: ShopIntent[] = [
  {
    id: "blends",
    label: "Ready-made blends",
    hint: "Curated formulas",
    params: { cat: HERBAL_BLENDS_CAT },
  },
  {
    id: "sleep",
    label: "Sleep & unwind",
    params: { organ: "nervous", cat: HERBAL_BLENDS_CAT },
  },
  {
    id: "stress",
    label: "Calm & stress",
    params: { organ: "nervous" },
  },
  {
    id: "energy",
    label: "Energy & focus",
    params: { organ: "kidney" },
  },
  {
    id: "digestion",
    label: "Digestion",
    params: { organ: "spleen" },
  },
  {
    id: "immunity",
    label: "Immune support",
    params: { organ: "immune" },
  },
  {
    id: "performance",
    label: "Performance",
    params: { cat: "performance" },
  },
];
