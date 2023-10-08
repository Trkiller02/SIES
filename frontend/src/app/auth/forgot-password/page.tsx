"use client";

import { LoginSchema, LoginValues } from "@/utils/AuthSchema";
import { Button, Input, Link } from "@nextui-org/react";
import { useFormik } from "formik";
import { useState } from "react";
import NextLink from "next/link";

export default function LoginComponent() {
  const [Loading, setLoading] = useState(false);
  const urlBackend = process.env.NEXT_PUBLIC_BACKEND_URL;

  const formik = useFormik({
    initialValues: LoginValues,
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await fetch(urlBackend + "/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        console.log(res.ok);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="grid place-items-center h-2/4 w-2/4 border border-gray-300 rounded-xl p-16 shadow-xl"
    >
      <div>
        <h1>Recuperar Contraseña | SINSES</h1>
      </div>
      <div className="flex flex-col gap-5 w-full">
        <Input
          label="Correo electronico"
          type="email"
          color="primary"
          name="email"
          description="Ingrese su correo electronico"
          variant="bordered"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Input
          label="Cedula de identidad:"
          type="text"
          name="ciNumber"
          description="Ingrese su cedula de identidad"
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
        />
        <Link
          showAnchorIcon
          as={NextLink}
          href="/auth/login"
          color="primary"
          underline="hover"
        >
          Iniciar Sesion
        </Link>
      </div>
      <Button
        variant="ghost"
        isLoading={Loading}
        className="w-2/4 mt-6"
        color="primary"
        type="submit"
      >
        Enviar
      </Button>
    </form>
  );
}
