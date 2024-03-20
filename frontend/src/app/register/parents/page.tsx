import RepresentForm from "@/components/register/RepresentForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "REGISTRO | REPRESENTANTES",
  description: "SISTEMA DE INSCRIPCIÓN ESPÍRITU SANTO",
};

export default function pageRepresent() {
  return <RepresentForm />;
}
