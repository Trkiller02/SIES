"use client";

import { fetchData, fetchDataWithoutBody } from "@/utils/fetchHandler";
import { Button, Input, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { UserI } from "@/components/UserCards";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import * as Yup from "yup";
import { useRouter } from 'next/navigation';

export default function page({ params: { id } }: { params: { id: string } }) {
    const [updateMode, setUpdateMode] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [info, setInfo] = useState<UserI>();
    const { data: session } = useSession();
    const router = useRouter();

    const handleDelete = async () => {
        const res = await fetchDataWithoutBody('/user/' + info?.ciNumber, session?.user.token, 'DELETE');
        if (res) {
            return "Eliminado de forma exitosa.";
        }
    }

    const sendInfo = async (values: { roleId: number, email: string }) => {
        const res = await fetchData(
            "/user/" + id,
            "PATCH",
            {
                roleId: parseInt(values.roleId) === 0 || values.roleId === undefined ? info?.roleId : parseInt(values.roleId),
                email: values.email === '' ? undefined : values.email
            },
            session?.user.token
        );
        if (res) {
            setUpdated(true);
            return "Actualización exitosa.";
        }
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            roleId: info?.roleId,
        },
        validationSchema: Yup.object({
            email: Yup.string().email().optional(),
        }),
        onSubmit: async (values) => {
            toast.promise(sendInfo(values), {
                loading: "Procesando...",
                success: (data) => {
                    return data;
                },
                error: (err: Error) => {
                    return err.message;
                },
            });
        },
    });

    const getInfo = async () => {
        const res = await fetchDataWithoutBody(
            `/user/${id}`,
            session?.user.token
        );
        if (res) {
            setInfo(res);
        }
    };

    useEffect(() => {
        getInfo();
    }, []);

    useEffect(() => {
        getInfo();
        setUpdated(false);
        formik.resetForm();
    }, [updated]);

    return (
        <div className='flex flex-col w-1/2 p-4 gap-4'>
            {info ? <>
                <Table aria-label="Tabla">
                    <TableHeader>
                        <TableColumn>NOMBRE</TableColumn>
                        <TableColumn>ROL</TableColumn>
                        <TableColumn>C.I.</TableColumn>
                        <TableColumn>CORREO ELECTRONICO</TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell>{info.name + " " + info.lastName}</TableCell>
                            <TableCell>{info.roleId === 1 ? "ADMINISTRADOR" : info.roleId === 2 ? "EDITOR" : info.roleId === 3 ? "USUARIO" : ""}</TableCell>
                            <TableCell>{info.ciNumber}</TableCell>
                            <TableCell>{info.email}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                {updateMode ? (
                    <form onSubmit={formik.handleSubmit} className='p-4 border border-gray-300/50 shadow-md rounded-xl flex flex-col gap-4'>
                        <Input
                            label="Correo electronico:"
                            type="email"
                            name="email"
                            description="Ingrese su correo electronico"
                            variant="bordered"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            color={
                                formik.errors.email && formik.touched.email ? "danger" : "primary"
                            }
                            errorMessage={
                                formik.errors.email && formik.touched.email && formik.errors.email
                            }
                        />
                        <Select
                            label="Rol:"
                            value={formik.values.roleId}
                            name="roleId"
                            variant="bordered"
                            color={
                                formik.errors.roleId && formik.touched.roleId
                                    ? "danger"
                                    : "primary"
                            }
                            errorMessage={
                                formik.errors.roleId &&
                                formik.touched.roleId &&
                                formik.errors.roleId
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <SelectItem value={2} key={2}>EDITOR</SelectItem>
                            <SelectItem value={3} key={3}>USUARIO</SelectItem>
                        </Select>
                        <div className='w-full flex justify-between'>
                            <Button
                                className='w-1/5'
                                variant="ghost"
                                color="danger"
                                onPress={() => setUpdateMode(false)}
                            >
                                Cancelar
                            </Button>
                            <Button variant="solid" color="primary" type="submit" className='w-1/5'>
                                Enviar
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div className='w-full justify-around flex p-4 border border-gray-300/50 shadow-md rounded-xl'>
                        <Button
                            className='w-1/5'
                            variant="ghost"
                            color="danger"
                            onPress={() => {
                                toast.promise(handleDelete, {
                                    loading: "Procesando...",
                                    success: (data) => {
                                        router.push('/search/user');
                                        return data;
                                    },
                                    error: (error: Error) => {
                                        return error.message;
                                    },
                                })
                            }}
                        >
                            Eliminar
                        </Button>
                        <Button
                            className='w-1/5'
                            variant="ghost"
                            color="primary"
                            onPress={() => setUpdateMode(true)}
                        >
                            Actualizar
                        </Button>
                    </div>
                )}
            </> : <p className='text-primary'>Cargando...</p>
            }
        </div>
    );
}
