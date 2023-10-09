import type { NextRequest, NextResponse } from "next/server"
import NextAuth from "next-auth"

export default async function auth(req: NextRequest) {
  return await NextAuth(req, {
    ...
  })
}

export {auth as GET, auth as POST}