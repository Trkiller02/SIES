"use client";

import { RoleList } from "@/utils/roleList";
import { Button, Tooltip } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function indexSearchPage() {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <section className="grid grid-cols-2 w-2/5 h-2/5 gap-2">
      <Tooltip
        content={
          <div className="px-1 py-2">
            <div className="text-small font-semibold text-primary-500">
              Buscar Personas:
            </div>
            <div className="text-tiny">PADRES, MADRES, TERCERAS PERSONAS</div>
          </div>
        }
        offset={-10}
        closeDelay={100}
        placement="bottom"
      >
        <Button
          variant="ghost"
          onPress={() => router.push("/search/person")}
          color="primary"
          className="py-12 shadow-md"
        >
          <div className="flex flex-row justify-center items-center">
            <h1 className="font-bold text-lg">Personas</h1>
          </div>
        </Button>
      </Tooltip>
      <Tooltip
        content={
          <p className="text-small font-semibold text-primary-500">
            Buscar Representantes vinculados a estudiantes.
          </p>
        }
        offset={-10}
        closeDelay={100}
        placement="bottom"
      >
        <Button
          variant="ghost"
          onPress={() => router.push("/search/represent")}
          color="primary"
          className="py-12 shadow-md"
        >
          <div className="flex flex-row justify-center items-center">
            <h1 className="font-bold text-lg">Representantes</h1>
          </div>
        </Button>
      </Tooltip>
      <Tooltip
        content={
          <p className="text-small font-semibold text-primary-500">
            Buscar Estudiantes inscritos en la institución.
          </p>
        }
        offset={-10}
        closeDelay={100}
        placement="bottom"
      >
        <Button
          variant="ghost"
          onPress={() => router.push("/search/student")}
          color="primary"
          className="py-12 shadow-md"
        >
          <div className="flex flex-row justify-center items-center">
            <h1 className="font-bold text-lg">Estudiantes</h1>
          </div>
        </Button>
      </Tooltip>
      {session?.user.role === RoleList.ADMIN && (
        <Tooltip
          content={
            <p className="text-small font-semibold text-primary-500">
              Buscar Usuarios dentro del sistema.
            </p>
          }
          offset={-10}
          closeDelay={100}
          placement="bottom"
        >
          <Button
            variant="ghost"
            onPress={() => router.push("/search/user")}
            color="primary"
            className="py-12 shadow-md"
          >
            <div className="flex flex-row justify-center items-center">
              <h1 className="font-bold text-lg">Usuarios</h1>
            </div>
          </Button>
        </Tooltip>
      )}
    </section>
  );
}
