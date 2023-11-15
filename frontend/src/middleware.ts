import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { RoleList } from "./utils/roleList";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    if (request.nextauth.token?.user.role === RoleList.USER) {
      return NextResponse.rewrite(new URL("/restricted", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/", "/dashboard/:path*", "/register/:path*", "/search/:path*"],
};
