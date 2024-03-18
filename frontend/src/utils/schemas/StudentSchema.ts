import * as Yup from "yup";
import { Messages } from "../messages";
import { regexList } from "../regexPatterns";
import { initValPerson, personSchema } from "./PersonSchema";

export const initValStudent = {
  person_id: initValPerson,
  born_state: "",
  born_pais: "",
  born_date: "2006-01-01",
  born_municipio: "",
  born_parroquia: "",
  born_place: "",
  age: 0,
};

export const studentSchema = Yup.object().shape({
  person_id: personSchema,
  born_state: Yup.string()
    .matches(regexList.onlyString, Messages.match_err)
    .required(Messages.required),
  born_pais: Yup.string()
    .matches(regexList.onlyString, Messages.match_err)
    .required(Messages.required),
  born_parroquia: Yup.string()
    .matches(regexList.onlyString, Messages.match_err)
    .required(Messages.required),
  born_municipio: Yup.string()
    .matches(regexList.onlyString, Messages.match_err)
    .required(Messages.required),
  born_place: Yup.string()
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
    .max(20, Messages.max_err),
});

export const studentSchemaUpdate = Yup.object().shape({
  person_id: Yup.object()
    .shape({
      name: Yup.string()
        .matches(regexList.onlyString, Messages.match_err)
        .optional(),
      lastname: Yup.string()
        .matches(regexList.onlyString, Messages.match_err)
        .optional(),
      phone_number: Yup.string().optional(),
      ci_number: Yup.string()
        .matches(regexList.forDNI, Messages.dni_match)
        .optional(),
      email: Yup.string().email(Messages.email_err).optional(),
      home_dir: Yup.string()
        .matches(regexList.forDir, Messages.match_err)
        .optional(),
      home_parroquia: Yup.string()
        .matches(regexList.onlyString, Messages.match_err)
        .optional(),
      home_municipio: Yup.string()
        .matches(regexList.onlyString, Messages.match_err)
        .optional(),
    })
    .optional(),
  born_state: Yup.string()
    .matches(regexList.onlyString, Messages.match_err)
    .optional(),
  born_pais: Yup.string()
    .matches(regexList.onlyString, Messages.match_err)
    .optional(),
  born_parroquia: Yup.string()
    .matches(regexList.onlyString, Messages.match_err)
    .optional(),
  born_municipio: Yup.string()
    .matches(regexList.onlyString, Messages.match_err)
    .optional(),
  born_place: Yup.string()
    .matches(regexList.onlyString, Messages.match_err)
    .optional(),
  born_date: Yup.date()
    .optional()
    .min(new Date("2002-01-01"), Messages.min_err)
    .max(new Date(), Messages.max_err),
  age: Yup.number()
    .positive(Messages.min_err)
    .optional()
    .min(3, Messages.min_err)
    .max(19, Messages.max_err),
});
