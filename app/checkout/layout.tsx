import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Phase Alignment",
  description: "Secure checkout. Herbs, performance, health tech.",
  robots: "noindex, nofollow",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
