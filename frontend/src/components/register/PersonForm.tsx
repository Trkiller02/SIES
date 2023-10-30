"use client";

import { initValPerson, personSchema } from "@/utils/schemas/PersonSchema";
import { fetchData, fetchDataWithoutBody } from "@/utils/fetchHandler";
import { Input, Button, Select, SelectItem, Tooltip } from "@nextui-org/react";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useState, useContext } from "react";
import { MdCancel, MdCheckCircle, MdSearch } from "react-icons/md";
import { toast } from "sonner";
import { ctxDataRelation } from "./ProviderCtx";
import { useRouter } from "next/navigation";
import { ProgressChecker } from "./ProgressChecker";

export default function PersonForm({ person = true }: { person?: boolean }) {
  const { dataRelations, setDataRelations } = useContext(ctxDataRelation);
  const iconSuccess = <MdCheckCircle className="text-xl text-success-500" />;
  const iconFail = <MdCancel className="text-xl text-danger-500" />;
  const { data: session } = useSession();
  const router = useRouter();

  const routeHandler = () => {
    if (dataRelations.motherPersonCiNumbers === "") {
      return formik.resetForm();
    } else {
      if (dataRelations.fatherPersonCiNumbers === "") {
        return formik.resetForm();
      } else {
        if (dataRelations.thirdPersonCiNumbers === "") {
          router.refresh();
        } else {
          router.push("/register/represent");
        }
      }
    }
  };

  const [Loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initValPerson,
    validationSchema: personSchema,
    onSubmit: async (values) => {
      setLoading(true);
      for (let key in values) {
        if (key === "email" || key === "phoneNumber") {
          continue;
        }
        values[key] = values[key].trim();
      }

      try {
        await fetchData(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/person`,
          "POST",
          values,
          session?.user.token
        );

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
          case "F":
            setDataRelations({
              ...dataRelations,
              thirdPersonCiNumbers: values.ciNumber,
            });
            break;
          default:
            setDataRelations({
              ...dataRelations,
              thirdPersonCiNumbers: values.ciNumber,
            });
            break;
        }

        toast.success("¡Tarea exitosa!", {
          description: "Persona registrada con exito.",
          important: true,
          duration: 1000,
          icon: iconSuccess,
          onAutoClose: () => routeHandler(),
          onDismiss: () => routeHandler(),
        });
      } catch (error) {
        toast.error("¡Algo salió mal!", {
          important: true,
          description: error.message,
          duration: 4000,
          icon: iconFail,
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const searchStudent = async () => {
    let diag: string = "";
    const data = await fetchDataWithoutBody(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/person/${formik.values.ciNumber}`,
      session?.user.token
    );
    if (data) {
      switch (data.relation) {
        case "M":
          setDataRelations({
            ...dataRelations,
            motherPersonCiNumbers: data.ciNumber,
          });
          diag = "Registro existente. Madre registrada...";
          break;
        case "P":
          setDataRelations({
            ...dataRelations,
            fatherPersonCiNumbers: data.ciNumber,
          });
          diag = "Registro existente. Padre registrado...";
          break;
        case "F":
          setDataRelations({
            ...dataRelations,
            thirdPersonCiNumbers: data.ciNumber,
          });
          diag = "Registro existente. Familiar registrado...";
          break;
        case "RL":
          setDataRelations({
            ...dataRelations,
            representCiNumbers: data.ciNumber,
          });
          diag = "Registro existente. Representante registrado...";
          break;
        default:
          break;
      }
      routeHandler();
      return diag;
    }
  };

  return (
    <form
      className="h-2/4 w-3/4 border border-gray-300 rounded-xl shadow-xl p-8"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex items-center justify-center mb-7 w-full">
        <h1 className="text-2xl">
          Persona <p className="text-primary-500 inline-flex">|</p> Registro
        </h1>
      </div>
      <div className="grid grid-cols-8 gap-3">
        <Input
          label="Cedula de Identidad:"
          name="ciNumber"
          description="Ingrese su Cedula de Identidad"
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
            className="w-3/4 h-3/4"
            onClick={() =>
              toast.promise(searchStudent, {
                loading: "Procesando...",
                success: (data) => {
                  return data;
                },
                error: (error: Error) => {
                  if (error.message === "Failed to fetch") {
                    return "Error en conexión.";
                  }
                  if (error.message === "Not Found") {
                    return "Registro no encontrado. Puede continuar...";
                  }
                  routeHandler();
                  return error.message;
                },
              })
            }
          >
            <MdSearch className="text-2xl" />
          </Button>
        </Tooltip>

        <div className="col-span-1"></div>

        {person && (
          <Select
            label="Relacion:"
            variant="bordered"
            name="relation"
            id="relation"
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
            <SelectItem key={"F"} value={"FAMILIAR"}>
              FAMILIAR
            </SelectItem>
          </Select>
        )}

        <Input
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
          className="col-span-3"
          value={formik.values.name}
        />

        <Input
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
          className="col-span-3"
          value={formik.values.lastName}
        />

        <Input
          label="Correo Electronico:"
          type="email"
          name="email"
          description="Ingrese su Correo Electronico"
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
          label="Numero de Telefono:"
          name="phoneNumber"
          description="Ingrese su Numero de Telefono"
          variant="bordered"
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
          className="col-span-3"
        />
        <Input
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
          className="col-span-4"
          value={formik.values.homeParroquia}
        />
        <Input
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
          className="col-span-4"
          value={formik.values.homeMunicipio}
        />
        <Input
          label="Dirección de habitación:"
          name="homeDir"
          description="Ingrese su Direccion"
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
          value={formik.values.homeDir}
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
