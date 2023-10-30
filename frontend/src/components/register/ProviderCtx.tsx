"use client";

import { createContext, useState, useEffect } from "react";

export interface dataRelationsI {
  representCiNumbers: string;
  fichaId: string;
  motherPersonCiNumbers: string;
  fatherPersonCiNumbers: string;
  thirdPersonCiNumbers: string;
  statusId: string;
  studentId: string;
}

export const ctxDataRelation = createContext({});

export function ProviderCtx({ children }: { children: React.ReactNode }) {
  const data =
    typeof window !== "undefined"
      ? localStorage.getItem("dataRelations")
      : null;
  const relations: dataRelationsI = data ? JSON.parse(data) : null;

  const [dataRelations, setDataRelations] = useState<dataRelationsI>({
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
