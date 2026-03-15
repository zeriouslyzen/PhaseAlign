/**
 * Stack builder: scientific targets (goal / state / enhancement) and product mapping.
 * Targets are extensive and organized by physiological/system group.
 */

export type StackMode = "goal" | "state" | "enhancement";

export interface StackTarget {
  id: string;
  label: string;
  /** Short mechanism or outcome. Scientific language. */
  description: string;
}

export interface StackTargetGroup {
  id: string;
  label: string;
  /** Optional short group description. */
  description?: string;
  targetIds: string[];
}

/** All targets: flat list for lookup. */
export const STACK_TARGETS: StackTarget[] = [
  // Recovery & restoration
  { id: "recovery-metabolic", label: "Recovery (metabolic)", description: "Glycogen, protein turnover. Post-load restoration." },
  { id: "recovery-inflammatory", label: "Recovery (inflammatory)", description: "COX-2, NF-κB. Reduce inflammatory load after stress." },
  { id: "recovery-autonomic", label: "Recovery (autonomic)", description: "Vagal tone, parasympathetic. Reset after load." },
  { id: "muscle-tissue", label: "Muscle & tissue", description: "Repair, adaptation. Structural recovery." },
  // Sleep & circadian
  { id: "sleep-quality", label: "Sleep quality", description: "Architecture, depth. Quality over knockout." },
  { id: "wind-down", label: "Wind-down", description: "Calm spirit, GABAergic. Transition to rest." },
  { id: "circadian", label: "Circadian alignment", description: "Rhythm, light, melatonin. Sync with cycle." },
  // Stress & adaptation
  { id: "stress-hpa", label: "HPA axis", description: "Cortisol rhythm, stress response. Modulate, not blunt." },
  { id: "adaptogens", label: "Adaptogens", description: "Capacity under load. Non-specific resistance." },
  { id: "resilience", label: "Resilience", description: "Bounce-back. Recovery speed and capacity." },
  // Energy & output
  { id: "energy-metabolic", label: "Energy (metabolic)", description: "Glucose, mitochondria. Sustained output." },
  { id: "energy-steady", label: "Steady energy", description: "No spikes, no crash. Stable capacity." },
  { id: "vitality", label: "Vitality", description: "Qi, ojas. General life force and drive." },
  // Cognition & focus
  { id: "focus-alertness", label: "Alertness", description: "Wakefulness, attention. Signal without jitter." },
  { id: "focus-clarity", label: "Clarity & cognition", description: "Mental performance. Flow state support." },
  { id: "calm-focused", label: "Calm focus", description: "Relaxed alertness. Alpha, not beta overload." },
  // Environmental
  { id: "env-emf", label: "EMF", description: "Electromagnetic load. Reduce exposure, buffer." },
  { id: "env-air", label: "Air quality", description: "Particulate, oxidative load. Breathe clean." },
  { id: "env-water", label: "Water", description: "Hydration, contaminants. Clean input." },
  { id: "env-general", label: "Environmental load", description: "General reduction. Total load down." },
  // Digestive & gut
  { id: "digestive-fire", label: "Digestive fire", description: "Warming, motility. Middle burner support." },
  { id: "gut-barrier", label: "Gut barrier", description: "Integrity, inflammation. Gut-brain axis." },
  // Hormonal & endocrine
  { id: "endocrine-thyroid", label: "Thyroid", description: "Metabolic rate, conversion. T3/T4 support." },
  { id: "endocrine-sex", label: "Sex hormones", description: "Testosterone, estrogen. Balance and support." },
  { id: "endocrine-hpa", label: "HPA / adrenal", description: "Cortisol, DHEA. Rhythm and reserve." },
  // General
  { id: "enhancement", label: "General enhancement", description: "Full-spectrum. No single deficit." },
];

/** Groups for organized UI. Order and headings. */
export const STACK_TARGET_GROUPS: StackTargetGroup[] = [
  {
    id: "recovery",
    label: "Recovery & restoration",
    description: "Metabolic, inflammatory, autonomic. Post-load.",
    targetIds: ["recovery-metabolic", "recovery-inflammatory", "recovery-autonomic", "muscle-tissue"],
  },
  {
    id: "sleep",
    label: "Sleep & circadian",
    description: "Quality, wind-down, rhythm.",
    targetIds: ["sleep-quality", "wind-down", "circadian"],
  },
  {
    id: "stress",
    label: "Stress & adaptation",
    description: "HPA, adaptogens, resilience.",
    targetIds: ["stress-hpa", "adaptogens", "resilience"],
  },
  {
    id: "energy",
    label: "Energy & output",
    description: "Metabolic, steady state, vitality.",
    targetIds: ["energy-metabolic", "energy-steady", "vitality"],
  },
  {
    id: "cognition",
    label: "Cognition & focus",
    description: "Alertness, clarity, calm focus.",
    targetIds: ["focus-alertness", "focus-clarity", "calm-focused"],
  },
  {
    id: "environmental",
    label: "Environmental",
    description: "EMF, air, water. Reduce load.",
    targetIds: ["env-emf", "env-air", "env-water", "env-general"],
  },
  {
    id: "digestive",
    label: "Digestive & gut",
    description: "Digestive fire, gut barrier.",
    targetIds: ["digestive-fire", "gut-barrier"],
  },
  {
    id: "endocrine",
    label: "Hormonal & endocrine",
    description: "Thyroid, sex hormones, HPA.",
    targetIds: ["endocrine-thyroid", "endocrine-sex", "endocrine-hpa"],
  },
  {
    id: "general",
    label: "General",
    targetIds: ["enhancement"],
  },
];

/** Get target by id. */
export function getStackTarget(id: string): StackTarget | undefined {
  return STACK_TARGETS.find((t) => t.id === id);
}

/** Map product slug -> stack target ids. Products can match multiple granular targets. */
export const PRODUCT_STACK_TARGETS: Record<string, string[]> = {
  "adaptogen-blend": ["stress-hpa", "adaptogens", "energy-metabolic", "energy-steady"],
  "calm-spirit-blend": ["sleep-quality", "wind-down", "stress-hpa"],
  "qi-support-blend": ["energy-metabolic", "vitality", "adaptogens"],
  "ginger": ["recovery-metabolic", "digestive-fire", "energy-steady"],
  "turmeric": ["recovery-inflammatory"],
  "sleep-stack": ["sleep-quality", "wind-down", "circadian"],
  "recovery-blend": ["recovery-inflammatory", "recovery-metabolic", "digestive-fire"],
  "bulk-ashwagandha": ["stress-hpa", "adaptogens"],
  "water-filter": ["env-water"],
  "open-phone": ["env-emf", "env-general"],
  "3d-printer": ["enhancement"],
};

/** Product slugs that appear in the stack builder (have at least one target). */
export function getStackProductSlugs(): string[] {
  return Object.keys(PRODUCT_STACK_TARGETS);
}

/** For a product slug, return target ids it supports. */
export function getTargetsForProduct(slug: string): string[] {
  return PRODUCT_STACK_TARGETS[slug] ?? [];
}

/** For selected target ids, return product slugs that match any of them. */
export function getProductSlugsForTargets(targetIds: string[]): string[] {
  if (targetIds.length === 0) return [];
  const set = new Set<string>();
  for (const [slug, targets] of Object.entries(PRODUCT_STACK_TARGETS)) {
    if (targets.some((t) => targetIds.includes(t))) set.add(slug);
  }
  return Array.from(set);
}
