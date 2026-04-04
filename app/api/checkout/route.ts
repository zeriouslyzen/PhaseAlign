import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { readProducts } from "@/lib/admin/products-data";
import type { Product } from "@/lib/types";
import {
  getAllowedShippingCountries,
  getFlatShippingCents,
  getCheckoutRateLimitMax,
  getCheckoutRateLimitWindowMs,
  isStripeAutomaticTaxEnabled,
  isStripePromotionCodesEnabled,
} from "@/lib/checkout-config";
import { getClientIp, rateLimitCheck } from "@/lib/rate-limit";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
const MAX_QUANTITY = 99;

function resolveProduct(
  products: Product[],
  productId: string
): Product | undefined {
  return products.find((p) => p.id === productId || p.slug === productId);
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimitCheck(
    `checkout:${ip}`,
    getCheckoutRateLimitMax(),
    getCheckoutRateLimitWindowMs()
  );
  if (!limited.ok) {
    const retrySec = Math.max(1, Math.ceil(limited.retryAfterMs / 1000));
    return NextResponse.json(
      { error: "Too many checkout attempts. Try again shortly." },
      { status: 429, headers: { "Retry-After": String(retrySec) } }
    );
  }

  try {
    const body = await request.json();
    const { email, items } = body as {
      email: string;
      items: Array<{
        productId: string;
        name: string;
        price: number;
        quantity: number;
      }>;
    };

    if (!items?.length || !email?.trim()) {
      return NextResponse.json(
        { error: "Missing email or cart items" },
        { status: 400 }
      );
    }

    const products = await readProducts();
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    let hasPhysical = false;

    for (const item of items) {
      const product = resolveProduct(products, item.productId);
      if (!product) {
        return NextResponse.json(
          { error: `Invalid product: ${item.productId}` },
          { status: 400 }
        );
      }
      if (product.type !== "digital") {
        hasPhysical = true;
      }
      const quantity = Math.min(
        MAX_QUANTITY,
        Math.max(1, Math.floor(Number(item.quantity)) || 1)
      );
      line_items.push({
        price_data: {
          currency: "usd",
          product_data: { name: product.name },
          unit_amount: product.price,
        },
        quantity,
      });
    }

    const stripe = getStripe();
    const allowedCountries = getAllowedShippingCountries();
    const flatShipCents = getFlatShippingCents();

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      line_items,
      customer_email: email.trim(),
      payment_method_types: ["card", "cashapp", "link", "crypto"],
      success_url: `${BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/cart`,
    };

    if (isStripePromotionCodesEnabled()) {
      sessionParams.allow_promotion_codes = true;
    }

    if (isStripeAutomaticTaxEnabled()) {
      sessionParams.automatic_tax = { enabled: true };
      if (hasPhysical) {
        sessionParams.customer_update = { shipping: "auto" };
      }
    }

    if (hasPhysical && allowedCountries.length > 0) {
      sessionParams.shipping_address_collection = {
        allowed_countries:
          allowedCountries as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[],
      };
      sessionParams.phone_number_collection = { enabled: true };
      const shipAmount = Math.max(0, flatShipCents);
      sessionParams.shipping_options = [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: shipAmount, currency: "usd" },
            display_name:
              shipAmount === 0
                ? "Shipping included"
                : "Standard international (India export)",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 6 },
              maximum: { unit: "business_day", value: 14 },
            },
          },
        },
      ];
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
