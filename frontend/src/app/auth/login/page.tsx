import LoginComponent from "@/components/auth/LoginComponent";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIES | INICIO DE SESIÓN",
  description: "SISTEMA DE INSCRIPCIÓN ESPÍRITU SANTO",
};

export default function loginPage() {
  return <LoginComponent />;
}
