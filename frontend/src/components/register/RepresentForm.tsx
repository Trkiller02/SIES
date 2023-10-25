"use client";

import {
  initValRepresent,
  representSchema,
} from "@/utils/schemas/PersonSchema";
import { fetchData } from "@/utils/fetchHandler";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import { toast } from "sonner";

export default function PersonForm() {
  const { data: session } = useSession();
  const router = useRouter();

  const [Loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initValRepresent,
    validationSchema: representSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        console.log(session?.user.token);
        await fetchData(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/person`,
          "POST",
          session?.user.token,
          values
        );

        toast.success("¡Tarea exitosa!", {
          description: "Usuario registrado con exito.",
          duration: 2000,
          icon: <MdCheckCircle />,
          onAutoClose: () => router.push("/register/student"),
        });
      } catch (error) {
        toast.error("¡Algo salió mal!", {
          description: `Algo salió mal, ${error.message}`,
          duration: 4000,
          icon: <MdCancel />,
        });
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => console.log(formik.values), [formik.values]);

  return (
    <>
      <h1>Datos del Estudiante</h1>
      <form
        className="grid grid-cols-8 h-2/4 w-3/4 border border-gray-300 rounded-xl shadow-xl p-8 gap-3"
        onSubmit={formik.handleSubmit}
      >
        <Input
          label="Nombres:"
          type="text"
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
        />

        <Input
          label="Apellidos:"
          type="text"
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
        />
        <div className="col-span-2"></div>
        <Select
          label="Relacion:"
          variant="bordered"
          name="relation"
          className="col-span-2"
          color="primary"
          errorMessage={
            formik.errors.relation &&
            formik.touched.relation &&
            formik.errors.relation
          }
          description={"Ingrese la relacion con el estudiante."}
          defaultValue={undefined}
        >
          <SelectItem key={"represente"} value={"Representante Legal"}>
            Representante Legal
          </SelectItem>
        </Select>
        <Input
          label="C.E/C.I:"
          type="text"
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
          className="col-span-2"
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
          className="col-span-2"
        />
        <Input
          label="Numero de Telefono:"
          type="text "
          name=" phoneNumber"
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
          label="Parroquia donde vive:"
          type="text "
          name=" homeParroquia  "
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
        />
        <Input
          label="Municipio donde vive:"
          type="text "
          name="  homeMunicipio "
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
        />
        <Input
          label="Direccion donde vive:"
          type="text "
          name=" homeDir "
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
        />

        <Input
          label="Fecha de Nacimiento:"
          type="DateTime "
          name="bornDate"
          description="Ingrese su Fecha de Nacimiento"
          variant="bordered"
          color={
            formik.errors.bornDate && formik.touched.bornDate
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.bornDate &&
            formik.touched.bornDate &&
            formik.errors.bornDate
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-2"
        />

        <Input
          label="Estado en el que Nacio:"
          type="text"
          name="bornState"
          description="Estado en el que Nacio"
          variant="bordered"
          color={
            formik.errors.bornState && formik.touched.bornState
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.bornState &&
            formik.touched.bornState &&
            formik.errors.bornState
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-2"
        />
        <Input
          label="Municipio en el que nacio:"
          type="text"
          name="bornMunicipio"
          description="Ingrese Municipio en el que nacio"
          variant="bordered"
          color={
            formik.errors.bornMunicipio && formik.touched.bornMunicipio
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.bornMunicipio &&
            formik.touched.bornMunicipio &&
            formik.errors.bornMunicipio
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-2"
        />
        <Input
          label="Parroquia en la que Nacio:"
          type="text"
          name="bornParroquia "
          description="Ingrese Parroquia en la que nacio"
          variant="bordered"
          color={
            formik.errors.bornParroquia && formik.touched.bornParroquia
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.bornParroquia &&
            formik.touched.bornParroquia &&
            formik.errors.bornParroquia
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-2"
        />
        <Input
          label="Pais Natal:"
          type="text "
          name="bornPais "
          description="Ingrese su Pais Natal"
          variant="bordered"
          color={
            formik.errors.bornPais && formik.touched.bornPais
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.bornPais &&
            formik.touched.bornPais &&
            formik.errors.bornPais
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-2"
        />
        <Input
          label="Lugar de nacimiento:"
          type="text"
          name="bornPlace"
          description="Ingrese su Lugar de Nacimiento"
          variant="bordered"
          color={
            formik.errors.bornPlace && formik.touched.bornPlace
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.bornPlace &&
            formik.touched.bornPlace &&
            formik.errors.bornPlace
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-8"
        />
        <Input
          label="Edad:"
          type="Int"
          name="age"
          description="Ingrese su Edad"
          variant="bordered"
          color={formik.errors.age && formik.touched.age ? "danger" : "primary"}
          errorMessage={
            formik.errors.age && formik.touched.age && formik.errors.age
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-2"
        />
        <Input
          label="Sexo:"
          type="text "
          name="sex "
          description="M/F"
          variant="bordered"
          color={formik.errors.sex && formik.touched.sex ? "danger" : "primary"}
          errorMessage={
            formik.errors.sex && formik.touched.sex && formik.errors.sex
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-1"
        />
        <Input
          label="Peso:"
          type="text"
          name="weight"
          description="Ingrese su Peso"
          variant="bordered"
          color={
            formik.errors.weight && formik.touched.weight ? "danger" : "primary"
          }
          errorMessage={
            formik.errors.weight &&
            formik.touched.weight &&
            formik.errors.weight
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-2"
        />

        <Input
          label="Altura:"
          type="text"
          name="size"
          description="Ingrese su Altura"
          variant="bordered"
          color={
            formik.errors.size && formik.touched.size ? "danger" : "primary"
          }
          errorMessage={
            formik.errors.size && formik.touched.size && formik.errors.size
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-2"
        />
        <Input
          label="Lateralidad:"
          type="text"
          name="Lateralidad "
          description="Ingrese su  Lateralidad "
          variant="bordered"
          color={
            formik.errors.Lateralidad && formik.touched.Lateralidad
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.Lateralidad &&
            formik.touched.Lateralidad &&
            formik.errors.Lateralidad
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-2"
        />

        <div>
          <Button
            variant="ghost"
            className="w-2/4 mt-6"
            color="primary"
            type="submit"
            isLoading={Loading}
          >
            Registrar
          </Button>
        </div>
      </form>
    </>
  );
}
