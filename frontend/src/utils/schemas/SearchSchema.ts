import * as Yup from "yup";
import { Messages } from "../messages";
import { regexList } from "../regexPatterns";

export const searchInitVal = {
  entity: "",
  etapa: "",
  seccion: "",
  level: 0,
  id: "",
};

export const searchSchema = Yup.object({
  entity: Yup.string().required(Messages.required),
  etapa: Yup.string().optional(),
  seccion: Yup.string().max(1, Messages.max_err).optional(),
  level: Yup.number().optional().max(6, Messages.max_err),
  id: Yup.string().optional().matches(regexList.forAuth, Messages.match_err),
});
