"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  HOME_PATHWAYS,
  HOME_PATHWAYS_KICKER,
  HOME_PATHWAYS_SECTION,
} from "@/lib/home-pathways";

const headingId = "home-pathways-heading";

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

export function HomePathways() {
  return (
    <motion.section
      className="border-b border-[var(--border)] bg-[var(--gray-50)] py-10 sm:py-14"
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="font-cyber text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--gray-500)] sm:text-[11px]">
          {HOME_PATHWAYS_KICKER}
        </p>
        <motion.h2
          id={headingId}
          className="mt-2 max-w-[22ch] font-display text-2xl font-bold leading-[1.12] tracking-[-0.02em] text-[var(--fg)] sm:max-w-none sm:text-3xl sm:leading-[1.1] lg:text-[2rem] lg:leading-tight"
          initial={false}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          {HOME_PATHWAYS_SECTION.heading}
        </motion.h2>
        <motion.p
          className="mt-4 max-w-2xl text-balance font-sans text-[15px] leading-[1.65] text-[var(--gray-600)] sm:text-base sm:leading-relaxed"
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          {HOME_PATHWAYS_SECTION.intro}
        </motion.p>

        <ul className="mt-10 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {HOME_PATHWAYS.map((pathway, index) => (
            <li key={pathway.id} className="min-w-0">
              <motion.article
                className="flex h-full flex-col rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-card)] p-5 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-md sm:p-6"
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.35, delay: 0.08 + index * 0.06 }}
              >
                <div className="flex items-baseline justify-between gap-2 border-b border-[var(--border)] pb-3">
                  <span
                    className="font-cyber text-[10px] font-bold tabular-nums tracking-[0.12em] text-[var(--gray-400)]"
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-bold leading-snug tracking-[-0.015em] text-[var(--fg)] sm:text-[1.125rem]">
                  {pathway.title}
                </h3>
                <p className="mt-2 flex-1 font-sans text-sm leading-[1.6] text-[var(--gray-600)]">
                  {pathway.description}
                </p>
                <div className="mt-5 flex flex-col gap-3 border-t border-[var(--border)] pt-5">
                  <Link
                    href={pathway.primary.href}
                    className="group/cta inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--fg)] px-4 py-3.5 text-center text-sm font-bold uppercase tracking-[0.06em] text-[var(--bg)] shadow-sm transition-transform duration-200 hover:bg-[var(--gray-800)] active:scale-[0.98] sm:py-3"
                  >
                    <span className="leading-tight">{pathway.primary.label}</span>
                    <ArrowIcon className="shrink-0 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
                  </Link>
                  {pathway.secondary && (
                    <Link
                      href={pathway.secondary.href}
                      className="text-center text-xs font-bold uppercase tracking-[0.14em] text-[var(--fg)] underline decoration-[var(--accent)] decoration-2 underline-offset-[6px] transition-colors hover:text-[var(--gray-700)] hover:decoration-[var(--fg)]"
                    >
                      {pathway.secondary.label}
                    </Link>
                  )}
                </div>
              </motion.article>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
