"use client";

import { fetchData, fetchDataWithoutBody } from "@/utils/fetchHandler";
import { ROLE_LIST } from "@/utils/roleList";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
  AvatarIcon,
} from "@nextui-org/react";
import { error } from "console";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdKeyboardArrowDown } from "react-icons/md";
import { toast } from "sonner";

export function NavBar() {
  const { data: session } = useSession();
  const router = useRouter();

  const download = async (etapa: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tools/planilla?etapa=${etapa}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + session?.user.token,
        },
      }
    );

    const blob = await res.blob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `planilla${etapa.split(" ")[1]}.docx`; // replace with the desired filename
    a.click();

    URL.revokeObjectURL(url);

    return;
  };

  return (
    <Navbar maxWidth="full" isBordered className="font-semibold">
      <NavbarBrand onClick={() => router.push("/")}>
        <Image
          draggable={false}
          src="/img/image1.svg"
          alt="logo"
          width={64}
          height={64}
          style={{ transform: "scale(0.6)" }}
          priority
        />
        <h2 className="font-extralight text-2xl">SIES</h2>
      </NavbarBrand>

      {session?.user.role === ROLE_LIST.USER ? (
        <NavbarContent>
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent font-semibold"
                  variant="light"
                  endContent={
                    <MdKeyboardArrowDown className="text-primary-300 text-lg" />
                  }
                >
                  Herramientas
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu aria-label="register actions">
              <DropdownItem
                key="planilla_media"
                description="Planilla Inscripción Educación Media General."
                onPress={() => download("EDUCACION MEDIA")}
                color="primary"
                variant="light"
              >
                Planilla Educación Media General
              </DropdownItem>
              <DropdownItem
                key="planilla_primaria"
                description="Planilla Educación Primaria"
                onPress={() => download("EDUCACION PRIMARIA")}
                color="primary"
                variant="light"
              >
                Planilla Educación Primaria
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      ) : (
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent font-semibold"
                  variant="light"
                  endContent={
                    <MdKeyboardArrowDown className="text-primary-300 text-lg" />
                  }
                >
                  Registrar
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu aria-label="register actions">
              <DropdownItem
                key="register_total"
                description="Realizar un registro desde cero."
                onPress={() => {
                  router.push("/register/student");
                  if (typeof window !== "undefined")
                    localStorage.removeItem("dataRelations");
                }}
                color="primary"
                variant="light"
              >
                Registro Total.
              </DropdownItem>
              {session?.user.role === ROLE_LIST.ADMIN ? (
                <DropdownItem
                  key="register_user"
                  description="Registrar un usuario."
                  onPress={() => {
                    router.push("/register/user");
                  }}
                  color="primary"
                  variant="light"
                >
                  Registrar usuario.
                </DropdownItem>
              ) : (
                <DropdownItem
                  key="bln"
                  color="primary"
                  variant="light"
                ></DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent font-semibold"
                  variant="light"
                  endContent={
                    <MdKeyboardArrowDown className="text-primary-300 text-lg" />
                  }
                >
                  Herramientas
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu aria-label="register actions">
              <DropdownItem
                key="planilla_media"
                description="Planilla Inscripción Educación Media General."
                onPress={() => download("EDUCACION MEDIA")}
                color="primary"
                variant="light"
              >
                Planilla Educación Media General
              </DropdownItem>
              <DropdownItem
                key="planilla_primaria"
                description="Planilla Educación Primaria"
                onPress={() => download("EDUCACION PRIMARIA")}
                color="primary"
                variant="light"
              >
                Planilla Educación Primaria
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      )}
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              size="sm"
              icon={<AvatarIcon />}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem
              key="profile"
              className="gap-2 py-2"
              textValue="Ingreso como:"
            >
              <p className="font-semibold text-xl">
                {(session ? session?.user.name : "User") +
                  " " +
                  (session ? session?.user.lastname : "Profile")}
              </p>
              <p className=" font-light text-gray-400 text-sm">
                {session ? session?.user.role : "Role"}
              </p>
            </DropdownItem>
            {session?.user.role === ROLE_LIST.ADMIN ? (
              <DropdownItem
                key="configurations"
                textValue="Configurations"
                onPress={() => {
                  if (typeof window !== "undefined") {
                    localStorage.removeItem("dataRelations");
                  }
                  router.push("/settings");
                }}
              >
                Configuraciones
              </DropdownItem>
            ) : (
              <DropdownItem
                key="configurations"
                textValue="Configurations"
              ></DropdownItem>
            )}
            <DropdownItem
              key="logout"
              textValue="Log Out"
              color="danger"
              onPress={async () => {
                if (typeof window !== "undefined") {
                  localStorage.removeItem("dataRelations");
                }
                toast.promise(
                  fetchDataWithoutBody("/auth/logout", session?.user.token),
                  {
                    loading: "Procesando",
                    success: async (data: any) => {
                      await signOut({
                        redirect: false,
                      });
                      router.push("/auth/login");
                      return data.message;
                    },
                    error: (error: Error) => {
                      return error.message;
                    },
                  }
                );
              }}
            >
              Cerrar Sesión
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
