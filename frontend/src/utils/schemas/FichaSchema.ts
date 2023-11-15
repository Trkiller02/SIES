import * as Yup from "yup";
import { Messages } from "../messages";
import { regexList } from "../regexPatterns";

export const initValFicha = {
  level: "",
  section: "",
  procePlant: "",
  escolarPeriod: "",
};

export const fichaSchema = Yup.object({
  level: Yup.string().required(Messages.required).matches(regexList.forDir),
  section: Yup.string()
    .required(Messages.required)
    .matches(regexList.onlyString),
  procePlant: Yup.string()
    .required(Messages.required)
    .matches(regexList.onlyString),
  escolarPeriod: Yup.string().required(Messages.required),
});
