"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="font-display text-2xl font-bold text-[var(--fg)]">
        Something went wrong
      </h1>
      <p className="mt-2 text-[var(--gray-600)]">
        An error occurred. You can try again or return home.
      </p>
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2 font-medium text-[var(--fg)] hover:bg-[var(--gray-100)]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-block rounded-lg bg-[var(--accent)] px-4 py-2 font-medium text-[var(--gray-900)] hover:bg-[var(--accent-hover)]"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
