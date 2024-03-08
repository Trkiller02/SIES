"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { toast } from "sonner";
//HOOKS
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
//UTILS
import { fetchDataWithoutBody } from "@/utils/fetchHandler";
import { RelationTableI } from "@/types/register.interfaces";
//ICONS
import { MdOutlineEdit, MdOutlineRemoveRedEye } from "react-icons/md";

export default function pageDetailsStudent({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data: session } = useSession();
  const [data, setData] = useState<RelationTableI>();
  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getStudent = async () => {
    const res: RelationTableI = await fetchDataWithoutBody(
      `/relations-table/${id}`,
      session?.user.token
    );

    if (res) setData(res);

    return "Carga completa.";
  };

  const download = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tools/planilla/${data?.student_id.person_id.ci_number}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + session?.user.token,
        },
      }
    );

    const blob = await res.blob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `planilla${data?.student_id.person_id.ci_number}.docx`; // replace with the desired filename
    a.click();

    URL.revokeObjectURL(url);

    return;
  };

  const downloadExcel = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tools/excel/${data?.student_id.person_id.ci_number}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + session?.user.token,
        },
      }
    );

    const blob = await res.blob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `excel${data?.student_id.person_id.ci_number}.xlsx`;
    a.click();

    URL.revokeObjectURL(url);

    return;
  };

  useEffect(() => {
    toast.promise(getStudent(), {
      loading: "Procesando...",
      success: (data) => {
        return data;
      },
      error: (err: Error) => {
        return err.message;
      },
    });
  }, []);

  return (
    <section className="w-3/4">
      {data && typeof data !== "undefined" ? (
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2 shadow-lg rounded-xl border border-gray-300 p-6">
            <div className="flex justify-between">
              <h1 className="text-2xl text-primary pb-3">Estudiante:</h1>
              <div className="flex gap-2">
                <Button
                  variant="bordered"
                  color="warning"
                  onPress={() =>
                    router.push(
                      `/edit/student/${data.student_id.person_id.ci_number}`
                    )
                  }
                >
                  Editar
                </Button>
                <Button variant="bordered" color="primary" onPress={onOpen}>
                  Descargar Planilla
                </Button>
                <Button
                  variant="bordered"
                  color="success"
                  onPress={() => downloadExcel()}
                >
                  Descargar en Excel
                </Button>
              </div>
            </div>

            <p className="text-lg">Datos Personales:</p>
            <div className="grid grid-cols-2 gap-1 p-3 mb-2 border border-gray-300 rounded-xl shadow-inner">
              <div className="flex flex-col gap-1">
                <p className="font-semibold">
                  Nombres:&nbsp;&nbsp;
                  <span className="font-normal">
                    {data?.student_id.person_id.name}
                  </span>
                </p>

                <p className="font-semibold">
                  Numero telefónico:&nbsp;&nbsp;
                  <span className="font-normal">
                    {!data?.student_id.person_id.phone_number
                      ? "NO POSEE"
                      : data?.student_id.person_id.phone_number}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">
                  Apellidos:&nbsp;&nbsp;
                  <span className="font-normal">
                    {data?.student_id.person_id.lastname}
                  </span>
                </p>
                <p className="font-semibold">
                  Correo electrónico:&nbsp;&nbsp;
                  <span className="font-normal">
                    {!data?.student_id.person_id.email
                      ? "NO POSEE"
                      : data?.student_id.person_id.email}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">
                  Cédula de identidad:&nbsp;&nbsp;
                  <span className="font-normal">
                    {data?.student_id.person_id.ci_number}
                  </span>
                </p>
              </div>
              <p className="font-semibold col-span-3 py-2">
                Dirección de habitación:&nbsp;&nbsp;
                <span className="font-normal">
                  {data.student_id.person_id.home_municipio}&nbsp;
                  {data.student_id.person_id.home_parroquia}&nbsp;
                  {data?.student_id.person_id.home_dir}
                </span>
              </p>
            </div>

            <div className="inline-flex justify-between items-center w-full">
              <p className="text-lg">Datos Academicos:</p>
              <Button
                variant="bordered"
                color="warning"
                onPress={() =>
                  router.push(
                    `/edit/health/${data.student_id.person_id.ci_number}`
                  )
                }
              >
                Editar
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-1 p-3 mb-2 border border-gray-300 rounded-xl shadow-inner">
              <div className="flex flex-col gap-1">
                <p className="font-semibold">
                  Año / Grado:&nbsp;&nbsp;
                  <span className="font-normal">{data?.ficha_id.level}</span>
                </p>
                <p className="font-semibold">
                  Turno:&nbsp;&nbsp;
                  <span className="font-normal">{data?.ficha_id.turno}</span>
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">
                  Sección:&nbsp;&nbsp;
                  <span className="font-normal">{data?.ficha_id.section}</span>
                </p>
                <p className="font-semibold">
                  Periodo Escolar:&nbsp;&nbsp;
                  <span className="font-normal">
                    {data?.ficha_id.escolar_period}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">
                  Etapa:&nbsp;&nbsp;
                  <span className="font-normal">{data?.ficha_id.etapa}</span>
                </p>
                <p className="font-semibold">
                  Egresado:&nbsp;&nbsp;
                  <span className="font-normal">
                    {data?.ficha_id.egresado === false ? "NO" : "SI"}
                  </span>
                </p>
              </div>

              <p className="font-semibold col-span-3">
                Plantel de procedencia:&nbsp;&nbsp;
                <span className="font-normal">
                  {data?.ficha_id.proce_plant === "" ||
                  data?.ficha_id.proce_plant === null
                    ? "NINGUNO"
                    : data?.ficha_id.proce_plant}
                </span>
              </p>
            </div>

            <div className="inline-flex justify-between items-center w-full">
              <p className="text-lg">Datos Medicos:</p>
              <Button
                variant="bordered"
                color="warning"
                onPress={() =>
                  router.push(
                    `/edit/health/${data.student_id.person_id.ci_number}`
                  )
                }
              >
                Editar
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-1 p-3 mb-2 border border-gray-300 rounded-xl shadow-inner">
              <div className="flex flex-col gap-1">
                <p className="font-semibold">
                  Peso:&nbsp;&nbsp;
                  <span className="font-normal">
                    {data?.health_info_id.weight ??
                      "No se proporciono información."}
                    &nbsp;k
                  </span>
                </p>
                <p className="font-semibold">
                  Estatura:&nbsp;&nbsp;
                  <span className="font-normal">
                    {data?.health_info_id.size ??
                      "No se proporciono información."}
                    &nbsp;m
                  </span>
                </p>
                <p className="font-semibold">
                  Sexo:&nbsp;&nbsp;
                  <span className="font-normal">
                    {data?.health_info_id.sex}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">
                  Vive con:&nbsp;&nbsp;
                  <span className="font-normal">
                    {data?.health_info_id.live_with ??
                      "No se proporciono información."}
                  </span>
                </p>
                <p className="font-semibold">
                  ALERGICO A:&nbsp;&nbsp;
                  <span className="font-normal">
                    {data?.health_info_id.type_aler === "" ||
                    data?.health_info_id.type_aler === null
                      ? "NO ES ALERGICO."
                      : data?.health_info_id.type_aler}
                  </span>
                </p>
                <p className="font-semibold">
                  TRATAMIENTO ESPECIAL:&nbsp;&nbsp;
                  <span className="font-normal">
                    {data?.health_info_id.trata_esp === "" ||
                    data?.health_info_id.trata_esp === null
                      ? "NO"
                      : data?.health_info_id.trata_esp}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">
                  ACTIVIDAD EXTRACURRICULAR:&nbsp;&nbsp;
                  <span className="font-normal">
                    {data?.health_info_id.prefer_act === "" ||
                    data?.health_info_id.prefer_act === null
                      ? "NO"
                      : data?.health_info_id.prefer_act}
                  </span>
                </p>
                <p className="font-semibold">
                  LUGAR DONDE LA PRACTICA:&nbsp;&nbsp;
                  <span className="font-normal">
                    {data?.health_info_id.site_act === "" ||
                    data?.health_info_id.site_act === null
                      ? "NINGUNO"
                      : data?.health_info_id.site_act}
                  </span>
                </p>
                <p className="font-semibold">
                  HORARIO EN QUE LA PRACTICA:&nbsp;&nbsp;
                  <span className="font-normal">
                    {data?.health_info_id.recre_time === "" ||
                    data?.health_info_id.recre_time === null
                      ? "NINGUNO"
                      : data?.health_info_id.recre_time}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 shadow-lg rounded-xl border border-gray-300 p-6">
            <p className="text-2xl">Relaciones: </p>
            {data?.represent_id && (
              <div className="flex flex-col gap-2 p-3 mb-2 border border-gray-300 rounded-xl shadow-inner">
                <h1 className="text-xl text-primary">Representante:</h1>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        C.I. / C.E.{" "}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Apellido
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Correo electronico
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Numero telefonico
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data?.represent_id.person_id.ci_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data?.represent_id.person_id.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data?.represent_id.person_id.lastname}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {data?.represent_id.person_id.email !== null
                          ? data?.represent_id.person_id.email
                          : "NO POSEE"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data?.represent_id.person_id.phone_number !== null
                          ? data?.represent_id.person_id.phone_number
                          : "NO POSEE"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex gap-4 items-center">
                        <Tooltip content="Detalles.">
                          <span
                            className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            onClick={() =>
                              router.push(
                                "/search/represent/" +
                                  data?.represent_id.person_id.ci_number
                              )
                            }
                          >
                            <MdOutlineRemoveRedEye className="text-primary text-2xl" />
                          </span>
                        </Tooltip>
                        <Tooltip content="Editar.">
                          <span
                            className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            onClick={() =>
                              router.push(
                                "/edit/represent/" +
                                  data?.represent_id.person_id.ci_number
                              )
                            }
                          >
                            <MdOutlineEdit className="text-warning text-2xl" />
                          </span>
                        </Tooltip>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {data?.mother_id && (
              <div className="flex flex-col gap-2 p-3 mb-2 border border-gray-300 rounded-xl shadow-inner">
                <h1 className="text-xl text-primary">Madre:</h1>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        C.I. / C.E.{" "}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Apellido
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Correo electronico
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Numero telefonico
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data?.mother_id?.person_id.ci_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data?.mother_id?.person_id.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data?.mother_id?.person_id.lastname}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {data?.mother_id?.person_id.email !== null
                          ? data?.mother_id.person_id.email
                          : "NO POSEE"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data?.mother_id?.person_id.phone_number !== null
                          ? data?.mother_id.person_id.phone_number
                          : "NO POSEE"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex gap-4 items-center">
                        <Tooltip content="Detalles.">
                          <span
                            className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            onClick={() =>
                              router.push(
                                "/search/represent/" +
                                  data?.mother_id?.person_id.ci_number
                              )
                            }
                          >
                            <MdOutlineRemoveRedEye className="text-primary text-2xl" />
                          </span>
                        </Tooltip>
                        <Tooltip content="Editar.">
                          <span
                            className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            onClick={() =>
                              router.push(
                                "/edit/represent/" +
                                  data?.mother_id?.person_id.ci_number
                              )
                            }
                          >
                            <MdOutlineEdit className="text-warning text-2xl" />
                          </span>
                        </Tooltip>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {data?.father_id && (
              <div className="flex flex-col gap-2 p-3 mb-2 border border-gray-300 rounded-xl shadow-inner">
                <h1 className="text-xl text-primary">Padre:</h1>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        C.I. / C.E.{" "}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Representante Legal{" "}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Apellido
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Correo electronico
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Numero telefonico
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data?.father_id?.person_id.ci_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data?.father_id?.represent === true
                          ? "VERDADERO"
                          : data?.father_id?.represent === false
                          ? "FALSO"
                          : "FALSO"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data?.father_id?.person_id.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data?.father_id?.person_id.lastname}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {data?.father_id?.person_id.email !== null
                          ? data?.father_id.person_id.email
                          : "NO POSEE"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data?.father_id?.person_id.phone_number !== null
                          ? data?.father_id.person_id.phone_number
                          : "NO POSEE"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex gap-4 items-center">
                        <Tooltip content="Detalles.">
                          <span
                            className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            onClick={() =>
                              router.push(
                                "/search/represent/" +
                                  data?.father_id?.person_id.ci_number
                              )
                            }
                          >
                            <MdOutlineRemoveRedEye className="text-primary text-2xl" />
                          </span>
                        </Tooltip>
                        <Tooltip content="Editar.">
                          <span
                            className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            onClick={() =>
                              router.push(
                                "/edit/represent/" +
                                  data?.father_id?.person_id.ci_number
                              )
                            }
                          >
                            <MdOutlineEdit className="text-warning text-2xl" />
                          </span>
                        </Tooltip>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            backdrop="blur"
            size="sm"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader>
                    <h1 className="text-2xl">
                      Planilla de {data.student_id.person_id.name}&nbsp;
                      {data.student_id.person_id.lastname}
                    </h1>
                  </ModalHeader>
                  <ModalBody className="overflow-y-auto">
                    <div>
                      <h1>¿Desea descargar la planilla?</h1>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Cerrar
                    </Button>
                    <Button color="primary" onPress={download}>
                      Descargar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      ) : (
        "Cargando..."
      )}
    </section>
  );
}
