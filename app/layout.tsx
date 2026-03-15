import type { Metadata } from "next";
import { Outfit, DM_Sans, Orbitron, Syne } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { ConditionalSiteLayout } from "@/components/layout/ConditionalSiteLayout";
import { OrganizationWebSiteSchema } from "@/components/seo/OrganizationWebSiteSchema";
import { BASE_URL, SITE_NAME, DEFAULT_DESCRIPTION } from "@/lib/site";

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
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${SITE_NAME} | Herbs, Performance, Health Tech`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "herbal supplements",
    "performance supplements",
    "health tech",
    "TCM",
    "adaptogens",
    "recovery",
    "stacks",
    "physiology",
    "evidence-based",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Herbs, Performance, Health Tech`,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Herbs, Performance, Health Tech`,
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: BASE_URL },
  other: {
    "theme-color": "#0c0c0c",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable} ${orbitron.variable} ${syne.variable}`}>
      <body className="min-h-screen flex flex-col antialiased bg-[var(--bg)]">
        <OrganizationWebSiteSchema />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SessionProvider>
          <CartProvider>
            <ConditionalSiteLayout>{children}</ConditionalSiteLayout>
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
