import Link from "next/link";
import { getCategories } from "@/lib/products";
import { ProductForm } from "@/components/admin/ProductForm";

export default function AdminAddProductPage() {
  const categories = getCategories();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-xl font-bold text-[var(--fg)]">
          Add product
        </h1>
        <Link
          href="/admin/products"
          className="text-sm text-[var(--gray-600)] hover:text-[var(--fg)]"
        >
          Back to list
        </Link>
      </div>
      <p className="text-sm text-[var(--gray-600)]">
        Paste details from Temu, AliExpress, or Alibaba. Add images with the button below.
      </p>
      <ProductForm categories={categories} />
    </div>
  );
}
