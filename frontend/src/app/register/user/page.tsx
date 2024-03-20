import RegisterComponent from "@/components/auth/RegisterComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "REGISTRO | USUARIO",
  description: "SISTEMA DE INSCRIPCIÓN ESPÍRITU SANTO",
};

export default function userRegisterPage() {
  return <RegisterComponent />;
}
