import * as Yup from "yup";
import { Messages } from "../messages";
import { regexList } from "../regexPatterns";

export const initValRepresent = {
  name: "",
  lastName: "",
  phoneNumber: "",
  ciNumber: "",
  email: "",
  homeDir: "",
  homeParroquia: "",
  homeMunicipio: "",
  civilStatus: "",
  Instrution: "",
  profession: "",
  business: "",
  workPlace: "",
  workPhoneNumber: "",
  workEmail: "",
  incomeMonth: 0,
  sourceIncome: "",
};

export const representSchema = Yup.object({
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
  profession: Yup.string()
    .matches(regexList.onlyString)
    .required(Messages.required),
  business: Yup.string()
    .matches(regexList.onlyString)
    .required(Messages.required),
  workPlace: Yup.string()
    .required(Messages.required)
    .matches(regexList.onlyString, Messages.match_err),
  workPhoneNumber: Yup.string().required(Messages.required),
  workEmail: Yup.string().email(Messages.email_err).required(Messages.required),
  incomeMonth: Yup.number().positive().optional(),
  sourceIncome: Yup.string()
    .matches(regexList.onlyString)
    .required(Messages.required),
});
