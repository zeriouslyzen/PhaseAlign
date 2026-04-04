import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "Terms governing use of the Phase Alignment website and purchases.",
  openGraph: {
    title: "Terms of service | Phase Alignment",
    url: canonical("/terms"),
  },
  alternates: { canonical: canonical("/terms") },
};

export default function TermsPage() {
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
          <span className="text-[var(--fg)]">Terms</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
            Terms of service
          </h1>
          <p className="mt-4 text-lg text-[var(--gray-600)]">
            By using this website or placing an order, you agree to these terms.
          </p>
        </header>

        <div className="space-y-8 text-[var(--gray-700)] leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--fg)]">
              Use of the site
            </h2>
            <p className="mt-3">
              You agree not to misuse the site, attempt unauthorized access, or
              interfere with its operation. We may suspend access for violations.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--fg)]">
              Products and pricing
            </h2>
            <p className="mt-3">
              Descriptions and prices are subject to change. We reserve the right
              to refuse or cancel orders (for example for pricing errors,
              suspected fraud, or stock limitations) with a full refund of any
              amount charged.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--fg)]">
              Payments
            </h2>
            <p className="mt-3">
              Payments are processed by Stripe. Your use of payment methods is
              subject to Stripe&apos;s terms and your issuer&apos;s rules.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--fg)]">
              Limitation of liability
            </h2>
            <p className="mt-3">
              To the maximum extent permitted by law, Phase Alignment and its
              operators are not liable for indirect, incidental, or consequential
              damages arising from use of the site or products. Some jurisdictions
              do not allow certain limitations; in those cases our liability is
              limited to the extent permitted by law.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--fg)]">
              Governing law
            </h2>
            <p className="mt-3">
              These terms are governed by the laws applicable to Phase
              Alignment&apos;s operating jurisdiction, without regard to conflict
              of law principles, except where consumer protection law requires
              otherwise.
            </p>
          </section>
        </div>

        <footer className="mt-14 border-t border-[var(--border)] pt-8 text-sm text-[var(--gray-500)]">
          <Link href="/returns" className="text-[var(--link)] hover:underline">
            Returns
          </Link>
          <span className="mx-2">·</span>
          <Link href="/privacy" className="text-[var(--link)] hover:underline">
            Privacy
          </Link>
        </footer>
      </div>
    </div>
  );
}
