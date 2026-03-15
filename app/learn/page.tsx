import type { Metadata } from "next";
import { LearnContent } from "./LearnContent";

export const metadata: Metadata = {
  title: "Learn | Phase Alignment",
  description:
    "Stacks: herbal or from scratch. Frameworks: TCM, Native American, Vedic, evidence-based. Metabolic, endocrine, HPA, environmental (EMF, air). Mechanism and outcome. Physiology first.",
};

export default function LearnPage() {
  return <LearnContent />;
}
