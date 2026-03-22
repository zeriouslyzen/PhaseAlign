"use client";

import { useState } from "react";
import Link from "next/link";

const BENEFITS = [
  {
    title: "Discounts",
    body: "Partner pricing on stacks, blends, and gear. The more you move, the better your margin.",
  },
  {
    title: "Free merch",
    body: "Get product in hand. Test stacks, wear the brand, share what you actually use.",
  },
  {
    title: "Community backing",
    body: "You're not pushing a faceless corp. You're backed by a community that trains, researches, and runs the same protocols.",
  },
  {
    title: "Education",
    body: "Access to frameworks, mechanisms, and how we think. So you can speak the language and answer the hard questions.",
  },
  {
    title: "Coach support",
    body: "Direct line to the team. Stack design, client cases, and real feedback. We treat partners as part of the system.",
  },
];

export default function PartnerPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [siteOrSocial, setSiteOrSocial] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          siteOrSocial: siteOrSocial.trim(),
        }),
      });
      if (res.ok) {
        setStatus("done");
        setName("");
        setEmail("");
        setSiteOrSocial("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-12">
        <nav className="mb-6 text-sm text-[var(--gray-600)]">
          <Link href="/" className="text-[var(--link)] hover:text-[var(--link-hover)]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--fg)]">Partner</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
            Affiliate sign-up
          </h1>
          <p className="mt-3 text-base text-[var(--gray-600)]">
            We&apos;re building the partner program now. Discounts, free merch, community backing, education, and direct coach support. Limited slots. If you&apos;re a coach, creator, or practitioner who runs physiology-first and wants in, apply below. We&apos;re not scaling this forever.
          </p>
        </header>

        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-4"
            >
              <h2 className="font-display text-sm font-semibold text-[var(--fg)]">
                {b.title}
              </h2>
              <p className="mt-1 text-xs text-[var(--gray-600)]">{b.body}</p>
            </div>
          ))}
        </div>

        <div className="rounded-lg border-2 border-[var(--accent)] bg-[var(--accent-subtle)]/20 p-6">
          <h2 className="font-display text-lg font-semibold text-[var(--fg)]">
            Apply now
          </h2>
          <p className="mt-1 text-sm text-[var(--gray-600)]">
            We review every application. Get in before the list closes.
          </p>
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs font-medium text-[var(--gray-600)]">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded border border-[var(--border)] bg-[var(--bg-card)] px-3 py-2 text-sm text-[var(--fg)] focus:border-[var(--link)] focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-[var(--gray-600)]">
                Email *
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full rounded border border-[var(--border)] bg-[var(--bg-card)] px-3 py-2 text-sm text-[var(--fg)] focus:border-[var(--link)] focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="siteOrSocial" className="block text-xs font-medium text-[var(--gray-600)]">
                Site or social (optional)
              </label>
              <input
                id="siteOrSocial"
                type="text"
                value={siteOrSocial}
                onChange={(e) => setSiteOrSocial(e.target.value)}
                placeholder="URL or handle"
                className="mt-1 w-full rounded border border-[var(--border)] bg-[var(--bg-card)] px-3 py-2 text-sm text-[var(--fg)] placeholder:text-[var(--gray-400)] focus:border-[var(--link)] focus:outline-none"
              />
            </div>
            {status === "error" && (
              <p className="text-sm text-red-600">Something went wrong. Try again or email us directly.</p>
            )}
            {status === "done" && (
              <p className="text-sm font-medium text-[var(--fg)]">Submitted. We&apos;ll be in touch soon.</p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded bg-[var(--fg)] py-3 text-sm font-semibold text-[var(--bg)] hover:opacity-90 disabled:opacity-60 sm:w-auto sm:px-8"
            >
              {status === "loading" ? "Sending…" : "Submit application"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-[var(--gray-500)]">
          <Link href="/contact" className="text-[var(--link)] hover:text-[var(--link-hover)]">
            Contact
          </Link>{" "}
          for questions.
        </p>
      </div>
    </div>
  );
}
