import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="font-display text-2xl font-bold text-[var(--fg)]">
        Page not found
      </h1>
      <p className="mt-2 text-[var(--gray-600)]">
        The page you’re looking for doesn’t exist or was moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-[var(--accent)] px-4 py-2 font-medium text-[var(--gray-900)] hover:bg-[var(--accent-hover)]"
      >
        Go home
      </Link>
    </div>
  );
}
