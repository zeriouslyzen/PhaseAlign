"use client";

import { useState } from "react";
import Link from "next/link";

export function Footer() {
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setNewsletterStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (res.ok) {
        setEmail("");
        setNewsletterStatus("done");
      } else {
        setNewsletterStatus("error");
      }
    } catch {
      setNewsletterStatus("error");
    }
  }

  return (
    <footer role="contentinfo" className="border-t border-[var(--border)] bg-[var(--gray-50)]">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          {/* Newsletter - modular small */}
          <div className="shrink-0">
            <p id="newsletter-label" className="text-xs font-medium text-[var(--gray-600)]">
              Updates on the frontier
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="mt-1 flex gap-1"
              aria-labelledby="newsletter-label"
              aria-describedby={newsletterStatus === "error" ? "newsletter-error" : undefined}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="h-8 w-48 max-w-full rounded border border-[var(--border)] bg-[var(--bg-card)] px-2 text-xs text-[var(--fg)] placeholder:text-[var(--gray-400)] focus:border-[var(--link)] focus:outline-none"
                disabled={newsletterStatus === "loading"}
                aria-label="Email for newsletter"
                autoComplete="email"
              />
              <button
                type="submit"
                disabled={newsletterStatus === "loading"}
                className="h-8 shrink-0 rounded bg-[var(--fg)] px-2.5 text-xs font-medium text-[var(--bg)] hover:opacity-90 disabled:opacity-60"
                aria-busy={newsletterStatus === "loading"}
              >
                {newsletterStatus === "loading" ? "…" : newsletterStatus === "done" ? "Done" : "Subscribe"}
              </button>
            </form>
            {newsletterStatus === "error" && (
              <p id="newsletter-error" className="mt-1 text-[10px] text-red-600" role="alert">
                Something went wrong. Try again.
              </p>
            )}
          </div>

          {/* Links - horizontal */}
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--gray-600)]">
            <Link href="/about" className="text-[var(--link)] hover:text-[var(--link-hover)]">
              About
            </Link>
            <Link href="/contact" className="text-[var(--link)] hover:text-[var(--link-hover)]">
              Contact
            </Link>
            <Link href="/partner" className="text-[var(--link)] hover:text-[var(--link-hover)]">
              Partner
            </Link>
            <Link href="/shipping" className="text-[var(--link)] hover:text-[var(--link-hover)]">
              Shipping
            </Link>
            <Link href="/returns" className="text-[var(--link)] hover:text-[var(--link-hover)]">
              Returns
            </Link>
            <Link href="/privacy" className="text-[var(--link)] hover:text-[var(--link-hover)]">
              Privacy
            </Link>
            <Link href="/terms" className="text-[var(--link)] hover:text-[var(--link-hover)]">
              Terms
            </Link>
          </nav>
        </div>

        <div className="mt-4 border-t border-[var(--border)] pt-4 text-center text-xs text-[var(--gray-500)]">
          Phase Alignment. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
