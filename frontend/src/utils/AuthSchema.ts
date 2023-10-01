import * as Yup from "yup";

const LoginValues = {
  ciNumber: "",
  email: "",
  password: "",
};

const LoginSchema = Yup.object({
  ciNumber: Yup.string()
    .matches(/^[VE|ve]\d+$/)
    .optional(),
  email: Yup.string().email("Invalid email").optional(),
  password: Yup.string().required("Este campo es requerido"),
});

export const RegisterValues = {
  name: "",
  lastName: "",
  ciNumber: "",
  email: "",
  password: "",
};

export const RegisterSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Za-z]+$/, "Esta suministrando caracteres no soportados")
    .required("Este campo es requerido"),
  lastName: Yup.string()
    .matches(/^[A-Za-z]+$/, "Esta suministrando caracteres no soportados")
    .required("Este campo es requerido"),
  ciNumber: Yup.string()
    .matches(/^[VE]\d+$/, "V8938... (V) Venezolano (E) Extranjero)")
    .required("Este campo es requerido"),
  email: Yup.string()
    .email("El correo que suministro no es valido")
    .required("Este campo es requerido"),
  password: Yup.string()
    .required("Este campo es requerido")
    .min(4, "Se requiere una contraseña mayor a 4 digitos"),
});

export { LoginSchema, LoginValues };
