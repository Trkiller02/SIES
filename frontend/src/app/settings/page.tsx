import SettingsComponent from "@/components/SettingComp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CONFIGURACIÓN",
  description: "SISTEMA DE INSCRIPCIÓN ESPÍRITU SANTO",
};

export default function settingsPage() {
  return <SettingsComponent />;
}
