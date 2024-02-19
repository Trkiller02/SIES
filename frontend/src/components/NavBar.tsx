"use client";

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
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdKeyboardArrowDown } from "react-icons/md";

export function NavBar() {
  const { data: session } = useSession();
  const router = useRouter();

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
                {(session ? session?.user.name : "User") +
                  " " +
                  (session ? session?.user.lastname : "Profile")}
              </p>
              <p className=" font-light text-gray-400 text-sm">
                {session ? session?.user.role : "Role"}
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
