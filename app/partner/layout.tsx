import type { Metadata } from "next";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partner",
  description:
    "Affiliate and partner program. Discounts, merch, community, education. Physiology-first, evidence-based. Stacks, recovery, environmental.",
  openGraph: {
    title: "Partner | Phase Alignment",
    description: "Affiliate and partner sign-up. Physiology-first, evidence-based.",
    url: canonical("/partner"),
  },
  alternates: { canonical: canonical("/partner") },
};

export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
