"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  TRADITIONS,
  ORGANS,
  ELEMENTS_TCM,
  ELEMENTS_VEDIC,
  PLANETS,
  SIGNS,
} from "@/lib/classifications";
import type { Category } from "@/lib/types";
import {
  HERBAL_BLENDS_CAT,
  SHOP_INTENTS,
  type ShopFilterKey,
  type ShopIntent,
} from "@/lib/shop-intents";

interface ShopFiltersProps {
  currentCat?: string;
  categories: Category[];
}

const ELEMENTS_MERGED = [
  ...ELEMENTS_TCM,
  ...ELEMENTS_VEDIC.filter(
    (e) => !ELEMENTS_TCM.find((te) => te.id === e.id)
  ),
];

function intentMatchesUrl(intent: ShopIntent, params: URLSearchParams): boolean {
  for (const [k, v] of Object.entries(intent.params)) {
    if (!v || params.get(k) !== v) return false;
  }
  return true;
}

export function ShopFilters({ currentCat, categories }: ShopFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const qs = searchParams.toString();

  useEffect(() => {
    function syncAdvancedFromHash() {
      if (typeof window === "undefined") return;
      if (window.location.hash !== "#advanced-filters") return;
      setAdvancedOpen(true);
      document
        .getElementById("advanced-filters")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    syncAdvancedFromHash();
    window.addEventListener("hashchange", syncAdvancedFromHash);
    return () => window.removeEventListener("hashchange", syncAdvancedFromHash);
  }, [qs]);

  const currentTradition = searchParams.get("tradition");
  const currentOrgan = searchParams.get("organ");
  const currentElement = searchParams.get("element");
  const currentPlanet = searchParams.get("planet");
  const currentSign = searchParams.get("sign");
  const currentQ = searchParams.get("q");

  function navigateWithParams(next: URLSearchParams) {
    router.push(`/shop?${next.toString()}`, { scroll: false });
  }

  function setFilter(key: ShopFilterKey, value: string | null) {
    const next = new URLSearchParams(searchParams.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    navigateWithParams(next);
  }

  function removeFilter(key: ShopFilterKey) {
    setFilter(key, null);
  }

  function clearAllFacets() {
    const next = new URLSearchParams();
    const view = searchParams.get("view");
    if (view) next.set("view", view);
    navigateWithParams(next);
  }

  function applyIntent(intent: ShopIntent) {
    const next = new URLSearchParams();
    const view = searchParams.get("view");
    if (view) next.set("view", view);
    const q = searchParams.get("q");
    if (q) next.set("q", q);
    for (const [k, v] of Object.entries(intent.params)) {
      if (v) next.set(k, v);
    }
    navigateWithParams(next);
  }

  const activeChips = useMemo(() => {
    const chips: { key: ShopFilterKey; label: string }[] = [];
    if (currentCat) {
      const cat = categories.find((c) => c.slug === currentCat);
      chips.push({
        key: "cat",
        label: cat ? `Category: ${cat.name}` : `Category: ${currentCat}`,
      });
    }
    if (currentQ?.trim()) {
      chips.push({
        key: "q",
        label: `Search: “${currentQ.trim()}”`,
      });
    }
    if (currentTradition) {
      const t = TRADITIONS.find((x) => x.id === currentTradition);
      chips.push({
        key: "tradition",
        label: t ? `Tradition: ${t.label}` : `Tradition: ${currentTradition}`,
      });
    }
    if (currentOrgan) {
      const o = ORGANS.find((x) => x.id === currentOrgan);
      chips.push({
        key: "organ",
        label: o ? `Support: ${o.label}` : `Support: ${currentOrgan}`,
      });
    }
    if (currentElement) {
      const e = ELEMENTS_MERGED.find((x) => x.id === currentElement);
      chips.push({
        key: "element",
        label: e ? `Energetics: ${e.label}` : `Energetics: ${currentElement}`,
      });
    }
    if (currentPlanet) {
      const p = PLANETS.find((x) => x.id === currentPlanet);
      chips.push({
        key: "planet",
        label: p ? `Planet: ${p.label}` : `Planet: ${currentPlanet}`,
      });
    }
    if (currentSign) {
      const s = SIGNS.find((x) => x.id === currentSign);
      chips.push({
        key: "sign",
        label: s ? `Sign: ${s.label}` : `Sign: ${currentSign}`,
      });
    }
    return chips;
  }, [
    currentCat,
    currentQ,
    currentTradition,
    currentOrgan,
    currentElement,
    currentPlanet,
    currentSign,
    categories,
  ]);

  const hasActiveFacets = activeChips.length > 0;

  const activeIntentId = useMemo(() => {
    const params = new URLSearchParams(qs);
    const sorted = [...SHOP_INTENTS].sort(
      (a, b) => Object.keys(b.params).length - Object.keys(a.params).length
    );
    for (const intent of sorted) {
      if (intentMatchesUrl(intent, params)) return intent.id;
    }
    return null;
  }, [qs]);

  return (
    <div className="border-b border-[var(--border)] bg-[var(--background)]">
      {hasActiveFacets && (
        <div className="sticky top-14 z-30 border-b border-[var(--border)] bg-[var(--background)]/95 py-2.5 backdrop-blur-md supports-[backdrop-filter]:bg-[var(--background)]/80">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 sm:px-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--gray-400)]">
              Active
            </span>
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
              {activeChips.map((c) => (
                <button
                  key={`${c.key}-${c.label}`}
                  type="button"
                  onClick={() => removeFilter(c.key)}
                  className="inline-flex max-w-full items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-2.5 py-1 text-xs font-medium text-[var(--fg)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"
                  title="Remove filter"
                >
                  <span className="truncate">{c.label}</span>
                  <span className="text-[var(--gray-400)]" aria-hidden>
                    ×
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={clearAllFacets}
              className="shrink-0 text-xs font-semibold text-[var(--brand)] underline-offset-2 hover:underline"
            >
              Clear all
            </button>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl space-y-5 px-4 py-5 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--gray-500)]">
              Quick start
            </p>
            <p className="mt-0.5 text-sm text-[var(--gray-600)]">
              Pick a goal — or search above. Tune with advanced filters when you need to.
            </p>
          </div>
          <Link
            href={`/shop?cat=${HERBAL_BLENDS_CAT}`}
            className="inline-flex shrink-0 items-center justify-center rounded-xl border border-[var(--brand)] bg-[var(--brand)]/10 px-4 py-2.5 text-sm font-semibold text-[var(--brand)] transition-colors hover:bg-[var(--brand)]/20"
          >
            Shop ready-made blends
          </Link>
        </div>

        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[var(--gray-400)]">
            Goals
          </p>
          <div className="flex flex-wrap gap-2">
            {SHOP_INTENTS.map((intent) => {
              const active = intent.id === activeIntentId;
              return (
                <button
                  key={intent.id}
                  type="button"
                  onClick={() => applyIntent(intent)}
                  title={intent.hint}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                    active
                      ? "border-[var(--fg)] bg-[var(--fg)] text-[var(--bg)] shadow-sm"
                      : "border-[var(--border)] bg-[var(--bg-card)] text-[var(--fg)] hover:border-[var(--gray-400)]"
                  }`}
                >
                  {intent.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[var(--gray-400)]">
            Category
          </p>
          <div className="-mx-1 flex gap-2 overflow-x-auto pb-1 px-1">
            <button
              type="button"
              onClick={() => setFilter("cat", null)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                !currentCat
                  ? "bg-[var(--fg)] text-[var(--bg)] shadow-sm"
                  : "border border-[var(--border)] bg-transparent text-[var(--gray-600)] hover:text-[var(--fg)]"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilter("cat", cat.slug)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                  currentCat === cat.slug
                    ? "bg-[var(--brand)] text-white shadow-sm"
                    : "border border-[var(--border)] bg-[var(--bg-card)] text-[var(--gray-600)] hover:text-[var(--fg)]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div
          id="advanced-filters"
          className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] shadow-sm"
        >
          <button
            type="button"
            aria-expanded={advancedOpen}
            onClick={() => setAdvancedOpen((o) => !o)}
            className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left text-sm text-[var(--fg)] transition-colors hover:bg-[var(--gray-50)]"
          >
            <span>
              <span className="font-semibold">Advanced filters</span>
              <span className="mt-0.5 block text-xs font-normal text-[var(--gray-500)]">
                Tradition, support, energetics, celestial
              </span>
            </span>
            <span
              className={`mt-0.5 shrink-0 text-[var(--gray-400)] transition-transform ${advancedOpen ? "rotate-180" : ""}`}
              aria-hidden
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>

          {advancedOpen && (
          <div className="space-y-5 border-t border-[var(--border)] px-4 py-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 w-full text-[10px] font-bold uppercase tracking-widest text-[var(--gray-400)] sm:mr-2 sm:w-auto">
                Tradition
              </span>
              <button
                type="button"
                onClick={() => setFilter("tradition", null)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
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
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                    currentTradition === t.id
                      ? "border border-[var(--brand)] bg-[var(--brand)]/5 text-[var(--brand)] shadow-sm"
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

            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 w-full text-[10px] font-bold uppercase tracking-widest text-[var(--gray-400)] sm:mr-2 sm:w-auto">
                Support
              </span>
              <button
                type="button"
                onClick={() => setFilter("organ", null)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                  !currentOrgan
                    ? "bg-[var(--gray-200)] text-[var(--fg)]"
                    : "text-[var(--gray-400)] hover:text-[var(--fg)]"
                }`}
              >
                All
              </button>
              {ORGANS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setFilter("organ", o.id)}
                  className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-all ${
                    currentOrgan === o.id
                      ? "border-[var(--brand)] bg-[var(--brand)]/5 text-[var(--brand)]"
                      : "border-transparent text-[var(--gray-500)] hover:bg-[var(--gray-100)]"
                  }`}
                >
                  {o.label.split("/")[0].trim()}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 w-full text-[10px] font-bold uppercase tracking-widest text-[var(--gray-400)] sm:mr-2 sm:w-auto">
                Energetics
              </span>
              {ELEMENTS_MERGED.map((e) => (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => setFilter("element", e.id)}
                  className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-all ${
                    currentElement === e.id
                      ? "border-[var(--fg)] bg-[var(--fg)] text-[var(--bg)]"
                      : "border-[var(--border)] text-[var(--gray-500)] hover:border-[var(--gray-400)]"
                  }`}
                >
                  <span
                    className="h-1 w-1 rounded-full"
                    style={{ backgroundColor: e.color }}
                  />
                  {e.label}
                </button>
              ))}
            </div>

            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[var(--gray-400)]">
                Celestial — planets
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {PLANETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setFilter("planet", p.id)}
                    className={`flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium transition-all ${
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

            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[var(--gray-400)]">
                Celestial — zodiac
              </p>
              <div className="flex max-h-32 flex-wrap gap-1.5 overflow-y-auto sm:max-h-none">
                {SIGNS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setFilter("sign", s.id)}
                    className={`rounded-md border px-2 py-0.5 text-[10px] font-medium transition-all ${
                      currentSign === s.id
                        ? "border-[var(--brand)] bg-[var(--brand)]/5 text-[var(--brand)]"
                        : "border-[var(--border)] text-[var(--gray-500)] hover:border-[var(--gray-400)]"
                    }`}
                    title={s.element}
                  >
                    <span className="mr-0.5" aria-hidden>
                      {s.symbol}
                    </span>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
