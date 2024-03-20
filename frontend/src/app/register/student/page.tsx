import StudentForm from "@/components/register/StudentForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "REGISTRO | ESTUDIANTE",
  description: "SISTEMA DE INSCRIPCIÓN ESPÍRITU SANTO",
};

export default function pageStudentRegister() {
  return <StudentForm />;
}
