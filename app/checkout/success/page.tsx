"use client";

import { Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { trackPurchase } from "@/lib/analytics";

function SuccessContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const id = searchParams.get("session_id");
  const purchaseFired = useRef(false);

  useEffect(() => {
    if (id) clearCart();
  }, [id, clearCart]);

  useEffect(() => {
    if (!id || purchaseFired.current) return;
    purchaseFired.current = true;
    trackPurchase({ transactionId: id });
  }, [id]);

  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 text-center">
      <h1 className="font-display text-3xl font-bold text-[var(--foreground)]">
        Order confirmed
      </h1>
      <p className="mt-4 text-[var(--gray-600)]">
        Thanks for your order. We’ve sent a receipt to your email.
      </p>
      {id && (
        <p className="mt-2 text-sm text-[var(--gray-500)] font-mono">
          Reference: {id.slice(0, 20)}…
        </p>
      )}
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button href="/shop" size="lg">
          Continue shopping
        </Button>
        <Button href="/" variant="outline" size="lg">
          Back to home
        </Button>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 text-center">
        <p className="text-[var(--gray-600)]">Loading…</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
