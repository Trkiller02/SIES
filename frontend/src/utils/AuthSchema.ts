import * as Yup from "yup";
import { Messages } from "./messages";

// VALORES INICIALES AUTH

const LoginValues = {
  ciNumber: "",
  email: "",
  password: "",
};

const RegisterValues = {
  name: "",
  lastName: "",
  ciNumber: "",
  email: "",
  password: "",
};

// ESQUEMAS DE VALIDACION AUTH

const UpdatePassSchema = Yup.object({
  ciNumber: Yup.string()
    .matches(/^[VE|ve]\d+$/, Messages.dni_match)
    .required(Messages.required),
  email: Yup.string().email(Messages.email_err).required(Messages.required),
  password: Yup.string().required(Messages.required).min(4, Messages.min_pass),
});

const LoginSchema = Yup.object({
  ciNumber: Yup.string()
    .matches(/^[VE|ve]\d+$/, Messages.dni_match)
    .optional(),
  email: Yup.string().email(Messages.email_err).optional(),
  password: Yup.string().required(Messages.required),
});

const RegisterSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Za-z]+$/, Messages.match_err)
    .required(Messages.required),
  lastName: Yup.string()
    .matches(/^[A-Za-z]+$/, Messages.match_err)
    .required(Messages.required),
  ciNumber: Yup.string()
    .matches(/^[VE]\d+$/, Messages.dni_match)
    .required(Messages.required),
  email: Yup.string().email(Messages.email_err).required(Messages.required),
  password: Yup.string().required(Messages.required).min(4, Messages.min_pass),
});

export {
  LoginSchema,
  LoginValues,
  RegisterValues,
  RegisterSchema,
  UpdatePassSchema,
};
