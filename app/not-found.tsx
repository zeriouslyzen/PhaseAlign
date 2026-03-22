import Link from "next/link";
import { getCategories } from "@/lib/products";

export default function NotFound() {
  const categories = getCategories();

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-24 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--gray-50)]">
        <svg className="h-10 w-10 text-[var(--gray-300)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h1 className="font-display text-3xl font-bold text-[var(--fg)]">
        We couldn’t find that page
      </h1>
      <p className="mt-4 text-base text-[var(--gray-600)]">
        The link you followed might be broken, or the product is no longer in stock. 
        Try searching our collection or browse by category below.
      </p>
      
      <div className="mt-12 w-full">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--gray-400)]">
          Explore Categories
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?cat=${cat.slug}`}
              className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 text-sm font-medium transition-all hover:border-[var(--brand)] hover:shadow-md active:scale-95"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 flex items-center gap-4">
        <Link
          href="/shop"
          className="rounded-lg bg-[var(--fg)] px-6 py-2.5 text-sm font-semibold text-[var(--bg)] transition-colors hover:bg-[var(--gray-800)]"
        >
          Browse All Products
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-[var(--gray-600)] hover:text-[var(--fg)]"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
