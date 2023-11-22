"use client";

import { RoleList } from "@/utils/roleList";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
  AvatarIcon,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdKeyboardArrowDown } from "react-icons/md";

export function NavBar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Navbar maxWidth="full" isBordered className="font-semibold">
      <NavbarBrand>
        <Image
          src="/img/image1.svg"
          alt="logo"
          width={64}
          height={64}
          style={{ transform: "scale(0.6)" }}
          priority
        />
        <p className="font-bold text-inherit px-2">SIES</p>
      </NavbarBrand>

      {session?.user.role === RoleList.USER ?
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
                onPress={() => {
                  router.push("/planilla/media");
                }}
                color="primary"
                variant="light"
              >
                Planilla Educación Media General
              </DropdownItem>
              <DropdownItem
                key="planilla_primaria"
                description="Planilla Educación Primaria"
                onPress={() => {
                  router.push("/planilla/primaria");
                }}
                color="primary"
                variant="light"
              >
                Planilla Educación Primaria
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
        : (
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
                  Registro Total
                </DropdownItem>
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
                    Buscar
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu aria-label="search actions">
                <DropdownItem
                  key="estudiante"
                  description="Buscar un estudiante."
                  onPress={() => router.push("/search/student")}
                  color="primary"
                  variant="light"
                >
                  Estudiante
                </DropdownItem>
                <DropdownItem
                  key="represent"
                  description="Buscar un representante vinculada a un estudiante."
                  onPress={() => router.push("/search/represent")}
                  color="primary"
                  variant="light"
                >
                  Representante
                </DropdownItem>
                {(session?.user.role as string) === RoleList.ADMIN ? (
                  <DropdownItem
                    key="users"
                    description="Buscar usuarios del sistema."
                    onPress={() => router.push("/search/user")}
                    color="primary"
                    variant="light"
                  >
                    Usuarios
                  </DropdownItem>
                ) : (
                  <h1></h1>
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
                  onPress={() => {
                    router.push("/planilla/media");
                  }}
                  color="primary"
                  variant="light"
                >
                  Planilla Educación Media General
                </DropdownItem>
                <DropdownItem
                  key="planilla_primaria"
                  description="Planilla Educación Primaria"
                  onPress={() => {
                    router.push("/planilla/primaria");
                  }}
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
                {(session?.user.name ? session?.user.name : "User") +
                  " " +
                  (session?.user.lastName ? session?.user.lastName : "Profile")}
              </p>
              <p className=" font-light text-gray-400 text-sm">
                {session?.user.role ? session?.user.role : "Role"}
              </p>
            </DropdownItem>
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
            <DropdownItem
              key="logout"
              textValue="Log Out"
              color="danger"
              onPress={() => {
                signOut({
                  redirect: false,
                });

                if (typeof window !== "undefined") {
                  localStorage.removeItem("dataRelations");
                }
                router.push("/auth/login");
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
