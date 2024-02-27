"use client";

import { RepresentI } from "@/types/register.interfaces";
import { fetchData, fetchDataWithoutBody } from "@/utils/fetchHandler";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function representDetailsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data: session } = useSession();
  const [data, setData] = useState<RepresentI>();
  const router = useRouter();

  const getRepresent = async () => {
    const res: RepresentI = await fetchDataWithoutBody(
      `/represent/${id}`,
      session?.user.token
    );

    if (res) setData(res);

    return "Carga completa.";
  };

  const downloadExcel = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tools/excel`,
      {
        method: "POST",
        body: JSON.stringify({
          entity: "represent",
          id: id,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session?.user.token,
        },
      }
    );

    console.log(res);

    if (res) {
      const blob = await res.blob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `excel${data?.person_id.ci_number}.xlsx`;
      a.click();

      URL.revokeObjectURL(url);

      return;
    }
  };

  useEffect(() => {
    toast.promise(getRepresent(), {
      loading: "Procesando...",
      success: (data) => {
        return data;
      },
      error: (err: Error) => {
        return err.message;
      },
    });
  }, []);

  return (
    <section className="w-3/4">
      {data && typeof data !== "undefined" ? (
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2 shadow-lg rounded-xl border border-gray-300 p-6">
            <div className="flex justify-between">
              <h1 className="text-2xl text-primary pb-3">Representante:</h1>
              <div className="flex gap-2">
                <Button
                  variant="bordered"
                  color="warning"
                  onPress={() => router.push(`/edit/represent/${id}`)}
                >
                  Editar
                </Button>
                <Button
                  variant="bordered"
                  color="success"
                  onPress={() =>
                    toast.promise(downloadExcel, {
                      loading: "Procesando...",
                      success: (data) => {
                        return "Descarga en proceso.";
                      },
                      error: (err: Error) => {
                        return err.message;
                      },
                    })
                  }
                >
                  Descargar en Excel
                </Button>
              </div>
            </div>

            <p className="text-lg">Datos Personales:</p>
            <div className="grid grid-cols-3 gap-1 p-3 mb-2 border border-gray-300 rounded-xl shadow-inner">
              <div className="flex flex-col gap-1">
                <p className="font-semibold">
                  Nombres:&nbsp;&nbsp;
                  <span className="font-normal">{data?.person_id.name}</span>
                </p>

                <p className="font-semibold">
                  Numero telefónico:&nbsp;&nbsp;
                  <span className="font-normal">
                    {!data?.person_id.phone_number
                      ? "NO POSEE"
                      : data?.person_id.phone_number}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">
                  Apellidos:&nbsp;&nbsp;
                  <span className="font-normal">
                    {data?.person_id.lastname}
                  </span>
                </p>
                <p className="font-semibold">
                  Correo electrónico:&nbsp;&nbsp;
                  <span className="font-normal">
                    {!data?.person_id.email
                      ? "NO POSEE"
                      : data?.person_id.email}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">
                  Cédula de identidad:&nbsp;&nbsp;
                  <span className="font-normal">
                    {data?.person_id.ci_number}
                  </span>
                </p>
                <p className="font-semibold">
                  Relación:&nbsp;&nbsp;
                  <span className="font-normal">
                    {data?.person_id.relation}
                  </span>
                </p>
              </div>
              <p className="font-semibold col-span-3 py-2">
                Dirección de habitación:&nbsp;&nbsp;
                <span className="font-normal">
                  {data.person_id.home_municipio}&nbsp;
                  {data.person_id.home_parroquia}&nbsp;
                  {data?.person_id.home_dir}
                </span>
              </p>
            </div>

            <p className="text-lg">Datos Económicos:</p>
            <div className="grid grid-cols-2 gap-1 p-3 mb-2 border border-gray-300 rounded-xl shadow-inner">
              <div className="flex flex-col gap-1">
                <p className="font-semibold">
                  Profesión:&nbsp;&nbsp;
                  <span className="font-normal">
                    {data?.profession ?? "NO POSEE"}
                  </span>
                </p>

                <p className="font-semibold">
                  Lugar de Trabajo:&nbsp;&nbsp;
                  <span className="font-normal">
                    {!data?.work_place ?? "NO POSEE"}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">
                  Número telefónico del Trabajo:&nbsp;&nbsp;
                  <span className="font-normal">
                    {data?.work_phone_number ?? "NO POSEE"}
                  </span>
                </p>
                <p className="font-semibold">
                  Ingresos Mensuales:&nbsp;&nbsp;
                  <span className="font-normal">
                    {!data?.income_month ?? "NO POSEE"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        "Cargando..."
      )}
    </section>
  );
}
