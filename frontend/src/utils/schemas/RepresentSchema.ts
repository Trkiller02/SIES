import * as Yup from "yup";
import { Messages } from "../messages";
import { regexList } from "../regexPatterns";

export const initValRepresent = {
  name: "",
  lastName: "",
  phoneNumber: "",
  ciNumber: "",
  tlfnHome: "",
  email: "",
  homeDir: "",
  homeParroquia: "",
  homeMunicipio: "",
  profession: "",
  workPlace: "",
  workPhoneNumber: "",
  incomeMonth: 0,
  relation: "",
};

export const representSchema = Yup.object({
  name: Yup.string()
    .matches(regexList.onlyString, Messages.match_err)
    .required(Messages.required),
  lastName: Yup.string()
    .matches(regexList.onlyString, Messages.match_err)
    .required(Messages.required),
  phoneNumber: Yup.string().required(Messages.required),
  tlfnHome: Yup.string().required(Messages.required),
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
  profession: Yup.string()
    .matches(regexList.onlyString)
    .required(Messages.required),
  workPlace: Yup.string()
    .required(Messages.required)
    .matches(regexList.onlyString, Messages.match_err)
    .optional(),
  workPhoneNumber: Yup.string().required(Messages.required).optional(),
  incomeMonth: Yup.number().positive().optional(),
  relation: Yup.string()
    .matches(regexList.onlyString)
    .required(Messages.required),
});
