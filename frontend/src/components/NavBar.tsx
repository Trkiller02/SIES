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
  const router = useRouter();
  const { data: session } = useSession();

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
        <p className="font-bold text-inherit px-2">SISINSES</p>
      </NavbarBrand>

      {session?.user.role !== RoleList.USER && (
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
                onPress={() => router.push("/register")}
                color="primary"
                variant="light"
              >
                Registro Total
              </DropdownItem>
              <DropdownItem
                key="estudiante"
                description="Registrar un estudiante."
                onPress={() => {
                  router.push("/register/student");
                  if (typeof window !== "undefined")
                    localStorage.removeItem("dataRelations");
                }}
                color="primary"
                variant="light"
              >
                Estudiante
              </DropdownItem>
              <DropdownItem
                key="persona"
                description="Registrar una persona vinculada a un estudiante."
                onPress={() => router.push("/register/person")}
                color="primary"
                variant="light"
              >
                Persona
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
                onPress={() => router.push("/register/student")}
                color="primary"
                variant="light"
              >
                Estudiante
              </DropdownItem>
              <DropdownItem
                key="persona"
                description="Buscar una persona vinculada a un estudiante."
                onPress={() => router.push("/register/person")}
                color="primary"
                variant="light"
              >
                Persona
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
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
            <DropdownItem key="settings" textValue="My Settings">
              My Settings
            </DropdownItem>
            <DropdownItem key="analytics" textValue="Analytics">
              Analytics
            </DropdownItem>
            <DropdownItem key="configurations" textValue="Configurations">
              Configurations
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
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
