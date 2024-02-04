import * as Yup from "yup";
import { Messages } from "../messages";

export const searchInitVal = {
  entity: "",
  etapa: "",
  seccion: "",
  level: "",
  id: "",
};

export const searchSchema = Yup.object({
  entity: Yup.string().required(Messages.required),
  etapa: Yup.string().optional(),
  seccion: Yup.string().max(1, Messages.max_err).optional(),
  level: Yup.number().positive().max(6, Messages.max_err).optional(),
  id: Yup.string().optional(),
});
