"use client";

import { useContext, useState, useEffect } from "react";
import { ctxDataRelation } from "./ProviderCtx";
import { Checkbox, CheckboxGroup, Slider } from "@nextui-org/react";

export function ProgressChecker() {
  const { dataRelations } = useContext(ctxDataRelation);
  const [values, setValues] = useState<string[]>([]);

  const dataHandler = () => {
    if (
      dataRelations.ficha_id &&
      dataRelations.ficha_id !== "" &&
      dataRelations.ficha_id
    )
      setValues((values) => [...values, "ficha_id"]);
    if (
      dataRelations.health_info_id &&
      dataRelations.health_info_id !== "" &&
      dataRelations.health_info_id
    )
      setValues((values) => [...values, "health_info_id"]);
    if (
      dataRelations.represent_id &&
      dataRelations.represent_id !== "" &&
      dataRelations.represent_id
    )
      setValues((values) => [...values, "represent_id"]);
    if (
      dataRelations.mother_id &&
      dataRelations.mother_id !== "" &&
      dataRelations.mother_id
    )
      setValues((values) => [...values, "mother_id"]);
    if (
      dataRelations.father_id &&
      dataRelations.father_id !== "" &&
      dataRelations.father_id
    )
      setValues((values) => [...values, "father_id"]);
    if (
      dataRelations.student_id &&
      dataRelations.student_id !== "" &&
      dataRelations.student_id
    )
      setValues((values) => [...values, "student_id"]);
  };

  useEffect(() => {
    dataHandler();
  }, [dataRelations]);

  return (
    <section className="p-4 border border-gray-400 shadow-md rounded-lg bg-white scale-85 m-0 h-[25%]">
      <CheckboxGroup isReadOnly label="PROGRESO" value={values}>
        <Checkbox value="student_id">ESTUDIANTE</Checkbox>
        <Checkbox value="health_info_id">DATOS MEDICOS</Checkbox>
        <Checkbox value="ficha_id">DATOS ACADEMICOS</Checkbox>
        <Checkbox value="father_id">PADRE</Checkbox>
        <Checkbox value="mother_id">MADRE</Checkbox>
        <Checkbox value="represent_id">REPRESENTANTE</Checkbox>
      </CheckboxGroup>
    </section>
  );
}
