import AcademicForm from "@/components/register/AcademicForm";

export default function editAcademicPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <AcademicForm edit id={id} />;
}
