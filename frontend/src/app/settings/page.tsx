"use client";

import { Avatar, AvatarIcon } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/auth/login");
  }

  return (
    <section className="p-20 bg-white rounded-xl shadow-md grid grid-cols-2">
      <div className="grid grid-rows-2 place-items-center gap-6">
        <Avatar
          isBordered
          as="button"
          className="transition-transform scale-150"
          color="primary"
          size="lg"
          icon={<AvatarIcon />}
        />
        <h1 className="text-3xl font-semibold text-black">
          {session?.user.name}&nbsp;{session?.user.lastname}
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-4 place-items-baseline">
        <p className="text-2xl text-gray-500">Correo electronico:</p>
        <p className="text-xl text-gray-700">{session?.user.email}</p>

        <p className="text-2xl text-gray-500">Cedula de Identidad:</p>
        <p className="text-xl text-gray-700">{session?.user.ci_number}</p>

        <p className="text-2xl text-gray-500 text-end">Rol:</p>
        <p className="text-xl text-gray-700">{session?.user.role}</p>
      </div>
    </section>
  );
}
