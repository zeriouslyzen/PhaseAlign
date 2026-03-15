import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner | Phase Alignment",
  description: "Affiliate and partner sign-up. Physiology-first, evidence-based. Stacks, recovery, environmental load.",
};

export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
