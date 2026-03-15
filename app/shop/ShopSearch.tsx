"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export function ShopSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");

  const updateQuery = useCallback(
    (q: string) => {
      const next = new URLSearchParams(searchParams.toString());
      if (q.trim()) next.set("q", q.trim());
      else next.delete("q");
      router.push(`/shop?${next.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateQuery(value);
        }}
        className="flex gap-2"
      >
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search products…"
          className="flex-1 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--gray-400)] focus:border-[var(--link)] focus:outline-none focus:ring-1 focus:ring-[var(--link)]"
          aria-label="Search products"
        />
        <button
          type="submit"
          className="rounded-[var(--radius)] bg-[var(--gray-100)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--gray-200)]"
        >
          Search
        </button>
      </form>
    </div>
  );
}
