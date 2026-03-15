import type { Product } from "@/lib/types";
import { JsonLd } from "./JsonLd";
import { BASE_URL, canonical } from "@/lib/site";
import { getProductDisplayImage } from "@/lib/product-image";

function toAbsoluteImageUrl(product: Product): string {
  const url = getProductDisplayImage(product);
  if (url.startsWith("http")) return url;
  return `${BASE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

/**
 * Product and BreadcrumbList JSON-LD for product detail pages.
 * Required for Google Shopping / Merchant Center and rich results.
 */
export function ProductSchema({
  product,
  slug,
}: {
  product: Product;
  slug: string;
}) {
  const productUrl = canonical(`/products/${slug}`);
  const imageUrl = toAbsoluteImageUrl(product);
  const price = (product.price / 100).toFixed(2);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.longDescription || product.shortDescription,
    image: imageUrl,
    url: productUrl,
    brand: {
      "@type": "Brand",
      name: "Phase Alignment",
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "USD",
      price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Shop", item: canonical("/shop") },
      { "@type": "ListItem", position: 3, name: product.name, item: productUrl },
    ],
  };

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
    </>
  );
}
