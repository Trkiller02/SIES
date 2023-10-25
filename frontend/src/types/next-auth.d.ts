import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      role: number;
      lastName?: string | null;
      token: string;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    lastName?: string | null;
    role: number;
    token: string;
  }
}
