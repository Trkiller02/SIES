import * as Yup from "yup";
import { regexList } from "../regexPatterns";
import { Messages } from "../messages";
import { HealthInfoI } from "@/types/register.interfaces";

export const healthValInit: HealthInfoI = {
  live_with: "",
  type_aler: "",
  trata_esp: "",
  prefer_act: "",
  recre_time: "",
  site_act: "",
  sex: "",
  weight: 0,
  size: 0,
  lateralidad: "",
};

export const healthSchema = Yup.object({
  type_aler: Yup.string().matches(regexList.onlyString).optional(),
  trata_esp: Yup.string().matches(regexList.onlyString).optional(),
  prefer_act: Yup.string().matches(regexList.onlyString).optional(),
  recre_time: Yup.string().matches(regexList.onlyString).optional(),
  live_with: Yup.string()
    .matches(regexList.onlyString)
    .required(Messages.required),
  site_act: Yup.string().matches(regexList.onlyString).optional(),
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
  lateralidad: Yup.string().optional(),
});

export const healthSchemaUpdate = Yup.object({
  type_aler: Yup.string().matches(regexList.onlyString).optional(),
  trata_esp: Yup.string().matches(regexList.onlyString).optional(),
  prefer_act: Yup.string().matches(regexList.onlyString).optional(),
  recre_time: Yup.string().matches(regexList.onlyString).optional(),
  live_with: Yup.string()
    .matches(regexList.onlyString)
    .required(Messages.required),
  site_act: Yup.string().matches(regexList.onlyString).optional(),
  weight: Yup.number()
    .positive(Messages.min_err)
    .optional()
    .min(10, Messages.min_err)
    .max(120, Messages.max_err),
  size: Yup.number()
    .positive(Messages.min_err)
    .optional()
    .min(0.2, Messages.min_err)
    .max(2.5, Messages.max_err),
  sex: Yup.string().optional(),
  lateralidad: Yup.string().optional(),
});
