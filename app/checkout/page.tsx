"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/cart";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, count } = useCart();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          items: items.map((i) => ({
            productId: i.productId,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout failed");
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      throw new Error("No checkout URL returned");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  if (count === 0 && items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-[var(--foreground)]">
          Checkout
        </h1>
        <p className="mt-4 text-[var(--gray-600)]">Your cart is empty.</p>
        <Button href="/shop" className="mt-6">
          Continue shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-[var(--foreground)]">
        Checkout
      </h1>
      <p className="mt-2 text-[var(--gray-600)]">
        Guest checkout. No account required.
      </p>

      <div className="mt-8 border-t border-[var(--border)] pt-8">
        <h2 className="font-display text-lg font-semibold text-[var(--foreground)]">
          Order summary
        </h2>
        <ul className="mt-4 space-y-2">
          {items.map((item) => (
            <li
              key={item.productId}
              className="flex justify-between text-sm text-[var(--gray-700)]"
            >
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex justify-between font-display font-semibold text-[var(--foreground)]">
          Total: {formatPrice(total)}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[var(--foreground)]"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 block w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] focus:border-[var(--link)] focus:outline-none focus:ring-1 focus:ring-[var(--link)]"
            placeholder="you@example.com"
          />
          <p className="mt-1 text-xs text-[var(--gray-500)]">
            We’ll send your receipt and order updates here.
          </p>
        </div>
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? "Redirecting to payment…" : "Pay with Stripe"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--gray-500)]">
        Card, Cash App, Link (Apple Pay / Google Pay), or crypto. Secure payment via Stripe.
      </p>

      <div className="mt-8">
        <Link
          href="/cart"
          className="text-sm font-medium text-[var(--gray-600)] hover:text-[var(--foreground)]"
        >
          Back to cart
        </Link>
      </div>
    </div>
  );
}
