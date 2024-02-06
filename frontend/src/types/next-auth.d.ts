import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      role: string;
      ci_number: string;
      lastname?: string | null;
      token: string;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    lastname?: string | null;
    ci_number: string;
    role: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: User;
  }
}
