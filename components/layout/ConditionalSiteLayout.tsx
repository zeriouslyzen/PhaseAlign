"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";

export function ConditionalSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }
  return (
    <>
      <Header />
      <div className="flex min-h-0 flex-1 flex-col pb-12">
        <main className="relative z-0 flex-1">{children}</main>
        <Footer />
      </div>
      <BottomNav />
    </>
  );
}
