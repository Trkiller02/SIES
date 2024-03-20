import { ProviderCtx } from "@/components/register/ProviderCtx";
import DashboardLayout from "../dashboard/layout";
import { ProgressChecker } from "@/components/register/ProgressChecker";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout>
      <ProviderCtx>
        <div className="flex flex-row w-full justify-evenly">
          <ProgressChecker />
          {children}
        </div>
      </ProviderCtx>
    </DashboardLayout>
  );
}
