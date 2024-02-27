import DashboardLayout from "../dashboard/layout";

export default function searchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
