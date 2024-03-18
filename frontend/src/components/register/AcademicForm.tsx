"use client";

import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { Form, Formik, Field } from "formik";
import { toast } from "sonner";
//HOOKS
import { useState, useContext, useEffect } from "react";
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
import {
  fichaSchema,
  fichaSchemaUpdate,
  initValFicha,
} from "@/utils/schemas/FichaSchema";
import { fetchData, fetchDataWithoutBody } from "@/utils/fetchHandler";
import { FichaI } from "@/types/register.interfaces";

interface FichaDto {
  level: number;
  section: string;
  etapa: string;
  turno: string;
  proce_plant: string;
  escolar_period: string;
  egresado?: boolean;
}

export default function AcademicForm({
  edit,
  id,
}: {
  edit?: boolean;
  id?: string;
}) {
  //SESION
  const { data: session } = useSession();

  //CTX
  const { dataRelations, setDataRelations } = useContext(ctxDataRelation);
  const [info, setInfo] = useState<FichaDto>(initValFicha);

  const getInfo = async (id: string) => {
    const res: FichaDto = await fetchDataWithoutBody(
      `/ficha/${id}`,
      session?.user.token
    );

    if (res) {
      return res;
    }
  };

  if (edit) {
    useEffect(() => {
      toast.promise(getInfo(id!), {
        loading: "Cargando...",
        success: (data) => {
          setInfo({
            section: data!.section,
            level: data!.level,
            etapa: data!.etapa,
            turno: data!.turno,
            escolar_period: data!.escolar_period,
            proce_plant: data!.proce_plant,
            egresado: data!.egresado,
          });
          return "Carga completa...";
        },
        error: (error: Error) => {
          return error.message;
        },
      });
    }, []);
  }

  //PERIODO ESCOLAR BASADO EN AÑO
  const period = new Date().getFullYear();

  //ENRUTADOR
  const router = useRouter();

  const sendInfoUpdate = async (values: FichaDto) => {
    const res: FichaDto = await fetchData(
      `/ficha/${id}`,
      "PATCH",
      {
        ...values,
        level:
          typeof values.level === "string"
            ? parseInt(values.level)
            : values.level,
      },
      session?.user.token
    );

    if (res) {
      return "Actualización exitosa.";
    }
  };

  const sendInfo = async (values: any) => {
    const res: FichaI = await fetchData(
      "/ficha",
      "POST",
      {
        ...values,
        level:
          typeof values.level === "string"
            ? parseInt(values.level)
            : values.level,
      },
      session?.user.token
    );

    if (res) {
      setDataRelations({ ...dataRelations, ficha_id: res.id! });
      return "Registro exitoso.";
    }
  };

  return (
    <Formik
      initialValues={info!}
      enableReinitialize
      validationSchema={edit ? fichaSchemaUpdate : fichaSchema}
      onSubmit={async (values: FichaDto) => {
        toast.promise(edit ? sendInfoUpdate(values) : sendInfo(values), {
          loading: "Procesando...",
          success: (data) => {
            if (edit) {
              router.back();
            } else {
              router.push("/register/parents");
            }
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
              Datos Academicos <p className="text-primary-500 inline-flex">|</p>{" "}
              Registro
            </h1>
          </div>
          <div className="grid grid-cols-8 gap-3">
            {/* ETAPA SELECT */}

            <Select
              items={etapaSelect}
              label="Etapa:"
              name="etapa"
              isRequired={edit ? false : true}
              description="Seleccione una etapa."
              selectedKeys={[values.etapa]}
              color={errors.etapa && touched.etapa ? "danger" : "primary"}
              errorMessage={errors.etapa && touched.etapa && errors.etapa}
              onBlur={handleBlur}
              onChange={handleChange}
              className="col-span-2"
            >
              {(etapa: {
                value: string;
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
                values.etapa === "EDUCACION PRIMARIA"
                  ? levelSelect
                  : values.etapa === "EDUCACION MEDIA"
                  ? levelSelect.slice(0, 5)
                  : levelSelect
              }
              selectedKeys={[values.level.toString()]}
              label="Level:"
              name="level"
              description="Seleccione un nivel."
              color={errors.level && touched.level ? "danger" : "primary"}
              errorMessage={errors.level && touched.level && errors.level}
              onBlur={handleBlur}
              onChange={handleChange}
              isRequired={edit ? false : true}
              className="col-span-1"
            >
              {(level: { value: number; label: string }) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              )}
            </Select>

            {/* SECCION SELECT */}

            <Select
              selectedKeys={[values.section]}
              items={seccionSelect}
              label="Sección:"
              name="section"
              description="Seleccione una sección."
              color={errors.section && touched.section ? "danger" : "primary"}
              errorMessage={errors.section && touched.section && errors.section}
              onBlur={handleBlur}
              onChange={handleChange}
              isRequired={edit ? false : true}
              className="col-span-1"
            >
              {(seccion: { value: string | number; label: string }) => (
                <SelectItem key={seccion.value} value={seccion.value}>
                  {seccion.label}
                </SelectItem>
              )}
            </Select>

            {/* TURNO SELECT */}
            <Select
              selectedKeys={[values.turno]}
              items={turnoSelect}
              label="Turno:"
              name="turno"
              className="col-span-2"
              color={errors.turno && touched.turno ? "danger" : "primary"}
              errorMessage={errors.turno && touched.turno && errors.turno}
              onChange={handleChange}
              onBlur={handleBlur}
              isRequired={edit ? false : true}
            >
              {(turno: { label: string; value: string }) => (
                <SelectItem key={turno.value} value={turno.value}>
                  {turno.label}
                </SelectItem>
              )}
            </Select>

            <Select
              selectedKeys={[values.escolar_period.toString()]}
              isRequired={edit ? false : true}
              label="Periodo Escolar:"
              name="escolar_period"
              className="col-span-2"
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

            {/* EGRESADO FIELD */}
            {edit && (
              <Select
                selectedKeys={[Number(values.egresado)]}
                label="Egresado:"
                name="egresado"
                className="col-span-2"
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={
                  errors.egresado && touched.egresado && errors.egresado
                }
                color={
                  errors.egresado && touched.egresado ? "danger" : "primary"
                }
              >
                <SelectItem key={1}>VERDADERO</SelectItem>
                <SelectItem key={0}>FALSO</SelectItem>
              </Select>
            )}

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
              isRequired={edit ? false : true}
              value={values.proce_plant.toUpperCase()}
              as={Input}
            />
          </div>

          <div className="flex flex-row justify-around mt-7">
            {edit && (
              <Button
                variant="ghost"
                size="lg"
                color="primary"
                onClick={() => router.back()}
              >
                Regresar
              </Button>
            )}
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
              {edit ? "Actualizar" : "Registrar"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
