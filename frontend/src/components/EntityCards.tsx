import { Button } from "@nextui-org/react";
import Link from "next/link";

export interface PersonIforCards {
  id: string;
  person_id: {
    id: string;
    name: string;
    lastname: string;
    ci_number: string;
    email: string;
    phone_number: string;
  };
}

export default function EntityCards({
  item,
  title,
}: {
  item: any;
  title: string | undefined;
}) {
  return (
    <div className="inline-flex self-center border p-2 rounded-xl w-full justify-around items-center">
      {title && <h1 className="text-xl">{title}</h1>}
      <div className="flex flex-col w-full px-2">
        <p className="text-lg font-medium">
          <span className="text-primary">Nombre:</span> &nbsp;
          {item.person_id.name}&nbsp;
          {item.person_id.lastname}
        </p>
        <p>
          <span className="text-primary">Numero telefonico:</span>&nbsp;
          {item.person_id.phone_number}
        </p>
      </div>
      <div className="flex flex-col w-full justify-end items-start px-2">
        <p>
          <span className="text-primary">Correo:</span> &nbsp;
          {item.person_id.email}
        </p>
        <p>
          <span className="text-primary">C.I No:</span>&nbsp;
          {item.person_id.ci_number}
        </p>
      </div>
      <Button
        variant="solid"
        color="primary"
        as={Link}
        href={"/search/user/" + item.person_id.ci_number}
      >
        Detalles
      </Button>
    </div>
  );
}
