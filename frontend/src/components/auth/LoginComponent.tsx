"use client";

import { LoginSchema, LoginValues } from "@/utils/schemas/AuthSchema";
import { Button, Input, Link } from "@nextui-org/react";
import Image from "next/image";
import { Field, Form, Formik, useFormik } from "formik";
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

  /*   const formik = useFormik({
    initialValues: LoginValues,
    validationSchema: LoginSchema,
    onSubmit: async (values: LoginI) => {
      toast.promise(sendInfo(values), {
        loading: "Procesando...",
        success: (data) => {
          router.push("/");
          return data;
        },
        error: (error: SignInResponse) => {
          return error.error;
        },
        finally: () => {
          setLoading(false);
        },
      });
    },
  }); */

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
            console.log(error);
            return error.error;
          },
          finally: () => {
            setLoading(false);
          },
        });
      }}
    >
      {({ errors, touched }) => (
        <Form className="grid place-items-center h-2/4 w-2/4 border border-gray-300 rounded-xl p-16 shadow-xl">
          <div>
            <Image
              src="/img/image1.svg"
              alt="logo"
              width={164}
              height={164}
              priority
            />
            <h1>Iniciar Sesion | SIES</h1>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <Field
              label="Correo electronico o cedula de identidad:"
              color="primary"
              name="query"
              description="Ingrese su correo electronico o cedula de identidad"
              variant="bordered"
              errorMessage={errors.query && touched.query && errors.query}
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
              >
                Olvide mi contraseña
              </Link>
            </div>
          </div>
          <Button
            variant="ghost"
            isLoading={Loading}
            className="w-2/4 mt-6"
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
