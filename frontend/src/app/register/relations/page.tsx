import RelationsForm from "@/components/register/RelationsForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "REGISTRO | RELACIONES",
  description: "SISTEMA DE INSCRIPCIÓN ESPÍRITU SANTO",
};

export default function page() {
  return <RelationsForm />;
}
