import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";

export interface UserIforCards {
  id: string;
  name: string;
  lastname: string;
  ci_number: string;
  role_id: string;
  email: string;
  actions: string;
}

import {
  MdDeleteOutline,
  MdOutlineCreate,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { columnsUsers } from "@/utils/tableList";
import { fetchDataWithoutBody } from "@/utils/fetchHandler";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { RoleI, UserI } from "@/types/register.interfaces";

export default function UserTable({ info }: { info: UserI[] }) {
  const infoFixed: UserIforCards[] = info.map((item) => {
    const { id, name, lastname, role_id, ci_number, email } = item;

    return {
      id: id!,
      name: name,
      lastname: lastname,
      role_id: (role_id as RoleI).name,
      ci_number: ci_number,
      email: email,
      actions: "",
    };
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [entityFocus, setEntityFocus] = useState<string>("");
  const { data: session } = useSession();

  const deleteEntity = async (value: string) => {
    const res = await fetchDataWithoutBody(
      `/user/${value}`,
      session?.user.token,
      "DELETE"
    );

    if (res) return "Eliminado con exito.";
  };

  const renderCell = React.useCallback(
    (user: UserIforCards, columnKey: keyof UserIforCards) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
        case "name":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );
        case "lastname":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );

        case "role_id":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );
        case "email":
          return (
            <Chip color="secondary" size="sm" variant="flat">
              {cellValue ? cellValue : "NO POSEE"}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Detalles" color="primary">
                <Button
                  as={Link}
                  href={`/search/user/${user.ci_number}`}
                  isIconOnly
                >
                  <MdOutlineRemoveRedEye className="text-lg text-primary cursor-pointer active:opacity-50" />
                </Button>
              </Tooltip>
              <Tooltip content="Editar" color="success">
                <Button
                  as={Link}
                  href={`/edit/user/${user.ci_number}`}
                  isIconOnly
                >
                  <MdOutlineCreate className="text-lg text-success cursor-pointer active:opacity-50" />
                </Button>
              </Tooltip>
              <Tooltip color="danger" content="Eliminar">
                <Button
                  onPress={() => {
                    setEntityFocus(user.ci_number);
                    onOpen();
                  }}
                  isIconOnly
                >
                  <MdDeleteOutline className="text-lg text-danger cursor-pointer active:opacity-50" />
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <>
      <Table
        aria-label="User Table"
        className="w-full max-lg:w-full mt-5 min-h-[40vh]"
      >
        <TableHeader columns={columnsUsers}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={infoFixed}
          emptyContent="Sin datos."
          className="w-3/4 max-lg:w-full mt-5 min-h-[40vh]"
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(
                    item as UserIforCards,
                    columnKey as keyof UserIforCards
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal size="sm" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirmación
              </ModalHeader>
              <ModalBody>
                <p className="text-xl text-danger">
                  ¿Desea borrar este registro?
                </p>
                <p className="text-md">
                  Entienda que esta acción se puede revertir, sin embargo,
                  podria afectar la estructura de otros registros.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    toast.promise(deleteEntity(entityFocus), {
                      loading: "Procesando...",
                      success: (data) => {
                        return data;
                      },
                      error: (error: Error) => {
                        return error.message;
                      },
                      finally: () => onClose(),
                    });
                  }}
                >
                  Aceptar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
