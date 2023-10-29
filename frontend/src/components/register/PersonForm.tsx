"use client";

import { initValPerson, personSchema } from "@/utils/schemas/PersonSchema";
import { fetchData } from "@/utils/fetchHandler";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import { toast } from "sonner";
import { ctxDataRelation } from "./ProviderCtx";

export default function PersonForm({ person = true }: { person?: boolean }) {
  const iconSuccess = <MdCheckCircle className="text-xl text-success-500" />;
  const iconFail = <MdCancel className="text-xl text-danger-500" />;
  const { data: session } = useSession();
  const { dataRelations, setDataRelations } = useContext(ctxDataRelation);
  console.log(dataRelations);

  const router = useRouter();

  const [Loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initValPerson,
    validationSchema: personSchema,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        await fetchData(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/person`,
          "POST",
          session?.user.token,
          values
        );

        setDataRelations({ ...dataRelations, thirdPerson });
        toast.success("¡Tarea exitosa!", {
          description: "Usuario registrado con exito.",
          important: true,
          duration: 2000,
          icon: iconSuccess,
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
          className="col-span-2"
          value={formik.values.name.toUpperCase()}
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
          className="col-span-2"
          value={formik.values.lastName.toUpperCase()}
        />

        {person ? (
          <div className="col-span-1"></div>
        ) : (
          <div className="col-span-4"></div>
        )}

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
              Madre
            </SelectItem>
            <SelectItem key={"P"} value={"PADRE"}>
              Padre
            </SelectItem>
            <SelectItem key={"RL"} value={"REPRESENTANTE LEGAL"}>
              Representante Legal
            </SelectItem>
            <SelectItem key={"F"} value={"FAMILIAR"}>
              Pariente
            </SelectItem>
          </Select>
        )}

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
          className="col-span-3"
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
          className="col-span-2"
        />
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
          value={formik.values.homeParroquia.toUpperCase()}
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
          value={formik.values.homeMunicipio.toUpperCase()}
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
