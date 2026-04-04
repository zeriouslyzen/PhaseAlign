export interface HomePathwayLink {
  href: string;
  label: string;
}

export interface HomePathway {
  id: string;
  title: string;
  description: string;
  primary: HomePathwayLink;
  secondary?: HomePathwayLink;
}

/** Section kicker (short, all caps works with wide tracking in UI). */
export const HOME_PATHWAYS_KICKER = "Start here";

export const HOME_PATHWAYS_SECTION = {
  heading: "Stop buying herbs off vibes alone",
  intro:
    "Traditions and lab language share one catalog, tagged so you can cross-check instead of guessing. Three moves: learn how we reason, shop with filters tied to real physiology, or jump to stacks and blends when you already know what you are fixing.",
} as const;

export const HOME_PATHWAYS: HomePathway[] = [
  {
    id: "physiology",
    title: "Body first, marketing second",
    description:
      "Sleep, stress, recovery: we tie claims to systems and mechanisms where we can. Less vague wellness, more explicit targets.",
    primary: { href: "/learn", label: "Learn the labeling system" },
    secondary: { href: "/shop?organ=nervous", label: "Shop stress and nervous system" },
  },
  {
    id: "traditions",
    title: "Four maps, one shelf",
    description:
      "TCM, Ayurveda, Native protocols, and Western botanicals are different lenses on the same plants. Use the frame that matches how you think.",
    primary: { href: "/learn", label: "Open guides and frameworks" },
    secondary: { href: "/shop", label: "Shop the full catalog" },
  },
  {
    id: "lifestyle",
    title: "Your week is not one bottle",
    description:
      "Travel, grind blocks, deload weeks: context changes the math. Stacks pair intent with mechanism language so you are not random-stacking off a clip.",
    primary: { href: "/stacks", label: "Browse stacks" },
    secondary: { href: "/shop?cat=herbal-blends", label: "Shop pre-made blends" },
  },
  {
    id: "environment",
    title: "Fix the room, not only the capsule",
    description:
      "Water, air, and gear around you: sometimes that is the bottleneck. Health tech and essentials when the environment matters as much as the supplement.",
    primary: { href: "/shop?cat=health-tech", label: "Shop health tech" },
    secondary: { href: "/shop?cat=essentials", label: "Shop essentials" },
  },
];
