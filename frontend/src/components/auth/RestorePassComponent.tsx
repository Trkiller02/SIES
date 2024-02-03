"use client";

import { fetchData, fetchDataWithoutBody } from "@/utils/fetchHandler";
import { Input, Button, Tooltip, Link } from "@nextui-org/react";
import { Field, Form, Formik, useFormik } from "formik";
import { useState } from "react";
import {
  MdCancel,
  MdCheckCircle,
  MdOutlineRemoveRedEye,
  MdRemoveRedEye,
  MdSearch,
} from "react-icons/md";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  UpdatePassSchema,
  initValUpdatePass,
} from "@/utils/schemas/AuthSchema";
import NextLink from "next/link";

export default function RestorePassComponent() {
  //STATES
  const [isVisible, setVisible] = useState(false);
  const [isVisibleToken, setVisibleToken] = useState(false);
  const [Loading, setLoading] = useState(false);

  //HANDLERS
  const toggleVisibilityToken = () => setVisibleToken(!isVisibleToken);
  const toggleVisibility = () => setVisible(!isVisible);
  const router = useRouter();

  const sendInfo = async (values: any) => {
    setLoading(true);

    const res = await fetchData("/auth/forgot-password", "PUT", {});

    if (res) {
      return "Usuario registrado con exito.";
    }
  };

  const searchUser = async (value: string) => {
    const data = await fetchDataWithoutBody(`/user/${value}`);

    if (data) {
      return "Existe el usuario, adelante...";
    }
  };

  return (
    <Formik
      initialValues={initValUpdatePass}
      validationSchema={UpdatePassSchema}
      onSubmit={async (values) => {
        toast.promise(sendInfo(values), {
          loading: "Procesando...",
          success: (data) => {
            return data;
          },
          error: (error: Error) => {
            return error.message === "Failed to fetch"
              ? "Error en conexion"
              : error.message;
          },
          finally: () => {
            setLoading(false);
          },
        });
      }}
    >
      {({ values, errors, touched }) => (
        <Form className="w-3/6 flex justify-center items-center flex-col max-lg:w-full max-lg:p-0 px-7">
          <div className="flex items-center justify-center mb-5 w-full flex-col">
            <h1 className="text-xl text-primary">Recuperación de contraseña</h1>
          </div>
          <div className="flex flex-col gap-3 justify-center items-center w-full">
            <Field
              label="Cedula de Identidad:"
              name="ciNumber"
              description="Ingrese su Cedula de Identidad"
              variant="bordered"
              color={errors.ciNumber && touched.ciNumber ? "danger" : "primary"}
              errorMessage={
                errors.ciNumber && touched.ciNumber && errors.ciNumber
              }
              value={values.ciNumber.toUpperCase()}
              as={Input}
            />

            <Field
              label="Token de recuperación:"
              name="restoreToken"
              type={isVisibleToken ? "text" : "password"}
              description="Ingrese token de restauración"
              variant="bordered"
              color={
                errors.restoreToken && touched.restoreToken
                  ? "danger"
                  : "primary"
              }
              errorMessage={
                errors.restoreToken &&
                touched.restoreToken &&
                errors.restoreToken
              }
              value={values.restoreToken}
              endContent={
                <button
                  onClick={() => toggleVisibilityToken()}
                  className="focus:outline-none"
                  type="button"
                >
                  {isVisibleToken ? (
                    <MdOutlineRemoveRedEye className="text-2xl" />
                  ) : (
                    <MdRemoveRedEye className="text-2xl" />
                  )}
                </button>
              }
              as={Input}
            />

            <Field
              label="Nueva contraseña:"
              name="password"
              type={isVisible ? "text" : "password"}
              description="Repita la nueva contraseña"
              variant="bordered"
              color={errors.password && touched.password ? "danger" : "primary"}
              errorMessage={
                errors.password && touched.password && errors.password
              }
              value={values.password}
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
            <Field
              label="Repetir contraseña:"
              name="repeatPassword"
              type={isVisible ? "text" : "password"}
              description="Repita la nueva contraseña"
              variant="bordered"
              color={
                errors.repeatPassword && touched.repeatPassword
                  ? "danger"
                  : "primary"
              }
              errorMessage={
                errors.repeatPassword &&
                touched.repeatPassword &&
                (errors.repeatPassword.split(",")[1] || errors.repeatPassword)
              }
              value={values.repeatPassword}
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
          </div>
          <div className="flex flex-row w-full justify-between my-5">
            <Link
              showAnchorIcon
              as={NextLink}
              href="/auth/login"
              color="primary"
              underline="hover"
            >
              Iniciar Sesión
            </Link>
          </div>
          <Button
            variant="ghost"
            className="w-3/5"
            color="primary"
            type="submit"
            isLoading={Loading}
          >
            Restaurar
          </Button>
        </Form>
      )}
    </Formik>
  );
}
