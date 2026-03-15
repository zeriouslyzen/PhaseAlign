export default function AdminOrdersPage() {
  const stripeDashboardUrl = "https://dashboard.stripe.com/payments";

  return (
    <div className="space-y-4">
      <h1 className="font-display text-xl font-bold text-[var(--fg)]">
        Orders
      </h1>
      <p className="text-sm text-[var(--gray-600)]">
        Payments and checkout sessions are handled by Stripe. Use the dashboard for fulfillment and refunds.
      </p>
      <a
        href={stripeDashboardUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[48px] items-center rounded-lg bg-[var(--gray-800)] px-4 py-3 font-medium text-white hover:bg-[var(--gray-900)]"
      >
        Open Stripe Dashboard
      </a>
      <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-4 text-sm text-[var(--gray-600)]">
        <p className="font-medium text-[var(--fg)]">Tip</p>
        <p className="mt-1">
          For dropshipping, open the Stripe payment, copy the shipping address, and place the order with your supplier (Temu, AliExpress, Alibaba). You can add a webhook later to sync orders into this admin.
        </p>
      </div>
    </div>
  );
}
