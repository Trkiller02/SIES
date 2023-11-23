"use client";

import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { fetchDataWithoutBody } from "@/utils/fetchHandler";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import * as Yup from "yup";
import { Button, Input, Select, SelectItem, Tooltip } from "@nextui-org/react";
import { Messages } from "@/utils/messages";
import { regexList } from "@/utils/regexPatterns";
import { useRouter } from 'next/navigation';
import { MdOutlineEdit, MdOutlineRemoveRedEye } from 'react-icons/md';
import jsPDF from 'jspdf';

interface DataI {
    idFicha: string,
    level: string,
    section: string,
    etapa: string,
    turno: string,
    procePlant: string,
    escolarPeriod: string,
    InsDate: Date,
    personalRes: string,
    relationTable: {
        idRelation: string,
        representCiNumbers: string,
        fichaId: string,
        motherPersonCiNumbers: string,
        fatherPersonCiNumbers: string,
        statusId: string,
        studentId: string,
        createdAt: Date,
        updatedAt: Date,
        deleteAt: null,
        studentRelation: {
            studentCiNumber: string,
            bornState: string,
            bornPais: string,
            bornDate: string,
            liveWith: string,
            age: number,
            sex: string,
            weight: string,
            size: string,
            Lateralidad: string,
            instPro: string,
            studentRelation: { name: string, lastName: string }
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
    const [info, setInfo] = useState<DataI[]>();
    const router = useRouter()
    const downloadPDF = async () => {
        const doc = new jsPDF("p", "mm", "letter");
        const hDoc = doc.internal.pageSize.getHeight();
        const wDoc = doc.internal.pageSize.getWidth();

        const planilla1: HTMLElement | null = document.querySelector(".planilla1");

        if (planilla1) {
            await doc.html(planilla1, {
                x: 0,
                y: 0,
                autoPaging: "slice",
                html2canvas: {
                    windowWidth: wDoc,
                    windowHeight: hDoc,
                    height: hDoc,
                    width: wDoc,
                    scale: 0.25,
                },
                width: wDoc,
                windowWidth: wDoc,
            });
            doc.output("dataurlnewwindow", { filename: "planilla" });

        } else {
            return;
        }
    };

    const section = [
        { label: "A", value: "A" },
        { label: "B", value: "B" },
        { label: "C", value: "C" },
    ]

    const getUser = async (value?: formSendI) => {
        const user: DataI[] = []
        const res = await fetchDataWithoutBody(
            `/ficha${value?.id ? `/${value?.id}` : (value?.etapa ? `?etapa=${value?.etapa}` : "") + (value?.level && value.etapa ? `&level=${value?.level}` : value?.level && `?level=${value?.level}`) + (value?.section && value.etapa ? `&section=${value?.section}` : value?.section && `?section=${value?.section}`)}`,
            session?.user.token
        );

        if (res) {
            if (value?.id) {
                user.push(res);
                const filteredRes = user.filter((item: DataI) => item.relationTable !== null)
                setInfo(filteredRes)
            } else {
                const filteredRes = res.filter((item: DataI) => item.relationTable !== null)
                console.log(filteredRes)
                setInfo(filteredRes)
            }
        }
    };

    const [level, setLevel] = useState([
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" },
    ])

    const getUsers = async () => {
        const res = await fetchDataWithoutBody(
            "/ficha",
            session?.user.token
        );
        if (res) {
            const filteredRes = res.filter((item: DataI) => item.relationTable !== null)
            setInfo(filteredRes)
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
            id: Yup.string().matches(regexList.forDNI, Messages.dni_match).optional()
        }),
        onSubmit: async (values) => {
            toast.promise(getUser(values), {
                loading: "Procesando...",
                success: "Busqueda exitosa.",
                error: (err: Error) => {
                    setInfo([]);
                    return err.message;
                },
            });
        },
    });

    useEffect(() => {
        toast.promise(getUsers(), {
            loading: "Procesando...",
            success: "Carga completada.",
            error: (err: Error) => {
                setInfo([])
                return err.message;
            },
        });
    }, []);

    useEffect(() => {
        if (formik.values.etapa === "P") {
            setLevel((level) => [...level, { label: "6", value: "6" }])
        }
        if (formik.values.etapa === "M") {
            setLevel([
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
            ])
        }
    }, [formik.values.etapa])

    return (
        <div className="w-3/4 h-3/4 flex flex-col">
            <form
                onSubmit={formik.handleSubmit}
                className="inline-flex justify-center items-center gap-2 py-4 w-full"
            >
                <Input
                    label="Cedula de identidad:"
                    placeholder='C.I. Estudiante'
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
                    label="Sección:"
                    variant="bordered"
                    name="section"
                    id="section"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.section}
                    items={section}
                >
                    {(section) => <SelectItem key={section.value}>{section.label}</SelectItem>}
                </Select>
                <Select
                    isRequired={!!formik.values.level || !!formik.values.section}
                    label="Etapa:"
                    variant="bordered"
                    name="etapa"
                    className="col-span-2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
            <div className="flex flex-col w-full gap-4 planilla1">

                {info ? info.length !== 0 ? <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">C.I. / C.E. </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Año / Grado</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sección</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Etapa</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {info.map((row: DataI, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{row?.relationTable.studentId}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{row?.relationTable.studentRelation.studentRelation.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{row?.relationTable.studentRelation.studentRelation.lastName}</td>
                                <td className="px-4 py-4 whitespace-nowrap">{row?.level}</td>
                                <td className="px-4 py-4 whitespace-nowrap">{row?.section}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{row?.etapa === 'M' ? "Educación Media General" : row?.etapa === 'P' ? "Educación Primaria" : ""}</td>
                                <td className="px-6 py-4 whitespace-nowrap flex gap-4 items-center">
                                    <Tooltip content="Detalles.">
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => router.push('/search/student/' + row?.relationTable.studentId)}>
                                            <MdOutlineRemoveRedEye className='text-primary text-2xl' />
                                        </span>
                                    </Tooltip>
                                    <Tooltip content="Editar Estudiante.">
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            <MdOutlineEdit className='text-warning text-2xl' />
                                        </span>
                                    </Tooltip>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table> : "No se encuentran usuarios" : ""}
            </div>

            <Button color="primary" onPress={downloadPDF} isDisabled={!!info === false}>
                Imprimir Busqueda.
            </Button>
        </div>
    );
}
