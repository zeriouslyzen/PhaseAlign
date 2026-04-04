import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Returns & refunds",
  description:
    "Return window, eligibility, refunds via Stripe, and how to contact Phase Alignment about order issues.",
  openGraph: {
    title: "Returns & refunds | Phase Alignment",
    url: canonical("/returns"),
  },
  alternates: { canonical: canonical("/returns") },
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <nav className="mb-8 text-sm text-[var(--gray-600)]">
          <Link
            href="/"
            className="text-[var(--link)] hover:text-[var(--link-hover)]"
          >
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--fg)]">Returns</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
            Returns &amp; refunds
          </h1>
          <p className="mt-4 text-lg text-[var(--gray-600)]">
            We want you to be satisfied with your order. This policy describes
            how returns and refunds work for purchases made on this site.
          </p>
        </header>

        <div className="space-y-10 text-[var(--gray-700)] leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--fg)]">
              Contact first
            </h2>
            <p className="mt-3">
              Email us at{" "}
              <Link
                href="/contact"
                className="text-[var(--link)] hover:underline"
              >
                our contact page
              </Link>{" "}
              with your order reference (Stripe receipt or session reference)
              and a short description of the issue. We typically respond within
              a few business days.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--fg)]">
              Eligibility
            </h2>
            <p className="mt-3">
              For sealed, unopened physical products in resalable condition, we
              may accept returns within <strong>30 days of delivery</strong>,
              subject to product-specific restrictions (for example perishables
              or opened supplements may not be returnable for safety reasons).
            </p>
            <p className="mt-3">
              <strong>Digital goods</strong> are generally not refundable once
              delivered or accessed, unless required by law or stated otherwise
              at purchase.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--fg)]">
              Return shipping
            </h2>
            <p className="mt-3">
              Unless the return is due to our error or a defective product we
              confirm, <strong>return shipping costs are paid by the customer</strong>.
              We recommend tracked shipping; we are not responsible for returns
              lost in transit.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--fg)]">
              Refunds
            </h2>
            <p className="mt-3">
              Approved refunds are processed back to the original payment method
              via <strong>Stripe</strong>. Timing may depend on your bank or card
              issuer.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--fg)]">
              Damaged or incorrect items
            </h2>
            <p className="mt-3">
              If your order arrives damaged or is not what you purchased, contact
              us with photos where applicable. We will work with you on
              replacement or refund as appropriate.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--fg)]">
              Not medical advice
            </h2>
            <p className="mt-3">
              Our products are not intended to diagnose, treat, cure, or prevent
              any disease. Consult a qualified professional before use,
              especially if you are pregnant, nursing, or taking medication.
            </p>
          </section>
        </div>

        <footer className="mt-14 border-t border-[var(--border)] pt-8 text-sm text-[var(--gray-500)]">
          <Link href="/shipping" className="text-[var(--link)] hover:underline">
            Shipping
          </Link>
          <span className="mx-2">·</span>
          <Link href="/terms" className="text-[var(--link)] hover:underline">
            Terms
          </Link>
        </footer>
      </div>
    </div>
  );
}
