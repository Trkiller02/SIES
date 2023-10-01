"use client";

// hooks
import { useFormik } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import { toast } from "sonner";

// utilidades
import { RegisterSchema, RegisterValues } from "@/utils/AuthSchema";

// componentes
import { Button, Input, Link } from "@nextui-org/react";

// MATERIAL DESIGN ICONS GOOGLE APACHE LICENSE 2.0
import {
  MdAccountCircle,
  MdAlternateEmail,
  MdCancel,
  MdCheckCircle,
  MdFeaturedPlayList,
  MdOutlineRemoveRedEye,
  MdRemoveRedEye,
} from "react-icons/md";

export default function RegisterComponent() {
  const router = useRouter();

  const [Loading, setLoading] = useState(false);
  const [isVisible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!isVisible);

  const formik = useFormik({
    initialValues: RegisterValues,
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (res.ok) {
          toast.success("¡Tarea exitosa!", {
            description: "Usuario registrado con exito.",
            duration: 4000,
            icon: <MdCheckCircle />,
            onAutoClose: () => router.push("/auth/login"),
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error("¡Algo salió mal!", {
            description: `Algo salió mal, ${error.message}`,
            duration: 4000,
            icon: <MdCancel />,
            onAutoClose: () => router.push("/auth/login"),
          });
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="grid place-items-center h-2/4 w-2/4 border border-gray-300 rounded-xl px-7 py-8 shadow-xl"
    >
      <div>
        <h1>Registro | SINSES</h1>
      </div>
      <div className="flex flex-col gap-5 w-full">
        <Input
          endContent={<MdAccountCircle className="text-2xl" />}
          label="Nombre:"
          name="name"
          description="Ingrese su nombre"
          variant="bordered"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          color={
            formik.errors.name && formik.touched.name ? "danger" : "primary"
          }
          errorMessage={
            formik.errors.name && formik.touched.name && formik.errors.name
          }
          value={formik.values.name.toUpperCase()}
        />
        <Input
          endContent={<MdAccountCircle className="text-2xl" />}
          label="Apellido:"
          name="lastName"
          description="Ingrese su nombre"
          variant="bordered"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
          value={formik.values.lastName.toUpperCase()}
        />
        <Input
          endContent={<MdAlternateEmail className="text-2xl" />}
          label="Correo electronico:"
          type="email"
          name="email"
          description="Ingrese su correo electronico"
          variant="bordered"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          color={
            formik.errors.email && formik.touched.email ? "danger" : "primary"
          }
          errorMessage={
            formik.errors.email && formik.touched.email && formik.errors.email
          }
        />
        <Input
          endContent={<MdFeaturedPlayList className="text-2xl self-center" />}
          label="Cedula de identidad:"
          type="text"
          color={
            formik.errors.ciNumber && formik.touched.ciNumber
              ? "danger"
              : "primary"
          }
          name="ciNumber"
          description="Ingrese su cedula de identidad"
          variant="bordered"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={
            formik.errors.ciNumber &&
            formik.touched.ciNumber &&
            formik.errors.ciNumber
          }
          value={formik.values.ciNumber.toUpperCase()}
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

        <Link
          showAnchorIcon
          as={NextLink}
          href="/auth/login"
          color="primary"
          underline="hover"
        >
          ¿Ya tienes una cuenta?
        </Link>
      </div>
      <Button
        variant="ghost"
        isLoading={Loading}
        className="w-2/4 mt-6"
        color="primary"
        type="submit"
      >
        Registrarse
      </Button>
    </form>
  );
}
