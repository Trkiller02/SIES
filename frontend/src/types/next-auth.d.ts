import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      role: string;
      lastName?: string | null;
      token: string;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    lastName?: string | null;
    role: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: User;
  }
}
