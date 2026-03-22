/**
 * Linux / build FS single-name limit is typically 255 bytes.
 * Next.js appends suffixes (e.g. `.segments`) under `.next/server/app/...`, so keep slugs well under 255.
 */
export const MAX_PRODUCT_SLUG_BYTES = 200;

export function isProductSlugSafeForStaticGeneration(slug: string): boolean {
  return Buffer.byteLength(slug, "utf8") <= MAX_PRODUCT_SLUG_BYTES;
}
