"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/cart";
import type { Product } from "@/lib/types";

interface StickyQuickPayProps {
  product?: Product | null;
}

export function StickyQuickPay({ product }: StickyQuickPayProps) {
  const { count, addItem } = useCart();
  const isProductPage = product != null;

  function handleAddProduct() {
    if (!product) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
    });
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--border)] bg-[var(--background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/90 p-4 md:hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        {isProductPage ? (
          <>
            <span className="font-display font-semibold text-[var(--foreground)]">
              {formatPrice(product.price)}
            </span>
            <Button size="lg" onClick={handleAddProduct}>
              Add to cart
            </Button>
          </>
        ) : (
          <>
            <Link
              href="/cart"
              className="font-display font-semibold text-[var(--foreground)] hover:text-[var(--link-hover)]"
            >
              View cart {count > 0 && `(${count})`}
            </Link>
            <Button href={count > 0 ? "/checkout" : "/shop"} size="lg">
              {count > 0 ? "Checkout" : "Shop"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
