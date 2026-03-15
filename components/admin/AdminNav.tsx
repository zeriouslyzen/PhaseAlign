"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/products", label: "Products", exact: false },
  { href: "/admin/products/add", label: "Add product", exact: true },
  { href: "/admin/orders", label: "Orders", exact: false },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--bg-card)] px-2 pb-[env(safe-area-inset-bottom)] pt-2 md:relative md:bottom-auto md:left-auto md:right-auto md:mt-auto md:flex md:border-t-0 md:px-0 md:pb-0 md:pt-0"
      aria-label="Admin"
    >
      <div className="mx-auto flex max-w-4xl justify-around gap-1 md:justify-start md:gap-4">
        {links.map(({ href, label, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`min-h-[44px] min-w-[44px] flex flex-1 items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors md:flex-none md:rounded-md ${
                active
                  ? "bg-[var(--accent)] text-[var(--gray-900)]"
                  : "text-[var(--gray-600)] hover:bg-[var(--gray-100)] hover:text-[var(--fg)]"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
