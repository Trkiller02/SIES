import DetailsStudent from "@/components/DetailsStudent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DETALLES | ESTUDIANTE",
  description: "SISTEMA DE INSCRIPCIÓN ESPÍRITU SANTO",
};

export default function pageDetailsStudent({
  params: { id },
}: {
  params: { id: string };
}) {
  return <DetailsStudent id={id} />;
}
