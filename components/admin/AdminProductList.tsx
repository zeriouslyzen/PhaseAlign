"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import type { Category } from "@/lib/types";

export function AdminProductList({ categories }: { categories: Category[] }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const byId = Object.fromEntries(categories.map((c) => [c.id, c.name]));

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch("/api/admin/products")
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data: Product[]) => {
        if (!cancelled) setProducts(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [categories]);

  async function handleDelete(p: Product) {
    if (!confirm(`Remove "${p.name}"? This cannot be undone.`)) return;
    setDeletingId(p.id);
    try {
      const res = await fetch(`/api/admin/products/${p.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(res.statusText);
      setProducts((prev) => prev.filter((x) => x.id !== p.id));
    } catch {
      setError("Failed to delete");
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return <p className="text-sm text-[var(--gray-600)]">Loading products…</p>;
  }
  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  return (
    <ul className="divide-y divide-[var(--border)] rounded-lg border border-[var(--border)] bg-[var(--bg-card)]">
      {products.map((p) => (
        <li
          key={p.id}
          className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
        >
          <div className="min-w-0 flex-1">
            <span className="font-medium text-[var(--fg)]">{p.name}</span>
            <p className="truncate text-sm text-[var(--gray-600)]">
              {p.categoryIds.map((id) => byId[id]).filter(Boolean).join(", ") || "—"}
            </p>
            {p.sourceName && (
              <p className="text-xs text-[var(--gray-500)]">
                Source: {p.sourceName}
                {p.sourceUrl ? " (link saved)" : ""}
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-[var(--fg)]">${(p.price / 100).toFixed(2)}</span>
            <Link
              href={`/admin/products/${p.id}/edit`}
              className="rounded border border-[var(--border)] bg-[var(--bg-card)] px-3 py-1.5 text-[var(--fg)] hover:bg-[var(--gray-100)]"
            >
              Edit
            </Link>
            <Link
              href={`/products/${p.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--link)] hover:text-[var(--link-hover)] hover:underline"
            >
              View
            </Link>
            <button
              type="button"
              onClick={() => handleDelete(p)}
              disabled={deletingId === p.id}
              className="rounded border border-red-200 bg-white px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
              {deletingId === p.id ? "Removing…" : "Remove"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
