"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/lib/types";

interface AddToCartButtonProps {
  product: Product;
  variant?: "default" | "sticky";
  className?: string;
}

export function AddToCartButton({
  product,
  variant = "default",
  className = "",
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      productType: product.type,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <Button
      size="lg"
      onClick={handleAdd}
      className={className}
      disabled={added}
    >
      {added ? "Added" : "Add to cart"}
    </Button>
  );
}
