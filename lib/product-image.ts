import type { Product } from "@/lib/types";

const GENERIC_PLACEHOLDER = "/placeholder-product.jpg";

/** Base URL for placeholder images that show the product name. */
const PLACEHOLDER_BASE = "https://placehold.co";

/**
 * Returns the URL to display for a product image.
 * If the product has a real image (not the generic placeholder), use it.
 * Otherwise returns a placeholder image URL that displays the product name.
 */
export function getProductDisplayImage(product: Product, index = 0): string {
  const url = product.images?.[index]?.trim();
  if (url && url !== GENERIC_PLACEHOLDER) return url;
  const text = encodeURIComponent(product.name);
  return `${PLACEHOLDER_BASE}/400x300/1a1a1a/f0efec?text=${text}`;
}

/** Returns all display image URLs for a product. */
export function getProductDisplayImages(product: Product): string[] {
  const first = getProductDisplayImage(product);
  const rest = (product.images?.length ?? 0) > 1 ? product.images!.slice(1).map((url, i) => (url?.trim() && url !== GENERIC_PLACEHOLDER ? url : getProductDisplayImage(product, i + 1))) : [];
  return [first, ...rest];
}
