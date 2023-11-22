"use client";

import { Input, Button, Tooltip, Select, SelectItem } from "@nextui-org/react";
import { MdSearch, MdCancel } from "react-icons/md";
import { fetchData, fetchDataWithoutBody } from "@/utils/fetchHandler";
import { useState, useContext, useEffect } from "react";
import { ctxDataRelation } from "./ProviderCtx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { toast } from "sonner";
import {
  initValRepresent,
  representSchema,
} from "@/utils/schemas/RepresentSchema";

export default function RepresentForm() {
  const { dataRelations, setDataRelations } = useContext(ctxDataRelation);
  const { data: session } = useSession();

  const [disKeys, setDisKeys] = useState<string[]>([]);

  const router = useRouter();

  const [Loading, setLoading] = useState(false);

  const routeHandler = () => {
    if (dataRelations.motherPersonCiNumbers === "") {
      return formik.resetForm();
    } else {
      if (dataRelations.fatherPersonCiNumbers === "") {
        return formik.resetForm();
      } else {
        if (dataRelations.representCiNumbers === "") {
          return formik.resetForm();
        } else {
          router.push("/register/relations");
        }
      }
    }
  };

  const sendInfo = async (values: any) => {
    const res = await fetchData(
      `/represent`,
      "POST",
      values,
      session?.user.token
    );



    if (res) {

      switch (values.relation) {
        case "M":
          setDataRelations({
            ...dataRelations,
            motherPersonCiNumbers: values.ciNumber,
          });
          break;
        case "P":
          setDataRelations({
            ...dataRelations,
            fatherPersonCiNumbers: values.ciNumber,
          });
          break;
        case "RL":
          setDataRelations({
            ...dataRelations,
            representCiNumbers: values.ciNumber,
          });
          break;
        default:
          break;
      }

      return "Registro exitoso."
    }
  }

  const formik = useFormik({
    initialValues: initValRepresent,
    validationSchema: representSchema,
    onSubmit: async (values) => {
      setLoading(true);

      toast.promise(sendInfo(values), {
        loading: "Procesando...",
        success: (data) => {
          routeHandler();
          return data;
        },
        error: (error: Error) => {
          return error.message;
        },
        finally: () => {
          setLoading(false);
        }
      })
    },
  });

  const disabledKeys = () => {
    if (dataRelations.motherPersonCiNumbers !== "") {
      setDisKeys((disKeys) => [...disKeys, "M"])
    }
    if (dataRelations.fatherPersonCiNumbers !== "") {
      setDisKeys((disKeys) => [...disKeys, "P"])
    }
    if (dataRelations.representCiNumbers !== "") {
      setDisKeys((disKeys) => [...disKeys, "RL"])
    }
  }

  const searchRepresent = async () => {
    const data = await fetchDataWithoutBody(
      `/represent/${formik.values.ciNumber}`,
      session?.user.token
    );
    if (data) {

      switch (data.relation) {
        case "M":
          setDataRelations({
            ...dataRelations,
            motherPersonCiNumbers: data.ciNumber,
          });
          break;
        case "P":
          setDataRelations({
            ...dataRelations,
            fatherPersonCiNumbers: data.ciNumber,
          });
          break;
        case "RL":
          setDataRelations({
            ...dataRelations,
            representCiNumbers: data.ciNumber,
          });
          break;
        default:
          break;
      }

      return "Registro existente. Redirigiendo...";
    }
  };

  useEffect(() => {
    routeHandler()
  }, [])

  useEffect(() => {
    disabledKeys()
  }, [dataRelations])

  return (
    <form
      className="h-2/4 w-3/4 border border-gray-300 rounded-xl shadow-xl p-8"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex items-center justify-center mb-7 w-full">
        <h1 className="text-2xl font-medium">
          Representante <p className="text-primary-500 inline-flex">|</p>{" "}
          Registro
        </h1>
      </div>
      <div className="grid grid-cols-8 gap-3">
        <Input
          isRequired
          label="Cédula de Identidad:"
          name="ciNumber"
          description="Ingrese su Cédula de Identidad"
          variant="bordered"
          color={
            formik.errors.ciNumber && formik.touched.ciNumber
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.ciNumber &&
            formik.touched.ciNumber &&
            formik.errors.ciNumber
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-3"
          value={formik.values.ciNumber.toUpperCase()}
        />
        <Tooltip
          content="Buscar Estudiante"
          className="border border-primary-500"
        >
          <Button
            isDisabled={formik.values.ciNumber ? false : true}
            isIconOnly
            color="primary"
            variant="ghost"
            aria-label="Buscar entidad"
            className="w-full h-3/4"
            onClick={() =>
              toast.promise(searchRepresent, {
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

        <Tooltip
          content="Omitir Relación"
          className="border border-danger-500"
        >
          <Button
            isDisabled={formik.values.relation ? false : true}
            isIconOnly
            color="danger"
            variant="ghost"
            aria-label="Buscar entidad"
            className="w-full h-3/4"
            onClick={() => {
              switch (formik.values.relation) {
                case "M":
                  setDataRelations({
                    ...dataRelations,
                    motherPersonCiNumbers: "omit",
                  });
                  break;
                case "P":
                  setDataRelations({
                    ...dataRelations,
                    fatherPersonCiNumbers: "omit",
                  });
                  break;
                default:
                  break;
              }
              routeHandler()
            }
            }
          >
            <MdCancel className="text-2xl text-danger" />
          </Button>
        </Tooltip>

        <Select
          label="Relacion:"
          variant="bordered"
          name="relation"
          id="relation"
          disabledKeys={disKeys}
          className="col-span-3"
          description={"Ingrese la relacion con el estudiante."}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={
            formik.errors.relation &&
            formik.touched.relation &&
            formik.errors.relation
          }
          color={
            formik.errors.relation && formik.touched.relation
              ? "danger"
              : "primary"
          }
          value={formik.values.relation}
        >
          <SelectItem key={"M"} value={"MADRE"}>
            MADRE
          </SelectItem>
          <SelectItem key={"P"} value={"PADRE"}>
            PADRE
          </SelectItem>
          <SelectItem key={"RL"} value={"REPRESENTANTE"}>
            REPRESENTANTE LEGAL
          </SelectItem>
        </Select>

        <Input
          isRequired
          label="Nombres:"
          name="name"
          description="Ingrese sus Nombres"
          variant="bordered"
          color={
            formik.errors.name && formik.touched.name ? "danger" : "primary"
          }
          errorMessage={
            formik.errors.name && formik.touched.name && formik.errors.name
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-4"
          value={formik.values.name.toUpperCase()}
        />

        <Input
          isRequired
          label="Apellidos:"
          name="lastName"
          description="Ingrese sus Apellidos"
          variant="bordered"
          color={
            formik.errors.lastName && formik.touched.lastName
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.lastName &&
            formik.touched.lastName &&
            formik.errors.lastName
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-4"
          value={formik.values.lastName.toUpperCase()}
        />

        <Input
          isRequired
          label="Correo electrónico:"
          type="email"
          name="email"
          value={formik.values.email}
          description="Ingrese su correo electrónico"
          variant="bordered"
          color={
            formik.errors.email && formik.touched.email ? "danger" : "primary"
          }
          errorMessage={
            formik.errors.email && formik.touched.email && formik.errors.email
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-4"
        />

        <Input
          isRequired
          label="Número telefónico:"
          name="phoneNumber"
          description="Ingrese su número de teléfono"
          variant="bordered"
          value={formik.values.phoneNumber}
          color={
            formik.errors.phoneNumber && formik.touched.phoneNumber
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.phoneNumber &&
            formik.touched.phoneNumber &&
            formik.errors.phoneNumber
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-4"
        />

        <Input
          label="Profesión:"
          name="profession"
          description="Ingrese su profesión."
          variant="bordered"
          color={
            formik.errors.profession && formik.touched.profession
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.profession &&
            formik.touched.profession &&
            formik.errors.profession
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-4"
          value={formik.values.profession}
        />
        <h1 className="col-span-8 font-semibold text-lg">Datos economicos:</h1>

        <Input
          isRequired
          label="Ingresos Mensuales:"
          type="number"
          name="incomeMonth"
          description="Ingrese cantidad de ingresos mensuales."
          variant="bordered"
          color={
            formik.errors.incomeMonth && formik.touched.incomeMonth
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.incomeMonth &&
            formik.touched.incomeMonth &&
            formik.errors.incomeMonth
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-2"
          value={`${formik.values.incomeMonth}`}
          endContent={<p className="text-gray-400 font-medium text-base">$</p>}
        />

        <Input
          label="Número telefónico de su trabajo:"
          name="workPhoneNumber"
          description="Ingrese número de teléfono de su trabajo"
          variant="bordered"
          color={
            formik.errors.workPhoneNumber && formik.touched.workPhoneNumber
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.workPhoneNumber &&
            formik.touched.workPhoneNumber &&
            formik.errors.workPhoneNumber
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-3"
        />

        <Input
          label="Lugar de trabajo:"
          name="workPlace"
          description="Ingrese donde trabaja."
          variant="bordered"
          color={
            formik.errors.workPlace && formik.touched.workPlace
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.workPlace &&
            formik.touched.workPlace &&
            formik.errors.workPlace
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-8"
          value={formik.values.workPlace.toUpperCase()}
        />

        <h1 className="col-span-8 font-semibold text-lg">
          Datos donde reside:
        </h1>
        <Input
          isRequired
          label="Parroquia:"
          name="homeParroquia"
          description="Ingrese su Parroquia"
          variant="bordered"
          color={
            formik.errors.homeParroquia && formik.touched.homeParroquia
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.homeParroquia &&
            formik.touched.homeParroquia &&
            formik.errors.homeParroquia
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-3"
          value={formik.values.homeParroquia.toUpperCase()}
        />
        <Input
          isRequired
          label="Municipio:"
          name="homeMunicipio"
          description="Ingrese su Municipio"
          variant="bordered"
          color={
            formik.errors.homeMunicipio && formik.touched.homeMunicipio
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.homeMunicipio &&
            formik.touched.homeMunicipio &&
            formik.errors.homeParroquia
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-3"
          value={formik.values.homeMunicipio.toUpperCase()}
        />
        <Input
          isRequired
          label="Número de Habitación:"
          name="tlfnHome"
          variant="bordered"
          color={
            formik.errors.tlfnHome && formik.touched.tlfnHome
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.tlfnHome &&
            formik.touched.tlfnHome &&
            formik.errors.tlfnHome
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-2"
        />
        <Input
          isRequired
          label="Dirección de habitación:"
          name="homeDir"
          description="Ingrese su Dirección"
          variant="bordered"
          color={
            formik.errors.homeDir && formik.touched.homeDir
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.homeDir &&
            formik.touched.homeDir &&
            formik.errors.homeDir
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-8"
          value={formik.values.homeDir.toUpperCase()}
        />


      </div>

      <div className="flex flex-row justify-around mt-7">
        <Button
          variant="ghost"
          className="w-3/12"
          color="danger"
          type="reset"
          onPress={formik.handleReset}
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
    </form>
  );
}
