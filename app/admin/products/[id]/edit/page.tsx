import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategories } from "@/lib/products";
import { readProducts } from "@/lib/admin/products-data";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function AdminEditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const categories = getCategories();
  const products = await readProducts();
  const product = products.find((p) => p.id === id || p.slug === id);
  if (!product) notFound();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-xl font-bold text-[var(--fg)]">
          Edit product
        </h1>
        <Link
          href="/admin/products"
          className="text-sm text-[var(--gray-600)] hover:text-[var(--fg)]"
        >
          Back to list
        </Link>
      </div>
      <p className="text-sm text-[var(--gray-600)]">
        {product.name}
      </p>
      <ProductForm categories={categories} initialProduct={product} />
    </div>
  );
}
