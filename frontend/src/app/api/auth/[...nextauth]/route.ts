import NextAuth, { User } from "next-auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "user@user.com" },
        ciNumber: {
          label: "ciNumber",
          type: "text",
          placeholder: "V2123",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

        const res = await fetch(backendUrl + "/auth/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();

        if (!res.ok) throw user;

        if (res.ok && user) return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          name: user.name,
          lastName: user.lastName,
          ciNumber: user.ciNumber,
          email: user.email,
          role: user.role,
          token: user.token,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User;
      return session;
    },
  },
  pages: {
    signOut: "/auth/login",
    signIn: "/auth/login",
    error: "/auth/login",
  },
  session: { strategy: "jwt", maxAge: 12 * 60 * 60 },
  jwt: { maxAge: 12 * 60 * 60 },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
