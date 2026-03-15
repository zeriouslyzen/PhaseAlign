"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";

function AccountContent() {
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const adminRequired = searchParams.get("error") === "AdminRequired";

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <p className="text-[var(--gray-600)]">Loading…</p>
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-[var(--foreground)]">
          Account
        </h1>
        {adminRequired && (
          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-800">
            Admin access is restricted. Add your email to ALLOWED_ADMIN_EMAILS to use the admin panel.
          </p>
        )}
        <p className="mt-4 text-[var(--gray-600)]">
          Signed in as {session.user.email ?? session.user.name ?? "User"}.
        </p>
        <p className="mt-2 text-sm text-[var(--gray-500)]">
          Profile and saved payment methods will appear here once we add a database.
        </p>
        <section className="mt-8 border-t border-[var(--border)] pt-8">
          <h2 className="font-display text-lg font-semibold text-[var(--foreground)]">
            Order history
          </h2>
          <p className="mt-2 text-sm text-[var(--gray-600)]">
            Past orders and reorder links will appear here once orders are stored. For now, keep your receipt email for reference.
          </p>
        </section>
        <div className="mt-8">
          <Button variant="outline" onClick={() => signOut()}>
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-[var(--foreground)]">
        Account
      </h1>
      <p className="mt-4 text-[var(--gray-600)]">
        Sign in to see orders, addresses, and saved payment methods. Guest checkout is available at checkout—no account required.
      </p>
      <div className="mt-8">
        <Button
          size="lg"
          onClick={() => signIn("github", { callbackUrl: "/account" })}
        >
          Sign in with GitHub
        </Button>
      </div>
      <div className="mt-6">
        <Button href="/shop" variant="ghost">
          Continue as guest
        </Button>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <p className="text-[var(--gray-600)]">Loading…</p>
        </div>
      }
    >
      <AccountContent />
    </Suspense>
  );
}
