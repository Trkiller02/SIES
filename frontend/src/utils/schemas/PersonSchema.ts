import * as Yup from "yup";
import { Messages } from "../messages";
import { regexList } from "../regexPatterns";

export const initValPerson = {
  name: "",
  lastname: "",
  phone_number: "+584",
  ci_number: "V",
  email: "",
  home_dir: "",
  home_parroquia: "",
  home_municipio: "",
};

export const personSchema = Yup.object().shape({
  name: Yup.string()
    .matches(regexList.onlyString, Messages.match_err)
    .required(Messages.required),
  lastname: Yup.string()
    .matches(regexList.onlyString, Messages.match_err)
    .required(Messages.required),
  phone_number: Yup.string()
    .optional()
    .nullable()
    .matches(regexList.forPersonalPhoneNumber, Messages.phone_format),
  ci_number: Yup.string()
    .matches(regexList.forDNI, Messages.dni_match)
    .required(Messages.required),
  email: Yup.string().email(Messages.email_err).optional(),
  home_dir: Yup.string()
    .matches(regexList.forDir, Messages.match_err)
    .required(Messages.required),
  home_parroquia: Yup.string()
    .matches(regexList.onlyString, Messages.match_err)
    .required(Messages.required),
  home_municipio: Yup.string()
    .matches(regexList.onlyString, Messages.match_err)
    .required(Messages.required),
});
