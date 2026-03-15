import Link from "next/link";
import { getCategories } from "@/lib/products";
import { AdminProductList } from "@/components/admin/AdminProductList";

export default function AdminProductsPage() {
  const categories = getCategories();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-xl font-bold text-[var(--fg)]">
          Products
        </h1>
        <Link
          href="/admin/products/add"
          className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--gray-900)] hover:bg-[var(--accent-hover)]"
        >
          Add product
        </Link>
      </div>
      <p className="text-sm text-[var(--gray-600)]">
        Catalog. New products appear after you add them.
      </p>
      <AdminProductList categories={categories} />
    </div>
  );
}
