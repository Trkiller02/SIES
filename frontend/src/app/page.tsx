"use client";

import { ROLE_LIST } from "@/utils/roleList";
import { Button, Select, SelectItem, Tooltip } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DashboardLayout from "./dashboard/layout";
import { Field, Form, Formik } from "formik";
import { toast } from "sonner";
import { fetchDataWithoutBody } from "@/utils/fetchHandler";
import {
  entitySelect,
  etapaSelect,
  levelSelect,
  seccionSelect,
} from "@/utils/selectList";
import * as Yup from "yup";
import { searchInitVal, searchSchema } from "@/utils/schemas/SearchSchema";

export default function indexSearchPage() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session?.user.role !== ROLE_LIST.ADMIN) {
    entitySelect.pop();
  }

  const reqInfo = async (value: {
    entity: string;
    etapa: string;
    seccion: string;
    level: string;
    id: string;
  }) => {
    let url = `/${value.entity}`;

    if (value.etapa && value.level) {
      url.concat(`?etapa=${value.etapa}&level=${value.level}`);
      if (value.seccion) {
        url.concat(`&seccion=${value.seccion}`);
      }
    }

    if (value.id !== "") {
      url = `/${value.entity}/${value.id}`;
    }

    console.log(url);

    const req = await fetchDataWithoutBody(url, session?.user.token);

    if (req?.ok) {
      return "¡Inicio de Sesion con exito!";
    } else {
      throw req;
    }
  };

  return (
    <DashboardLayout>
      <Formik
        initialValues={searchInitVal}
        validationSchema={searchSchema}
        onSubmit={async (values) => {
          toast.promise(reqInfo(values), {
            loading: "Procesando...",
            success: (data) => {
              router.push("/");
              return data;
            },
            error: (error: Error) => {
              return error.message;
            },
          });
        }}
      >
        {({ values, errors, touched }) => (
          <Form className="w-3/6 flex justify-center items-center flex-col max-lg:w-full max-lg:p-0 px-7">
            <div className="flex items-center justify-center mb-3">
              <h1 className="text-2xl max-md:text-xl text-primary">
                Iniciar Sesión
              </h1>
            </div>
            <div className="flex flex-row max-md:flex-col gap-3 w-full">
              {/* ENTITY SELECT */}

              <Field
                items={entitySelect}
                name="entity"
                label="Entidad:"
                description="Seleccione una entidad."
                color={errors.entity && touched.entity ? "danger" : "primary"}
                errorMessage={errors.entity && touched.entity && errors.entity}
                isRequired
                as={Select}
              >
                {(entity: {
                  value: string | number;
                  description?: string;
                  label: string;
                }) => (
                  <SelectItem
                    key={entity.value}
                    value={entity.value}
                    description={entity.description}
                  >
                    {entity.label}
                  </SelectItem>
                )}
              </Field>

              {/* ETAPA SELECT */}

              <Field
                items={etapaSelect}
                label="Etapa:"
                name="etapa"
                description="Seleccione una etapa."
                color={errors.etapa && touched.etapa ? "danger" : "primary"}
                errorMessage={errors.etapa && touched.etapa && errors.etapa}
                isRequired={values.entity === "student"}
                isDisabled={values.entity !== "student"}
                as={Select}
              >
                {(etapa: {
                  value: string | number;
                  description?: string;
                  label: string;
                }) => (
                  <SelectItem
                    key={etapa.value}
                    value={etapa.value}
                    description={etapa.description}
                  >
                    {etapa.label}
                  </SelectItem>
                )}
              </Field>

              {/* LEVEL SELECT */}

              <Field
                items={
                  values.etapa === "EP"
                    ? levelSelect
                    : values.etapa === "EM"
                    ? levelSelect.slice(0, 4)
                    : levelSelect
                }
                label="Level:"
                name="level"
                description="Seleccione un nivel."
                color={errors.level && touched.level ? "danger" : "primary"}
                errorMessage={errors.level && touched.level && errors.level}
                isRequired={values.etapa !== ""}
                isDisabled={values.entity !== "student"}
                as={Select}
              >
                {(level: { value: string | number; label: string }) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                )}
              </Field>

              {/* SECCION SELECT */}

              <Field
                items={seccionSelect}
                label="Sección:"
                name="seccion"
                description="Seleccione una sección."
                color={errors.seccion && touched.seccion ? "danger" : "primary"}
                errorMessage={
                  errors.seccion && touched.seccion && errors.seccion
                }
                isDisabled={values.entity !== "student"}
                as={Select}
              >
                {(seccion: { value: string | number; label: string }) => (
                  <SelectItem key={seccion.value} value={seccion.value}>
                    {seccion.label}
                  </SelectItem>
                )}
              </Field>
            </div>
          </Form>
        )}
      </Formik>
    </DashboardLayout>
  );
}
