import * as Yup from "yup";
import { Messages } from "../messages";
import { regexList } from "../regexPatterns";

export const initValStudent = {
  name: "",
  lastName: "",
  ciNumber: "",
  email: "",
  phoneNumber: "",
  homeDir: "",
  homeParroquia: "",
  homeMunicipio: "",
  bornPlace: "",
  bornState: "",
  bornMunicipio: "",
  bornParroquia: "",
  bornPais: "",
  bornDate: "2003-01-01",
  age: 0,
  sex: "",
  weight: 0,
  size: 0,
  Lateralidad: "",
  instPro: "",
};

export const studentSchema = Yup.object({
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
  bornPlace: Yup.string()
    .matches(regexList.forDir, Messages.match_err)
    .required(Messages.required),
  bornState: Yup.string()
    .matches(regexList.forDir, Messages.match_err)
    .required(Messages.required),
  bornMunicipio: Yup.string()
    .matches(regexList.forDir, Messages.match_err)
    .required(Messages.required),
  bornParroquia: Yup.string()
    .matches(regexList.forDir, Messages.match_err)
    .required(Messages.required),
  bornPais: Yup.string()
    .matches(regexList.forDir, Messages.match_err)
    .required(Messages.required),
  bornDate: Yup.date().required(Messages.required),
  age: Yup.number()
    .positive(Messages.min_err)
    .required(Messages.required)
    .min(3, Messages.min_err)
    .max(19, Messages.max_err),
  weight: Yup.number().positive(Messages.min_err).required(Messages.required),
  size: Yup.number().positive(Messages.min_err).required(Messages.required),
  sex: Yup.string()
    .required(Messages.required)
    .matches(regexList.forRelation, Messages.match_err),
  Lateralidad: Yup.string()
    .required(Messages.required)
    .matches(regexList.forRelation, Messages.match_err),
  instPro: Yup.string()
    .matches(regexList.forDir, Messages.match_err)
    .required(Messages.required),
});
