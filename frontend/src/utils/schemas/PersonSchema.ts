import * as Yup from "yup";
import { Messages } from "../messages";
import { regexList } from "../regexPatterns";

export const initValPerson = {
  name: "",
  lastName: "",
  ciNumber: "",
  email: "",
  phoneNumber: "",
  homeDir: "",
  homeParroquia: "",
  homeMunicipio: "",
  relation: "",
};

export const personSchema = Yup.object({
  name: Yup.string()
    .matches(regexList.onlyString, Messages.match_err)
    .required(Messages.required),
  lastName: Yup.string()
    .matches(regexList.onlyString, Messages.match_err)
    .required(Messages.required),
  phoneNumber: Yup.string().required(Messages.required),
  ciNumber: Yup.string()
    .matches(regexList.forDNI, Messages.dni_match)
    .required(Messages.required),
  email: Yup.string().email(Messages.email_err).required(Messages.required),
  homeDir: Yup.string()
    .matches(regexList.forDir, Messages.match_err)
    .required(Messages.required),
  homeParroquia: Yup.string()
    .matches(regexList.forDir, Messages.match_err)
    .required(Messages.required),
  homeMunicipio: Yup.string()
    .matches(regexList.forDir, Messages.match_err)
    .required(Messages.required),
  relation: Yup.string()
    .matches(regexList.onlyString, Messages.match_err)
    .required(Messages.required),
});
