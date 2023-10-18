"use client";

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
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <>
      <Navbar maxWidth="full" isBordered className="font-semibold">
        <NavbarBrand>
          <p className="font-bold text-inherit">SISINSES</p>
        </NavbarBrand>

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
            <DropdownMenu>
              <DropdownItem
                key="register_total"
                description="Realizar un registro desde cero."
                onClick={() => router.push("/register")}
                color="primary"
                variant="light"
              >
                Registro Total
              </DropdownItem>
              <DropdownItem
                key="estudiante"
                description="Registrar un estudiante."
                onClick={() => router.push("/register/student")}
                color="primary"
                variant="light"
              >
                Estudiante
              </DropdownItem>
              <DropdownItem
                key="persona"
                description="Registrar una persona vinculada a un estudiante."
                onClick={() => router.push("/register/person")}
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
            <DropdownMenu>
              <DropdownItem
                key="estudiante"
                description="Buscar un estudiante."
                onClick={() => router.push("/register/student")}
                color="primary"
                variant="light"
              >
                Estudiante
              </DropdownItem>
              <DropdownItem
                key="persona"
                description="Buscar una persona vinculada a un estudiante."
                onClick={() => router.push("/register/person")}
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

        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Ingreso como</p>
                <p className="font-semibold">
                  {session?.user.lastName + "" + session?.user.name}
                </p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
      <main className="flex flex-col justify-center items-center">
        {children}
      </main>
    </>
  );
}
