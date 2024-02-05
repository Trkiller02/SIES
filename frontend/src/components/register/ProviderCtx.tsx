"use client";

import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

export interface dataRelationsI {
  represent_id: string;
  ficha_id: string;
  mother_id: string;
  father_id: string;
  health_info_id: string;
  student_id: string;
}

interface ContextType {
  dataRelations: dataRelationsI;
  setDataRelations: Dispatch<SetStateAction<dataRelationsI>>;
}

export const ctxDataRelation = createContext<ContextType | any>({});

export function ProviderCtx({ children }: { children: React.ReactNode }) {
  const data =
    typeof window !== "undefined"
      ? localStorage.getItem("dataRelations")
      : null;
  const relations: dataRelationsI = data ? JSON.parse(data) : null;

  const [dataRelations, setDataRelations] = useState<dataRelationsI>({
    mother_id: relations?.mother_id ?? "",
    father_id: relations?.father_id ?? "",
    represent_id: relations?.represent_id ?? "",
    student_id: relations?.student_id ?? "",
    health_info_id: relations?.health_info_id ?? "",
    ficha_id: relations?.ficha_id ?? "",
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
