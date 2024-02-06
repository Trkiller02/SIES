"use client";

import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { fetchData, fetchDataWithoutBody } from "@/utils/fetchHandler";
import { useState, useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Form, Formik, Field } from "formik";
import { toast } from "sonner";
import { ctxDataRelation } from "@/components/register/ProviderCtx";
import { healthSchema, healthValInit } from "@/utils/schemas/HealthInfoSchema";
import { latSelect, sexSelect } from "@/utils/selectList";
import { HealthInfoI } from "@/types/register.interfaces";

export default function healthPage() {
  const { dataRelations, setDataRelations } = useContext(ctxDataRelation);
  const { data: session } = useSession();

  const router = useRouter();

  const [info, setInfo] = useState<HealthInfoI>();

  const reqInfo = async (value: string) => {
    const res = await fetchDataWithoutBody(
      "/health-info/" + value,
      session?.user.token
    );

    if (res) setInfo(res);
  };

  const sendInfo = async (values: any) => {
    const res = await fetchData(
      "/healt-info",
      "POST",
      values,
      session?.user.token
    );

    console.log(res);

    setDataRelations({ ...dataRelations, health_info_id: res.id });

    if (res) {
      return "Registro exitoso.";
    }
  };

  return (
    <Formik
      initialValues={info ? info : healthValInit}
      validationSchema={healthSchema}
      onSubmit={async (values) => {
        toast.promise(sendInfo(values), {
          loading: "Procesando...",
          success: (data) => {
            router.push("/register/academic");
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
            <Input
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
              onChange={handleChange}
              onBlur={handleBlur}
              className="col-span-3"
              value={values.prefer_act.toUpperCase()}
            />

            <Select
              items={sexSelect}
              isRequired
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
              isRequired
              label="lateralidad:"
              onChange={handleChange}
              onBlur={handleBlur}
              name="lateralidad"
              className="col-span-3"
              description={"Ingrese la  del estudiante."}
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
              value={`${values.weight}`}
              endContent={
                <p className="text-gray-400 font-medium text-base">kg</p>
              }
            />
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
              value={`${values.size}`}
              endContent={
                <p className="text-gray-400 font-medium text-base">m</p>
              }
            />

            <Input
              label="Lugar donde la practica:"
              name="site_act"
              variant="bordered"
              color={errors.site_act && touched.site_act ? "danger" : "primary"}
              errorMessage={
                errors.site_act && touched.site_act && errors.site_act
              }
              onChange={handleChange}
              onBlur={handleBlur}
              className="col-span-2"
              value={values.site_act.toUpperCase()}
            />

            <Input
              label="Horario en que la practica:"
              name="recre_time"
              variant="bordered"
              color={
                errors.recre_time && touched.recre_time ? "danger" : "primary"
              }
              errorMessage={
                errors.recre_time && touched.recre_time && errors.recre_time
              }
              onChange={handleChange}
              onBlur={handleBlur}
              className="col-span-2"
              value={values.recre_time.toUpperCase()}
            />

            <div className="col-span-1"></div>
            <Input
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
              onChange={handleChange}
              onBlur={handleBlur}
              className="col-span-3"
            />
            <Input
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
              onChange={handleChange}
              onBlur={handleBlur}
              className="col-span-3"
            />

            <Input
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
              onChange={handleChange}
              onBlur={handleBlur}
              className="col-span-3"
            />
            <div className="col-span-2"></div>
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
