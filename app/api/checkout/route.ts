import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { readProducts } from "@/lib/admin/products-data";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
const MAX_QUANTITY = 99;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, items } = body as {
      email: string;
      items: Array<{ productId: string; name: string; price: number; quantity: number }>;
    };

    if (!items?.length || !email?.trim()) {
      return NextResponse.json(
        { error: "Missing email or cart items" },
        { status: 400 }
      );
    }

    const products = await readProducts();
    const line_items: Array<{
      price_data: { currency: string; product_data: { name: string }; unit_amount: number };
      quantity: number;
    }> = [];

    for (const item of items) {
      const product = products.find((p) => p.id === item.productId || p.slug === item.productId);
      if (!product) {
        return NextResponse.json(
          { error: `Invalid product: ${item.productId}` },
          { status: 400 }
        );
      }
      const quantity = Math.min(MAX_QUANTITY, Math.max(1, Math.floor(Number(item.quantity)) || 1));
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
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      customer_email: email.trim(),
      payment_method_types: ["card", "cashapp", "link", "crypto"],
      success_url: `${BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
