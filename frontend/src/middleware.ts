import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { RoleList } from "./utils/roleList";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    if (
      (request.nextauth.token?.user.role as string) === RoleList.USER &&
      request.nextauth.token?.user.role !== undefined
    ) {
      return NextResponse.rewrite(new URL("/settings", request.url));
    }

    if (
      request.nextauth.token?.user.role === null ||
      request.nextauth.token?.user.role === undefined
    ) {
      return NextResponse.rewrite(new URL("/auth/login", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    /*     "/",
    "/dashboard/:path*",
    "/register/:path*",
    "/search/:path*", */
    "/settings",
  ],
};
