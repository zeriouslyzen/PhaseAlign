import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { appendOrder, type StoredOrder } from "@/lib/orders-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Misconfigured" }, { status: 500 });
  }

  const body = Buffer.from(await request.arrayBuffer());
  const sig = request.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (e) {
    console.error("Webhook signature verification failed:", e);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      const stripe = getStripe();
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        limit: 100,
      });
      const ship = session.collected_information?.shipping_details;
      const addr = ship?.address ?? session.customer_details?.address;
      const order: StoredOrder = {
        sessionId: session.id,
        createdAt: new Date().toISOString(),
        email:
          session.customer_details?.email ?? session.customer_email ?? null,
        amountTotal: session.amount_total ?? 0,
        currency: session.currency ?? "usd",
        paymentStatus: session.payment_status ?? "unknown",
        shippingName:
          ship?.name ?? session.customer_details?.name ?? null,
        shippingPhone: session.customer_details?.phone ?? null,
        shippingAddress: addr
          ? {
              line1: addr.line1,
              line2: addr.line2,
              city: addr.city,
              state: addr.state,
              postal_code: addr.postal_code,
              country: addr.country,
            }
          : null,
        lineItems: lineItems.data.map((li) => ({
          name: li.description ?? "Item",
          quantity: li.quantity ?? 0,
          amountTotal: li.amount_total ?? 0,
        })),
      };
      await appendOrder(order);
    } catch (e) {
      console.error("Webhook order persist failed:", e);
    }
  }

  return NextResponse.json({ received: true });
}
