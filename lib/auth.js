import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { findUserByGoogleId, upsertGoogleUser } from "@/lib/users";

function getAuthSecret() {
  if (process.env.AUTH_SECRET) {
    return process.env.AUTH_SECRET;
  }

  if (process.env.NODE_ENV === "development") {
    return "sahaj-local-dev-auth-secret";
  }

  return undefined;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: getAuthSecret(),
  providers: [Google],
  pages: {
    signIn: "/login",
  },
  trustHost: true,
  callbacks: {
    async signIn({ account, profile, user }) {
      if (account?.provider !== "google") return true;

      const googleId = profile?.sub || account.providerAccountId;
      if (!googleId || !user.email) return true;

      await upsertGoogleUser({
        googleId,
        email: user.email,
        name: user.name,
        image: user.image,
      });

      return true;
    },
    async jwt({ token, account, profile }) {
      if (account?.provider === "google") {
        const googleId = profile?.sub || account.providerAccountId;
        if (googleId) {
          const dbUser =
            (await findUserByGoogleId(googleId)) ||
            (await upsertGoogleUser({
              googleId,
              email: token.email,
              name: token.name,
              image: token.picture,
            }));

          if (dbUser?.id) {
            token.userId = dbUser.id;
          }
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.userId) {
        session.user.id = token.userId;
      }

      return session;
    },
  },
});
