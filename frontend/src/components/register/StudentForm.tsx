import { Input } from "@nextui-org/react";
import { useFormik } from "formik";

export default function StudentForm() {
  const formik = useFormik({
    initialValues: { password: "" },
    onSubmit: async (values) => {
      alert(values);
    },
  });

  return (
    <form>
      <Input
        label="Contraseña:"
        type="password"
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
      />
    </form>
  );
}
