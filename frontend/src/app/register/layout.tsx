import { ProviderCtx } from "@/components/register/ProviderCtx";
import DashboardLayout from "../dashboard/layout";
import { ProgressChecker } from "@/components/register/ProgressChecker";

const RegisterLayout = ({ children }: { children: React.ReactNode }) => (
  <DashboardLayout>
    <ProviderCtx>
      <div className="flex flex-row w-full justify-evenly">
        <ProgressChecker />
        {children}
      </div>
    </ProviderCtx>
  </DashboardLayout>
);

export default RegisterLayout;
