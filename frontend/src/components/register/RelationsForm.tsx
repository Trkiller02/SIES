"use client";

import { useContext, useEffect, useState } from "react";
import { ctxDataRelation } from "@/components/register/ProviderCtx";
import { fetchData, fetchDataWithoutBody } from "@/utils/fetchHandler";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { RepresentI, StudentI } from '../planilla/PlanillaMedia';

interface DataI {
  relationTable: {
    studentRelation: {
      studentRelation: {
        name: string;
        lastName: string;
        ciNumber: string;
        relation: string;
      }
    }

  }
}


export default function RelationsForm() {
  const { data: session } = useSession();
  const [mom, setMom] = useState<RepresentI>()
  const [dad, setDad] = useState<RepresentI>()
  const [represent, setRepresent] = useState<RepresentI>()
  const [student, setStudent] = useState<StudentI>()
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

  const handleSubmit = async () => {
    const data = clearRelationsFunc();

    const res = await fetchData(
      `/relations-table`,
      "POST",
      data,
      session?.user.token
    );

    if (res) {
      return "Registro completado";
    }
  };

  const getMom = async () => {
    const res = await fetchDataWithoutBody('/represent/' + dataRelations.motherPersonCiNumbers, session?.user.token)

    if (res) {
      setMom(res)
    }
  }

  const getDad = async () => {
    const res = await fetchDataWithoutBody('/represent/' + dataRelations.fatherPersonCiNumbers, session?.user.token)
    if (res) {
      setDad(res)
    }
  }

  const getRepresent = async () => {
    const res = await fetchDataWithoutBody('/represent/' + dataRelations.representCiNumbers, session?.user.token)

    if (res) {
      setRepresent(res)
    }

  }

  const getStudent = async () => {
    const res = await fetchDataWithoutBody('/student/' + dataRelations.studentId, session?.user.token)

    if (res) {
      setRepresent(res)
    }

  }


  useEffect(() => {
    getMom()
    getDad()
    getRepresent()
    getStudent()
  }, [dataRelations])


  return (
    <section>
      {
        dataRelations ?
          <>
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
                    if (typeof window !== 'undefined') {
                      localStorage.removeItem('dataRelations')
                    }
                    router.push(`/search/student/`)
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
          </>
          : <p>No se encuentra información</p>
      }




    </section >
  );
}
