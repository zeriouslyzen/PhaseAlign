import Link from "next/link";

const tools = [
  { href: "/admin/products", label: "Products", description: "View and manage catalog" },
  { href: "/admin/products/add", label: "Add product", description: "Temu, AliExpress, Alibaba" },
  { href: "/admin/orders", label: "Orders", description: "Stripe payments and fulfillment" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-xl font-bold text-[var(--fg)]">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-[var(--gray-600)]">
          Dropshipping and store essentials. Use on mobile to add products on the go.
        </p>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {tools.map(({ href, label, description }) => (
          <li key={href}>
            <Link
              href={href}
              className="block rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-4 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--gray-50)]"
            >
              <span className="font-medium text-[var(--fg)]">{label}</span>
              <p className="mt-1 text-sm text-[var(--gray-600)]">{description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
