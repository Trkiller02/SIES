"use client";

import { Input, Button, Select, SelectItem, Tooltip } from "@nextui-org/react";
import { MdSearch } from "react-icons/md";
import { fetchData, fetchDataWithoutBody } from "@/utils/fetchHandler";
import { useState, useContext, useEffect } from "react";
import { initValStudent, studentSchema } from "@/utils/schemas/StudentSchema";
import { ctxDataRelation } from "./ProviderCtx";
import { dateHandler } from "@/utils/dateHandler";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Field, Form, Formik, useFormik } from "formik";
import { toast } from "sonner";
import { latSelect, sexSelect } from "@/utils/selectList";

export default function StudentForm() {
  const { dataRelations, setDataRelations } = useContext(ctxDataRelation);
  const { data: session } = useSession();
  const [caseOther, setCaseOther] = useState(false);

  const router = useRouter();

  const [Loading, setLoading] = useState(false);

  const sendInfo = async (values: any) => {
    const res = await fetchData(
      "/student",
      "POST",
      values,
      session?.user.token
    );

    setDataRelations({
      ...dataRelations,
      student_id: values.person_id?.ci_number,
    });

    if (res) {
      return "Registro exitoso.";
    }
  };

  const searchStudent = async (values: string) => {
    const data = await fetchDataWithoutBody(
      `/student/${values}`,
      session?.user.token
    );

    if (data) {
      setDataRelations({
        ...dataRelations,
        student_id: data.person_id?.ci_number,
      });
      return "Registro existente. Redirigiendo...";
    }
  };

  /*   useEffect(() => {
    const age = dateHandler(values.born_date);
    setFieldValue("age", age);
  }, [values.born_date]);

  useEffect(() => {
    if (
      dataRelations.student_id !== "" &&
      dataRelations.student_id !== undefined &&
      dataRelations.student_id
    ) {
      router.push("/register/health");
    }
  }, [dataRelations]);

  useEffect(() => {
    if (
      (values.liveWith as string) === "OTRO" &&
      (values.liveWith as string) !== ""
    ) {
      setCaseOther(true);
    }
    if (
      values.liveWith === "MADRE" ||
      values.liveWith === "PADRE"
    ) {
      setCaseOther(false);
    }
  }, [values.liveWith]);
 */

  return (
    <Formik
      initialValues={initValStudent}
      validationSchema={studentSchema}
      onSubmit={async (values) => {
        setLoading(true);
        toast.promise(sendInfo(values), {
          loading: "Procesando...",
          success: (data) => {
            router.push("/register/health");
            return data;
          },
          error: (error: Error) => {
            return error.message === "Failed to fetch"
              ? "Error en conexión."
              : error.message ?? "";
          },
          finally: () => {
            setLoading(false);
          },
        });
      }}
    >
      {({ values, touched, errors }) => (
        <Form className="h-2/4 w-3/4 border border-gray-300 rounded-xl shadow-xl p-8">
          <div className="flex items-center justify-center mb-7 w-full">
            <h1 className="text-2xl font-medium">
              Estudiante <p className="text-primary-500 inline-flex">|</p>{" "}
              Registro
            </h1>
          </div>
          <div className="grid grid-cols-8 gap-3">
            <Field
              as={Input}
              isRequired
              label="Cédula de _identidad:"
              name="person_id?.ci_number"
              description="Ingrese su Cédula de _identidad"
              variant="bordered"
              color={
                errors.person_id?.ci_number && touched.person_id?.ci_number
                  ? "danger"
                  : "primary"
              }
              errorMessage={
                errors.person_id?.ci_number &&
                touched.person_id?.ci_number &&
                errors.person_id?.ci_number
              }
              className="col-span-2"
              value={values.person_id?.ci_number.toUpperCase()}
            />
            <Tooltip
              content="Buscar Estudiante"
              className="border border-primary-500"
            >
              <Button
                isDisabled={values.person_id?.ci_number ? false : true}
                isIconOnly
                color="primary"
                variant="ghost"
                aria-label="Buscar entidad"
                className="w-3/4 h-3/4"
                onClick={() =>
                  toast.promise(searchStudent(values.person_id?.ci_number), {
                    loading: "Procesando...",
                    success: (data) => {
                      return data;
                    },
                    error: (error: Error) => {
                      if (error.message === "Failed to fetch") {
                        return "Error en conexión.";
                      }
                      return error.message;
                    },
                  })
                }
              >
                <MdSearch className="text-2xl" />
              </Button>
            </Tooltip>

            <div className="col-span-2"></div>

            <Select
              items={sexSelect}
              isRequired
              label="Genero:"
              name="sex"
              className="col-span-3"
              description={"Ingrese el genero del estudiante."}
              errorMessage={errors.sex && touched.sex && errors.sex}
              color={errors.sex && touched.sex ? "danger" : "primary"}
            >
              {(item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              )}
            </Select>

            <Field
              as={Input}
              isRequired
              label="Nombres:"
              name="name"
              description="Ingrese sus Nombres"
              variant="bordered"
              color={
                errors.person_id?.name && touched.person_id?.name
                  ? "danger"
                  : "primary"
              }
              errorMessage={
                errors.person_id?.name &&
                touched.person_id?.name &&
                errors.person_id?.name
              }
              className="col-span-2"
            />

            <Field
              as={Input}
              isRequired
              label="Apellidos:"
              name="lastName"
              description="Ingrese sus Apellidos"
              variant="bordered"
              color={
                errors.person_id?.lastname && touched.person_id?.lastname
                  ? "danger"
                  : "primary"
              }
              errorMessage={
                errors.person_id?.lastname &&
                touched.person_id?.lastname &&
                errors.person_id?.lastname
              }
              className="col-span-2"
            />

            <div className="col-span-1"></div>

            <Select
              items={latSelect}
              isRequired
              label="lateralidad:"
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
              isRequired
              label="Correo electrónico:"
              type="email"
              name="email"
              description="Ingrese su correo electrónico"
              variant="bordered"
              color={
                errors.person_id?.email && touched.person_id?.email
                  ? "danger"
                  : "primary"
              }
              errorMessage={
                errors.person_id?.email &&
                touched.person_id?.email &&
                errors.person_id?.email
              }
              className="col-span-3"
            />

            <Field
              as={Input}
              isRequired
              label="Número telefónico:"
              name="phoneNumber"
              description="Ingrese su número de teléfono"
              variant="bordered"
              color={
                errors.person_id?.phone_number &&
                touched.person_id?.phone_number
                  ? "danger"
                  : "primary"
              }
              errorMessage={
                errors.person_id?.phone_number &&
                touched.person_id?.phone_number &&
                errors.person_id?.phone_number
              }
              className="col-span-3"
            />
            <div className="col-span-1"></div>

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

            <h1 className="col-span-8 font-semibold text-lg">
              Datos de Nacimiento:
            </h1>
            <Field
              as={Input}
              isRequired
              type="date"
              variant="bordered"
              name="born_date"
              label="Fecha de nacimiento"
              description="Ingrese la fecha de nacimiento"
              className="col-span-3"
              color={
                errors.born_date && touched.born_date ? "danger" : "primary"
              }
              errorMessage={
                errors.born_date && touched.born_date && errors.born_date
              }
              value={`${values.born_date}`}
            />
            <Field
              as={Input}
              isRequired
              label="Edad:"
              type="number"
              name="age"
              isReadOnly
              description="Ingrese la edad del Estudiante."
              variant="bordered"
              color={errors.age && touched.born_date ? "danger" : "primary"}
              errorMessage={errors.age && touched.born_date && errors.age}
              className="col-span-2"
              value={`${values.age}`}
              endContent={
                <p className="text-gray-400 font-medium text-base">años</p>
              }
            />
            <div className="col-span-3"></div>
            <Field
              as={Input}
              isRequired
              label="País:"
              name="born_pais"
              description="Ingrese País donde nació"
              variant="bordered"
              color={
                errors.born_pais && touched.born_pais ? "danger" : "primary"
              }
              errorMessage={
                errors.born_pais && touched.born_pais && errors.born_pais
              }
              className="col-span-4"
              value={values.born_pais}
            />
            <Field
              as={Input}
              isRequired
              label="Estado:"
              name="born_state"
              description="Ingrese Estado donde nació"
              variant="bordered"
              color={
                errors.born_state && touched.born_state ? "danger" : "primary"
              }
              errorMessage={
                errors.born_state && touched.born_state && errors.born_state
              }
              className="col-span-4"
              value={values.born_state}
            />
            <h1 className="col-span-8 font-semibold text-lg">
              Datos donde reside:
            </h1>
            <Field
              as={Input}
              isRequired
              label="Parroquia:"
              name="home_parroquia"
              description="Ingrese su Parroquia"
              variant="bordered"
              color={
                errors.person_id?.home_parroquia &&
                touched.person_id?.home_parroquia
                  ? "danger"
                  : "primary"
              }
              errorMessage={
                errors.person_id?.home_parroquia &&
                touched.person_id?.home_parroquia &&
                errors.person_id?.home_parroquia
              }
              className="col-span-4"
            />

            <Field
              as={Input}
              isRequired
              label="Municipio:"
              name="home_municipio"
              description="Ingrese su Municipio"
              variant="bordered"
              color={
                errors.person_id?.home_municipio &&
                touched.person_id?.home_municipio
                  ? "danger"
                  : "primary"
              }
              errorMessage={
                errors.person_id?.home_municipio &&
                touched.person_id?.home_municipio &&
                errors.person_id?.home_parroquia
              }
              className="col-span-4"
              value={values.person_id?.home_municipio}
            />
            <Field
              as={Input}
              isRequired
              label="Dirección de habitación:"
              name="home_dir"
              description="Ingrese su Dirección"
              variant="bordered"
              color={
                errors.person_id?.home_dir && touched.person_id?.home_dir
                  ? "danger"
                  : "primary"
              }
              errorMessage={
                errors.person_id?.home_dir &&
                touched.person_id?.home_dir &&
                errors.person_id?.home_dir
              }
              className="col-span-8"
              value={values.person_id?.home_dir}
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
              isLoading={Loading}
            >
              Registrar
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
