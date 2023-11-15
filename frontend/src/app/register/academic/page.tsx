"use client";

import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { fetchData } from "@/utils/fetchHandler";
import { useState, useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { toast } from "sonner";
import { ctxDataRelation } from '@/components/register/ProviderCtx';
import * as Yup from 'yup'
import { regexList } from '@/utils/regexPatterns';
import { Messages } from '@/utils/messages';

export default function academicPage() {
    const { dataRelations, setDataRelations } = useContext(ctxDataRelation);
    const { data: session } = useSession();
    const [period, setPeriod] = useState(new Date().getFullYear())

    const router = useRouter();

    const [Loading, setLoading] = useState(false);

    const sendInfo = async (values: any) => {
        const res = await fetchData(
            '/ficha',
            "POST",
            values,
            session?.user.token
        );

        setDataRelations({ ...dataRelations, fichaId: res.idFicha });

        if (res) {
            return "Registro exitoso."
        }
    }

    const formik = useFormik({
        initialValues: {
            level: "",
            etapa: "",
            turno: "",
            section: "",
            procePlant: "",
            escolarPeriod: "",
            personalRes: "",
        },
        validationSchema: Yup.object({
            level: Yup.string().required(Messages.required),
            etapa: Yup.string().matches(regexList.onlyString).required(Messages.required),
            turno: Yup.string().matches(regexList.onlyString).required(Messages.required),
            section: Yup.string().matches(regexList.onlyString).required(Messages.required),
            procePlant: Yup.string().matches(regexList.onlyString).required(Messages.required),
            escolarPeriod: Yup.string().required(Messages.required),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            toast.promise(sendInfo(values), {
                loading: "Procesando...",
                success: (data) => {
                    router.push('/register/parents')
                    return data;
                },
                error: (error: Error) => {
                    return error.message === "Failed to fetch"
                        ? "Error en conexión."
                        : error.message ?? "";
                },
                finally: () => {
                    setLoading(false);
                }
            })
        },
    });

    return (
        <form
            className="h-2/4 w-3/4 border border-gray-300 rounded-xl shadow-xl p-8"
            onSubmit={formik.handleSubmit}
        >
            <div className="flex items-center justify-center mb-7 w-full">
                <h1 className="text-2xl font-medium">
                    Datos medicos <p className="text-primary-500 inline-flex">|</p> Registro
                </h1>
            </div>
            <div className="grid grid-cols-8 gap-3">
                <Select
                    isRequired
                    label="Turno:"
                    variant="bordered"
                    name="turno"
                    className="col-span-3"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorMessage={
                        formik.errors.turno && formik.touched.turno && formik.errors.turno
                    }
                    color={formik.errors.turno && formik.touched.turno ? "danger" : "primary"}
                >
                    <SelectItem key={"M"} value={"MAÑANA"}>
                        MAÑANA
                    </SelectItem>
                    <SelectItem key={"T"} value={"TARDE"}>
                        TARDE
                    </SelectItem>
                </Select>

                <Select
                    isRequired
                    label="Sección:"
                    variant="bordered"
                    name="section"
                    className="col-span-2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorMessage={
                        formik.errors.section && formik.touched.section && formik.errors.section
                    }
                    color={formik.errors.section && formik.touched.section ? "danger" : "primary"}
                >
                    <SelectItem key={"A"} value={"A"}>
                        A
                    </SelectItem>
                    <SelectItem key={"B"} value={"B"}>
                        B
                    </SelectItem>
                    <SelectItem key={"C"} value={"C"}>
                        C
                    </SelectItem>
                </Select>

                <Select
                    isRequired
                    label="Etapa:"
                    variant="bordered"
                    name="etapa"
                    className="col-span-3"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorMessage={
                        formik.errors.etapa && formik.touched.etapa && formik.errors.etapa
                    }
                    color={formik.errors.etapa && formik.touched.etapa ? "danger" : "primary"}
                >
                    <SelectItem key={"P"} value={"P"}>
                        EDUCACION PRIMARIA
                    </SelectItem>
                    <SelectItem key={"M"} value={"M"}>
                        EDUCACION MEDIA GENERAL
                    </SelectItem>
                </Select>

                <Select
                    isRequired
                    label="Periodo Escolar:"
                    variant="bordered"
                    name="escolarPeriod"
                    className="col-span-3"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorMessage={
                        formik.errors.escolarPeriod && formik.touched.escolarPeriod && formik.errors.escolarPeriod
                    }
                    color={formik.errors.escolarPeriod && formik.touched.escolarPeriod ? "danger" : "primary"}
                >
                    <SelectItem key={`${period} - ${period + 1}`} value={"P"}>
                        {`${period} - ${period + 1}`}
                    </SelectItem>
                    <SelectItem key={`${period + 1} - ${period + 2}`} value={"M"}>
                        {`${period + 1} - ${period + 2}`}
                    </SelectItem>
                </Select>
                <Input
                    isRequired
                    label="Grado / Año a cursar:"
                    name="level"
                    variant="bordered"
                    color={
                        formik.errors.level && formik.touched.level ? "danger" : "primary"
                    }
                    errorMessage={
                        formik.errors.level && formik.touched.level && formik.errors.level
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="col-span-2"
                />
                <Input
                    isRequired
                    label="Institucion de procedencia:"
                    name="procePlant"
                    variant="bordered"
                    color={
                        formik.errors.procePlant && formik.touched.procePlant ? "danger" : "primary"
                    }
                    errorMessage={
                        formik.errors.procePlant && formik.touched.procePlant && formik.errors.procePlant
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="col-span-6"
                />


            </div>

            <div className="flex flex-row justify-around mt-7">
                <Button
                    variant="ghost"
                    className="w-3/12"
                    color="danger"
                    type="reset"
                    onPress={formik.handleReset}
                >
                    Limpiar
                </Button>
                <Button
                    variant="solid"
                    className="w-3/12"
                    color="primary"
                    type="submit"
                    isLoading={Loading}
                >
                    Registrar
                </Button>
            </div>
        </form>
    );
}
