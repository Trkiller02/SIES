import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.endsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  /* if (request.nextUrl.pathname.endsWith("/auth/login")) {
    return NextResponse.redirect(new URL("/auth/register", request.url));
  } */

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*"],
};
