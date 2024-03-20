"use client";

import { fetchData, fetchDataWithoutBody } from "@/utils/fetchHandler";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { toast } from "sonner";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { RoleI, UserI } from "@/types/register.interfaces";
import { roleSelect } from "@/utils/selectList";

export default function DetailsUser({ id }: { id: string }) {
  const [updateMode, setUpdateMode] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [info, setInfo] = useState<UserI>();
  const { data: session } = useSession();
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetchDataWithoutBody(
      "/user/" + info?.ci_number,
      session?.user.token,
      "DELETE"
    );
    if (res) {
      return "Eliminado de forma exitosa.";
    }
  };

  const sendInfo = async (values: { role_id: number; email: string }) => {
    const res = await fetchData(
      "/user/" + id,
      "PATCH",
      {
        role_id:
          values.role_id && values.role_id !== 0 ? values.role_id : undefined,
        email: values.email === "" ? undefined : values.email,
      },
      session?.user.token
    );
    if (res) {
      setUpdated(true);
      return "Actualización exitosa.";
    }
  };

  const getInfo = async () => {
    const res = await fetchDataWithoutBody(`/user/${id}`, session?.user.token);
    if (res) {
      setInfo(res);
      return "Carga con éxito";
    }
  };

  useEffect(() => {
    toast.promise(getInfo(), {
      loading: "Procesando...",
      success: (data) => {
        return data;
      },
      error: (err: Error) => {
        router.back();
        return err.message;
      },
    });
  }, []);

  useEffect(() => {
    toast.promise(getInfo(), {
      loading: "Procesando...",
      success: (data) => {
        return data;
      },
      error: (err: Error) => {
        router.back();
        return err.message;
      },
    });
    setUpdated(false);
  }, [updated]);

  return (
    <div className="flex flex-col w-1/2 p-4 gap-4">
      {info ? (
        <>
          <Table aria-label="Tabla">
            <TableHeader>
              <TableColumn>NOMBRE</TableColumn>
              <TableColumn>ROL</TableColumn>
              <TableColumn>C.I.</TableColumn>
              <TableColumn>CORREO ELECTRONICO</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>{info.name + " " + info.lastname}</TableCell>
                <TableCell>{(info.role_id as RoleI).name}</TableCell>
                <TableCell>{info.ci_number}</TableCell>
                <TableCell>{info.email}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          {updateMode ? (
            <Formik
              initialValues={{
                email: info?.email,
                role_id: info?.role_id,
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().email().optional(),
                role_id: Yup.number().positive().max(3).min(1),
              })}
              onSubmit={async (values) => {
                toast.promise(sendInfo(values as any), {
                  loading: "Procesando...",
                  success: (data) => {
                    return data;
                  },
                  error: (err: Error) => {
                    return err.message;
                  },
                });
              }}
            >
              {({
                errors,
                values,
                handleChange,
                handleBlur,
                touched,
                resetForm,
              }) => (
                <Form className="p-4 border border-gray-300/50 shadow-md rounded-xl flex flex-col gap-4">
                  <Field
                    label="Correo electronico:"
                    type="email"
                    name="email"
                    description="Ingrese su correo electronico"
                    variant="bordered"
                    color={errors.email && touched.email ? "danger" : "primary"}
                    errorMessage={errors.email && touched.email && errors.email}
                    as={Input}
                  />

                  <Select
                    items={roleSelect}
                    name="role_id"
                    label="Rol:"
                    description="Seleccione una rol."
                    color={
                      errors.role_id && touched.role_id ? "danger" : "primary"
                    }
                    errorMessage={
                      errors.role_id && touched.role_id && errors.role_id
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    {(entity: {
                      value: number;
                      description?: string;
                      label: string;
                    }) => (
                      <SelectItem
                        key={entity.value}
                        value={entity.value}
                        description={entity.description}
                      >
                        {entity.label}
                      </SelectItem>
                    )}
                  </Select>

                  <div className="w-full flex justify-between">
                    <Button
                      className="w-1/5"
                      variant="ghost"
                      color="danger"
                      onPress={() => {
                        setUpdateMode(false);
                        resetForm();
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="solid"
                      color="primary"
                      type="submit"
                      className="w-1/5"
                    >
                      Enviar
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            <div className="w-full justify-around flex p-4 border border-gray-300/50 shadow-md rounded-xl">
              <Button
                className="w-1/5"
                variant="ghost"
                color="danger"
                onPress={() => {
                  toast.promise(handleDelete, {
                    loading: "Procesando...",
                    success: (data) => {
                      router.push("/");
                      return data;
                    },
                    error: (error: Error) => {
                      return error.message;
                    },
                  });
                }}
              >
                Eliminar
              </Button>
              <Button
                className="w-1/5"
                variant="ghost"
                color="primary"
                onPress={() => setUpdateMode(true)}
              >
                Actualizar
              </Button>
            </div>
          )}
        </>
      ) : (
        <p className="text-primary">Cargando...</p>
      )}
    </div>
  );
}
