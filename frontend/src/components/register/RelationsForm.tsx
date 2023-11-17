"use client";

import { useContext } from "react";
import { ctxDataRelation } from "@/components/register/ProviderCtx";
import { fetchData } from "@/utils/fetchHandler";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';

export default function RelationsForm() {
  const { data: session } = useSession();
  const router = useRouter()
  const { dataRelations, setDataRelations } = useContext(ctxDataRelation);

  const clearRelationsFunc = () => {
    const relations = dataRelations;

    for (let x in relations) {
      if (relations[x] === "" || relations[x] === "omit") {
        delete relations[x];
      }
    }

    return relations;
  };

  const handleSubmit = () => {
    const data = clearRelationsFunc();

    const res = fetchData(
      `/relations-table`,
      "POST",
      data,
      session?.user.token
    );

    if (res) {
      return "Registro completado";
    }
  };
  return (
    <section>
      {
        dataRelations ?
          <table className="table-auto border-collapse">
            <tbody>
              <tr>
                <td className="border border-blue-300 px-4 py-2">C.I Madre:</td>
                <td className="border border-blue-300 px-4 py-2">
                  {dataRelations.motherPersonCiNumbers === "omit" || dataRelations.motherPersonCiNumbers === "" || dataRelations.motherPersonCiNumbers === undefined ? (
                    "SIN PARENTESCO"
                  ) : dataRelations.motherPersonCiNumbers}
                </td>
              </tr>
              <tr>
                <td className="border border-blue-300 px-4 py-2">C.I Padre:</td>
                <td className="border border-blue-300 px-4 py-2">
                  {dataRelations.fatherPersonCiNumbers === "omit" || dataRelations.fatherPersonCiNumbers === "" || dataRelations.fatherPersonCiNumbers === undefined ? (
                    "SIN PARENTESCO"
                  ) : dataRelations.fatherPersonCiNumbers}
                </td>
              </tr>
              <tr>
                <td className="border border-blue-300 px-4 py-2">C.I REPRESENTANTE:</td>
                <td className="border border-blue-300 px-4 py-2">
                  {dataRelations.representCiNumbers === "omit" || dataRelations.representCiNumbers === "" || dataRelations.representCiNumbers === undefined ? (
                    "SIN PARENTESCO"
                  ) : dataRelations.representCiNumbers}
                </td>
              </tr>
              <tr>
                <td className="border border-blue-300 px-4 py-2">C.I Estudiante:</td>
                <td className="border border-blue-300 px-4 py-2">
                  {dataRelations.studentId ? dataRelations.studentId : ""}
                </td>
              </tr>
            </tbody>
          </table>
          : <p>No se encuentra información</p>
      }


      <Button
        isDisabled={dataRelations.studentId ? false : true}
        color="primary"
        variant="ghost"
        aria-label="Buscar entidad"
        className="w-3/4 h-3/4"
        size='md'
        onClick={() =>
          toast.promise(handleSubmit(), {
            loading: "Procesando...",
            success: (data) => {
              router.push(`/search/student/${dataRelations.studentId}`)
              if (typeof window !== 'undefined') {
                localStorage.removeItem('dataRelations')
              }
              return data;
            },
            error: (error: Error) => {
              if (error.message === "Failed to fetch") {
                return "Error en conexión.";
              }
              if (error.message === "Not Found") {
                return "Registro no encontrado. Puede continuar...";
              }
              return error.message;
            },
          })
        }
      >
        Completar
      </Button>
    </section>
  );
}
