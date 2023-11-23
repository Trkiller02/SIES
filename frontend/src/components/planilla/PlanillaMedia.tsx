import { FichaI, RepresentI, StatusI, StudentI } from '@/types/register.interfaces';

export interface dataI {
    studentRelation: StudentI;
    representRelation: RepresentI;
    motherRelation?: RepresentI | null;
    fatherRelation?: RepresentI | null;
    statusRelation: StatusI;
    fichaRelation: FichaI
}

// Componente Header
function Header() {
    return (
        <div className="header-container">
            <img src="/img/Captura.JPG" alt="Imagen Izquierda" className="header-image" />
        </div>
    );
}

// Componente TitleBox
function TitleBox({ title }: { title: string }) {
    return (
        <div className="title-box text-xs break-all">
            <p>FOTO DEL {title}</p>
        </div>
    );
}

// Componente PreTitle
function PreTitle({ data }: { data: FichaI | undefined }) {
    return (
        <div className="pre-title">
            <p className='mb-[10px] text-xl font-bold'>PLANILLA DE INSCRIPCION</p>
            <p className='mb-[10px] text-base'>AÑO ESCOLAR {new Date().getFullYear()}-{new Date().getFullYear() + 1}</p>
            <p className='mb-[10px] text-lg'>AÑO {data ? <u>{data.level}</u> : "____"} SECCION {data ? <u>{data.section}</u> : "____"} TURNO {data ? <u>{data.turno === 'T' ? "TARDE" : data.turno === 'D' ? "MAÑANA" : ""}</u> : "___"}</p>
        </div>
    );
}

// Componente StudentData
function StudentData({ data }: { data: StudentI | undefined }) {
    return (
        <p className='w-full'>
            {data ? <p>
                Apellidos: <u>{data.studentRelation.lastName}</u> Nombres:<u>{data.studentRelation.name}</u> <br />
                Lugar de Nacionalidad: V <p style={{ display: "inline-block", border: "1px solid black", width: "15px", height: "15px", verticalAlign: "sub" }}>{data.studentRelation.ciNumber.charAt(0) === "V" && "X"}</p> E <p style={{ display: "inline-block", border: "1px solid black", width: "15px", height: "15px", verticalAlign: "sub" }}>{data.studentRelation.ciNumber.charAt(0) === "E" && "X"}</p>
                Cedula de Identidad:{data.studentRelation.ciNumber} Fecha de Nacimiento: {data.bornDate.split('T')[0]} Edad: {data.age + " años."}
                <p>País: {data.bornPais} Estado: {data.bornState} Genero:{data.sex} Estatura:{data.size} Peso: {data.weight}</p>
                <br />
                <>Con quien vive el estudiante: {data.liveWith === "MADRE" ? "MADRE" : data.liveWith === "PADRE" ? "PADRE" : "OTRO"}  En caso de otro especifique: {data.liveWith === "MADRE" ? "MADRE" : data.liveWith === "PADRE" ? "PADRE" : data.liveWith} </>
                <p>Dirección de Habitación: {data.studentRelation.homeParroquia + " " + data.studentRelation.homeParroquia + " " + data.studentRelation.homeDir}</p>
            </p> :
                <p className='w-full text-justify'>
                    Apellidos:______________________________________ Nombres:____________________________________ <br />
                    Lugar de Nacionalidad: V <span style={{ display: "inline-flex", border: "1px solid black", width: "15px", height: "15px", verticalAlign: "bottom" }}></span> E <span style={{ display: "inline-flex", border: "1px solid black", width: "15px", height: "15px", verticalAlign: "bottom" }}></span>
                    Cedula de Identidad:________________ Fecha de Nacimiento: ____________ Edad: _______
                    <p>País: ______________ Estado: _____________ Genero:_____ Estatura:____ Peso: _____ </p>
                    <br />
                    <p>Con quien vive el estudiante: ___________________  En caso de otro especifique: _________________________ </p>
                    <p>Dirección de Habitación: _______________________________________________________</p>
                    <hr className='border-[1px] border-black mt-4' />
                </p>
            }
        </p>
    );
}

