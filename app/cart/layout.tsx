import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart | Phase Alignment",
  description: "Your cart. Herbs, performance, health tech.",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
