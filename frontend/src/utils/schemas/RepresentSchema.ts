import * as Yup from "yup";
import { Messages } from "../messages";
import { regexList } from "../regexPatterns";

export const initValRepresent = {
  person_id: {
    name: "",
    lastname: "",
    phone_number: "",
    ci_number: "",
    email: "",
    home_dir: "",
    home_parroquia: "",
    home_municipio: "",
    relation: "",
  },
  tlfn_home: "",
  profession: "",
  work_place: "",
  work_phone_number: "",
  income_month: 0,
  rl: false,
};

export const representSchema = Yup.object({
  person_id: Yup.object().shape({
    name: Yup.string()
      .matches(regexList.onlyString, Messages.match_err)
      .required(Messages.required),
    lastname: Yup.string()
      .matches(regexList.onlyString, Messages.match_err)
      .required(Messages.required),
    phone_number: Yup.string().optional(),
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
    relation: Yup.string()
      .matches(regexList.onlyString)
      .required(Messages.required),
  }),
  tlfn_home: Yup.string().optional(),
  profession: Yup.string().matches(regexList.onlyString).optional(),
  work_place: Yup.string()
    .matches(regexList.onlyString, Messages.match_err)
    .optional(),
  work_phone_number: Yup.string().optional().nullable(),
  income_month: Yup.number().positive().optional(),
  rl: Yup.string().optional(),
});

export const representSchemaUpdate = Yup.object({
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
      relation: Yup.string().matches(regexList.onlyString).optional(),
    })
    .optional(),
  tlfn_home: Yup.string().optional().nullable(),
  profession: Yup.string().matches(regexList.onlyString).optional().nullable(),
  work_place: Yup.string()
    .matches(regexList.onlyString, Messages.match_err)
    .optional()
    .nullable(),
  work_phone_number: Yup.string().optional().nullable(),
  income_month: Yup.number().optional().nullable(),
  rl: Yup.string().optional().nullable(),
});
