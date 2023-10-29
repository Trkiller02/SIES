import { NavBar } from "@/components/NavBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main className="flex flex-col justify-center items-center p-4">
        {children}
      </main>
    </>
  );
}
