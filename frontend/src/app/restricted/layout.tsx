import DashboardLayout from "../dashboard/layout";

export default function restrictedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
