import * as Yup from "yup";
import { Messages } from "../messages";
import { regexList } from "../regexPatterns";
import { initValPerson, personSchema } from "./PersonSchema";

export const initValRepresent = {
  person_id: initValPerson,
  tlfn_home: "0274",
  relation: "",
  profession: "",
  work_place: "",
  work_phone_number: "",
  income_month: 0,
  represent: false,
};

export const representSchema = Yup.object({
  person_id: personSchema,
  relation: Yup.string()
    .matches(regexList.onlyString)
    .required(Messages.required),
  tlfn_home: Yup.string()
    .optional()
    .nullable()
    .matches(regexList.forHomePhoneNumber),
  profession: Yup.string().matches(regexList.onlyString).optional(),
  work_place: Yup.string()
    .matches(regexList.forDir, Messages.match_err)
    .optional(),
  work_phone_number: Yup.string().optional().nullable(),
  income_month: Yup.number().positive().optional().nullable(),
  represent: Yup.string().optional().nullable(),
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
      phone_number: Yup.string()
        .optional()
        .nullable()
        .matches(regexList.forPersonalPhoneNumber, Messages.phone_format),
      ci_number: Yup.string()
        .matches(regexList.forDNI, Messages.dni_match)
        .optional()
        .nullable(),
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
  relation: Yup.string().matches(regexList.onlyString).optional(),
  tlfn_home: Yup.string()
    .optional()
    .nullable()
    .matches(regexList.forHomePhoneNumber, Messages.phone_home_format),
  profession: Yup.string().matches(regexList.onlyString).optional().nullable(),
  work_place: Yup.string()
    .matches(regexList.forDir, Messages.match_err)
    .optional()
    .nullable(),
  work_phone_number: Yup.string().optional().nullable(),
  income_month: Yup.number().optional().nullable(),
  represent: Yup.string().optional().nullable(),
});
