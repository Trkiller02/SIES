"use client";

import { fetchData, fetchDataWithoutBody } from "@/utils/fetchHandler";
import { Input, Button, Tooltip, Link } from "@nextui-org/react";
import { useFormik } from "formik";
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

export default function RestorePasswordPage() {
  const iconSuccess = <MdCheckCircle className="text-xl text-success-500" />;
  const iconFail = <MdCancel className="text-xl text-danger-500" />;
  const [isVisible, setVisible] = useState(false);
  const [isVisibleToken, setVisibleToken] = useState(false);
  const [Loading, setLoading] = useState(false);
  const toggleVisibility = () => setVisible(!isVisible);
  const toggleVisibilityToken = () => setVisibleToken(!isVisibleToken);
  const router = useRouter();

  const formik = useFormik({
    initialValues: initValUpdatePass,
    validationSchema: UpdatePassSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await fetchData(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`,
          "PUT",
          values
        );

        toast.success("¡Tarea exitosa!", {
          description:
            "Se cambio la contraseña de forma exitosa. Redirigiendo...",
          important: true,
          duration: 1000,
          icon: iconSuccess,
          onAutoClose: () => router.push("/auth/login"),
          onDismiss: () => router.push("/auth/login"),
        });
      } catch (error) {
        toast.error("¡Algo salió mal!", {
          important: true,
          description:
            error instanceof Error
              ? error.message === "Failed to fetch" && "Error en conexión."
              : "Error desconocido.",
          duration: 4000,
          icon: iconFail,
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const searchUser = async () => {
    const data = await fetchDataWithoutBody(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${formik.values.ciNumber}`
    );

    if (data) {
      return "Existe el usuario, adelante...";
    }
  };

  return (
    <form
      className="h-2/4 w-3/4 border border-gray-300 rounded-xl shadow-xl p-8"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex items-center justify-center mb-7 w-full">
        <h1 className="text-2xl">
          Recuperación de contraseña
          <p className="text-primary-500 inline-flex">|</p> SIES
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-3">
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
          className="col-span-2"
          value={formik.values.ciNumber.toUpperCase()}
        />
        <Tooltip
          content="Buscar Usuario."
          placement="bottom"
          offset={-10}
          className="w-full col-span-1"
        >
          <Button
            isDisabled={formik.values.ciNumber ? false : true}
            isIconOnly
            color="primary"
            variant="ghost"
            aria-label="Buscar entidad"
            className="w-full h-3/4"
            onClick={() =>
              toast.promise(searchUser, {
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

        <Input
          label="Token de recuperación:"
          name="restoreToken"
          type={isVisibleToken ? "text" : "password"}
          description="Ingrese token de restauración"
          variant="bordered"
          color={
            formik.errors.restoreToken && formik.touched.restoreToken
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.restoreToken &&
            formik.touched.restoreToken &&
            formik.errors.restoreToken.split(",")[1].toString()
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-3"
          value={formik.values.restoreToken}
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
        />

        <Input
          label="Nueva contraseña:"
          name="password"
          type={isVisible ? "text" : "password"}
          description="Repita la nueva contraseña"
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
          className="col-span-3"
          value={formik.values.password}
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
        <Input
          label="Repetir contraseña:"
          name="repeatPassword"
          type={isVisible ? "text" : "password"}
          description="Repita la nueva contraseña"
          variant="bordered"
          color={
            formik.errors.repeatPassword && formik.touched.repeatPassword
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.repeatPassword &&
            formik.touched.repeatPassword &&
            formik.errors.repeatPassword.split(",")[1].toString()
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-3"
          value={formik.values.repeatPassword}
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
      </div>
      <div className="flex flex-row justify-between my-6">
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
          href="/auth/login"
          color="success"
          underline="hover"
        >
          Iniciar Sesión
        </Link>
      </div>
      <div className="flex justify-center mt-7">
        <Button
          variant="solid"
          className="w-2/4"
          color="primary"
          type="submit"
          isLoading={Loading}
        >
          Restaurar
        </Button>
      </div>
    </form>
  );
}
