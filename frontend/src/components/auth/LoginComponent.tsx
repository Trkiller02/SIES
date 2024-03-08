"use client";

import { LoginSchema, LoginValues } from "@/utils/schemas/AuthSchema";
import { Button, Input, Link } from "@nextui-org/react";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SignInResponse, signIn } from "next-auth/react";
import { LoginI } from "@/types/auth.interfaces";

export default function LoginComponent() {
  const [Loading, setLoading] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible(!isVisible);
  const router = useRouter();

  const sendInfo = async (values: LoginI) => {
    setLoading(true);
    const sendAuth = await signIn("credentials", {
      query: values.query,
      password: values.password,
      redirect: false,
    });

    if (sendAuth?.ok) {
      return "¡Inicio de Sesion con exito!";
    } else {
      throw sendAuth;
    }
  };

  return (
    <Formik
      initialValues={LoginValues}
      validationSchema={LoginSchema}
      onSubmit={async (values: LoginI) => {
        toast.promise(sendInfo(values), {
          loading: "Procesando...",
          success: (data) => {
            router.push("/");
            return data;
          },
          error: (error: SignInResponse) => {
            return error.error === "fetch failed"
              ? "Error de conexión."
              : error.error;
          },
          finally: () => {
            setLoading(false);
          },
        });
      }}
    >
      {({ errors, touched }) => (
        <Form className="w-3/6 flex justify-center items-center flex-col max-lg:w-full max-lg:p-0 px-7">
          <div className="flex items-center justify-center mb-8">
            <h1 className="text-2xl max-md:text-xl text-primary">
              Iniciar Sesión
            </h1>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <Field
              label="Correo electronico o cedula de identidad:"
              color={errors.query && touched.query ? "danger" : "primary"}
              name="query"
              description="Ingrese su correo electronico o cedula de identidad"
              variant="bordered"
              errorMessage={errors.query && touched.query && errors.query}
              labelPlacement="outside"
              placeholder="johndoe@user.com"
              as={Input}
            />
            <Field
              label="Contraseña:"
              type={isVisible ? "text" : "password"}
              name="password"
              description="Ingrese su contraseña"
              variant="bordered"
              color={errors.password && touched.password ? "danger" : "primary"}
              errorMessage={
                errors.password && touched.password && errors.password
              }
              endContent={
                <button
                  onClick={() => toggleVisibility()}
                  className="focus:outline-none"
                  type="button"
                >
                  {isVisible ? (
                    <MdOutlineRemoveRedEye className="text-2xl" />
                  ) : (
                    <MdRemoveRedEye className="text-2xl" />
                  )}
                </button>
              }
              as={Input}
            />
            <div className="flex flex-row">
              <Link
                showAnchorIcon
                as={NextLink}
                href="/auth/forgot-password"
                color="warning"
                underline="hover"
                className="text-lg"
              >
                Olvide mi contraseña
              </Link>
            </div>
          </div>
          <Button
            variant="ghost"
            isLoading={Loading}
            size="lg"
            className="w-4/5 mt-6"
            color="primary"
            type="submit"
          >
            Ingresar
          </Button>
        </Form>
      )}
    </Formik>
  );
}
