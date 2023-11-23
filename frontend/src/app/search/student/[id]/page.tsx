'use client'

import PlanillaMedia from '@/components/planilla/PlanillaMedia'
import { FichaI, RepresentI, StatusI, StudentI } from '@/types/register.interfaces'
import { fetchDataWithoutBody } from '@/utils/fetchHandler'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure } from '@nextui-org/react'
import jsPDF from 'jspdf'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MdOutlineEdit, MdOutlineRemoveRedEye } from 'react-icons/md'
import { toast } from 'sonner'

export interface DataI {
    idRelation: string,
    representCiNumbers: string,
    fichaId: string,
    motherPersonCiNumbers: null,
    fatherPersonCiNumbers: string,
    statusId: string,
    studentId: string,
    createdAt: string,
    updatedAt: string,
    deleteAt: string | null,
    representRelation: RepresentI,
    motherRelation: RepresentI | null,
    fatherRelation: RepresentI | null,
    fichaRelation: FichaI,
    statusRelation: StatusI,
    studentRelation: StudentI
}

export default function pageDetailsStudent({ params: { id } }: { params: { id: string } }) {
    const { data: session } = useSession()
    const [info, setInfo] = useState<DataI | null>()
    const [data, setData] = useState<any>()
    const router = useRouter();

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
                    scale: 0.27,
                },
                width: wDoc,
                windowWidth: wDoc * 3.7,
            });
            doc.output("dataurlnewwindow", { filename: "planilla" });

        } else {
            return;
        }
    };


    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const getStudent = async () => {
        const res = await fetchDataWithoutBody(`/relations-table/${id}`, session?.user.token)

        if (res) {
            setInfo(res)
        }

        return "Carga completa."
    }
    useEffect(() => {
        toast.promise(getStudent(), {
            loading: "Procesando...",
            success: (data) => {
                return data;
            },
            error: (err: Error) => {
                return err.message;
            }
        })
    }, [])

    useEffect(() => {
        setData({
            studentRelation: info?.studentRelation,
            representRelation: info?.representRelation,
            motherRelation: info?.motherRelation ?? null,
            fatherRelation: info?.fatherRelation ?? null,
            statusRelation: info?.statusRelation,
            fichaRelation: info?.fichaRelation,
        })
        console.log(data)
    }, [info])
    return (
        <section className='w-3/4'>
            {
                info ?
                    <div className='flex flex-col gap-4 w-full'>
                        <div className='flex flex-col gap-2 shadow-lg rounded-xl border border-gray-300 p-6'>
                            <div className='flex justify-between'>
                                <h1 className='text-2xl text-primary pb-3'>Estudiante:</h1>
                                <div className='flex gap-2'>
                                    <Button variant='bordered' color='warning' onPress={() => router.push('/edit/student')}>Editar</Button>
                                    <Button variant='bordered' color='primary' onPress={onOpen}>Mostrar Planilla</Button>
                                </div>
                            </div>

                            <p className='text-lg'>Datos Personales:</p>
                            <div className='grid grid-cols-2 gap-1 p-3 mb-2 border border-gray-300 rounded-xl shadow-inner'>
                                <div className='flex flex-col gap-1'>
                                    <p className='font-semibold'>Nombres:&nbsp;&nbsp;<span className='font-normal'>{info.studentRelation.studentRelation.name}</span></p>
                                    <p className='font-semibold'>Apellidos:&nbsp;&nbsp;<span className='font-normal'>{info.studentRelation.studentRelation.lastName}</span></p>
                                    <p className='font-semibold'>Cedula de identidad:&nbsp;&nbsp;<span className='font-normal'>{info.studentRelation.studentRelation.ciNumber}</span></p>
                                    <p className='font-semibold'>Correo electronico:&nbsp;&nbsp;<span className='font-normal'>{info.studentRelation.studentRelation.email === '' || info.studentRelation.studentRelation.email === null ? "NO POSEE" : info.studentRelation.studentRelation.email}</span></p>
                                    <p className='font-semibold'>Numero telefonico:&nbsp;&nbsp;<span className='font-normal'>{info.studentRelation.studentRelation.phoneNumber === '' || info.studentRelation.studentRelation.phoneNumber === null ? "NO POSEE" : info.studentRelation.studentRelation.phoneNumber}</span></p>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <p className='font-semibold'>Peso:&nbsp;&nbsp;<span className='font-normal'>{info.studentRelation.weight}&nbsp;kg</span></p>
                                    <p className='font-semibold'>Estatura:&nbsp;&nbsp;<span className='font-normal'>{info.studentRelation.size}&nbsp;m</span></p>
                                    <p className='font-semibold'>Sexo:&nbsp;&nbsp;<span className='font-normal'>{info.studentRelation.sex === 'M' ? "Masculino" : info.studentRelation.sex === 'F' ? "Femenino" : "Indefinido."}</span></p>
                                    <p className='font-semibold'>Vive con:&nbsp;&nbsp;<span className='font-normal'>{info.studentRelation.liveWith}</span></p>
                                    <p className='font-semibold'>Direccion de habitacion:&nbsp;&nbsp;<span className='font-normal'>{info.studentRelation.studentRelation.homeDir}</span></p>
                                </div>
                            </div>

                            <p className='text-lg'>Datos Academicos:</p>
                            <table className="min-w-full divide-y divide-gray-200 p-3 mb-2 border border-gray-300 rounded-xl shadow-inner">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Año / Grado </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seccion</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Etapa</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Turno</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Periodo Escolar</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">{info.fichaRelation.level}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{info.fichaRelation.section}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{info.fichaRelation.etapa === 'M' ? "Educación Media General" : info.fichaRelation.etapa === 'P' ? "Educación Primaria" : ''}</td>
                                        <td className="px-4 py-4 whitespace-nowrap">{info.fichaRelation.turno === 'D' ? "Mañana" : info.fichaRelation.turno === 'T' ? "Tarde" : ''}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{info.fichaRelation.escolarPeriod}</td>
                                        <td className="px-6 py-4 whitespace-nowrap flex gap-4 items-center">
                                            <Tooltip content="Detalles.">
                                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => router.push('/search/represent/' + info.representCiNumbers)}>
                                                    <MdOutlineRemoveRedEye className='text-primary text-2xl' />
                                                </span>
                                            </Tooltip>
                                            <Tooltip content="Editar Estudiante.">
                                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => router.push('/edit/represent/' + info.representCiNumbers)}>
                                                    <MdOutlineEdit className='text-warning text-2xl' />
                                                </span>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <p className='text-lg'>Datos Medicos:</p>
                            <div className='grid grid-cols-2 gap-1 p-3 mb-2 border border-gray-300 rounded-xl shadow-inner'>
                                <div className='flex flex-col gap-1'>
                                    <p className='font-semibold'>ALERGICO A:&nbsp;&nbsp;<span className='font-normal'>{info.statusRelation.typeAler === '' || info.statusRelation.typeAler === null ? "NO ES ALERGICO." : info.statusRelation.typeAler}</span></p>
                                    <p className='font-semibold'>EL REQUIERE ALGUN TRATAMIENTO ESPECIAL:&nbsp;&nbsp;<span className='font-normal'>{info.statusRelation.trataEsp === '' || info.statusRelation.trataEsp === null ? "NO" : info.statusRelation.trataEsp}</span></p>
                                    <p className='font-semibold'>PRACTICA ALGUNA ACTIVIDAD EXTRACURRICULAR:&nbsp;&nbsp;<span className='font-normal'>{info.statusRelation.preferAct === '' || info.statusRelation.preferAct === null ? "NO" : info.statusRelation.preferAct}</span></p>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <p className='font-semibold'>LUGAR DONDE LA PRACTICA:&nbsp;&nbsp;<span className='font-normal'>{info.statusRelation.siteAct === '' || info.statusRelation.siteAct === null ? "NINGUNO" : info.statusRelation.siteAct}</span></p>
                                    <p className='font-semibold'>HORARIO EN QUE LA PRACTICA:&nbsp;&nbsp;<span className='font-normal'>{info.statusRelation.recreTime === '' || info.statusRelation.recreTime === null ? "NINGUNO" : info.statusRelation.recreTime}</span></p>
                                    <p className='font-semibold'>PLANTEL DE PROCEDENCIA:&nbsp;&nbsp;<span className='font-normal'>{info.statusRelation.plantProce === '' || info.statusRelation.plantProce === null ? "NINGUNO" : info.statusRelation.plantProce}</span></p>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 shadow-lg rounded-xl border border-gray-300 p-6'>
                            <p className='text-2xl'>Relaciones: </p>
                            <div className='flex flex-col gap-2 p-3 mb-2 border border-gray-300 rounded-xl shadow-inner'>
                                <h1 className='text-xl text-primary'>Representante:</h1>
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">C.I. / C.E. </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo electronico</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Numero telefonico</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">{info.representRelation.personRelation.ciNumber}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{info.representRelation.personRelation.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{info.representRelation.personRelation.lastName}</td>
                                            <td className="px-4 py-4 whitespace-nowrap">{info.representRelation.personRelation.email !== null ? info.representRelation.personRelation.email : "NO POSEE"}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{info.representRelation.personRelation.phoneNumber !== null ? info.representRelation.personRelation.phoneNumber : "NO POSEE"}</td>
                                            <td className="px-6 py-4 whitespace-nowrap flex gap-4 items-center">
                                                <Tooltip content="Detalles.">
                                                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => router.push('/search/represent/' + info.representCiNumbers)}>
                                                        <MdOutlineRemoveRedEye className='text-primary text-2xl' />
                                                    </span>
                                                </Tooltip>
                                                <Tooltip content="Editar Estudiante.">
                                                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => router.push('/edit/represent/' + info.representCiNumbers)}>
                                                        <MdOutlineEdit className='text-warning text-2xl' />
                                                    </span>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {
                                info.motherPersonCiNumbers !== null &&
                                <div className='flex flex-col gap-2 p-3 mb-2 border border-gray-300 rounded-xl shadow-inner'>
                                    <h1 className='text-xl text-primary'>Madre:</h1>
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">C.I. / C.E. </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo electronico</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Numero telefonico</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">{info.motherRelation?.personRelation.ciNumber}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{info.motherRelation?.personRelation.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{info.motherRelation?.personRelation.lastName}</td>
                                                <td className="px-4 py-4 whitespace-nowrap">{info.motherRelation?.personRelation.email !== null ? info.representRelation.personRelation.email : "NO POSEE"}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{info.motherRelation?.personRelation.phoneNumber !== null ? info.representRelation.personRelation.phoneNumber : "NO POSEE"}</td>
                                                <td className="px-6 py-4 whitespace-nowrap flex gap-4 items-center">
                                                    <Tooltip content="Detalles.">
                                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => router.push('/search/represent/' + info.representCiNumbers)}>
                                                            <MdOutlineRemoveRedEye className='text-primary text-2xl' />
                                                        </span>
                                                    </Tooltip>
                                                    <Tooltip content="Editar Estudiante.">
                                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => router.push('/edit/represent/' + info.representCiNumbers)}>
                                                            <MdOutlineEdit className='text-warning text-2xl' />
                                                        </span>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            }
                            {
                                info.fatherPersonCiNumbers !== null &&
                                <div className='flex flex-col gap-2 p-3 mb-2 border border-gray-300 rounded-xl shadow-inner'>
                                    <h1 className='text-xl text-primary'>Padre:</h1>
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">C.I. / C.E. </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo electronico</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Numero telefonico</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">{info.fatherRelation?.personRelation.ciNumber}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{info.fatherRelation?.personRelation.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{info.fatherRelation?.personRelation.lastName}</td>
                                                <td className="px-4 py-4 whitespace-nowrap">{info.fatherRelation?.personRelation.email !== null ? info.representRelation.personRelation.email : "NO POSEE"}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{info.fatherRelation?.personRelation.phoneNumber !== null ? info.representRelation.personRelation.phoneNumber : "NO POSEE"}</td>
                                                <td className="px-6 py-4 whitespace-nowrap flex gap-4 items-center">
                                                    <Tooltip content="Detalles.">
                                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => router.push('/search/represent/' + info.representCiNumbers)}>
                                                            <MdOutlineRemoveRedEye className='text-primary text-2xl' />
                                                        </span>
                                                    </Tooltip>
                                                    <Tooltip content="Editar Estudiante.">
                                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => router.push('/edit/represent/' + info.representCiNumbers)}>
                                                            <MdOutlineEdit className='text-warning text-2xl' />
                                                        </span>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            }
                        </div>
                        <Modal
                            isOpen={isOpen}
                            onOpenChange={onOpenChange}
                            backdrop='blur'
                            size='5xl'
                            className='h-4/5'
                        >
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalBody className='overflow-y-auto'>
                                            <div>
                                                <PlanillaMedia data={data} />
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="flat" onPress={onClose}>
                                                Cerrar
                                            </Button>
                                            <Button color="primary" onPress={downloadPDF}>
                                                Descargar
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </div>
                    : "Cargando..."
            }

        </section>
    )
}
