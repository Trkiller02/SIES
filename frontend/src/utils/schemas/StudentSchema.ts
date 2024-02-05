import * as Yup from "yup";
import { Messages } from "../messages";
import { regexList } from "../regexPatterns";

export const initValStudent = {
  person_id: {
    name: "",
    lastname: "",
    ci_number: "",
    email: "",
    phone_number: "",
    home_dir: "",
    home_parroquia: "",
    home_municipio: "",
  },
  born_state: "",
  born_pais: "",
  born_date: "2006-01-01",
  age: 0,
  sex: "",
  weight: 0,
  size: 0,
  lateralidad: "",
  relation: "E",
};

export const studentSchema = Yup.object().shape({
  person_id: Yup.object().shape({
    name: Yup.string()
      .matches(regexList.onlyString, Messages.match_err)
      .required(Messages.required),
    lastname: Yup.string()
      .matches(regexList.onlyString, Messages.match_err)
      .required(Messages.required),
    phone_number: Yup.string().required(Messages.required),
    ci_number: Yup.string()
      .matches(regexList.forDNI, Messages.dni_match)
      .required(Messages.required),
    email: Yup.string().email(Messages.email_err).required(Messages.required),
    home_dir: Yup.string()
      .matches(regexList.forDir, Messages.match_err)
      .required(Messages.required),
    home_parroquia: Yup.string()
      .matches(regexList.onlyString, Messages.match_err)
      .required(Messages.required),
    home_municipio: Yup.string()
      .matches(regexList.onlyString, Messages.match_err)
      .required(Messages.required),
  }),
  born_state: Yup.string()
    .matches(regexList.onlyString, Messages.match_err)
    .required(Messages.required),
  born_pais: Yup.string()
    .matches(regexList.onlyString, Messages.match_err)
    .required(Messages.required),
  born_date: Yup.date()
    .required(Messages.required)
    .min(new Date("2002-01-01"), Messages.min_err)
    .max(new Date(), Messages.max_err),
  age: Yup.number()
    .positive(Messages.min_err)
    .required(Messages.required)
    .min(3, Messages.min_err)
    .max(19, Messages.max_err),
  weight: Yup.number()
    .positive(Messages.min_err)
    .required(Messages.required)
    .min(10, Messages.min_err)
    .max(120, Messages.max_err),
  size: Yup.number()
    .positive(Messages.min_err)
    .required(Messages.required)
    .min(0.2, Messages.min_err)
    .max(2.5, Messages.max_err),
  sex: Yup.string().required(Messages.required),
  lateralidad: Yup.string().required(Messages.required),
});
