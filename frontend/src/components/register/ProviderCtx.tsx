"use client";

import { createContext, useState, useEffect } from "react";

export const ctxDataRelation = createContext({});

export default function ProviderCtx({
  children,
}: {
  children: React.ReactNode;
}) {
  interface dataRelationsI {
    representCiNumbers: string;
    fichaId: string;
    motherPersonCiNumbers: string;
    fatherPersonCiNumbers: string;
    thirdPersonCiNumbers: string;
    statusId: string;
    studentId: string;
  }
  const data =
    typeof window !== "undefined"
      ? localStorage.getItem("dataRelations")
      : null;
  const relations: dataRelationsI = data ? JSON.parse(data) : null;

  const [dataRelations, setDataRelations] = useState({
    motherPersonCiNumbers: relations?.motherPersonCiNumbers ?? "",
    fatherPersonCiNumbers: relations?.fatherPersonCiNumbers ?? "",
    thirdPersonCiNumbers: relations?.thirdPersonCiNumbers ?? "",
    representCiNumbers: relations?.representCiNumbers ?? "",
    studentId: relations?.studentId ?? "",
    statusId: relations?.statusId ?? "",
    fichaId: relations?.fichaId ?? "",
  });

  useEffect(() => {
    localStorage.setItem("dataRelations", JSON.stringify(dataRelations));
  }, [dataRelations]);

  return (
    <ctxDataRelation.Provider value={{ dataRelations, setDataRelations }}>
      {children}
    </ctxDataRelation.Provider>
  );
}
