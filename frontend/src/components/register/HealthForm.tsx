"use client";

import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { fetchData, fetchDataWithoutBody } from "@/utils/fetchHandler";
import { useState, useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Form, Formik, Field } from "formik";
import { toast } from "sonner";
import { ctxDataRelation } from "@/components/register/ProviderCtx";
import {
  healthSchema,
  healthSchemaUpdate,
  healthValInit,
} from "@/utils/schemas/HealthInfoSchema";
import { latSelect, sexSelect } from "@/utils/selectList";
import { HealthInfoI } from "@/types/register.interfaces";

export default function HealthForm({
  edit,
  id,
}: {
  edit?: boolean;
  id?: string;
}) {
  const { dataRelations, setDataRelations } = useContext(ctxDataRelation);
  const { data: session } = useSession();

  const router = useRouter();

  const [info, setInfo] = useState<HealthInfoI>(healthValInit);

  const reqInfo = async (value: string) => {
    const res = await fetchDataWithoutBody(
      "/health-info/" + value,
      session?.user.token
    );

    if (res) setInfo(res);

    return "Carga completa...";
  };

  if (edit) {
    useEffect(() => {
      toast.promise(reqInfo(id!), {
        loading: "Procesando",
        success: (data) => {
          return data;
        },
        error: (error: Error) => {
          return error.message === "Failed to fetch"
            ? "Error en conexión."
            : error.message ?? "";
        },
      });
    }, []);
  }

  const sendInfo = async (values: any) => {
    console.log(values.weight, typeof values.weight);
    console.log(values.size, typeof values.size);

    const res = await fetchData(
      "/health-info",
      "POST",
      {
        ...values,
        weight: parseFloat(values.weight),
        size: parseFloat(values.size),
      },
      session?.user.token
    );

    if (res) {
      setDataRelations({ ...dataRelations, health_info_id: res.id });
      return "Registro exitoso.";
    }
  };

  const sendInfoUpdate = async (values: any) => {
    const res = await fetchData(
      "/health-info",
      "PATCH",
      {
        ...values,
        weight: parseFloat(values.weight),
        size: parseFloat(values.size),
      },
      session?.user.token
    );

    if (res) {
      return "Registro exitoso.";
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={info}
      validationSchema={edit ? healthSchema : healthSchemaUpdate}
      onSubmit={async (values: HealthInfoI) => {
        toast.promise(edit ? sendInfoUpdate(values) : sendInfo(values), {
          loading: "Procesando...",
          success: (data) => {
            if (edit) {
              router.back();
            } else {
              router.push("/register/academic");
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
              Datos medicos <p className="text-primary-500 inline-flex">|</p>{" "}
              Registro
            </h1>
          </div>
          <div className="grid grid-cols-8 gap-3">
            <Select
              items={sexSelect}
              selectedKeys={[values.sex]}
              isRequired={edit ? false : true}
              label="Genero:"
              name="sex"
              className="col-span-3"
              description={"Ingrese el genero del estudiante."}
              errorMessage={errors.sex && touched.sex && errors.sex}
              color={errors.sex && touched.sex ? "danger" : "primary"}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              {(item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              )}
            </Select>

            <Select
              items={latSelect}
              name="lateralidad"
              label="lateralidad:"
              onChange={handleChange}
              onBlur={handleBlur}
              className="col-span-3"
              description="Ingrese la  del estudiante."
              selectedKeys={[values.lateralidad]}
              errorMessage={
                errors.lateralidad && touched.lateralidad && errors.lateralidad
              }
              color={
                errors.lateralidad && touched.lateralidad ? "danger" : "primary"
              }
            >
              {(item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              )}
            </Select>

            {/* PESO FIELD */}
            <Field
              as={Input}
              label="Peso:"
              type="number"
              name="weight"
              description="Ingrese el peso del Estudiante."
              variant="bordered"
              color={errors.weight && touched.weight ? "danger" : "primary"}
              errorMessage={errors.weight && touched.weight && errors.weight}
              className="col-span-3"
              endContent={
                <p className="text-gray-400 font-medium text-base">kg</p>
              }
            />

            {/* ESTATURA FIELD */}
            <Field
              as={Input}
              label="Estatura:"
              type="number"
              name="size"
              description="Ingrese el peso del Estudiante."
              variant="bordered"
              color={errors.size && touched.size ? "danger" : "primary"}
              errorMessage={errors.size && touched.size && errors.size}
              className="col-span-2"
              endContent={
                <p className="text-gray-400 font-medium text-base">m</p>
              }
            />

            {/* LIVE FIELD */}
            <Field
              as={Input}
              label="Vive con:"
              name="live_with"
              description="El estudiante vive con que familiar."
              variant="bordered"
              color={
                errors.live_with && touched.live_with ? "danger" : "primary"
              }
              errorMessage={
                errors.live_with && touched.live_with && errors.live_with
              }
              isRequired={edit ? false : true}
              className="col-span-3"
              value={values.live_with.toUpperCase()}
            />

            {/* PREFER ACT FIELD */}
            <Field
              as={Input}
              label="Practica una actividad extracurricular:"
              name="prefer_act"
              description="Llene el campo de ser necesario."
              variant="bordered"
              color={
                errors.prefer_act && touched.prefer_act ? "danger" : "primary"
              }
              errorMessage={
                errors.prefer_act && touched.prefer_act && errors.prefer_act
              }
              className="col-span-3"
              value={values.prefer_act.toUpperCase()}
            />

            {/* SITE PREFER ACT FIELD */}
            <Field
              as={Input}
              description="Llene el campo de ser necesario."
              label="Lugar donde la practica:"
              name="site_act"
              variant="bordered"
              color={errors.site_act && touched.site_act ? "danger" : "primary"}
              errorMessage={
                errors.site_act && touched.site_act && errors.site_act
              }
              className="col-span-3"
              value={values.site_act.toUpperCase()}
            />

            {/* RECRE TIME FIELD */}
            <Field
              as={Input}
              label="Horario en que la practica:"
              name="recre_time"
              variant="bordered"
              description="Tiempo que utiliza en la actividad."
              color={
                errors.recre_time && touched.recre_time ? "danger" : "primary"
              }
              errorMessage={
                errors.recre_time && touched.recre_time && errors.recre_time
              }
              className="col-span-2"
              value={values.recre_time.toUpperCase()}
            />

            {/* TYPE ALER FIELD */}
            <Field
              as={Input}
              label="Alergico a:"
              name="type_aler"
              description="Llene el campo de ser necesario."
              variant="bordered"
              color={
                errors.type_aler && touched.type_aler ? "danger" : "primary"
              }
              errorMessage={
                errors.type_aler && touched.type_aler && errors.type_aler
              }
              className="col-span-3"
              value={values.type_aler.toUpperCase()}
            />

            {/* TRATA ESP FIELD */}
            <Field
              as={Input}
              label="Requiere de un tratamiento especial:"
              name="trata_esp"
              description="Llene el campo de ser necesario."
              variant="bordered"
              color={
                errors.trata_esp && touched.trata_esp ? "danger" : "primary"
              }
              errorMessage={
                errors.trata_esp && touched.trata_esp && errors.trata_esp
              }
              className="col-span-3"
              value={values.trata_esp.toUpperCase()}
            />
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
              {edit ? "Actualizar" : "Registrar"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
