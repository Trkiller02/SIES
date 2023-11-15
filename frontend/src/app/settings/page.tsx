"use client";

import { useSession } from "next-auth/react";

export default function SettingsPage() {
  const { data: session } = useSession();

  return (
    <section>
      <h1>
        {session?.user.name}&nbsp;{session?.user.lastName}
      </h1>
      <p>{session?.user.email}</p>
      <p>{session?.user.ciNumber}</p>
    </section>
  );
}
