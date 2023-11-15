"use client";

import { useContext } from "react";
import { ctxDataRelation } from "@/components/register/ProviderCtx";
import { fetchData } from "@/utils/fetchHandler";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@nextui-org/react";

export default function RelationsForm() {
  const { data: session } = useSession();
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/relations-table`,
      "POST",
      data,
      session?.user.token
    );

    return res;
  };
  return (
    <section>
      {dataRelations.motherPersonCiNumbers && (
        <p>C.I MADRE: {dataRelations.motherPersonCiNumbers}</p>
      )}
      {dataRelations.motherPersonCiNumbers === "omit" && (
        <p>C.I MADRE: SIN PARENTESCO</p>
      )}
      {dataRelations.fatherPersonCiNumbers && (
        <p>C.I Padre: {dataRelations.fatherPersonCiNumbers}</p>
      )}
      {dataRelations.fatherPersonCiNumbers === "omit" && (
        <p>C.I PADRE: SIN PARENTESCO.</p>
      )}
      {dataRelations.representCiNumbers && (
        <p>C.I REPRESENTANTE: {dataRelations.representCiNumbers}</p>
      )}
      {dataRelations.representCiNumbers === "omit" ||
        (dataRelations.representCiNumbers === "" && (
          <p>C.I REPRESENTANTE: SIN PARENTESCO.</p>
        ))}
      {dataRelations.thirdPersonCiNumbers && (
        <p>C.I FAMILIAR: {dataRelations.thirdPersonCiNumbers}</p>
      )}{" "}
      {dataRelations.thirdPersonCiNumbers === "omit" ||
        (dataRelations.thirdPersonCiNumbers === "" && (
          <p>C.I FAIMILIAR: SIN PARENTESCO.</p>
        ))}
      {dataRelations.studentId ? dataRelations.studentId : ""}
      <Button
        isDisabled={dataRelations.studentId ? false : true}
        color="primary"
        variant="ghost"
        aria-label="Buscar entidad"
        className="w-3/4 h-3/4"
        onClick={() =>
          toast.promise(handleSubmit(), {
            loading: "Procesando...",
            success: (data) => {
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
