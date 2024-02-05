import { Button } from "@nextui-org/react";
import Link from "next/link";

export interface UserI {
  id: string;
  restoreToken: string;
  name: string;
  lastName: string;
  ciNumber: string;
  email: string;
  roleId: number;
  password: string;
}

export default function UserCards({ item }: { item: any }) {
  return (
    <div className="inline-flex self-center border p-2 rounded-xl w-full justify-around items-center">
      <div className="flex flex-col w-full px-2">
        <p className="text-lg font-medium">
          <span className="text-primary">Nombre:</span> &nbsp;{item.name}&nbsp;
          {item.lastName}
        </p>
        <p>
          <span className="text-primary">Role:</span>&nbsp;{item.roleId}
        </p>
      </div>
      <div className="flex flex-col w-full justify-end items-start px-2">
        <p>
          <span className="text-primary">Correo:</span> &nbsp;{item.email}
        </p>
        <p>
          <span className="text-primary">C.I No:</span>&nbsp;{item.ciNumber}
        </p>
      </div>
      <Button
        variant="solid"
        color="primary"
        as={Link}
        href={"/search/user/" + item.ciNumber}
      >
        Detalles
      </Button>
    </div>
  );
}
