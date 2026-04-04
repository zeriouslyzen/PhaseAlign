import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Phase Alignment collects and uses information when you shop, subscribe, or contact us.",
  openGraph: {
    title: "Privacy | Phase Alignment",
    url: canonical("/privacy"),
  },
  alternates: { canonical: canonical("/privacy") },
};

export default function PrivacyPage() {
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
          <span className="text-[var(--fg)]">Privacy</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
            Privacy
          </h1>
          <p className="mt-4 text-lg text-[var(--gray-600)]">
            Summary of what we collect and why. For legal questions, contact us
            via the site.
          </p>
        </header>

        <div className="space-y-8 text-[var(--gray-700)] leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--fg)]">
              Information we collect
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Checkout:</strong> email, payment details (processed by
                Stripe—we do not store full card numbers on our servers), and for
                physical goods, shipping address and phone when you provide them
                in Stripe Checkout.
              </li>
              <li>
                <strong>Newsletter:</strong> email address if you subscribe.
              </li>
              <li>
                <strong>Account / admin:</strong> if you sign in, authentication
                data handled by our auth provider (for example GitHub OAuth per
                our configuration).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--fg)]">
              How we use it
            </h2>
            <p className="mt-3">
              To process orders, communicate about fulfillment, improve the site,
              comply with law, and prevent fraud. We may use subprocessors such
              as Stripe for payments and hosting providers for infrastructure.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--fg)]">
              Retention
            </h2>
            <p className="mt-3">
              We retain order-related records as needed for accounting, disputes,
              and legal obligations. You may request access or deletion where
              applicable law requires.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--fg)]">
              Analytics
            </h2>
            <p className="mt-3">
              If enabled, we may use privacy-respecting analytics to understand
              traffic and conversions. You can use browser controls to limit
              cookies or tracking where applicable.
            </p>
          </section>
        </div>

        <footer className="mt-14 border-t border-[var(--border)] pt-8 text-sm text-[var(--gray-500)]">
          <Link href="/contact" className="text-[var(--link)] hover:underline">
            Contact
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
