"use client";

import { LoginSchema, LoginValues } from "@/utils/schemas/AuthSchema";
import { Button, Input, Link } from "@nextui-org/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import {
  MdCancel,
  MdCheckCircle,
  MdOutlineRemoveRedEye,
  MdRemoveRedEye,
} from "react-icons/md";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginComponent() {
  const [nameInput, setNameInput] = useState("email");
  const [Loading, setLoading] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible(!isVisible);
  const router = useRouter();

  const formik = useFormik({
    initialValues: LoginValues,
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const sendAuth = await signIn("credentials", {
          email: values.email,
          ciNumber: values.ciNumber,
          password: values.password,
          redirect: false,
        });
        if (sendAuth?.ok) {
          toast.success("¡Inicio de Sesion con exito!", {
            description: "Redirigiendo al sistema 🚀",
            duration: 3000,
            icon: <MdCheckCircle />,
            onDismiss: () => router.push("/dashboard"),
            onAutoClose: () => router.push("/dashboard"),
          });
        }
        if (sendAuth?.error) throw sendAuth;
      } catch (error) {
        toast.error("¡Algo salió mal!", {
          description: `${error.error}`,
          duration: 6000,
          icon: <MdCancel />,
        });
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (formik.values.email.match(/^[VE|ve]\d+$/)) {
      setNameInput("ciNumber");
      formik.values.ciNumber = formik.values.email;
      formik.values.email = "";
    } else {
      if (!formik.values.ciNumber.match(/^[VE|ve]\d+$/)) {
        setNameInput("email");
        formik.values.ciNumber = "";
      }
    }
  }, [formik.values]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="grid place-items-center h-2/4 w-2/4 border border-gray-300 rounded-xl p-16 shadow-xl"
    >
      <div>
        <h1>Iniciar Sesion | SINSES</h1>
      </div>
      <div className="flex flex-col gap-5 w-full">
        <Input
          label="Correo electronico o cedula de identidad:"
          type={nameInput === "ciNumber" ? "text" : "email"}
          color="primary"
          name={nameInput}
          description="Ingrese su correo electronico o cedula de identidad"
          variant="bordered"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={
            nameInput == "ciNumber"
              ? formik.values.ciNumber.toUpperCase()
              : formik.values.email.toLowerCase()
          }
        />
        <Input
          label="Contraseña:"
          type={isVisible ? "text" : "password"}
          name="password"
          description="Ingrese su contraseña"
          variant="bordered"
          color={
            formik.errors.password && formik.touched.password
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.password &&
            formik.touched.password &&
            formik.errors.password
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
        />
        <div className="flex flex-row justify-between ">
          <Link
            showAnchorIcon
            as={NextLink}
            href="/auth/register"
            color="primary"
            underline="hover"
          >
            Registrarse
          </Link>
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
    </form>
  );
}
