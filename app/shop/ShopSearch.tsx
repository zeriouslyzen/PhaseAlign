"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const DEBOUNCE_MS = 350;

export function ShopSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const qParam = searchParams.get("q") ?? "";
  const [value, setValue] = useState(qParam);

  useEffect(() => {
    setValue(qParam);
  }, [qParam]);

  const pushQuery = useCallback(
    (q: string) => {
      const next = new URLSearchParams(searchParams.toString());
      const trimmed = q.trim();
      const current = (searchParams.get("q") ?? "").trim();
      if (trimmed === current) return;
      if (trimmed) next.set("q", trimmed);
      else next.delete("q");
      router.replace(`/shop?${next.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  useEffect(() => {
    const id = window.setTimeout(() => {
      pushQuery(value);
    }, DEBOUNCE_MS);
    return () => window.clearTimeout(id);
  }, [value, pushQuery]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          pushQuery(value);
        }}
        className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-3"
      >
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gray-400)]" aria-hidden>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search by product name or description…"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-card)] py-3 pl-10 pr-4 text-sm text-[var(--foreground)] shadow-sm placeholder:text-[var(--gray-400)] transition-shadow focus:border-[var(--link)] focus:outline-none focus:ring-2 focus:ring-[var(--link)]/20"
            aria-label="Search products"
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-[var(--fg)] px-5 py-3 text-sm font-semibold text-[var(--bg)] shadow-sm transition-opacity hover:opacity-90 sm:min-w-[7rem]"
        >
          Search
        </button>
      </form>
    </div>
  );
}
