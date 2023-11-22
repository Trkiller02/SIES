"use client";

import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { fetchDataWithoutBody } from "@/utils/fetchHandler";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import * as Yup from "yup";
import { Button, Input } from "@nextui-org/react";
import { Messages } from "@/utils/messages";
import { regexList } from "@/utils/regexPatterns";
import UserCards from "@/components/UserCards";
import { UserI } from '@/components/UserCards';


export default function UserPageSearch() {
    const { data: session } = useSession();
    const [info, setInfo] = useState<UserI[]>([]);

    const getUser = async (value?: { id: string }) => {
        const res = await fetchDataWithoutBody(
            "/user/" + value?.id,
            session?.user.token
        );
        if (res) {
            setInfo([res]);
        }
    };

    const getUsers = async () => {
        const res = await fetchDataWithoutBody(
            "/user",
            session?.user.token
        );
        if (res) {
            setInfo(res);
        }
    };

    const formik = useFormik({
        initialValues: {
            id: "",
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
                <Button variant="solid" color="primary" type="submit" size="lg">
                    Buscar
                </Button>
            </form>
            <div className="flex flex-col w-full gap-4">
                {info && info.length !== 0 && info.map ? info.map((item) => <UserCards item={item} key={item.id} />) : "No se encuentran usuarios"}
            </div>
        </div>
    );
}
