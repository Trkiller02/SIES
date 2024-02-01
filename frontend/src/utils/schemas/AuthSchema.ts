import * as Yup from "yup";
import { Messages } from "../messages";
import { regexList } from "../regexPatterns";

// VALORES INICIALES AUTH

const LoginValues = {
  query: "",
  password: "",
};

const RegisterValues = {
  name: "",
  lastName: "",
  ciNumber: "",
  email: "",
  password: "",
  repeatPassword: "",
  restoreToken: "ADMIN1",
};

const initValUpdatePass = {
  ciNumber: "",
  restoreToken: "",
  password: "",
  repeatPassword: "",
};

// ESQUEMAS DE VALIDACION AUTH

const UpdatePassSchema = Yup.object({
  ciNumber: Yup.string()
    .matches(regexList.forDNI, Messages.dni_match)
    .required(Messages.required),
  restoreToken: Yup.string()
    .matches(regexList.forToken, Messages.match_err)
    .required(Messages.required),
  password: Yup.string().required(Messages.required).min(4, Messages.min_pass),
  repeatPassword: Yup.string()
    .required(Messages.required)
    .oneOf([Yup.ref("password"), "La contraseña no coincide."]),
});

const LoginSchema = Yup.object({
  query: Yup.string()
    .matches(regexList.forDNI || regexList.forEmail, Messages.match_err)
    .required(Messages.required),
  password: Yup.string().required(Messages.required),
});

const RegisterSchema = Yup.object({
  name: Yup.string()
    .matches(regexList.onlyString, Messages.match_err)
    .required(Messages.required),
  lastName: Yup.string()
    .matches(regexList.onlyString, Messages.match_err)
    .required(Messages.required),
  ciNumber: Yup.string()
    .matches(regexList.forDNI, Messages.dni_match)
    .required(Messages.required),
  email: Yup.string().email(Messages.email_err).required(Messages.required),
  password: Yup.string().required(Messages.required).min(4, Messages.min_pass),
  repeatPassword: Yup.string()
    .required(Messages.required)
    .oneOf([Yup.ref("password"), "La contraseña no coincide."]),
});

export {
  LoginSchema, // <-- exportar esquema de validacion
  LoginValues, // <-- exportar valores iniciales
  RegisterValues,
  RegisterSchema,
  UpdatePassSchema,
  initValUpdatePass,
};
