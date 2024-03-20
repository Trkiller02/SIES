import DetailsUser from "@/components/DetailsUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DETALLES | USUARIO",
  description: "SISTEMA DE INSCRIPCIÓN ESPÍRITU SANTO",
};

import React from "react";

export default function detailsUserPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <DetailsUser id={id} />;
}
