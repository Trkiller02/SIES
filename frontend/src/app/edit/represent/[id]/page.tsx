import RepresentForm from "@/components/register/RepresentForm";

export default function editRepresentPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <RepresentForm edit id={id} />;
}
