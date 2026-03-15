export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
}

export const CART_STORAGE_KEY = "phase-alignment-cart";

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(cents / 100);
}
