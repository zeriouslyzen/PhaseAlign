import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

const allowedAdminEmails = process.env.ALLOWED_ADMIN_EMAILS?.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean) ?? [];

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret:
    process.env.AUTH_SECRET ??
    process.env.NEXTAUTH_SECRET ??
    "dev-secret-do-not-use-in-production",
  trustHost: true,
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/account",
  },
  callbacks: {
    jwt({ token, user }) {
      const email = (user?.email ?? token?.email)?.toString()?.toLowerCase();
      const isAdmin =
        allowedAdminEmails.length === 0
          ? !!email
          : !!email && allowedAdminEmails.includes(email);
      (token as { isAdmin?: boolean }).isAdmin = isAdmin;
      return token;
    },
    session({ session, token }) {
      const isAdmin = (token as { isAdmin?: boolean }).isAdmin ?? false;
      (session as { user?: { isAdmin?: boolean } }).user = {
        ...session.user,
        isAdmin,
      };
      return session;
    },
  },
});
