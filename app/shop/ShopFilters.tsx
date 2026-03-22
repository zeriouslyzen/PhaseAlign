"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { getTradition, TRADITIONS, ORGANS, ELEMENTS_TCM, ELEMENTS_VEDIC, PLANETS, SIGNS } from "@/lib/classifications";
import type { Category } from "@/lib/types";

interface ShopFiltersProps {
  currentCat?: string;
  categories: Category[];
}

export function ShopFilters({ currentCat, categories }: ShopFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTradition = searchParams.get("tradition");
  const currentOrgan = searchParams.get("organ");
  const currentElement = searchParams.get("element");
  const currentPlanet = searchParams.get("planet");
  const currentSign = searchParams.get("sign");

  const activeCategory = categories.find(c => c.slug === currentCat);

  function setFilter(key: string, value: string | null) {
    const next = new URLSearchParams(searchParams.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    
    // Reset page if needed, though ProductGrid handles products.length changes
    router.push(`/shop?${next.toString()}`, { scroll: false });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 space-y-6">
      {/* Category Section */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-2 text-[10px] font-bold uppercase tracking-widest text-[var(--gray-400)]">
          Category:
        </span>
        <button
          type="button"
          onClick={() => setFilter("cat", null)}
          className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
            !currentCat
              ? "bg-[var(--fg)] text-[var(--bg)] shadow-sm"
              : "text-[var(--gray-500)] hover:text-[var(--fg)]"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setFilter("cat", cat.slug)}
            className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
              currentCat === cat.slug
                ? "bg-[var(--brand)] text-white shadow-sm"
                : "text-[var(--gray-500)] hover:text-[var(--fg)]"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
      {/* Tradition Pills */}
      <div className="flex flex-wrap items-center gap-2 border-t border-[var(--border)] pt-4">
        <span className="mr-2 text-[10px] font-bold uppercase tracking-widest text-[var(--gray-400)]">
          Tradition:
        </span>
        <button
          type="button"
          onClick={() => setFilter("tradition", null)}
          className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
            !currentTradition
              ? "bg-[var(--gray-800)] text-white"
              : "text-[var(--gray-500)] hover:text-[var(--fg)]"
          }`}
        >
          Any
        </button>
        {TRADITIONS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setFilter("tradition", t.id)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium transition-all ${
              currentTradition === t.id
                ? "bg-[var(--bg-card)] border border-[var(--brand)] text-[var(--brand)] shadow-sm"
                : "text-[var(--gray-500)] hover:text-[var(--fg)]"
            }`}
          >
            <span 
              className="h-1.5 w-1.5 rounded-full" 
              style={{ backgroundColor: t.color }}
            />
            {t.label}
          </button>
        ))}
      </div>

      {/* High-Dimension Filters (Organs, Elements, Celestial) - Shared horizontal scroll container */}
      <div className="flex flex-col gap-4 border-t border-[var(--border)] pt-4 overflow-hidden">
        
        {/* Organ Systems */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-[10px] font-bold uppercase tracking-widest text-[var(--gray-400)] whitespace-nowrap">
            Support:
          </span>
          <button
            type="button"
            onClick={() => setFilter("organ", null)}
            className={`rounded-lg px-2.5 py-0.5 text-[10px] font-medium transition-all ${
              !currentOrgan ? "bg-[var(--gray-200)] text-[var(--fg)]" : "text-[var(--gray-400)] hover:text-[var(--fg)]"
            }`}
          >
            All
          </button>
          {ORGANS.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => setFilter("organ", o.id)}
              className={`rounded-lg px-2.5 py-0.5 text-[10px] font-medium transition-all border ${
                currentOrgan === o.id
                  ? "border-[var(--brand)] bg-[var(--brand)]/5 text-[var(--brand)]"
                  : "border-transparent text-[var(--gray-500)] hover:bg-[var(--gray-100)]"
              }`}
            >
              {o.label.split("/")[0].trim()}
            </button>
          ))}
        </div>

        {/* Elements */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-[10px] font-bold uppercase tracking-widest text-[var(--gray-400)] whitespace-nowrap">
            Energetics:
          </span>
          {[...ELEMENTS_TCM, ...ELEMENTS_VEDIC.filter(e => !ELEMENTS_TCM.find(te => te.id === e.id))].map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => setFilter("element", e.id)}
              className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-0.5 text-[10px] font-medium transition-all ${
                currentElement === e.id
                  ? "border-[var(--fg)] bg-[var(--fg)] text-[var(--bg)]"
                  : "border-[var(--border)] text-[var(--gray-500)] hover:border-[var(--gray-400)]"
              }`}
            >
              <span className="h-1 w-1 rounded-full" style={{ backgroundColor: e.color }} />
              {e.label}
            </button>
          ))}
        </div>

        {/* Celestial */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="mr-2 text-[10px] font-bold uppercase tracking-widest text-[var(--gray-400)] whitespace-nowrap">
            Celestial:
          </span>
          {PLANETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setFilter("planet", p.id)}
              className={`flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-medium transition-all ${
                currentPlanet === p.id
                  ? "border-[var(--brand)] bg-[var(--brand)]/5 text-[var(--brand)]"
                  : "border-transparent text-[var(--gray-400)] hover:text-[var(--fg)]"
              }`}
            >
              <span style={{ color: p.color }}>{p.symbol}</span>
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
