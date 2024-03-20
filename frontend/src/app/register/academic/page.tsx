import AcademicForm from "@/components/register/AcademicForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "REGISTRO | ACADÉMICO",
  description: "SISTEMA DE INSCRIPCIÓN ESPÍRITU SANTO",
};

export default function academicPage() {
  return <AcademicForm />;
}
