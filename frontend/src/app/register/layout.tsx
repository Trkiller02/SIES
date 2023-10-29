import ProviderCtx from "@/components/register/ProviderCtx";
import DashboardLayout from "../dashboard/layout";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout>
      <ProviderCtx>{children}</ProviderCtx>
    </DashboardLayout>
  );
}
