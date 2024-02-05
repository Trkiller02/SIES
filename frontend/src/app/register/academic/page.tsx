"use client";

import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { Form, Formik, Field } from "formik";
import { toast } from "sonner";
//HOOKS
import { useState, useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
//CONTEXT REGISTER
import { ctxDataRelation } from "@/components/register/ProviderCtx";
//UTILS
import {
  etapaSelect,
  levelSelect,
  seccionSelect,
  turnoSelect,
} from "@/utils/selectList";
import { fichaSchema, initValFicha } from "@/utils/schemas/FichaSchema";
import { fetchData } from "@/utils/fetchHandler";

export default function academicPage() {
  //SESION
  const { data: session } = useSession();

  //CTX
  const { dataRelations, setDataRelations } = useContext(ctxDataRelation);

  //PERIODO ESCOLAR BASADO EN AÑO
  const period = new Date().getFullYear();

  //ENRUTADOR
  const router = useRouter();

  const sendInfo = async (values: any) => {
    const res = await fetchData("/ficha", "POST", values, session?.user.token);

    setDataRelations({ ...dataRelations, fichaId: res.idFicha });

    if (res) {
      return "Registro exitoso.";
    }
  };

  return (
    <Formik
      initialValues={initValFicha}
      validationSchema={fichaSchema}
      onSubmit={async (values) => {
        toast.promise(sendInfo(values), {
          loading: "Procesando...",
          success: (data) => {
            router.push("/register/parents");
            return data;
          },
          error: (error: Error) => {
            return error.message === "Failed to fetch"
              ? "Error en conexión."
              : error.message ?? "";
          },
        });
      }}
    >
      {({ values, touched, errors, handleBlur, handleChange }) => (
        <Form className="h-2/4 w-3/4 border border-gray-300 rounded-xl shadow-xl p-8">
          <div className="flex items-center justify-center mb-7 w-full">
            <h1 className="text-2xl font-medium">
              Datos medicos <p className="text-primary-500 inline-flex">|</p>{" "}
              Registro
            </h1>
          </div>
          <div className="grid grid-cols-8 gap-3">
            <Field
              label="Institucion de procedencia:"
              name="proce_plant"
              variant="bordered"
              color={
                errors.proce_plant && touched.proce_plant ? "danger" : "primary"
              }
              errorMessage={
                errors.proce_plant && touched.proce_plant && errors.proce_plant
              }
              className="col-span-8"
              isRequired
              as={Input}
            />

            {/* ETAPA SELECT */}

            <Select
              items={etapaSelect}
              label="Etapa:"
              name="etapa"
              description="Seleccione una etapa."
              color={errors.etapa && touched.etapa ? "danger" : "primary"}
              errorMessage={errors.etapa && touched.etapa && errors.etapa}
              onBlur={handleBlur}
              onChange={handleChange}
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
            </Select>

            {/* LEVEL SELECT */}

            <Select
              items={
                values.etapa === "EP"
                  ? levelSelect
                  : values.etapa === "EM"
                  ? levelSelect.slice(0, 5)
                  : levelSelect
              }
              label="Level:"
              name="level"
              description="Seleccione un nivel."
              color={errors.level && touched.level ? "danger" : "primary"}
              errorMessage={errors.level && touched.level && errors.level}
              onBlur={handleBlur}
              onChange={handleChange}
              isRequired
            >
              {(level: { value: string | number; label: string }) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              )}
            </Select>

            {/* SECCION SELECT */}

            <Select
              items={seccionSelect}
              label="Sección:"
              name="section"
              description="Seleccione una sección."
              color={errors.section && touched.section ? "danger" : "primary"}
              errorMessage={errors.section && touched.section && errors.section}
              onBlur={handleBlur}
              onChange={handleChange}
              isRequired
            >
              {(seccion: { value: string | number; label: string }) => (
                <SelectItem key={seccion.value} value={seccion.value}>
                  {seccion.label}
                </SelectItem>
              )}
            </Select>

            {/* TURNO SELECT */}
            <Select
              items={turnoSelect}
              label="Turno:"
              name="turno"
              className="col-span-3"
              color={errors.turno && touched.turno ? "danger" : "primary"}
              errorMessage={errors.turno && touched.turno && errors.turno}
              onChange={handleChange}
              onBlur={handleBlur}
              isRequired
            >
              {(turno: { label: string; value: string }) => (
                <SelectItem key={turno.value} value={turno.value}>
                  {turno.label}
                </SelectItem>
              )}
            </Select>

            <Select
              isRequired
              label="Periodo Escolar:"
              name="escolar_period"
              className="col-span-3"
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={
                errors.escolar_period &&
                touched.escolar_period &&
                errors.escolar_period
              }
              color={
                errors.escolar_period && touched.escolar_period
                  ? "danger"
                  : "primary"
              }
            >
              <SelectItem key={`${period} - ${period + 1}`}>
                {`${period} - ${period + 1}`}
              </SelectItem>
              <SelectItem key={`${period + 1} - ${period + 2}`}>
                {`${period + 1} - ${period + 2}`}
              </SelectItem>
            </Select>
          </div>

          <div className="flex flex-row justify-around mt-7">
            <Button
              variant="ghost"
              className="w-3/12"
              color="danger"
              type="reset"
            >
              Limpiar
            </Button>
            <Button
              variant="solid"
              className="w-3/12"
              color="primary"
              type="submit"
            >
              Registrar
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
