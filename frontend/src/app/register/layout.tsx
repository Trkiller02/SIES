"use client";

import { createContext, useState } from "react";

export const ctxDataRelation = createContext({});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dataRelations, setDataRelations] = useState({ hola: "" });
  return (
    <ctxDataRelation.Provider value={{ dataRelations, setDataRelations }}>
      <DashboardLayout>{children}</DashboardLayout>
    </ctxDataRelation.Provider>
  );
}
