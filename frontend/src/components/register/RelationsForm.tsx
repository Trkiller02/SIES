"use client";

//HOOKS
import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

//CONTEXT
import { ctxDataRelation } from "@/components/register/ProviderCtx";

//COMPONENTS
import { Button, Skeleton } from "@nextui-org/react";
import EntityCards from "../EntityCards";
import { Form, Formik } from "formik";
import { toast } from "sonner";

//UTILS
import { fetchData, fetchDataWithoutBody } from "@/utils/fetchHandler";
import { RepresentI, StudentI } from "@/types/register.interfaces";

export default function RelationsForm() {
  const { data: session } = useSession();
  const [mom, setMom] = useState<RepresentI>();
  const [dad, setDad] = useState<RepresentI>();
  const [represent, setRepresent] = useState<RepresentI>();
  const [student, setStudent] = useState<StudentI>();
  const router = useRouter();
  const { dataRelations } = useContext(ctxDataRelation);

  const clearRelationsFunc = (values: any) => {
    const relations = values;

    for (let i in relations) {
      if (relations[i] === "" || relations[i] === "omit") {
        delete relations[i];
      }
    }

    return relations;
  };

  const sendInfo = async (values: any) => {
    const data = clearRelationsFunc(values);

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
    const res = await fetchDataWithoutBody(
      "/represent/" + dataRelations.mother_id,
      session?.user.token
    );

    if (res) {
      setMom(res);
    }
  };

  const getDad = async () => {
    const res = await fetchDataWithoutBody(
      "/represent/" + dataRelations.father_id,
      session?.user.token
    );
    if (res) {
      setDad(res);
    }
  };

  const getRepresent = async () => {
    const res = await fetchDataWithoutBody(
      "/represent/" + dataRelations.represent_id,
      session?.user.token
    );

    if (res) {
      setRepresent(res);
    }
  };

  const getStudent = async () => {
    const res = await fetchDataWithoutBody(
      "/student/" + dataRelations.student_id,
      session?.user.token
    );

    if (res) {
      setRepresent(res);
    }
  };

  useEffect(() => {
    Promise.allSettled([getStudent, getMom, getDad, getRepresent]);
  }, [dataRelations]);

  return (
    <section>
      {student && represent ? (
        <Formik
          initialValues={dataRelations}
          onSubmit={async (values) => {
            toast.promise(sendInfo(values), {
              loading: "Procesando...",
              success: (data) => {
                if (typeof window !== "undefined") {
                  localStorage.removeItem("dataRelations");
                }
                router.push(`/search/student/`);
                return data;
              },
              error: (error: Error) => {
                return error.message === "Failed to fetch"
                  ? "Error en conexion"
                  : error.message;
              },
            });
          }}
        >
          <Form>
            <div>
              <EntityCards item={student} title="Estudiante:" />
              <EntityCards item={represent} title="Representante:" />
              {mom && <EntityCards item={mom} title="Madre:" />}
              {dad && <EntityCards item={dad} title="Padre:" />}
            </div>
            <Button
              isDisabled={!dataRelations.student_id}
              color="primary"
              variant="ghost"
              aria-label="Buscar entidad"
              className="w-3/4 h-3/4"
              size="md"
              type="submit"
            >
              Completar
            </Button>
          </Form>
        </Formik>
      ) : (
        <Skeleton content="Procesando..." />
      )}
      {!dataRelations && <p>No se encuentra información</p>}
    </section>
  );
}
