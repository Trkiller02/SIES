"use client";

import DashboardLayout from "../dashboard/layout";

export default function PlanillaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
