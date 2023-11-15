"use client";

import { Input, Button } from "@nextui-org/react";
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

export default function healthPage() {
    const { dataRelations, setDataRelations } = useContext(ctxDataRelation);
    const { data: session } = useSession();

    const router = useRouter();

    const [Loading, setLoading] = useState(false);

    const sendInfo = async (values: any) => {
        const res = await fetchData(
            '/healt-info',
            "POST",
            values,
            session?.user.token
        );

        console.log(res)


        setDataRelations({ ...dataRelations, statusId: res.idStatus });

        if (res) {
            return "Registro exitoso."
        }
    }

    const formik = useFormik({
        initialValues: {
            typeAler: '',
            trataEsp: '',
            preferAct: '',
            recreTime: '',
            siteAct: '',
            proLevel: '',
            plantProce: '',
        },
        validationSchema: Yup.object({
            typeAler: Yup.string().matches(regexList.onlyString).optional(),
            trataEsp: Yup.string().matches(regexList.onlyString).optional(),
            preferAct: Yup.string().matches(regexList.onlyString).optional(),
            recreTime: Yup.string().matches(regexList.onlyString).optional(),
            siteAct: Yup.string().matches(regexList.onlyString).optional(),
            proLevel: Yup.string().required(Messages.required),
            plantProce: Yup.string().matches(regexList.onlyString).required(Messages.required),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            toast.promise(sendInfo(values), {
                loading: "Procesando...",
                success: (data) => {
                    router.push('/register/academic')
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
                <Input
                    label="Practica una actividad extracurricular:"
                    name="preferAct"
                    description="Llene el campo de ser necesario."
                    variant="bordered"
                    color={
                        formik.errors.preferAct && formik.touched.preferAct
                            ? "danger"
                            : "primary"
                    }
                    errorMessage={
                        formik.errors.preferAct &&
                        formik.touched.preferAct &&
                        formik.errors.preferAct
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="col-span-3"
                    value={formik.values.preferAct.toUpperCase()}
                />

                <Input
                    label="Lugar donde la practica:"
                    name="siteAct"
                    variant="bordered"
                    color={
                        formik.errors.siteAct && formik.touched.siteAct ? "danger" : "primary"
                    }
                    errorMessage={
                        formik.errors.siteAct && formik.touched.siteAct && formik.errors.siteAct
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="col-span-2"
                    value={formik.values.siteAct.toUpperCase()}
                />

                <Input
                    label="Horario en que la practica:"
                    name="recreTime"
                    variant="bordered"
                    color={
                        formik.errors.recreTime && formik.touched.recreTime
                            ? "danger"
                            : "primary"
                    }
                    errorMessage={
                        formik.errors.recreTime &&
                        formik.touched.recreTime &&
                        formik.errors.recreTime
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="col-span-2"
                    value={formik.values.recreTime.toUpperCase()}
                />

                <div className="col-span-1"></div>
                <Input
                    label="Alergico a:"
                    name="typeAler"
                    description="Llene el campo de ser necesario."
                    variant="bordered"
                    color={
                        formik.errors.typeAler && formik.touched.typeAler ? "danger" : "primary"
                    }
                    errorMessage={
                        formik.errors.typeAler && formik.touched.typeAler && formik.errors.typeAler
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="col-span-3"
                />
                <Input
                    label="Requiere de un tratamiento especial:"
                    name="trataEsp"
                    description="Llene el campo de ser necesario."
                    variant="bordered"
                    color={
                        formik.errors.trataEsp && formik.touched.trataEsp ? "danger" : "primary"
                    }
                    errorMessage={
                        formik.errors.trataEsp && formik.touched.trataEsp && formik.errors.trataEsp
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="col-span-3"
                />
                <div className='col-span-2'></div>
                <Input
                    isRequired
                    label="Año al que lo promovieron:"
                    name="proLevel"
                    variant="bordered"
                    color={
                        formik.errors.proLevel && formik.touched.proLevel ? "danger" : "primary"
                    }
                    errorMessage={
                        formik.errors.proLevel && formik.touched.proLevel && formik.errors.proLevel
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="col-span-2"
                />
                <Input
                    isRequired
                    label="Institucion de procedencia:"
                    name="plantProce"
                    variant="bordered"
                    color={
                        formik.errors.plantProce && formik.touched.plantProce ? "danger" : "primary"
                    }
                    errorMessage={
                        formik.errors.plantProce && formik.touched.plantProce && formik.errors.plantProce
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
