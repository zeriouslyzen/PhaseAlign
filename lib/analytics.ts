/**
 * GA4 purchase event when NEXT_PUBLIC_GA_MEASUREMENT_ID is set and gtag is loaded.
 * Avoid sending PII beyond what GA already receives from the page context.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackPurchase(payload: {
  transactionId: string;
  valueCents?: number;
  currency?: string;
}): void {
  if (typeof window === "undefined") return;
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!measurementId || typeof window.gtag !== "function") return;

  const params: Record<string, unknown> = {
    transaction_id: payload.transactionId,
    currency: payload.currency ?? "USD",
  };
  if (payload.valueCents != null) {
    params.value = payload.valueCents / 100;
  }

  window.gtag("event", "purchase", params);
}
