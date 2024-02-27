import HealthForm from "@/components/register/HealthForm";
import React from "react";

export default function healthEditPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <HealthForm edit id={id} />;
}
