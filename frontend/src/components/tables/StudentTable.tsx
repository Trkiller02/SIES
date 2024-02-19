import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import {
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

interface infoI {
  id: string;
  level: number;
  section: string;
  etapa: string;
  turno: string;
  relationTable: {
    student_id: {
      person_id: {
        ci_number: string;
        name: string;
        lastname: string;
        email?: string;
        phone_number?: string;
      };
    };
  };
}

interface StudentICards {
  id: string;
  ci_number: string;
  level: number;
  section: string;
  etapa: string;
  turno: string;
  name: string;
  lastname: string;
  email?: string;
  phone_number?: string;
  actions: string;
}

import {
  MdDeleteOutline,
  MdOutlineCreate,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { columnsRepresent } from "@/utils/tableList";
import { fetchDataWithoutBody } from "@/utils/fetchHandler";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function StudentTable({ info }: { info: infoI[] }) {
  const infoFixed: StudentICards[] = info.map((item) => {
    const {
      id,
      level,
      section,
      etapa,
      turno,
      relationTable: {
        student_id: { person_id },
      },
    } = item;

    return {
      id,
      level,
      section,
      etapa,
      turno,
      name: person_id.name,
      lastname: person_id.lastname,
      email: person_id.email,
      phone_number: person_id.phone_number,
      ci_number: person_id.ci_number,
      actions: "",
    };
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [entityFocus, setEntityFocus] = useState<string>("");
  const { data: session } = useSession();

  const deleteEntity = async (value: string) => {
    const res = await fetchDataWithoutBody(
      `/represent/${value}`,
      session?.user.token,
      "DELETE"
    );

    if (res) return "Eliminado con exito.";
  };

  const renderCell = React.useCallback(
    (user: StudentICards, columnKey: keyof StudentICards) => {
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
        case "email":
          return (
            <Chip color="secondary" size="sm" variant="flat">
              {cellValue ? cellValue : "NO POSEE"}
            </Chip>
          );
        case "phone_number":
          return (
            <Chip color="primary" size="sm" variant="flat">
              {cellValue ? cellValue : "NO POSEE"}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Detalles" color="primary">
                <Button
                  as={Link}
                  href={`/search/student/${user.ci_number}`}
                  isIconOnly
                >
                  <MdOutlineRemoveRedEye className="text-lg text-primary cursor-pointer active:opacity-50" />
                </Button>
              </Tooltip>
              <Tooltip content="Editar" color="success">
                <Button
                  as={Link}
                  href={`/edit/student/${user.ci_number}`}
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
        aria-label="Example table with custom cells"
        className="w-3/4 max-lg:w-full mt-5 min-h-[40vh]"
      >
        <TableHeader columns={columnsRepresent}>
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
          className="w-3/4 max-lg:w-full min-h-[40vh]"
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(
                    item as StudentICards,
                    columnKey as keyof StudentICards
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
