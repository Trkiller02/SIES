"use client";

import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { fetchDataWithoutBody } from "@/utils/fetchHandler";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import * as Yup from "yup";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { Messages } from "@/utils/messages";
import { regexList } from "@/utils/regexPatterns";
import { useRouter } from 'next/navigation';

interface DataI {
    etapa: string;
    level: string;
    section: string;
    relationTable: {
        studentId: string;
        studentRelation: {
            studentRelation: {
                lastName: string;
                name: string;
            }
        }
    }
}

interface formSendI {
    id: string
    level: string,
    section: string,
    etapa: string
}

export default function UserPageSearch() {
    const { data: session } = useSession();
    const [info, setInfo] = useState<DataI[]>([]);
    const router = useRouter()

    const getUser = async (value?: formSendI) => {
        const res = await fetchDataWithoutBody(
            "/ficha/" + value?.id,
            session?.user.token
        );
        if (res) {
            setInfo([res]);
        }
    };

    const level = [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" },
    ]

    const getUsers = async () => {
        const res = await fetchDataWithoutBody(
            "/ficha",
            session?.user.token
        );
        if (res) {
            console.log(res)
            setInfo(res);
        }
    };

    const formik = useFormik({
        initialValues: {
            id: "",
            level: "",
            section: "",
            etapa: "",
        },
        validationSchema: Yup.object({
            id: Yup.string()
                .matches(regexList.forDNI, Messages.dni_match)
                .required(Messages.required),
        }),
        onSubmit: async (values) => {
            toast.promise(getUser(values), {
                loading: "Procesando...",
                success: "Busqueda exitosa.",
                error: (err: Error) => {
                    return err.message;
                },
            });
        },
    });

    useEffect(() => {
        getUsers()
    }, []);

    useEffect(() => {
        if (formik.values.etapa === 'P') {
            level.push({ label: "6", value: "6" })
        }
        if (formik.values.etapa === 'M' && level.length === 6) {
            level.pop()
        }
    }, [formik.values.etapa])

    return (
        <div className="w-3/4 h-3/4 flex flex-col">
            <form
                onSubmit={formik.handleSubmit}
                className="inline-flex justify-center items-center gap-2 py-4 w-full"
            >
                <Input
                    label="Cedula de identidad del usuario:"
                    name="id"
                    variant="bordered"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    color={formik.errors.id && formik.touched.id ? "danger" : "primary"}
                    errorMessage={
                        formik.errors.id && formik.touched.id && formik.errors.id
                    }
                    value={formik.values.id.toUpperCase()}
                />
                <Select
                    label="Grado/Año:"
                    variant="bordered"
                    name="level"
                    id="level"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.level}
                    items={level}
                >
                    {(level) => <SelectItem key={level.value}>{level.label}</SelectItem>}
                </Select>
                <Select
                    isRequired
                    label="Etapa:"
                    variant="bordered"
                    name="etapa"
                    className="col-span-3"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    color={formik.errors.etapa && formik.touched.etapa ? "danger" : "primary"}
                >
                    <SelectItem key={"P"} value={"P"}>
                        EDUCACION PRIMARIA
                    </SelectItem>
                    <SelectItem key={"M"} value={"M"}>
                        EDUCACION MEDIA GENERAL
                    </SelectItem>
                </Select>

                <Button variant="solid" color="primary" type="submit" size="lg">
                    Buscar
                </Button>
            </form>
            <div className="flex flex-col w-full gap-4">

                {info && info.length !== 0 ? <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Año</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sección</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {info.map((row: DataI, index) => (
                            <tr key={index} onClick={() => router.push('/search/student/' + row.relationTable.studentId)}>
                                <td className="px-6 py-4 whitespace-nowrap">{row?.relationTable.studentRelation.studentRelation.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{row?.relationTable.studentRelation.studentRelation.lastName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{row?.level}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{row?.section}</td>
                            </tr>
                        ))}
                    </tbody>
                </table> : "No se encuentran usuarios"}
            </div>
        </div>
    );
}
