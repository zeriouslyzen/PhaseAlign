import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) throw new Error("STRIPE_SECRET_KEY is not set");
    _stripe = new Stripe(secret, { typescript: true });
  }
  return _stripe;
}

export function formatAmountForStripe(cents: number): number {
  return cents; // Stripe expects amount in smallest currency unit (cents for USD)
}
