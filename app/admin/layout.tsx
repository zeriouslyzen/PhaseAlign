import { redirect } from "next/navigation";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import { AdminNav } from "@/components/admin/AdminNav";

const devBypass = process.env.NODE_ENV === "development" && process.env.SKIP_ADMIN_AUTH === "1";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!devBypass) {
    const session = await auth();
    const isAdmin = (session?.user as { isAdmin?: boolean } | undefined)?.isAdmin;

    if (!session) {
      redirect("/account?callbackUrl=/admin");
    }
    if (!isAdmin) {
      redirect("/account?error=AdminRequired");
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)]">
      {devBypass && (
        <div className="bg-amber-100 px-4 py-2 text-center text-sm text-amber-900">
          Dev bypass: SKIP_ADMIN_AUTH=1. Sign in for API (add product, etc.).
        </div>
      )}
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 safe-area-pb">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link
            href="/admin"
            className="font-display text-base font-bold text-[var(--fg)]"
          >
            Admin
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="text-sm text-[var(--gray-600)] hover:text-[var(--fg)]"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main className="flex-1 overflow-auto pb-20 md:pb-6">
        <div className="mx-auto max-w-4xl px-4 py-4">{children}</div>
      </main>
      <AdminNav />
    </div>
  );
}
