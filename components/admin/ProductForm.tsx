"use client";

import { useState } from "react";
import type { Category, Product } from "@/lib/types";
import { ProductImageUrls } from "./ProductImageUrls";

const SOURCE_OPTIONS = [
  { value: "", label: "None" },
  { value: "Temu", label: "Temu" },
  { value: "AliExpress", label: "AliExpress" },
  { value: "Alibaba", label: "Alibaba" },
  { value: "Other", label: "Other" },
];

const inputClass =
  "mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 text-[var(--fg)] placeholder:text-[var(--gray-400)] focus:border-[var(--ring)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/20";
const labelClass = "block text-sm font-medium text-[var(--fg)]";

export function ProductForm({
  categories,
  initialProduct,
}: {
  categories: Category[];
  initialProduct?: Product | null;
}) {
  const isEdit = !!initialProduct?.id;
  const [imageUrls, setImageUrls] = useState<string[]>(
    initialProduct?.images?.length ? [...initialProduct.images] : [""]
  );
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get("name") as string)?.trim();
    if (!name) {
      setStatus("error");
      setMessage("Name is required.");
      return;
    }

    const priceStr = (formData.get("price") as string)?.trim();
    const price = Math.round(parseFloat(priceStr || "0") * 100);
    if (!price || price < 0) {
      setStatus("error");
      setMessage("Valid price is required.");
      return;
    }

    const compareAtPriceStr = (formData.get("compareAtPrice") as string)?.trim();
    const compareAtPrice = compareAtPriceStr ? Math.round(parseFloat(compareAtPriceStr) * 100) : undefined;
    const categoryIds = formData.getAll("categoryIds") as string[];
    const images = imageUrls.map((u) => u.trim()).filter(Boolean);
    const finalImages = images.length ? images : ["/placeholder-product.jpg"];

    setStatus("loading");
    setMessage("");

    const payload = {
      name,
      shortDescription: (formData.get("shortDescription") as string)?.trim() || "",
      longDescription: (formData.get("longDescription") as string)?.trim() || "",
      categoryIds: categoryIds.length ? categoryIds : [categories[0]?.id].filter(Boolean),
      price,
      compareAtPrice: compareAtPrice && compareAtPrice > price ? compareAtPrice : undefined,
      images: finalImages,
      type: (formData.get("type") as string) === "digital" ? "digital" : "physical",
      wholesale: formData.get("wholesale") === "on",
      sourceUrl: (formData.get("sourceUrl") as string)?.trim() || undefined,
      sourceName: (formData.get("sourceName") as string)?.trim() || undefined,
    };

    try {
      const url = isEdit ? `/api/admin/products/${initialProduct.id}` : "/api/admin/products";
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || res.statusText);
      }
      setStatus("done");
      setMessage(isEdit ? "Product updated." : "Product added. Add another or go to Products.");
      if (!isEdit) {
        form.reset();
        setImageUrls([""]);
      }
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : (isEdit ? "Failed to update." : "Failed to add product."));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className={labelClass}>Name *</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="off"
          className={inputClass}
          placeholder="Product name"
          defaultValue={initialProduct?.name}
        />
      </div>

      <div>
        <label htmlFor="shortDescription" className={labelClass}>Short description</label>
        <input
          id="shortDescription"
          name="shortDescription"
          type="text"
          className={inputClass}
          placeholder="One line for cards"
          defaultValue={initialProduct?.shortDescription}
        />
      </div>

      <div>
        <label htmlFor="longDescription" className={labelClass}>Long description</label>
        <textarea
          id="longDescription"
          name="longDescription"
          rows={4}
          className={inputClass}
          placeholder="Full description"
          defaultValue={initialProduct?.longDescription}
        />
      </div>

      <div>
        <span className={labelClass}>Categories</span>
        <div className="mt-2 flex flex-wrap gap-3">
          {categories.map((c) => (
            <label key={c.id} className="flex min-h-[44px] cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                name="categoryIds"
                value={c.id}
                defaultChecked={initialProduct?.categoryIds?.includes(c.id)}
                className="h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--ring)]"
              />
              <span className="text-sm text-[var(--fg)]">{c.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="price" className={labelClass}>Price (USD) *</label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            className={inputClass}
            placeholder="29.99"
            defaultValue={initialProduct ? (initialProduct.price / 100).toFixed(2) : undefined}
          />
        </div>
        <div>
          <label htmlFor="compareAtPrice" className={labelClass}>Compare at (USD)</label>
          <input
            id="compareAtPrice"
            name="compareAtPrice"
            type="number"
            step="0.01"
            min="0"
            className={inputClass}
            placeholder="39.99"
            defaultValue={
              initialProduct?.compareAtPrice != null
                ? (initialProduct.compareAtPrice / 100).toFixed(2)
                : undefined
            }
          />
        </div>
      </div>

      <ProductImageUrls urls={imageUrls} onChange={setImageUrls} />

      <div>
        <label htmlFor="sourceName" className={labelClass}>Dropship source</label>
        <select
          id="sourceName"
          name="sourceName"
          className={inputClass}
          defaultValue={initialProduct?.sourceName ?? ""}
        >
          {SOURCE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="sourceUrl" className={labelClass}>Source link (Temu / AliExpress / Alibaba)</label>
        <input
          id="sourceUrl"
          name="sourceUrl"
          type="url"
          inputMode="url"
          autoComplete="off"
          className={inputClass}
          placeholder="https://..."
          defaultValue={initialProduct?.sourceUrl}
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="flex min-h-[44px] cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            name="wholesale"
            defaultChecked={initialProduct?.wholesale}
            className="h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--ring)]"
          />
          <span className="text-sm text-[var(--fg)]">Wholesale</span>
        </label>
        <div className="flex gap-4">
          <label className="flex min-h-[44px] cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="type"
              value="physical"
              defaultChecked={initialProduct?.type !== "digital"}
              className="h-4 w-4 text-[var(--accent)] focus:ring-[var(--ring)]"
            />
            <span className="text-sm text-[var(--fg)]">Physical</span>
          </label>
          <label className="flex min-h-[44px] cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="type"
              value="digital"
              defaultChecked={initialProduct?.type === "digital"}
              className="h-4 w-4 text-[var(--accent)] focus:ring-[var(--ring)]"
            />
            <span className="text-sm text-[var(--fg)]">Digital</span>
          </label>
        </div>
      </div>

      {message && (
        <p role="alert" className={`text-sm ${status === "error" ? "text-red-600" : "text-[var(--gray-600)]"}`}>
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="min-h-[48px] w-full rounded-lg bg-[var(--accent)] px-4 py-3 font-medium text-[var(--gray-900)] hover:bg-[var(--accent-hover)] disabled:opacity-60"
      >
        {status === "loading" ? (isEdit ? "Saving…" : "Adding…") : isEdit ? "Save product" : "Add product"}
      </button>
    </form>
  );
}
