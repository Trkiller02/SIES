import HealthForm from "@/components/register/HealthForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "REGISTRO | SALUD",
  description: "SISTEMA DE INSCRIPCIÓN ESPÍRITU SANTO",
};

export default function healthPage() {
  return <HealthForm />;
}
