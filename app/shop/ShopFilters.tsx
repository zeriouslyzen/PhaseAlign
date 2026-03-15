"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface ShopFiltersProps {
  currentCat?: string;
}

export function ShopFilters({ currentCat }: ShopFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function setCategory(slug: string | null) {
    const next = new URLSearchParams(searchParams.toString());
    if (slug) next.set("cat", slug);
    else next.delete("cat");
    router.push(`/shop?${next.toString()}`);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => setCategory(null)}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          !currentCat
            ? "bg-[var(--accent)] text-[var(--gray-900)]"
            : "bg-[var(--gray-100)] text-[var(--gray-700)] hover:bg-[var(--gray-200)]"
        }`}
      >
        All
      </button>
      {["herbal-blends", "wholesale-herbs", "performance", "health-tech", "essentials"].map(
        (slug) => (
          <button
            key={slug}
            type="button"
            onClick={() => setCategory(slug)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              currentCat === slug
                ? "bg-[var(--accent)] text-[var(--gray-900)]"
                : "bg-[var(--gray-100)] text-[var(--gray-700)] hover:bg-[var(--gray-200)]"
            }`}
          >
            {slug
              .split("-")
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" ")}
          </button>
        )
      )}
    </div>
  );
}
