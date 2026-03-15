import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--gray-50)]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="font-display font-semibold text-[var(--foreground)]">
              Shop
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-[var(--gray-600)]">
              <li>
                <Link href="/shop" className="text-[var(--link)] hover:text-[var(--link-hover)]">
                  All products
                </Link>
              </li>
              <li>
                <Link href="/shop?cat=herbal-blends" className="text-[var(--link)] hover:text-[var(--link-hover)]">
                  Herbal blends
                </Link>
              </li>
              <li>
                <Link href="/shop?cat=performance" className="text-[var(--link)] hover:text-[var(--link-hover)]">
                  Performance
                </Link>
              </li>
              <li>
                <Link href="/shop?cat=health-tech" className="text-[var(--link)] hover:text-[var(--link-hover)]">
                  Health tech
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-display font-semibold text-[var(--foreground)]">
              Company
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-[var(--gray-600)]">
              <li>
                <Link href="/about" className="text-[var(--link)] hover:text-[var(--link-hover)]">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[var(--link)] hover:text-[var(--link-hover)]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-display font-semibold text-[var(--foreground)]">
              Support
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-[var(--gray-600)]">
              <li>
                <Link href="/shipping" className="text-[var(--link)] hover:text-[var(--link-hover)]">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-[var(--link)] hover:text-[var(--link-hover)]">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm text-[var(--gray-600)]">
              Science-backed. East meets west. Your data stays yours.
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-[var(--border)] pt-6 text-center text-sm text-[var(--gray-500)]">
          Phase Alignment. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
