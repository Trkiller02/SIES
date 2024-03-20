"use client";

//HOOKS
import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

//CONTEXT
import { ctxDataRelation } from "@/components/register/ProviderCtx";

//COMPONENTS
import { Button } from "@nextui-org/react";
import { Form, Formik } from "formik";
import { toast } from "sonner";

//UTILS
import { fetchData, fetchDataWithoutBody } from "@/utils/fetchHandler";
import { FichaI, RepresentI, StudentI } from "@/types/register.interfaces";
import StudentTable from "../tables/StudentTable";
import RepresentTable from "../tables/RepresentTable";

export default function RelationsForm() {
  const { data: session } = useSession();
  const [mom, setMom] = useState<RepresentI>();
  const [dad, setDad] = useState<RepresentI>();
  const [represent, setRepresent] = useState<RepresentI>();
  const [student, setStudent] = useState<StudentI>();
  const [ficha, setFicha] = useState<FichaI>();
  const router = useRouter();
  const { dataRelations, setDataRelations } = useContext(ctxDataRelation);

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

    console.log(data);

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

  const getFicha = async () => {
    const res = await fetchDataWithoutBody(
      "/ficha/" + dataRelations.ficha_id,
      session?.user.token
    );

    return res;
  };

  const getMom = async () => {
    const res = await fetchDataWithoutBody(
      "/represent/" + dataRelations.mother_id,
      session?.user.token
    );

    return res;
  };

  const getDad = async () => {
    const res = await fetchDataWithoutBody(
      "/represent/" + dataRelations.father_id,
      session?.user.token
    );

    return res;
  };

  const getRepresent = async () => {
    const res = await fetchDataWithoutBody(
      "/represent/" + dataRelations.represent_id,
      session?.user.token
    );

    return res;
  };

  const getStudent = async () => {
    const student: StudentI = await fetchDataWithoutBody(
      "/student/" + dataRelations.student_id,
      session?.user.token
    );
    return student;
  };

  useEffect(() => {
    setDataRelations((relations) => clearRelationsFunc(relations));

    toast.promise(getFicha, {
      loading: "Procesando...",
      success: (data) => {
        setFicha(data);
        return "Carga completa.";
      },
      error: (error: Error) => {
        return error.message;
      },
    });

    if (dataRelations.father_id) {
      toast.promise(getDad, {
        loading: "Procesando...",
        success: (data) => {
          setDad(data);
          return "Carga completa.";
        },
        error: (error: Error) => {
          return error.message;
        },
      });
    }

    if (dataRelations.mother_id) {
      toast.promise(getMom, {
        loading: "Procesando...",
        success: (data) => {
          setMom(data);
          return "Carga completa.";
        },
        error: (error: Error) => {
          return error.message;
        },
      });
    }

    toast.promise(getStudent, {
      loading: "Procesando...",
      success: (data) => {
        setStudent(data);
        return "Carga completa.";
      },
      error: (error: Error) => {
        return error.message;
      },
    });

    toast.promise(getRepresent, {
      loading: "Procesando...",
      success: (data) => {
        setRepresent(data);
        return "Carga completa.";
      },
      error: (error: Error) => {
        return error.message;
      },
    });
  }, [dataRelations]);

  return (
    <section className="w-full h-[80vh] justify-center items-center flex">
      <Formik
        initialValues={dataRelations}
        enableReinitialize
        onSubmit={async (values) => {
          console.log(values);

          toast.promise(sendInfo(values), {
            loading: "Procesando...",
            success: (data) => {
              if (typeof window !== "undefined") {
                localStorage.removeItem("dataRelations");
              }
              router.push(`/search/student/${dataRelations.student_id}`);
              return data;
            },
            error: (error: Error) => {
              return error.message === "Failed to fetch"
                ? "Error en conexión"
                : error.message;
            },
          });
        }}
      >
        <Form className="flex flex-col gap-4 items-center justify-center p-6 shadow-xl rounded-lg w-3/4 h-3/4 border border-gray-300 m-0">
          <h1 className="text-3cd xl">¿Completar Inscripción?</h1>
          <div className="w-full h-full flex flex-col justify-center items-center">
            {student !== undefined && (
              <>
                <h1 className="text-2xl self-start p-3">Estudiante: </h1>
                <StudentTable
                  relation
                  info={[{ ...ficha, relationTable: { student_id: student } }]}
                />
                <h2 className="text-2xl self-start p-3">Relaciones:</h2>
                <RepresentTable
                  relation
                  info={[
                    represent as RepresentI,
                    mom as RepresentI,
                    dad as RepresentI,
                  ]}
                />
              </>
            )}
          </div>
          <Button
            color="primary"
            variant="solid"
            className="w-1/4 h-1/6"
            size="md"
            type="submit"
          >
            Completar
          </Button>
        </Form>
      </Formik>
      {!dataRelations && <p>No se encuentra información</p>}
    </section>
  );
}
