import type { Metadata } from "next";
import { Outfit, DM_Sans, Orbitron, Syne } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { ConditionalSiteLayout } from "@/components/layout/ConditionalSiteLayout";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Phase Alignment | Herbs, Performance, Health Tech",
  description:
    "East meets west. Scientifically done. Herbal blends, wholesale herbs, performance supplements, and health tech. No fluff, no backdoors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable} ${orbitron.variable} ${syne.variable}`}>
      <body className="min-h-screen flex flex-col antialiased bg-[var(--bg)]">
        <SessionProvider>
          <CartProvider>
            <ConditionalSiteLayout>{children}</ConditionalSiteLayout>
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
