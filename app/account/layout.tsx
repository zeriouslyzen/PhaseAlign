import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account | Phase Alignment",
  description: "Sign in, orders, and account settings.",
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
