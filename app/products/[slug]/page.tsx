import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProductBySlug, getProducts } from "@/lib/products";
import { getProductDisplayImage } from "@/lib/product-image";
import { ProductActions } from "@/components/products/ProductActions";

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

export async function generateStaticParams() {
  const products = getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} | Phase Alignment`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <nav className="mb-6 text-sm text-[var(--gray-600)]">
          <Link href="/shop" className="text-[var(--link)] hover:text-[var(--link-hover)]">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--foreground)]">{product.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="aspect-square overflow-hidden rounded-[var(--radius-lg)] bg-[var(--gray-100)]">
            <img
              src={getProductDisplayImage(product)}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <h1 className="font-display text-3xl font-bold text-[var(--foreground)]">
              {product.name}
            </h1>
            <p className="mt-2 text-lg text-[var(--gray-600)]">
              {product.shortDescription}
            </p>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display text-2xl font-bold text-[var(--foreground)]">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice != null && (
                <span className="text-[var(--gray-500)] line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
            <p className="mt-6 text-[var(--gray-700)]">
              {product.longDescription}
            </p>
            <ProductActions product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
