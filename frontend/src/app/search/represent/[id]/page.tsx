import DetailsRepresent from "@/components/DetailsRepresent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DETALLES | REPRESENTANTE",
  description: "SISTEMA DE INSCRIPCIÓN ESPÍRITU SANTO",
};

export default function representDetailsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <DetailsRepresent id={id} />;
}
