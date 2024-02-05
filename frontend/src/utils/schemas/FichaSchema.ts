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
