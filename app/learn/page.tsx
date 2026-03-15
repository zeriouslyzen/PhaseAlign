import type { Metadata } from "next";
import { LearnContent } from "./LearnContent";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Stacks: herbal or from scratch. Frameworks: TCM, Native American, Vedic, evidence-based. Metabolic, endocrine, HPA, environmental (EMF, air). Mechanism and outcome. Physiology first.",
  openGraph: {
    title: "Learn | Phase Alignment",
    description:
      "Scientific guides: stacks, traditions, mechanisms. TCM, Vedic, evidence-based. Physiology first.",
    url: canonical("/learn"),
  },
  alternates: { canonical: canonical("/learn") },
};

export default function LearnPage() {
  return <LearnContent />;
}
