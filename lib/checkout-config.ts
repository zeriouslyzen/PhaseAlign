/**
 * Stripe Checkout + dropship alignment (India export / wholesale partner).
 *
 * Flat international shipping is a retail approximation of supplier weight+destination
 * pricing; tune STRIPE_FLAT_SHIPPING_CENTS against real supplier invoices.
 */

/** Default ~$12.99 USD — override via env */
export function getFlatShippingCents(): number {
  const raw = process.env.STRIPE_FLAT_SHIPPING_CENTS;
  if (raw != null && raw !== "") {
    const n = parseInt(raw, 10);
    if (!Number.isNaN(n) && n >= 0) return n;
  }
  return 1299;
}

/**
 * ISO 3166-1 alpha-2. Override with CHECKOUT_ALLOWED_COUNTRIES=US,CA,GB,...
 * Broad default matches typical export destinations (wholesale partner ships worldwide).
 */
export function getAllowedShippingCountries(): string[] {
  const raw = process.env.CHECKOUT_ALLOWED_COUNTRIES?.trim();
  if (raw) {
    const list = raw
      .split(/[,;\s]+/)
      .map((c) => c.trim().toUpperCase())
      .filter((c) => /^[A-Z]{2}$/.test(c));
    if (list.length > 0) return [...new Set(list)];
  }
  return [
    "US",
    "CA",
    "GB",
    "AU",
    "NZ",
    "DE",
    "FR",
    "IT",
    "ES",
    "NL",
    "BE",
    "AT",
    "CH",
    "SE",
    "NO",
    "DK",
    "FI",
    "IE",
    "PT",
    "PL",
    "CZ",
    "GR",
    "HU",
    "RO",
    "JP",
    "KR",
    "SG",
    "HK",
    "IL",
    "AE",
    "SA",
    "QA",
    "KW",
    "MX",
    "BR",
    "IN",
    "ZA",
    "EG",
  ];
}

export function isStripeAutomaticTaxEnabled(): boolean {
  return process.env.STRIPE_AUTOMATIC_TAX === "1" || process.env.STRIPE_AUTOMATIC_TAX === "true";
}

export function isStripePromotionCodesEnabled(): boolean {
  const v = process.env.STRIPE_ALLOW_PROMOTION_CODES;
  if (v === "0" || v === "false") return false;
  return true;
}

export function getCheckoutRateLimitMax(): number {
  const n = parseInt(process.env.CHECKOUT_RATE_LIMIT_MAX ?? "20", 10);
  return Number.isNaN(n) ? 20 : Math.max(1, n);
}

export function getCheckoutRateLimitWindowMs(): number {
  const n = parseInt(process.env.CHECKOUT_RATE_LIMIT_WINDOW_MS ?? "60000", 10);
  return Number.isNaN(n) ? 60_000 : Math.max(1000, n);
}
