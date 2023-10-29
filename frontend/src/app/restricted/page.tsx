"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { MdAdminPanelSettings, MdKeyboardBackspace } from "react-icons/md";

export default function restrictedPage() {
  const iconReturn = <MdKeyboardBackspace className="text-2xl" />;
  const router = useRouter();
  return (
    <section className="flex flex-col border border-gray-300 rounded-md shadow-lg p-4 w-2/6">
      <div className="flex justify-center items-center px-6">
        <MdAdminPanelSettings className=" text-9xl text-warning-500" />
        <div>
          <h1>Acceso denegado.</h1>
          <p className="text-sm text-gray-400">
            No cuenta con los permisos para acceder a la ruta.
          </p>
        </div>
      </div>
      <Button
        variant="ghost"
        aria-label="return"
        color="primary"
        onPress={() => router.back()}
        startContent={iconReturn}
        className="m-4 font-semibold"
      >
        Regresar
      </Button>
    </section>
  );
}
