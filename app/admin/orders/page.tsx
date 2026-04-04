import Link from "next/link";
import { readOrders } from "@/lib/orders-store";

function formatMoney(cents: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(cents / 100);
  } catch {
    return `${(cents / 100).toFixed(2)} ${currency}`;
  }
}

function stripeDashboardBase(): string {
  const key = process.env.STRIPE_SECRET_KEY ?? "";
  return key.startsWith("sk_live")
    ? "https://dashboard.stripe.com"
    : "https://dashboard.stripe.com/test";
}

export default async function AdminOrdersPage() {
  let orders: Awaited<ReturnType<typeof readOrders>> = [];
  let storeError: string | null = null;
  try {
    orders = await readOrders();
  } catch {
    storeError =
      "Could not read the local order file. On serverless hosts, set ORDERS_JSON_PATH to a writable path or use an external store.";
  }

  const stripeRoot = stripeDashboardBase();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-xl font-bold text-[var(--fg)]">
          Orders
        </h1>
        <p className="mt-1 text-sm text-[var(--gray-600)]">
          Completed checkouts are recorded when{" "}
          <code className="rounded bg-[var(--gray-100)] px-1 text-xs">
            checkout.session.completed
          </code>{" "}
          is delivered to{" "}
          <code className="rounded bg-[var(--gray-100)] px-1 text-xs">
            /api/webhooks/stripe
          </code>
          . Configure{" "}
          <code className="rounded bg-[var(--gray-100)] px-1 text-xs">
            STRIPE_WEBHOOK_SECRET
          </code>{" "}
          in production. Stripe remains the payment source of truth.
        </p>
      </div>

      <a
        href={`${stripeRoot}/payments`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[48px] items-center rounded-lg bg-[var(--gray-800)] px-4 py-3 font-medium text-white hover:bg-[var(--gray-900)]"
      >
        Open Stripe Dashboard
      </a>

      {storeError && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {storeError}
        </p>
      )}

      <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-4 text-sm text-[var(--gray-600)]">
        <p className="font-medium text-[var(--fg)]">Dropship workflow</p>
        <p className="mt-1">
          Open the session in Stripe, copy the customer shipping address and line
          items, then place the mirror order with your supplier using each
          product&apos;s admin{" "}
          <code className="text-xs">sourceUrl</code> /{" "}
          <code className="text-xs">sourceName</code>.
        </p>
      </div>

      {orders.length === 0 && !storeError ? (
        <p className="text-sm text-[var(--gray-600)]">
          No orders in the local store yet. Complete a test checkout with the
          webhook forwarding to this app (e.g.{" "}
          <code className="text-xs">stripe listen</code>
          ).
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-[var(--border)] bg-[var(--gray-50)] text-xs uppercase text-[var(--gray-500)]">
              <tr>
                <th className="px-3 py-2 font-medium">When</th>
                <th className="px-3 py-2 font-medium">Email</th>
                <th className="px-3 py-2 font-medium">Total</th>
                <th className="px-3 py-2 font-medium">Ship to</th>
                <th className="px-3 py-2 font-medium">Stripe</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {orders.map((o) => {
                const sessionUrl = `${stripeRoot}/checkout/sessions/${o.sessionId}`;
                const addr = o.shippingAddress;
                const shipSummary = addr
                  ? [addr.line1, addr.city, addr.state, addr.postal_code, addr.country]
                      .filter(Boolean)
                      .join(", ")
                  : "—";
                return (
                  <tr key={o.sessionId} className="align-top">
                    <td className="px-3 py-3 text-[var(--gray-600)] whitespace-nowrap">
                      {new Date(o.createdAt).toLocaleString()}
                    </td>
                    <td className="px-3 py-3 text-[var(--fg)]">
                      {o.email ?? "—"}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      {formatMoney(o.amountTotal, o.currency)}{" "}
                      <span className="text-xs text-[var(--gray-500)]">
                        ({o.paymentStatus})
                      </span>
                    </td>
                    <td className="max-w-[220px] px-3 py-3 text-[var(--gray-700)]">
                      {o.shippingName && (
                        <span className="font-medium text-[var(--fg)]">
                          {o.shippingName}
                          <br />
                        </span>
                      )}
                      <span className="text-xs">{shipSummary}</span>
                      {o.shippingPhone && (
                        <span className="mt-1 block text-xs text-[var(--gray-500)]">
                          {o.shippingPhone}
                        </span>
                      )}
                      {o.lineItems.length > 0 && (
                        <ul className="mt-2 list-inside list-disc text-xs text-[var(--gray-600)]">
                          {o.lineItems.map((li, i) => (
                            <li key={i}>
                              {li.name} × {li.quantity}
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <a
                        href={sessionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--link)] hover:underline"
                      >
                        Session
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs text-[var(--gray-500)]">
        Local JSON path:{" "}
        <code className="rounded bg-[var(--gray-100)] px-1">
          {process.env.ORDERS_JSON_PATH?.trim() || "data/orders.json"}
        </code>
        . Add <code className="rounded bg-[var(--gray-100)] px-1">data/orders.json</code>{" "}
        to <code className="rounded bg-[var(--gray-100)] px-1">.gitignore</code> if
        you do not want orders committed. Serverless deploys often need an
        external database instead of the filesystem.
      </p>

      <p className="text-sm text-[var(--gray-600)]">
        <Link href="/admin" className="text-[var(--link)] hover:underline">
          Back to admin home
        </Link>
      </p>
    </div>
  );
}
