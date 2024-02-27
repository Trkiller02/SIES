import * as Yup from "yup";
import { Messages } from "../messages";
import { regexList } from "../regexPatterns";
import { FichaI } from "@/types/register.interfaces";

export const initValFicha: FichaI = {
  level: 0,
  etapa: "",
  turno: "",
  section: "",
  proce_plant: "",
  escolar_period: "",
  egresado: false,
};

export const fichaSchema = Yup.object({
  level: Yup.number().required(Messages.required),
  etapa: Yup.string().matches(regexList.onlyString).required(Messages.required),
  turno: Yup.string().matches(regexList.onlyString).required(Messages.required),
  section: Yup.string()
    .matches(regexList.onlyString)
    .required(Messages.required),
  proce_plant: Yup.string()
    .matches(regexList.onlyString)
    .required(Messages.required),
  escolar_period: Yup.string().required(Messages.required),
});

export const fichaSchemaUpdate = Yup.object({
  level: Yup.number().optional(),
  etapa: Yup.string().matches(regexList.onlyString).optional(),
  turno: Yup.string().matches(regexList.onlyString).optional(),
  section: Yup.string().matches(regexList.onlyString).optional(),
  proce_plant: Yup.string().matches(regexList.onlyString).optional(),
  escolar_period: Yup.string().optional(),
  egresado: Yup.boolean().optional(),
});
