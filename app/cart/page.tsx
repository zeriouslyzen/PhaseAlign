"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/cart";
import { StickyQuickPay } from "@/components/cart/StickyQuickPay";

export default function CartPage() {
  const { items, count, updateQuantity, removeItem } = useCart();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 pb-24 md:pb-12">
      <h1 className="font-display text-3xl font-bold text-[var(--foreground)]">
        Cart
      </h1>

      {items.length === 0 ? (
        <p className="mt-4 text-[var(--gray-600)]">
          Your cart is empty. Add something from the shop.
        </p>
      ) : (
        <div className="mt-8 space-y-6">
          <ul className="divide-y divide-[var(--border)]">
            {items.map((item) => (
              <li
                key={item.productId}
                className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex-1">
                  <Link
                    href={`/products/${item.slug}`}
                    className="font-display font-semibold text-[var(--link)] hover:text-[var(--link-hover)]"
                  >
                    {item.name}
                  </Link>
                  <p className="mt-1 text-sm text-[var(--gray-600)]">
                    {formatPrice(item.price)} each
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-[var(--radius)] border border-[var(--border)]">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                      className="h-9 w-9 flex items-center justify-center text-[var(--gray-600)] hover:bg-[var(--gray-100)]"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="min-w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                      className="h-9 w-9 flex items-center justify-center text-[var(--gray-600)] hover:bg-[var(--gray-100)]"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-display font-semibold w-20 text-right">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="text-sm text-[var(--gray-500)] hover:text-[var(--foreground)]"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-end gap-4 border-t border-[var(--border)] pt-6">
            <p className="font-display text-xl font-bold text-[var(--foreground)]">
              Total: {formatPrice(total)}
            </p>
            <Button href="/checkout" size="lg">
              Checkout
            </Button>
          </div>
        </div>
      )}

      <div className="mt-8">
        <Button href="/shop" variant="outline">
          Continue shopping
        </Button>
      </div>

      {items.length > 0 && (
        <>
          <StickyQuickPay />
          <div className="h-20 md:hidden" aria-hidden />
        </>
      )}
    </div>
  );
}
