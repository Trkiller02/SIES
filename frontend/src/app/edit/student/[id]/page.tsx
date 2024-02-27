import StudentForm from "@/components/register/StudentForm";

export default function studentEditPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <StudentForm edit id={id} />;
}
