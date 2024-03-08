"use client";

import {
  Input,
  Button,
  Tooltip,
  Select,
  SelectItem,
  Checkbox,
} from "@nextui-org/react";
import { MdSearch, MdCancel } from "react-icons/md";
import { fetchData, fetchDataWithoutBody } from "@/utils/fetchHandler";
import { useState, useContext, useEffect } from "react";
import { ctxDataRelation } from "./ProviderCtx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Field, Form, Formik, useFormik } from "formik";
import { toast } from "sonner";
import {
  initValRepresent,
  representSchema,
  representSchemaUpdate,
} from "@/utils/schemas/RepresentSchema";
import { RepresentI } from "@/types/register.interfaces";
import { relationSelect } from "@/utils/selectList";

export default function RepresentForm({
  edit,
  id,
}: {
  edit?: boolean;
  id?: string;
}) {
  const { dataRelations, setDataRelations } = useContext(ctxDataRelation);
  const { data: session } = useSession();

  const [disKeys, setDisKeys] = useState(new Set<string>([]));

  const router = useRouter();

  const [info, setInfo] = useState<RepresentI>(initValRepresent);
  const [hasRepresent, setRepresent] = useState<boolean>(false);

  const routeHandler = (resetForm?: any) => {
    if (dataRelations.mother_id === "") {
      return setTimeout(resetForm, 2500);
    } else {
      if (dataRelations.father_id === "") {
        return setTimeout(resetForm, 2500);
      } else {
        if (dataRelations.represent_id === "") {
          return setTimeout(resetForm, 2500);
        } else {
          router.push("/register/relations");
        }
      }
    }
  };

  const sendInfoUpdate = async (values: any) => {
    const res = await fetchData(
      `/represent/${id}`,
      "PATCH",

      values,

      session?.user.token
    );

    if (res) return "Actualización exitosa.";
  };

  const sendInfo = async (values: RepresentI) => {
    const res = await fetchData(
      `/represent`,
      "POST",
      {
        ...values,
        represent:
          values.relation === "REPRESENTANTE LEGAL"
            ? true
            : disKeys.size === 2
            ? true
            : values.represent,
      },
      session?.user.token
    );

    if (res) {
      switch (values.relation) {
        case "MADRE":
          setDataRelations({
            ...dataRelations,
            mother_id: res.id,
          });
          break;
        case "PADRE":
          setDataRelations({
            ...dataRelations,
            father_id: res.id,
          });
          break;
        case "REPRESENTANTE LEGAL":
          setDataRelations({
            ...dataRelations,
            represent_id: res.id,
          });
          break;
        default:
          break;
      }

      if (values.represent === true) {
        setDataRelations({
          ...dataRelations,
          represent_id: "omit",
        });

        setRepresent(true);
      }

      return "Registro exitoso.";
    }
  };

  const disabledKeys = () => {
    if (dataRelations.mother_id !== "" && !disKeys.has("MADRE")) {
      setDisKeys((disKeys) => disKeys.add("MADRE"));
    }
    if (dataRelations.father_id !== "" && !disKeys.has("PADRE")) {
      setDisKeys((disKeys) => disKeys.add("PADRE"));
    }
    if (
      dataRelations.represent_id !== "" &&
      !disKeys.has("REPRESENTANTE LEGAL")
    ) {
      setDisKeys((disKeys) => disKeys.add("REPRESENTANTE LEGAL"));
    }
  };

  const searchRepresent = async (values: string) => {
    const data: RepresentI = await fetchDataWithoutBody(
      `/represent/${values}`,
      session?.user.token
    );

    return data;
  };

  useEffect(() => {
    disabledKeys();

    if (disKeys.size === 3) {
      router.push("/register/relations");
    }
  }, [dataRelations]);

  if (edit) {
    useEffect(() => {
      toast.promise(searchRepresent(id!), {
        loading: "Procesando...",
        success: (data) => {
          setInfo({
            person_id: {
              name: data.person_id.name,
              lastname: data.person_id.lastname,
              phone_number: data.person_id.phone_number,
              ci_number: data.person_id.ci_number,
              email: data.person_id.email,
              home_dir: data.person_id.home_dir,
              home_parroquia: data.person_id.home_parroquia,
              home_municipio: data.person_id.home_municipio,
            },
            relation: data.relation,
            tlfn_home: data.tlfn_home,
            profession: data.profession,
            work_place: data.work_place,
            work_phone_number: data.work_phone_number,
            income_month: data.income_month,
            represent: data.represent,
          });
          return "Carga completa.";
        },
        error: (error: Error) => {
          return error.message === "Failed to fetch"
            ? "Error en conexión."
            : error.message ?? "";
        },
      });
    }, []);
  }

  return (
    <Formik
      initialValues={info}
      enableReinitialize
      validationSchema={edit ? representSchemaUpdate : representSchema}
      onSubmit={async (values) => {
        if (edit) {
          toast.promise(sendInfoUpdate(values), {
            loading: "Procesando...",
            success: (data) => {
              return data;
            },
            error: (error: Error) => {
              return error.message === "Failed to fetch"
                ? "Error en conexión."
                : error.message ?? "";
            },
          });
        } else {
          toast.promise(sendInfo(values), {
            loading: "Procesando...",
            success: (data) => {
              return data;
            },
            error: (error: Error) => {
              return error.message === "Failed to fetch"
                ? "Error en conexión."
                : error.message ?? "";
            },
          });
        }
      }}
    >
      {({ values, handleChange, handleBlur, errors, touched, resetForm }) => (
        <Form className="h-2/4 w-3/4 border border-gray-300 rounded-xl shadow-xl p-8">
          <div className="flex items-center justify-center mb-7 w-full">
            <h1 className="text-2xl font-medium">
              Representante <p className="text-primary-500 inline-flex">|</p>{" "}
              Registro
            </h1>
          </div>
          <div className="grid grid-cols-8 gap-3">
            {/* CI FIELD */}
            <Field
              as={Input}
              isRequired={edit ? false : true}
              label="Cédula de Identidad:"
              name="person_id.ci_number"
              description="Ingrese su Cédula de Identidad"
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
              className="col-span-3"
              value={values.person_id.ci_number.toUpperCase()}
            />

            {/* SEARCH BUTTON */}
            {!edit && (
              <Tooltip
                content="Buscar Estudiante"
                className="border border-primary-500"
              >
                <Button
                  isDisabled={values.person_id.ci_number ? false : true}
                  isIconOnly
                  color="primary"
                  variant="ghost"
                  aria-label="Buscar entidad"
                  className="w-full h-3/4"
                  onClick={() =>
                    toast.promise(searchRepresent(values.person_id.ci_number), {
                      loading: "Procesando...",
                      success: (data) => {
                        switch (data.relation) {
                          case "MADRE":
                            setDataRelations({
                              ...dataRelations,
                              mother_id: data.id!,
                            });
                            break;
                          case "PADRE":
                            setDataRelations({
                              ...dataRelations,
                              father_id: data.id!,
                            });
                            break;
                          case "REPRESENTANTE LEGAL":
                            setDataRelations({
                              ...dataRelations,
                              represent_id: data.id!,
                            });
                            break;
                          default:
                            break;
                        }

                        routeHandler(resetForm);
                        return "Registro existente.";
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
            )}

            {/* RELATION SELECT */}
            <Select
              items={relationSelect}
              name="relation"
              label="Relación:"
              disabledKeys={Array.from(disKeys)}
              className="col-span-3"
              description={"Ingrese la relación con el estudiante."}
              onChange={handleChange}
              onBlur={handleBlur}
              selectedKeys={[values.relation.toString()]}
              errorMessage={
                errors.relation && touched.relation && errors.relation
              }
              color={errors.relation && touched.relation ? "danger" : "primary"}
            >
              {(item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              )}
            </Select>

            {/* OMIT RELATION BUTTON */}
            {!edit && (
              <Tooltip
                content="Omitir Relación"
                className="border border-danger-500"
              >
                <Button
                  isDisabled={
                    values.relation && disKeys.size !== 2 && !edit
                      ? false
                      : true
                  }
                  isIconOnly
                  color="danger"
                  variant="ghost"
                  aria-label="Buscar entidad"
                  className="w-full h-3/4"
                  onClick={() => {
                    switch (values.relation) {
                      case "MADRE":
                        setDataRelations({
                          ...dataRelations,
                          mother_id: "omit",
                        });
                        break;
                      case "PADRE":
                        setDataRelations({
                          ...dataRelations,
                          father_id: "omit",
                        });
                        break;
                      case "REPRESENTANTE LEGAL":
                        setDataRelations({
                          ...dataRelations,
                          represent_id: "omit",
                        });
                        break;
                      default:
                        break;
                    }
                    routeHandler(resetForm);
                  }}
                >
                  <MdCancel className="text-2xl text-danger" />
                </Button>
              </Tooltip>
            )}

            {/* NAME FIELD */}
            <Field
              as={Input}
              isRequired={edit ? false : true}
              label="Nombres:"
              name="person_id.name"
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
              className="col-span-4"
              value={values.person_id.name.toUpperCase()}
            />

            {/* LASTNAME FIELD */}
            <Field
              as={Input}
              isRequired={edit ? false : true}
              label="Apellidos:"
              name="person_id.lastname"
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
              className="col-span-4"
              value={values.person_id.lastname.toUpperCase()}
            />

            {/* EMAIL FIELD */}
            <Field
              as={Input}
              isRequired={edit ? false : true}
              label="Correo electrónico:"
              type="email"
              name="person_id.email"
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
              className="col-span-4"
              value={values.person_id?.email?.toLowerCase()}
            />

            {/* TLFN_NUMBER FIELD */}
            <Field
              as={Input}
              isRequired={edit ? false : true}
              label="Número telefónico:"
              name="person_id.phone_number"
              description="Ingrese su número de teléfono"
              variant="bordered"
              value={values.person_id.phone_number}
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
              className="col-span-4"
            />

            {/* PROFESSION FIELD */}
            <Field
              as={Input}
              label="Profesión:"
              name="profession"
              description="Ingrese su profesión."
              variant="bordered"
              color={
                errors.profession && touched.profession ? "danger" : "primary"
              }
              errorMessage={
                errors.profession && touched.profession && errors.profession
              }
              className="col-span-4"
              value={values.profession?.toUpperCase()}
            />

            {/* REPRESENT BOX */}
            <Checkbox
              className="col-span-4"
              size="lg"
              name="represent"
              isDisabled={
                values.relation === "REPRESENTANTE LEGAL" || disKeys.size === 2
              }
              onChange={handleChange}
              onBlur={handleBlur}
              isIndeterminate={hasRepresent}
              isSelected={
                values.relation === "REPRESENTANTE LEGAL"
                  ? true
                  : disKeys.size === 2
                  ? true
                  : values.represent
              }
            >
              REPRESENTANTE LEGAL
            </Checkbox>

            <h1 className="col-span-8 font-semibold text-lg">
              Datos económicos:
            </h1>

            {/* INCOME_MONTH FIELD */}
            <Field
              as={Input}
              label="Ingresos Mensuales:"
              type="number"
              name="income_month"
              description="Ingrese cantidad de ingresos mensuales."
              variant="bordered"
              color={
                errors.income_month && touched.income_month
                  ? "danger"
                  : "primary"
              }
              errorMessage={
                errors.income_month &&
                touched.income_month &&
                errors.income_month
              }
              className="col-span-2"
              endContent={
                <p className="text-gray-400 font-medium text-base">$</p>
              }
            />

            {/* WORK_PHONE_NUMBER FIELD */}
            <Field
              as={Input}
              label="Número telefónico de su trabajo:"
              name="work_phone_number"
              description="Ingrese número de teléfono de su trabajo"
              variant="bordered"
              color={
                errors.work_phone_number && touched.work_phone_number
                  ? "danger"
                  : "primary"
              }
              errorMessage={
                errors.work_phone_number &&
                touched.work_phone_number &&
                errors.work_phone_number
              }
              className="col-span-3"
            />

            {/* WORK_PLACE FIELD */}
            <Field
              as={Input}
              label="Lugar de trabajo:"
              name="work_place"
              description="Ingrese donde trabaja."
              variant="bordered"
              color={
                errors.work_place && touched.work_place ? "danger" : "primary"
              }
              errorMessage={
                errors.work_place && touched.work_place && errors.work_place
              }
              className="col-span-8"
              value={values.work_place?.toUpperCase()}
            />

            <h1 className="col-span-8 font-semibold text-lg">
              Datos donde reside:
            </h1>
            {/* HOME_PARROQUIA FIELD */}
            <Field
              as={Input}
              isRequired={edit ? false : true}
              label="Parroquia:"
              name="person_id.home_parroquia"
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
              className="col-span-3"
              value={values.person_id?.home_parroquia.toUpperCase()}
            />

            {/* HOME_MUNICIPIO FIELD */}
            <Field
              as={Input}
              isRequired={edit ? false : true}
              label="Municipio:"
              name="person_id.home_municipio"
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
              className="col-span-3"
              value={values.person_id?.home_municipio.toUpperCase()}
            />

            {/* TLFN_HOME FIELD */}
            <Field
              as={Input}
              label="Número de Habitación:"
              name="tlfn_home"
              variant="bordered"
              color={
                errors.tlfn_home && touched.tlfn_home ? "danger" : "primary"
              }
              errorMessage={
                errors.tlfn_home && touched.tlfn_home && errors.tlfn_home
              }
              className="col-span-2"
            />

            {/* HOME_DIR FIELD */}
            <Field
              as={Input}
              isRequired={edit ? false : true}
              label="Dirección de habitación:"
              name="person_id.home_dir"
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
              value={values.person_id.home_dir.toUpperCase()}
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
