"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { CartCount } from "@/components/cart/CartCount";
import { NavBarBackground } from "./NavBarBackground";

const baseLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/stacks", label: "Stacks" },
  { href: "/account", label: "Account" },
];

export function BottomNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const links = session?.user
    ? [...baseLinks, { href: "/admin", label: "Admin" }]
    : baseLinks;

  return (
    <nav
      className="bottom-nav fixed bottom-0 left-0 right-0 z-[90] w-full border-t border-[var(--border-strong)] bg-black"
      style={{ minHeight: "3rem" }}
      aria-label="Site navigation"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <NavBarBackground />
      </div>
      <div className="relative z-10 mx-auto flex h-12 max-w-6xl items-center justify-center gap-1 px-4 sm:px-6">
        {links.map(({ href, label }) => {
          const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`bottom-nav-btn rounded px-3 py-2 text-xs font-medium tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--gray-900)] ${isActive ? "bg-white/10 text-white" : "text-white/75 hover:bg-white/10 hover:text-white"}`}
              style={{ fontFamily: "var(--font-logo)" }}
              aria-current={isActive ? "page" : undefined}
            >
              {label}
            </Link>
          );
        })}
        <div
          className="bottom-nav-btn bottom-nav-cart ml-1 flex items-center rounded px-3 py-2 text-xs font-medium tracking-wider text-white/75 transition-colors hover:bg-white/10 hover:text-white [&_a]:text-inherit [&_a]:text-xs [&_a]:no-underline [&_a]:hover:text-white [&_.min-w-5]:bg-[var(--accent)] [&_.min-w-5]:text-[var(--gray-900)]"
          style={{ fontFamily: "var(--font-logo)" }}
        >
          <CartCount />
        </div>
      </div>
    </nav>
  );
}
