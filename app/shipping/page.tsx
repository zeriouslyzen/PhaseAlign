import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shipping",
  description:
    "How Phase Alignment fulfills physical orders: India-export wholesale partner, processing and transit estimates, carriers, and customs.",
  openGraph: {
    title: "Shipping | Phase Alignment",
    url: canonical("/shipping"),
  },
  alternates: { canonical: canonical("/shipping") },
};

export default function ShippingPage() {
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
          <span className="text-[var(--fg)]">Shipping</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
            Shipping
          </h1>
          <p className="mt-4 text-lg text-[var(--gray-600)]">
            Physical products are fulfilled through a wholesale partner based in
            India (export). Final delivery depends on the carrier, destination,
            and customs processing—we do not control carrier networks.
          </p>
        </header>

        <div className="space-y-10 text-[var(--gray-700)] leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--fg)]">
              Regions
            </h2>
            <p className="mt-3">
              We ship to many countries. Available destinations are enforced at
              Stripe Checkout based on our current fulfillment list. If your
              country is not selectable, contact us—we may be able to add it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--fg)]">
              Timelines
            </h2>
            <p className="mt-3">
              Partner processing is typically on the order of{" "}
              <strong>1–3 business days</strong> before handoff to the carrier.
              International transit often adds roughly{" "}
              <strong>5–8+ business days</strong> depending on service level,
              destination, and customs. These are estimates, not guarantees.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--fg)]">
              Rates
            </h2>
            <p className="mt-3">
              Checkout shows a <strong>flat international shipping</strong> line
              for physical orders. That rate is our retail approximation of
              export shipping; we may adjust it over time to stay aligned with
              carrier and partner costs. Digital-only orders do not require a
              shipping address.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--fg)]">
              Carriers and tracking
            </h2>
            <p className="mt-3">
              Our partner uses major international carriers (for example DHL,
              UPS, FedEx, Aramex, and postal services depending on lane).
              Tracking is provided when the partner dispatches your
              shipment—not at the moment you pay.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--fg)]">
              Customs and duties
            </h2>
            <p className="mt-3">
              International orders may incur import duties, taxes, or brokerage
              fees assessed by your country. Those charges are the
              responsibility of the recipient unless we explicitly state
              otherwise on the product or checkout page.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--fg)]">
              Split shipments and backorders
            </h2>
            <p className="mt-3">
              If an item is temporarily unavailable, we or our partner may ship
              partial orders or delay until stock is available. We will
              communicate by email when that affects your order.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--fg)]">
              Special requests
            </h2>
            <p className="mt-3">
              For packaging notes (for example unlabeled jars where offered by
              the partner), email us after checkout or include instructions when
              we follow up—we will confirm what the partner can accommodate.
            </p>
          </section>
        </div>

        <footer className="mt-14 border-t border-[var(--border)] pt-8 text-sm text-[var(--gray-500)]">
          <Link href="/returns" className="text-[var(--link)] hover:underline">
            Returns &amp; refunds
          </Link>
          <span className="mx-2">·</span>
          <Link href="/contact" className="text-[var(--link)] hover:underline">
            Contact
          </Link>
        </footer>
      </div>
    </div>
  );
}
