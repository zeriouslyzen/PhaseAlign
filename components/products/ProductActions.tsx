"use client";

import Link from "next/link";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { StickyQuickPay } from "@/components/cart/StickyQuickPay";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/lib/types";

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  return (
    <>
      <div className="mt-8 flex flex-wrap gap-3">
        <AddToCartButton product={product} />
        <Button href="/shop" variant="outline" size="lg">
          Continue shopping
        </Button>
      </div>
      <StickyQuickPay product={product} />
      <div className="h-20 md:hidden" aria-hidden />
    </>
  );
}
