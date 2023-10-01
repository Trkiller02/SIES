import LoginComponent from "@/components/auth/LoginComponent";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginComponent />
    </main>
  );
}