function RepresentData({ data, prefix }: { data: RepresentI | undefined | null, prefix: string }) {
    return (
        <p className='w-full'>
            {
                data ? <>
                    <p><b>{prefix}</b>: APELLIDOS: <u>{data.personRelation.lastName}</u> NOMBRE: <u>{data.personRelation.name}</u> C.I.:<u>{data.personRelation.ciNumber}</u></p>
                    <p>TLF. HABITACION:<u>{data.tlfnHome}</u> CELULAR: <u>{data.personRelation.phoneNumber}</u> </p>
                    <p>TLF. TRABAJO: <u>{data.workPhoneNumber}</u> DIRECCION:<u>{data.personRelation.homeMunicipio + " " + data.personRelation.homeParroquia + " " + data.personRelation.homeDir}</u> PROFESION U OCUPACION:<u>{data.profession}</u></p>
                    <p>LUGAR DE TRABAJO:<u>{data.workPlace}</u> INGRESO MENSUAL:<u>{data.incomeMonth}</u></p>
                </> : <>
                    <p><b>{prefix}</b>: APELLIDOS: ________________ NOMBRE: ________________ C.I._________:</p>
                    <p>TLF. HABITACION:_________ CELULAR:___________________________ </p>
                    <p>TLF. TRABAJO:______________ DIRECCION:___________________________PROFESION U OCUPACION:___________________</p>
                    <p>LUGAR DE TRABAJO:______________________________ INGRESO MENSUAL:________________</p>
                </>
            }
        </p>
    )
}

// Componente ParentData
function ParentData({ data }: { data: RepresentI | undefined }) {
    return (
        <div className='w-full'>
            {
                data ? <>
                    <p>EL REPRESENTANTE LEGAL DEL ESTUDIANTE SERA:<u>{data.personRelation.ciNumber}</u> (<strong>EN CASO DE QUE NO SEA NINGUNO DE LOS PADRES
                        EL REPRESENTANTE LEGAL DEBE PRESENTAR AUTORIZACION SELLADA Y FIRMADA POR EL C.P.N.N.A.</strong>)
                    </p>
                    <p>APELLIDOS:<u>{data.personRelation.lastName}</u> NOMBRE:<u>{data.personRelation.name}</u> C.I.: <u>{data.personRelation.ciNumber}</u></p>
                    <p>TLF. HABITACION:<u>{data.tlfnHome}</u> CELULAR: <u>{data.personRelation.phoneNumber}</u></p>
                    <p>TLF. TRABAJO: <u>{data.workPhoneNumber}</u> EMAIL: <u>{data.personRelation.email}</u></p>
                    <p>LUGAR DE TRABAJO: <u>{data.workPlace}</u> INGRESO MENSUAL: <u>{data.incomeMonth}</u></p>
                    <p>PROFESION U OCUPACION: <u>{data.profession}</u> OTRO:_____________________________:</p>
                </> : <>
                    <p>EL REPRESENTANTE LEGAL DEL ESTUDIANTE SERA:____________________ (<strong>EN CASO DE QUE NO SEA NINGUNO DE LOS PADRES
                        EL REPRESENTANTE LEGAL DEBE PRESENTAR AUTORIZACION SELLADA Y FIRMADA POR EL C.P.N.N.A.</strong>)
                    </p>
                    <p>APELLIDOS:________________ NOMBRE:________________ C.I._________:</p>
                    <p>TLF. HABITACION:_________ CELULAR:___________________________ </p>
                    <p>TLF. HABITACION:__________________ CELULAR:______________________</p>
                    <p>TLF. TRABAJO:___________________ EMAIL:_______________________</p>
                    <p>LUGAR DE TRABAJO:_________________ INGRESO MENSUAL:____________</p>
                    <p>PROFESION U OCUPACION_______________________________________ OTRO:_____________________________:</p>
                </>
            }
        </div >
    );
}

