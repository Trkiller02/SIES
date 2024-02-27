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
  lastname: "",
  ci_number: "",
  email: "",
  password: "",
  role_id: 3,
};

const initValUpdatePass = {
  ci_number: "",
  restore_token: "",
  password: "",
  repeatPassword: "",
};

// ESQUEMAS DE VALIDACION AUTH

const UpdatePassSchema = Yup.object({
  ci_number: Yup.string()
    .matches(regexList.forDNI, Messages.dni_match)
    .required(Messages.required),
  restore_token: Yup.string()
    .matches(regexList.forToken, Messages.match_err)
    .required(Messages.required),
  password: Yup.string().required(Messages.required).min(4, Messages.min_pass),
  repeatPassword: Yup.string()
    .required(Messages.required)
    .oneOf([Yup.ref("password"), "La contraseña no coincide."]),
});

const LoginSchema = Yup.object({
  query: Yup.string()
    .matches(regexList.forAuth, Messages.match_err)
    .required(Messages.required),
  password: Yup.string().required(Messages.required),
});

const RegisterSchema = Yup.object({
  name: Yup.string()
    .matches(regexList.onlyString, Messages.match_err)
    .required(Messages.required),
  lastname: Yup.string()
    .matches(regexList.onlyString, Messages.match_err)
    .required(Messages.required),
  ci_number: Yup.string()
    .matches(regexList.forDNI, Messages.dni_match)
    .required(Messages.required),
  email: Yup.string().email(Messages.email_err).required(Messages.required),
  password: Yup.string().required(Messages.required).min(4, Messages.min_pass),
  repeatPassword: Yup.string()
    .required(Messages.required)
    .oneOf([Yup.ref("password"), "La contraseña no coincide."]),
});

const RegisterSchemaUpdate = Yup.object({
  name: Yup.string()
    .matches(regexList.onlyString, Messages.match_err)
    .optional(),
  lastname: Yup.string()
    .matches(regexList.onlyString, Messages.match_err)
    .optional(),
  ci_number: Yup.string()
    .matches(regexList.forDNI, Messages.dni_match)
    .optional(),
  email: Yup.string().email(Messages.email_err).optional(),
  password: Yup.string().min(4, Messages.min_pass).optional(),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), "La contraseña no coincide."])
    .optional(),
});

export {
  LoginSchema, // <-- exportar esquema de validacion
  LoginValues, // <-- exportar valores iniciales
  RegisterValues,
  RegisterSchema,
  RegisterSchemaUpdate,
  UpdatePassSchema,
  initValUpdatePass,
};
