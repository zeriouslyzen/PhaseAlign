import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProductBySlug, getProducts } from "@/lib/products";
import { getProductDisplayImage } from "@/lib/product-image";
import { ProductMedia } from "@/components/products/ProductMedia";
import { ProductActions } from "@/components/products/ProductActions";
import { 
  TRADITIONS, 
  getTradition, 
  ELEMENTS_TCM, 
  ELEMENTS_VEDIC, 
  ORGANS,
  PLANETS,
  SIGNS
} from "@/lib/classifications";
import { ProductSchema } from "@/components/seo/ProductSchema";
import { canonical } from "@/lib/site";
import { isProductSlugSafeForStaticGeneration } from "@/lib/slug-filesystem";

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

/** Long Unicode slugs exceed FS path limits during static generation; those routes render on demand. */
export const dynamicParams = true;

export async function generateStaticParams() {
  const products = getProducts();
  return products
    .filter((p) => isProductSlugSafeForStaticGeneration(p.slug))
    .map((p) => ({ slug: p.slug }));
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
    title: product.metaTitle || product.name,
    description: product.metaDescription || product.shortDescription,
    openGraph: {
      title: product.metaTitle || product.name,
      description: product.metaDescription || product.shortDescription,
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
      <ProductSchema product={product!} slug={slug} />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <nav className="mb-6 text-sm text-[var(--gray-600)]" aria-label="Breadcrumb">
          <Link href="/shop" className="text-[var(--link)] hover:text-[var(--link-hover)]">
            Shop
          </Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-[var(--foreground)]">{product!.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2">
          <ProductMedia product={product!} />

          <div>
            <h1 className="font-display text-3xl font-bold text-[var(--foreground)]">
              {product.name}
            </h1>
            <p className="mt-2 text-lg text-[var(--gray-600)]">
              {product.shortDescription}
            </p>
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
                      <Link
                        key={tid}
                        href={`/shop?tradition=${tid}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-2.5 py-1 text-xs font-medium hover:bg-[var(--gray-100)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
                        style={{ borderLeftColor: t.color, borderLeftWidth: 3 }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: t.color }}
                          aria-hidden
                        />
                        {t.label}
                      </Link>
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

            {/* Energetics & Systems */}
            {(product.organs?.length || product.elements) && (
              <div className="mt-8 space-y-4 border-t border-[var(--border)] pt-8">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--gray-900)]">
                  System & Energetics
                </h2>
                
                <div className="flex flex-wrap gap-4">
                  {/* Organs / Systems */}
                  {product.organs?.map(org => {
                    const organData = ORGANS.find(o => o.label.includes(org) || o.id === org.toLowerCase());
                    return (
                      <div key={org} className="group relative">
                        <span className="inline-flex flex-col rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-xs transition-colors hover:bg-[var(--gray-50)]">
                          <span className="font-bold text-[var(--fg)]">{org}</span>
                          <span className="text-[var(--gray-500)]">{organData?.system || "System"}</span>
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Elements */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {product.elements?.tcm && (
                    <div className="rounded-lg bg-[var(--gray-50)] p-3">
                      <p className="mb-2 text-[10px] font-bold uppercase text-[var(--gray-400)]">TCM Elements</p>
                      <div className="flex flex-wrap gap-2">
                        {product.elements.tcm.map(eid => {
                          const e = ELEMENTS_TCM.find(el => el.id === eid);
                          return (
                            <span key={eid} className="inline-flex items-center gap-1.5 rounded-full bg-white px-2 py-1 text-[10px] font-medium shadow-sm ring-1 ring-black/5">
                              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: e?.color || "#ccc" }} />
                              {e?.label || eid}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {product.elements?.vedic && (
                    <div className="rounded-lg bg-[var(--gray-50)] p-3">
                      <p className="mb-2 text-[10px] font-bold uppercase text-[var(--gray-400)]">Vedic Elements</p>
                      <div className="flex flex-wrap gap-2">
                        {product.elements.vedic.map(eid => {
                          const e = ELEMENTS_VEDIC.find(el => el.id === eid);
                          return (
                            <span key={eid} className="inline-flex items-center gap-1.5 rounded-full bg-white px-2 py-1 text-[10px] font-medium shadow-sm ring-1 ring-black/5">
                              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: e?.color || "#ccc" }} />
                              {e?.label || eid}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Chemistry & Bioavailability */}
            {product.chemistry && (
              <div className="mt-8 space-y-4 border-t border-[var(--border)] pt-8">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--gray-900)]">
                  Molecular Chemistry
                </h2>
                <div className="rounded-[var(--radius)] bg-[var(--gray-900)] p-4 text-white">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {product.chemistry.compounds.map(comp => (
                      <span key={comp} className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-mono tracking-tight">
                        {comp}
                      </span>
                    ))}
                  </div>
                  {product.chemistry.molecularActions && (
                    <p className="text-xs leading-relaxed text-white/70">
                      <span className="font-bold text-white">Actions:</span> {product.chemistry.molecularActions.join(", ")}
                    </p>
                  )}
                  {product.chemistry.bioavailability && (
                    <p className="mt-2 text-[10px] italic text-[var(--brand)]">
                      Note: {product.chemistry.bioavailability}
                    </p>
                  )}
                </div>
              </div>
            )}
            {/* Celestial & Teluric */}
            {(product.geography || product.astrology) && (
              <div className="mt-8 space-y-4 border-t border-[var(--border)] pt-8">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--gray-900)]">
                  Celestial & Teluric
                </h2>
                
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Geography */}
                  {product.geography && (
                    <div className="space-y-3">
                      <p className="text-[10px] font-bold uppercase text-[var(--gray-400)]">Geography & Climate</p>
                      <div className="flex flex-col gap-2">
                        {product.geography.location && (
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-[var(--gray-400)]">📍</span>
                            <span className="text-[var(--fg)]">{product.geography.location.join(", ")}</span>
                          </div>
                        )}
                        {product.geography.environment && (
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-[var(--gray-400)]">🏔️</span>
                            <span className="text-[var(--fg)]">{product.geography.environment}</span>
                          </div>
                        )}
                        {product.geography.climate && (
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-[var(--gray-400)]">☁️</span>
                            <span className="text-[var(--fg)]">{product.geography.climate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Astrology */}
                  {product.astrology && (
                    <div className="space-y-3">
                      <p className="text-[10px] font-bold uppercase text-[var(--gray-400)]">Celestial Alignment</p>
                      <div className="flex flex-wrap gap-3">
                        {product.astrology.planets?.map(pid => {
                          const p = PLANETS.find(planet => planet.id === pid);
                          return (
                            <div key={pid} className="flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--bg)] px-2 py-1 shadow-sm">
                              <span className="text-lg leading-none" style={{ color: p?.color }}>{p?.symbol || "•"}</span>
                              <span className="text-[10px] font-medium text-[var(--gray-700)]">{p?.label || pid}</span>
                            </div>
                          );
                        })}
                        {product.astrology.signs?.map(sid => {
                          const s = SIGNS.find(sign => sign.id === sid);
                          return (
                            <div key={sid} className="flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--bg)] px-2 py-1 shadow-sm">
                              <span className="text-sm font-serif leading-none text-[var(--gray-600)]">{s?.symbol || "•"}</span>
                              <span className="text-[10px] font-medium text-[var(--gray-700)]">{s?.label || sid}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
