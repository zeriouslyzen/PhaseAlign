import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProductBySlug, getProducts } from "@/lib/products";
import { getProductDisplayImage } from "@/lib/product-image";
import { ProductActions } from "@/components/products/ProductActions";
import { TRADITIONS, getTradition } from "@/lib/classifications";
import { ProductSchema } from "@/components/seo/ProductSchema";
import { canonical } from "@/lib/site";

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
  const productUrl = canonical(`/products/${slug}`);
  const imgSrc = getProductDisplayImage(product);
  const imageUrl = imgSrc.startsWith("http") ? imgSrc : canonical(imgSrc.startsWith("/") ? imgSrc : `/${imgSrc}`);
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      url: productUrl,
      type: "website",
      images: [{ url: imageUrl, alt: product.name }],
    },
    alternates: { canonical: productUrl },
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
      <ProductSchema product={product} slug={slug} />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <nav className="mb-6 text-sm text-[var(--gray-600)]" aria-label="Breadcrumb">
          <Link href="/shop" className="text-[var(--link)] hover:text-[var(--link-hover)]">
            Shop
          </Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-[var(--foreground)]">{product.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="aspect-square overflow-hidden rounded-[var(--radius-lg)] bg-[var(--gray-100)]">
            <img
              src={getProductDisplayImage(product)}
              alt={product.name}
              className="h-full w-full object-cover"
              width={600}
              height={600}
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
            {(product.traditions?.length ?? 0) > 0 && (
              <div className="mt-6 space-y-2 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--gray-50)] p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--gray-500)]">
                  Classification
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.traditions!.map((tid) => {
                    const t = getTradition(tid);
                    return t ? (
                      <span
                        key={tid}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-2.5 py-1 text-xs font-medium"
                        style={{ borderLeftColor: t.color, borderLeftWidth: 3 }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: t.color }}
                          aria-hidden
                        />
                        {t.label}
                      </span>
                    ) : null;
                  })}
                </div>
                {product.culturalClassification && (
                  <p className="text-sm text-[var(--gray-700)]">
                    <span className="font-medium text-[var(--fg)]">Framework:</span>{" "}
                    {product.culturalClassification}
                  </p>
                )}
                {product.mechanismSummary && (
                  <p className="text-sm text-[var(--gray-600)]">
                    <span className="font-medium text-[var(--fg)]">Mechanism:</span>{" "}
                    {product.mechanismSummary}
                  </p>
                )}
              </div>
            )}
            <ProductActions product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
