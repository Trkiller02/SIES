"use client";
import UploadForm from "@/components/UploadForm";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/auth/login");
  }

  const downloadPlanilla = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tools/planilla/examples`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + session?.user.token,
        },
      }
    );

    const blob = await res.blob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `planillaExample.docx`;
    a.click();

    URL.revokeObjectURL(url);

    return;
  };

  const downloadConstancia = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tools/constancia/example`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + session?.user.token,
        },
      }
    );

    const blob = await res.blob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `planillaExample.docx`;
    a.click();

    URL.revokeObjectURL(url);

    return;
  };

  return (
    <section className="w-1/2 border border-gray-300 shadow-xl p-8 rounded-xl flex flex-col justify-center items-center gap-6">
      <div>
        <h3 className="font-medium text-xl">Actualizar Planilla: </h3>
        <p className="text-gray-600">
          El formato admitido por el formulario es del tipo (.docx), recuerde
          que tenga el formato como el archivo de ejemplo.
        </p>
        <UploadForm session={session!} />
      </div>
      <div>
        <h3 className="font-medium text-xl">Actualizar Constancia: </h3>
        <p className="text-gray-600">
          El formato admitido por el formulario es del tipo (.docx), recuerde
          que tenga el formato como el archivo de ejemplo.
        </p>
        <UploadForm session={session!} constancia />
      </div>
      <div className="w-full">
        <h3 className="font-medium text-2xl">Ejemplos: </h3>
        <p className="text-gray-600">
          Ejemplos en formato (.docx) de guías para modificar las plantillas en
          uso.
        </p>
        <div className="inline-flex w-full justify-evenly p-3">
          <Button
            color="primary"
            size="lg"
            variant="solid"
            onPress={downloadPlanilla}
          >
            Descargar Planilla
          </Button>
          <Button
            color="primary"
            size="lg"
            variant="solid"
            onPress={downloadConstancia}
          >
            Descargar Constancia
          </Button>
        </div>
      </div>
    </section>
  );
}
