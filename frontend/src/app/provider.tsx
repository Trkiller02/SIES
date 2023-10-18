"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export default function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <NextUIProvider>
      <SessionProvider session={session}>{children}</SessionProvider>
    </NextUIProvider>
  );
}
