import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { ROLE_LIST } from "./utils/roleList";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    if (
      request.nextauth.token?.user.role === null ||
      request.nextauth.token?.user.role === undefined
    ) {
      return NextResponse.rewrite(new URL("/auth/login", request.url));
    }

    if (
      (request.nextUrl.pathname.endsWith("/settings") || request.nextUrl.pathname.endsWith("/register/user") || request.nextUrl.pathname.startsWith("/edit/user")) &&
      (request.nextauth.token?.user.role as string) !== ROLE_LIST.ADMIN
    ) {
      return NextResponse.rewrite(new URL("/", request.url));
    }

    if (
      (request.nextUrl.pathname.startsWith('/edit') || request.nextUrl.pathname.startsWith('/register')) &&
      (request.nextauth.token?.user.role as string) === ROLE_LIST.VIEWER
    ) {
      return NextResponse.rewrite(new URL("/", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => true//!!token,
    },
  }
);

export const config = {
  matcher: ["/register/:path*"], // "/edit/:path*", "/settings", '/', "/search/:path*" ],
};
