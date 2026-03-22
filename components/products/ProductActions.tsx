"use client";

import { useState } from "react";
import Link from "next/link";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { StickyQuickPay } from "@/components/cart/StickyQuickPay";
import { Button } from "@/components/ui/Button";
import type { Product, ProductVariant } from "@/lib/types";

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentCompareAt = selectedVariant ? selectedVariant.compareAtPrice : product.compareAtPrice;

  const productForCart: Product = selectedVariant
    ? {
        ...product,
        id: `${product.id}-${selectedVariant.id}`,
        name: `${product.name} - ${selectedVariant.name}`,
        price: selectedVariant.price,
      }
    : product;

  return (
    <>
      <div className="mt-4 flex items-baseline gap-3">
        <span className="font-display text-2xl font-bold text-[var(--foreground)]">
          {formatPrice(currentPrice)}
        </span>
        {currentCompareAt != null && (
          <span className="text-[var(--gray-500)] line-through">
            {formatPrice(currentCompareAt)}
          </span>
        )}
      </div>

      {product.variants && product.variants.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-[var(--foreground)]">Size / Amount</h3>
            <span className="text-sm font-medium text-[var(--gray-500)]">
              {selectedVariant?.name}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {product.variants.map((v) => {
              const checked = v.id === selectedVariant?.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVariant(v)}
                  className={`flex items-center justify-center rounded-[var(--radius)] border py-2.5 px-3 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[var(--fg)] focus:ring-offset-2 ${
                    checked
                      ? "border-[var(--fg)] bg-[var(--fg)] text-[var(--bg)] shadow-sm scale-[1.02]"
                      : "border-[var(--border)] bg-[var(--bg-card)] text-[var(--fg)] hover:border-[var(--border-strong)] hover:bg-[var(--gray-50)]"
                  }`}
                  aria-pressed={checked ? "true" : "false"}
                >
                  {v.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <AddToCartButton product={productForCart} />
        <Button href="/shop" variant="outline" size="lg">
          Continue shopping
        </Button>
      </div>
      <StickyQuickPay product={productForCart} />
      <div className="h-20 md:hidden" aria-hidden />
    </>
  );
}
