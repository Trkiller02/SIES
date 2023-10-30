"use client";

import { useContext, useState, useEffect } from "react";
import { ctxDataRelation } from "./ProviderCtx";
import { Checkbox, CheckboxGroup } from "@nextui-org/react";

export function ProgressChecker() {
  const { dataRelations, setDataRelations } = useContext(ctxDataRelation);
  const [values, setValues] = useState<string[]>([]);

  const dataHandler = () => {
    if (dataRelations.fichaId !== "")
      setValues((values) => [...values, "fichaId"]);
    if (dataRelations.statusId !== "")
      setValues((values) => [...values, "statusId"]);
    if (dataRelations.representCiNumbers !== "")
      setValues((values) => [...values, "representCiNumbers"]);
    if (dataRelations.motherPersonCiNumbers !== "")
      setValues((values) => [...values, "motherPersonCiNumbers"]);
    if (dataRelations.fatherPersonCiNumbers !== "")
      setValues((values) => [...values, "fatherPersonCiNumbers"]);
    if (dataRelations.studentId !== "")
      setValues((values) => [...values, "studentId"]);
    if (dataRelations.thirdPersonCiNumbers !== "")
      setValues((values) => [...values, "thirdPersonCiNumbers"]);
  };

  useEffect(() => {
    dataHandler();
    console.log(values);
  }, [dataRelations]);

  return (
    <section className="flex flex-col p-2 absolute left-0 bottom-0 border border-gray-400 shadow-md rounded-lg bg-white scale-75 m-0">
      <CheckboxGroup isReadOnly label="PROGRESO" value={values}>
        <Checkbox value="studentId">ESTUDIANTE</Checkbox>
        <Checkbox value="statusId">DATOS MEDICOS</Checkbox>
        <Checkbox value="fichaId">DATOS ACADEMICOS</Checkbox>
        <Checkbox value="representCiNumbers">REPRESENTANTE</Checkbox>
        <Checkbox value="motherPersonCiNumbers">MADRE</Checkbox>
        <Checkbox value="fatherPersonCiNumbers">PADRE</Checkbox>
        <Checkbox value="thirdPersonCiNumbers">FAMILIAR</Checkbox>
      </CheckboxGroup>
    </section>
  );
}
