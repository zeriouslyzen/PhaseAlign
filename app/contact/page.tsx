import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | Phase Alignment",
  description: "Get in touch. Signal or email.",
};

const CONTACT_EMAIL = "signal@jackdanger.dev";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-xl px-4 py-12 sm:px-6">
        <nav className="mb-6 text-sm text-[var(--gray-600)]">
          <Link href="/" className="text-[var(--link)] hover:text-[var(--link-hover)]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--fg)]">Contact</span>
        </nav>

        <h1 className="font-display text-2xl font-bold tracking-tight text-[var(--fg)] sm:text-3xl">
          Contact
        </h1>
        <p className="mt-3 text-sm text-[var(--gray-600)]">
          Reach us directly. For Signal messaging or email:
        </p>
        <p className="mt-4">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-display text-lg font-semibold text-[var(--link)] hover:text-[var(--link-hover)]"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
        <p className="mt-6 text-xs text-[var(--gray-500)]">
          General inquiries, partnerships, support. We respond as we can.
        </p>
      </div>
    </div>
  );
}
