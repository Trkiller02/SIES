"use client";

// hooks
import { useState } from "react";

// utilidades
import { RegisterSchema, RegisterValues } from "@/utils/schemas/AuthSchema";
import { fetchData } from "@/utils/fetchHandler";
import { toast } from "sonner";

// componentes
import { Button, Input } from "@nextui-org/react";
import { Field, Form, Formik } from "formik";

// MATERIAL DESIGN ICONS GOOGLE APACHE LICENSE 2.0
import {
  MdAccountCircle,
  MdAlternateEmail,
  MdFeaturedPlayList,
  MdOutlineRemoveRedEye,
  MdRemoveRedEye,
} from "react-icons/md";

export default function RegisterComponent() {
  const [Loading, setLoading] = useState(false);
  const [isVisible, setVisible] = useState(false);

  const sendInfo = async (values: any) => {
    setLoading(true);

    const res = await fetchData(`/auth/register`, "POST", values);

    if (res) {
      return "Usuario registrado con exito.";
    }
  };

  const toggleVisibility = () => setVisible(!isVisible);

  return (
    <Formik
      initialValues={RegisterValues}
      validationSchema={RegisterSchema}
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
      {({ errors, touched, values }) => (
        <Form className="grid place-items-center h-2/4 w-2/4 border border-gray-300 rounded-xl px-7 py-8 shadow-xl">
          <div>
            <h1>Registro | SINSES</h1>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <Field
              endContent={<MdAccountCircle className="text-2xl" />}
              label="Nombre:"
              name="name"
              description="Ingrese su nombre"
              variant="bordered"
              color={errors.name && touched.name ? "danger" : "primary"}
              errorMessage={errors.name && touched.name && errors.name}
              as={Input}
            />
            <Field
              endContent={<MdAccountCircle className="text-2xl" />}
              label="Apellido:"
              name="lastName"
              description="Ingrese su nombre"
              variant="bordered"
              color={errors.lastName && touched.lastName ? "danger" : "primary"}
              errorMessage={
                errors.lastName && touched.lastName && errors.lastName
              }
              as={Input}
            />
            <Field
              endContent={<MdAlternateEmail className="text-2xl" />}
              label="Correo electronico:"
              type="email"
              name="email"
              description="Ingrese su correo electronico"
              variant="bordered"
              color={errors.email && touched.email ? "danger" : "primary"}
              errorMessage={errors.email && touched.email && errors.email}
              as={Input}
            />
            <Field
              endContent={
                <MdFeaturedPlayList className="text-2xl self-center" />
              }
              label="Cedula de identidad:"
              type="text"
              color={errors.ciNumber && touched.ciNumber ? "danger" : "primary"}
              name="ciNumber"
              description="Ingrese su cedula de identidad"
              variant="bordered"
              errorMessage={
                errors.ciNumber && touched.ciNumber && errors.ciNumber
              }
              value={values.ciNumber.toUpperCase()}
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
            <Field
              label="Repetir contraseña:"
              type={isVisible ? "text" : "password"}
              name="repeatPassword"
              description="Ingrese su contraseña"
              variant="bordered"
              color={
                errors.repeatPassword && touched.repeatPassword
                  ? "danger"
                  : "primary"
              }
              errorMessage={
                errors.repeatPassword &&
                touched.repeatPassword &&
                (errors.repeatPassword.split(", ")[1] || errors.repeatPassword)
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
          </div>
          <div className="w-full mt-6 flex flex-row justify-between">
            <Button
              variant="ghost"
              isLoading={Loading}
              size="lg"
              color="danger"
              type="reset"
            >
              Cancelar
            </Button>
            <Button
              variant="solid"
              isLoading={Loading}
              size="lg"
              color="primary"
              type="submit"
            >
              Registrar
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
