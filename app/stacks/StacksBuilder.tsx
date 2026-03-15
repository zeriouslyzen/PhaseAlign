"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { Product } from "@/lib/types";
import type { StackMode } from "@/lib/stacks";
import {
  STACK_TARGETS,
  STACK_TARGET_GROUPS,
  getStackTarget,
  getProductSlugsForTargets,
  getTargetsForProduct,
} from "@/lib/stacks";
import { TRADITIONS, getTraditionColor, TRADITION_NEUTRAL } from "@/lib/classifications";
import { getProductDisplayImage } from "@/lib/product-image";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/cart";

const MODES: { id: StackMode; label: string }[] = [
  { id: "goal", label: "Goal" },
  { id: "state", label: "State" },
  { id: "enhancement", label: "Enhancement" },
];

interface StacksBuilderProps {
  products: Product[];
}

export function StacksBuilder({ products }: StacksBuilderProps) {
  const { addItem } = useCart();
  const targetsDropdownRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<StackMode>("goal");
  const [selectedTargetIds, setSelectedTargetIds] = useState<string[]>([]);
  const [selectedTraditionIds, setSelectedTraditionIds] = useState<string[]>([]);
  const [stackProductIds, setStackProductIds] = useState<string[]>([]);
  const [targetsOpen, setTargetsOpen] = useState(false);

  const productSlugSet = useMemo(
    () => new Set(products.map((p) => p.slug)),
    [products]
  );
  const targetFilteredSlugs = useMemo(() => {
    const slugs = getProductSlugsForTargets(selectedTargetIds);
    return selectedTargetIds.length === 0
      ? Array.from(productSlugSet)
      : slugs.filter((s) => productSlugSet.has(s));
  }, [selectedTargetIds, productSlugSet]);
  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => targetFilteredSlugs.includes(p.slug));
    if (selectedTraditionIds.length > 0) {
      list = list.filter(
        (p) =>
          p.traditions?.some((t) => selectedTraditionIds.includes(t)) ?? false
      );
    }
    return list;
  }, [products, targetFilteredSlugs, selectedTraditionIds]);

  const stackProducts = useMemo(
    () => products.filter((p) => stackProductIds.includes(p.id)),
    [products, stackProductIds]
  );
  const stackTotal = useMemo(
    () => stackProducts.reduce((sum, p) => sum + p.price, 0),
    [stackProducts]
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        targetsDropdownRef.current &&
        !targetsDropdownRef.current.contains(e.target as Node)
      ) {
        setTargetsOpen(false);
      }
    }
    if (targetsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [targetsOpen]);

  function toggleTarget(id: string) {
    setSelectedTargetIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }

  function toggleTradition(id: string) {
    setSelectedTraditionIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }

  function productTraditionColor(p: Product): string {
    const first = p.traditions?.[0];
    return first ? getTraditionColor(first) : TRADITION_NEUTRAL;
  }

  function addToStack(product: Product) {
    setStackProductIds((prev) =>
      prev.includes(product.id) ? prev : [...prev, product.id]
    );
  }

  function removeFromStack(productId: string) {
    setStackProductIds((prev) => prev.filter((id) => id !== productId));
  }

  function addStackToCart() {
    stackProducts.forEach((p) => {
      addItem({
        productId: p.id,
        slug: p.slug,
        name: p.name,
        price: p.price,
      });
    });
    setStackProductIds([]);
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--border-strong)] bg-[var(--gray-900)] px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto max-w-6xl">
          <nav className="mb-3 text-xs tracking-wider text-white/60 sm:text-sm">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/learn" className="hover:text-white transition-colors">Learn</Link>
            <span className="mx-2">/</span>
            <span className="text-white/90">Stacks</span>
          </nav>
          <h1 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
            Build a stack
          </h1>
          <p className="mt-1 max-w-xl text-xs text-white/80 sm:text-sm">
            Filter, add to your stack, then to cart.
          </p>
        </div>
      </header>

      {/* Filters: one horizontal bar */}
      <div className="sticky top-[3.5rem] z-20 border-b border-[var(--border)] bg-[var(--bg)] px-4 py-3 sm:px-6">
        <div className="mx-auto max-w-6xl flex flex-wrap items-center gap-3">
          <span className="text-xs font-medium text-[var(--gray-500)]">Mode</span>
          <div className="flex gap-1">
            {MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                  mode === m.id
                    ? "bg-[var(--fg)] text-[var(--bg)]"
                    : "bg-[var(--gray-200)] text-[var(--gray-700)] hover:bg-[var(--gray-300)]"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
          <span className="mx-1 text-[var(--gray-300)]">|</span>
          <span className="text-xs font-medium text-[var(--gray-500)]">Tradition</span>
          <div className="flex flex-wrap gap-1">
            {TRADITIONS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => toggleTradition(t.id)}
                className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium transition-colors ${
                  selectedTraditionIds.includes(t.id)
                    ? "ring-1 ring-[var(--fg)] text-[var(--fg)]"
                    : "text-[var(--gray-600)] hover:text-[var(--fg)]"
                }`}
                style={
                  selectedTraditionIds.includes(t.id)
                    ? { borderLeft: `2px solid ${t.color}` }
                    : undefined
                }
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: t.color }}
                  aria-hidden
                />
                {t.label}
              </button>
            ))}
          </div>
          <span className="mx-1 text-[var(--gray-300)]">|</span>
          <div className="relative" ref={targetsDropdownRef}>
            <button
              type="button"
              onClick={() => setTargetsOpen((o) => !o)}
              className="flex items-center gap-1.5 rounded border border-[var(--border)] bg-[var(--bg-card)] px-2.5 py-1.5 text-xs font-medium text-[var(--gray-700)] hover:border-[var(--border-strong)]"
            >
              Targets
              {selectedTargetIds.length > 0 && (
                <span className="flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-bold text-[var(--gray-900)]">
                  {selectedTargetIds.length}
                </span>
              )}
              <svg
                className={`h-3.5 w-3.5 transition-transform ${targetsOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <AnimatePresence>
              {targetsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full z-50 mt-1 max-h-[70vh] w-[min(320px,90vw)] overflow-y-auto rounded-lg border border-[var(--border)] bg-[var(--bg-card)] shadow-lg"
                >
                  <div className="p-2">
                    {selectedTargetIds.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setSelectedTargetIds([])}
                        className="mb-2 w-full rounded py-1.5 text-xs font-medium text-[var(--gray-500)] hover:bg-[var(--gray-100)]"
                      >
                        Clear targets
                      </button>
                    )}
                    {STACK_TARGET_GROUPS.map((group) => {
                      const groupTargets = group.targetIds
                        .map((id) => getStackTarget(id))
                        .filter((t): t is NonNullable<typeof t> => t != null);
                      if (groupTargets.length === 0) return null;
                      return (
                        <div key={group.id} className="mb-3 last:mb-0">
                          <p className="px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--gray-500)]">
                            {group.label}
                          </p>
                          <div className="space-y-0.5">
                            {groupTargets.map((t) => (
                              <label
                                key={t.id}
                                className="flex cursor-pointer items-start gap-2 rounded px-1.5 py-1.5 hover:bg-[var(--gray-50)]"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedTargetIds.includes(t.id)}
                                  onChange={() => toggleTarget(t.id)}
                                  className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-[var(--border)]"
                                />
                                <span className="text-xs">
                                  <span className="font-medium text-[var(--fg)]">{t.label}</span>
                                  <span className="block text-[10px] text-[var(--gray-500)]">
                                    {t.description}
                                  </span>
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Main: products (left) + stack (right) side by side */}
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Product list - scrollable, takes space */}
          <div className="min-w-0 flex-1 lg:min-w-[400px]">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--gray-500)]">
              Products
            </h2>
            <ul className="space-y-2">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => {
                  const inStack = stackProductIds.includes(product.id);
                  const targets = getTargetsForProduct(product.slug);
                  return (
                    <motion.li
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-3 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-2.5"
                      style={{
                        borderLeftWidth: 3,
                        borderLeftColor: productTraditionColor(product),
                      }}
                    >
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded bg-[var(--gray-100)]">
                        <img
                          src={getProductDisplayImage(product)}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/products/${product.slug}`}
                          className="font-display text-sm font-semibold text-[var(--fg)] hover:text-[var(--link)] line-clamp-1"
                        >
                          {product.name}
                        </Link>
                        <p className="text-[10px] text-[var(--gray-500)] line-clamp-1">
                          {product.shortDescription}
                        </p>
                        {targets.length > 0 && (
                          <p className="mt-0.5 text-[10px] text-[var(--gray-400)]">
                            {targets
                              .map((id) => STACK_TARGETS.find((x) => x.id === id)?.label)
                              .filter(Boolean)
                              .join(", ")}
                          </p>
                        )}
                      </div>
                      <div className="flex shrink-0 flex-col items-end justify-center gap-1">
                        <span className="text-xs font-semibold text-[var(--fg)]">
                          {formatPrice(product.price)}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            inStack ? removeFromStack(product.id) : addToStack(product)
                          }
                          className={`rounded px-2 py-0.5 text-[10px] font-medium ${
                            inStack
                              ? "bg-[var(--gray-200)] text-[var(--gray-700)]"
                              : "bg-[var(--accent)] text-[var(--gray-900)] hover:bg-[var(--accent-hover)]"
                          }`}
                        >
                          {inStack ? "Remove" : "Add"}
                        </button>
                      </div>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
            {filteredProducts.length === 0 && (
              <p className="py-8 text-center text-sm text-[var(--gray-500)]">
                No products match. Clear filters to see all.
              </p>
            )}
          </div>

          {/* Your stack - sticky sidebar, always visible */}
          <div className="lg:sticky lg:top-[7.5rem] lg:w-72 lg:shrink-0">
            <div
              className={`rounded-lg border-2 p-4 ${
                stackProducts.length > 0
                  ? "border-[var(--accent)] bg-[var(--accent-subtle)]/20"
                  : "border-[var(--border)] bg-[var(--gray-50)]"
              }`}
            >
              <h2 className="font-display text-sm font-semibold text-[var(--fg)]">
                Your stack
              </h2>
              {stackProducts.length === 0 ? (
                <p className="mt-2 text-xs text-[var(--gray-500)]">
                  Add products from the list. Your stack appears here.
                </p>
              ) : (
                <>
                  <ul className="mt-3 space-y-2">
                    {stackProducts.map((p) => (
                      <li
                        key={p.id}
                        className="flex items-center gap-2 text-xs"
                      >
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: productTraditionColor(p) }}
                          aria-hidden
                        />
                        <span className="min-w-0 flex-1 truncate text-[var(--fg)]">
                          {p.name}
                        </span>
                        <span className="shrink-0 font-medium">
                          {formatPrice(p.price)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromStack(p.id)}
                          className="shrink-0 text-[var(--gray-400)] hover:text-[var(--fg)]"
                          aria-label={`Remove ${p.name}`}
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-col gap-2 border-t border-[var(--border)] pt-4">
                    <div className="flex justify-between text-sm font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(stackTotal)}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setStackProductIds([])}
                        className="flex-1 rounded bg-[var(--gray-200)] py-1.5 text-xs font-medium text-[var(--gray-700)] hover:bg-[var(--gray-300)]"
                      >
                        Clear
                      </button>
                      <button
                        type="button"
                        onClick={addStackToCart}
                        className="flex-1 rounded bg-[var(--fg)] py-1.5 text-xs font-medium text-[var(--bg)] hover:opacity-90"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
