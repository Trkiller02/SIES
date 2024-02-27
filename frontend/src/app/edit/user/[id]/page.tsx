import RegisterComponent from "@/components/auth/RegisterComponent";

export default function userEditPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <RegisterComponent edit id={id} />;
}
