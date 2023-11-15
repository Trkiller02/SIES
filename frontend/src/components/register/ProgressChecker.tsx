"use client";

import { useContext, useState, useEffect } from "react";
import { ctxDataRelation } from "./ProviderCtx";
import { Checkbox, CheckboxGroup } from "@nextui-org/react";

export function ProgressChecker() {
  const { dataRelations, setDataRelations } = useContext(ctxDataRelation);
  const [values, setValues] = useState<string[]>([]);

  const dataHandler = () => {
    if (dataRelations.fichaId !== "" && dataRelations.fichaId !== undefined && dataRelations.fichaId)
      setValues((values) => [...values, "fichaId"]);
    if (dataRelations.statusId !== "" && dataRelations.statusId !== undefined && dataRelations.statusId)
      setValues((values) => [...values, "statusId"]);
    if (dataRelations.representCiNumbers !== "" && dataRelations.representCiNumbers !== undefined && dataRelations.representCiNumbers)
      setValues((values) => [...values, "representCiNumbers"]);
    if (dataRelations.motherPersonCiNumbers !== "" && dataRelations.motherPersonCiNumbers !== undefined && dataRelations.motherPersonCiNumbers)
      setValues((values) => [...values, "motherPersonCiNumbers"]);
    if (dataRelations.fatherPersonCiNumbers !== "" && dataRelations.fatherPersonCiNumbers !== undefined && dataRelations.fatherPersonCiNumbers)
      setValues((values) => [...values, "fatherPersonCiNumbers"]);
    if (dataRelations.studentId !== "" && dataRelations.studentId && dataRelations.studentId !== undefined)
      setValues((values) => [...values, "studentId"]);
  };

  useEffect(() => {
    dataHandler();
  }, [dataRelations]);

  return (
    <section className="flex flex-col p-2 absolute left-0 bottom-0 border border-gray-400 shadow-md rounded-lg bg-white scale-75 m-0">
      <CheckboxGroup isReadOnly label="PROGRESO" value={values}>
        <Checkbox value="studentId">ESTUDIANTE</Checkbox>
        <Checkbox value="statusId">DATOS MEDICOS</Checkbox>
        <Checkbox value="fichaId">DATOS ACADEMICOS</Checkbox>
        <Checkbox value="fatherPersonCiNumbers">PADRE</Checkbox>
        <Checkbox value="motherPersonCiNumbers">MADRE</Checkbox>
        <Checkbox value="representCiNumbers">REPRESENTANTE</Checkbox>
      </CheckboxGroup>
    </section>
  );
}