function StatusInfo({ data }: { data: StatusI | undefined }) {
    return (
        <div style={{ display: "inline-block", border: "1px solid black", padding: "4px", width: "100%", textAlign: "justify", paddingBottom: "6px" }}>
            {
                data ? <>
                    <p>EL ESTUDIANTE PRACTICA ALGUNA ACTIVIDAD EXTRACURRICULAR SI<u>{data.preferAct === "" || data.preferAct === "NO" || data.preferAct === undefined || data.preferAct === null ? "___" : "X"}</u> NO<u>{data.preferAct === "" || data.preferAct === "NO" || data.preferAct === undefined || data.preferAct === null ? "X" : "___"}</u> &nbsp;CUAL {data.preferAct ? <u>{data.preferAct}</u> : "_____________________"}:</p>
                    <p>LUGAR DONDE LA PRACTICA{data.siteAct ? <u>{data.siteAct}</u> : "_____________________"}
                        HORARIO:{data.recreTime ? <u>{data.recreTime}</u> : "________________________________________"}</p>
                    <p>EL REQUIERE ALGUN TRATAMIENTO ESPECIAL: SI {data.trataEsp ? <u>X</u> : "___"} NO {data.trataEsp ? "___" : <u>x</u>} CUAL: {data.trataEsp ? <u>{data.trataEsp}</u> : "__________________________________________"}</p>
                    <p>ALERGICO A: {data.typeAler ? <u>{data.typeAler}</u> : "_______________________________________________________"}</p>
                    <p>PROMOVIDO A AÑO: {data.proLevel ? <u>{data.proLevel}</u> : "_________"} PLANTEL DE PROCEDENCIA:{data.plantProce ? <u>{data.plantProce}</u> : "_________________________________________________"}</p>
                </> : <>
                    <p>EL ESTUDIANTE PRACTICA ALGUNA ACTIVIDAD EXTRACURRICULAR SI_ NO_ CUAL_____________________:</p>
                    <p>LUGAR DONDE LA PRACTICA_____________________
                        HORARIO:________________________________________</p>
                    <p>EL REQUIERE ALGUN TRATAMIENTO ESPECIAL: SI ___NO___ CUAL:__________________________________________ </p>
                    <p>ALERGICO A:_______________________________________________________</p>
                    <p>PROMOVIDO A AÑO: _________ PLANTEL DE PROCEDENCIA:_________________________________________________</p>
                </>
            }
        </div>
    )
}




export default function PlanillaMedia({ data }: { data: dataI | undefined }) {
    return (
        <section className='w-full planilla1 flex flex-col p-9 gap-2'>
            <style>
                {`
                 @page {
                    size: letter;
                    margin: 20px;
                }

                body {
                    font-size: 12px;
                    font-family: Arial, sans-serif;
                    box-sizing: border-box;
                    padding: 0;
                    margin: 0;
                }


                h2, h3 {
                    text-align: center;
                }

                .header-container {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 10px;
                }

                .header-image {
                    width: 50;
                    height: 93px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 auto;
                }

                .title-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 10px;
                }

                .title-box {
                    border: 1px solid black;
                    padding: 10px;
                    font-size: 12px;
                    height: 100px;
                    width: 90px;
                    text-align: center;

                }

                .pre-title {
                    text - align: center;
                    margin-bottom: 10px;6
                    font-weight: bold;
                }
                
                `}
            </style>
            <Header />
            <div className="title-container">
                <TitleBox title="ESTUDIANTE" />
                <PreTitle data={data?.fichaRelation} />
                <TitleBox title="REPRESENTANTE" />
            </div>


            <h3 style={{ textAlign: "left", fontWeight: "bold" }}>DATOS DEL ESTUDIANTE:</h3>

            <StudentData data={data?.studentRelation} />

            <h4 className='text-md'><b>DATOS DE LOS PADRES:</b></h4>

            <RepresentData data={data?.fatherRelation} prefix='PADRE' />
            <RepresentData data={data?.motherRelation} prefix='MADRE' />

            {
                data?.fatherRelation !== data?.representRelation && data?.motherRelation !== data?.representRelation ?
                    <ParentData data={data?.representRelation} /> : <ParentData data={undefined} />
            }

            <StatusInfo data={data?.statusRelation} />


            <p>REPRESENTANTE LEGAL:__________________________________C.I._____________________ FIRMA:_____________________</p>
            <p>DOCENTE QUE REALIZA LA INSCRIPCION:_____________________________ C.I.___________________FIRMA:___________________</p>
            <p>FECHA DE LA INSCRIPCION: {data ? new Date().toLocaleDateString() : "_____________________________________"} HORA: {data ? new Date().toLocaleTimeString() : "_________________"}</p>

            <div className="avoid-page-break"></div>
        </section >
    );
}
