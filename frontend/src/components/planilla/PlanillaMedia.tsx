
interface PersonI {
    ciNumber: string;
    name: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    homeDir: string;
    homeParroquia: string;
    homeMunicipio: string;
    relation: string;
}

interface StudentI {
    studentRelation: PersonI;
    bornState: string;
    bornPais: string;
    bornDate: Date;
    liveWith: string;
    age: string;
    sex: string;
    weight: string;
    size: string;
    Lateralidad: string;
    instPro: string;
}

interface RepresentI {
    personRelation: PersonI;
    profession: string;
    tlfnHome: string;
    workPlace: string;
    workPhoneNumber: string;
    incomeMonth: number;
}

interface StatusI {
    typeAler: string;
    trataEsp: string;
    preferAct: string;
    recreTime: string;
    siteAct: string;
    proLevel: string;
    plantProce: string;
}

interface FichaI {
    level: string;
    section: string;
    etapa: string;
    turno: string;
    procePlant: string;
    escolarPeriod: string;
    InsDate: string;
}

interface dataI {
    studentRelation: StudentI;
    representRelation: RepresentI;
    motherRelation?: RepresentI;
    fatherRelation?: RepresentI;
    statusRelation: StatusI;
    fichaRelation: FichaI
}

export default function PlanillaMedia({ data }: { data: dataI | undefined }) {
    return (
        <section>
            <style>
                {`
                 @page {
                    size: letter;
                margin: 20px;
        }

                body {
                    font - family: Arial, sans-serif;
                font-size: 12px;
        }
                 @media print {
        .avoid - page -break {
            break-inside: avoid;
        }
        }

              h2,h3 {
                  text - align: center;
  }
              .header-container {
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
              padding: 5px;
              width: 80px;
              text-align: center;
  }
              .pre-title {
                  text - align: center;
              margin-bottom: 10px;
              font-weight: bold;
  }
`}
            </style>
            <div className=' planilla1'>
                <div className="header-container">
                    <img src="img/Captura.JPG" alt="Imagen Izquierda" className="header-image" />
                </div>
                <div className="title-container">
                    <div className="title-box">
                        <p>FOTO</p>
                        <p>DEL</p>
                        <p>ESTUDIANTE</p>
                    </div>
                    <div className="pre-title">
                        <p style={{ marginBottom: "10px" }}>PLANILLA DE INSCRIPCION</p>
                        <p style={{ marginBottom: "10px" }}>AÑO ESCOLAR 2023-2024</p>
                        <p style={{ marginBottom: "10px" }}>GRADO____SECCION____TURNO___</p>
                    </div>
                    <div className="title-box">
                        <p>FOTO</p>
                        <p>DEL</p>
                        <p>ESTUDIANTE</p>
                    </div>
                </div>


                <h3 style={{ textAlign: "left" }}>DATOS DEL ESTUDIANTE:</h3>

                {
                    data ? <>
                        <p>Apellidos:<sub>{data?.studentRelation.studentRelation.lastName}</sub> Nombres:<sub>{data?.studentRelation.studentRelation.name}</sub></p>
                        <p>Lugar de Nacionalidad:V <span
                            style={{ display: "inline-block", border: "1px solid black", width: "15px", height: "15px", textAlign: "center", lineHeight: "12px" }}>{data?.studentRelation.studentRelation.ciNumber.charAt(0) === "V" ? "X" : ""}</span>E
                            <span
                                style={{ display: "inline-block", border: "1px solid black", width: "15px", height: "15px", textAlign: "center", lineHeight: "12px" }}>{data?.studentRelation.studentRelation.ciNumber.charAt(0) === "E" ? "X" : ""}</span>
                            Cedula de Identidad: <sub>{data.studentRelation.studentRelation.ciNumber}</sub> Fecha de Nacimiento: <sub>{data.studentRelation.bornDate.toISOString().split('T')[0]}</sub> Edad: <sub>{data?.studentRelation.age}</sub>
                        </p>

                        <p>País: ______________ Estado: _____________ Genero:_____ Estatura:____ Peso: _____ </p>
                        <br />
                        <p>
                            Con quien vive el estudiante: ___________________
                            En caso de otro especifique: _________________________ </p>
                        <p>
                            Dirección de Habitación: _______________________________________________________
                            ___________________________________________________________________________________
                        </p>
                        <h4>DATOS DE LOS PADRES</h4>

                        <p>PADRE: APELLIDOS:________________ NOMBRE:________________ C.I._________:</p>
                        <p>TLF. HABITACION:_________ CELULAR:___________________________ </p>
                        <p>TLF. TRABAJO:______________ DIRECCION:___________________________PROFESION U OCUPACION:___________________</p>
                        <p>LUGAR DE TRABAJO:______________________________ INGRESO MENSUAL:________________</p>
                        <p>MADRE: APELLIDOS:________________ NOMBRE:________________ C.I._________:</p>
                        <p>TLF. HABITACION:_________ CELULAR:___________________________ </p>
                        <p>TLF. TRABAJO:______________ DIRECCION:___________________________PROFESION U OCUPACION:___________________</p>
                        <p>LUGAR DE TRABAJO:______________________________ INGRESO MENSUAL:________________</p>
                        <p>EL REPRESENTANTE LEGAL DEL ESTUDIANTE SERA:____________________ <strong>(EN CASO DE QUE NO SEA NINGUNO DE LOS PADRES
                            EL REPRESENTANTE LEGAL DEBE PRESENTAR AUTORIZACION SELLADA Y FIRMADA POR EL C.P.N.N.A.)</strong>
                        </p>
                        <p>APELLIDOS:________________ NOMBRE:________________ C.I._________:</p>
                        <p>TLF. HABITACION:_________ CELULAR:___________________________ </p>
                        <p>TLF. HABITACION:__________________ CELULAR:______________________</p>
                        <p>TLF. TRABAJO:___________________ EMAIL:_______________________</p>
                        <p>LUGAR DE TRABAJO:_________________ INGRESO MENSUAL:____________</p>
                        <p>PROFESION U OCUPACION_______________________________________ OTRO:_____________________________:</p>
                        <div style={{ display: "inline-block", border: "1px solid black", padding: "1px" }}>
                            <p>EL ESTUDIANTE PRACTICA ALGUNA ACTIVIDAD EXTRACURRICULAR SI_ NO_ CUAL_____________________:</p>
                            <p>LUGAR DONDE LA PRACTICA_____________________<span
                                style={{ display: "inline-block", border: "1px solid black", width: "15px", height: "15px", textAlign: "center", lineHeight: "12px" }}></span>
                                HORARIO:________________________________________</p>
                            <p>EL REQUIERE ALGUN TRATAMIENTO ESPECIAL: SI ___NO___ CUAL:__________________________________________  </p>
                            <p>ALERGICO A:_______________________________________________________</p>
                            <p>PROMOVIDO A AÑO: _________ PLANTEL DE PROCEDENCIA:_________________________________________________</p>
                        </div>

                        <p>REPRESENTANTE LEGAL:__________________________________C.I._____________________ FIRMA:_____________________</p>
                        <p>DOCENTE QUE REALIZA LA INSCRIPCION:_____________________________ C.I.___________________FIRMA:___________________</p>
                        <p>FECHA DE LA INSCRIPCION: _____________________________________ HORA: _________________</p>


                        <div className="avoid-page-break"></div>
                    </> :
                        <>
                            <pre>Apellidos:_________________________________________________ Nombres:_________________________________________________</pre>
                            <p>Lugar de Nacionalidad:V <span
                                style={{ display: "inline-block", border: "1px solid black", width: "15px", height: "15px", textAlign: "center", lineHeight: "12px" }}></span>E
                                <span
                                    style={{ display: "inline-block", border: "1px solid black", width: "15px", height: "15px", textAlign: "center", lineHeight: "12px" }}></span>
                                Cedula de Identidad:_________ Fecha de Nacimiento: ____________ Edad: _______
                            </p>

                            <p>País: ______________ Estado: _____________ Genero:_____ Estatura:____ Peso: _____ </p>
                            <br />
                            <p>
                                Con quien vive el estudiante: ___________________
                                En caso de otro especifique: _________________________ </p>
                            <p>
                                Dirección de Habitación: _______________________________________________________
                                ___________________________________________________________________________________
                            </p>
                            <h4>DATOS DE LOS PADRES</h4>

                            <p>PADRE: APELLIDOS:________________ NOMBRE:________________ C.I._________:</p>
                            <p>TLF. HABITACION:_________ CELULAR:___________________________ </p>
                            <p>TLF. TRABAJO:______________ DIRECCION:___________________________PROFESION U OCUPACION:___________________</p>
                            <p>LUGAR DE TRABAJO:______________________________ INGRESO MENSUAL:________________</p>
                            <p>MADRE: APELLIDOS:________________ NOMBRE:________________ C.I._________:</p>
                            <p>TLF. HABITACION:_________ CELULAR:___________________________ </p>
                            <p>TLF. TRABAJO:______________ DIRECCION:___________________________PROFESION U OCUPACION:___________________</p>
                            <p>LUGAR DE TRABAJO:______________________________ INGRESO MENSUAL:________________</p>
                            <p>EL REPRESENTANTE LEGAL DEL ESTUDIANTE SERA:____________________ <strong>(EN CASO DE QUE NO SEA NINGUNO DE LOS PADRES
                                EL REPRESENTANTE LEGAL DEBE PRESENTAR AUTORIZACION SELLADA Y FIRMADA POR EL C.P.N.N.A.)</strong>
                            </p>
                            <p>APELLIDOS:________________ NOMBRE:________________ C.I._________:</p>
                            <p>TLF. HABITACION:_________ CELULAR:___________________________ </p>
                            <p>TLF. HABITACION:__________________ CELULAR:______________________</p>
                            <p>TLF. TRABAJO:___________________ EMAIL:_______________________</p>
                            <p>LUGAR DE TRABAJO:_________________ INGRESO MENSUAL:____________</p>
                            <p>PROFESION U OCUPACION_______________________________________ OTRO:_____________________________:</p>
                            <div style={{ display: "inline-block", border: "1px solid black", padding: "1px" }}>
                                <p>EL ESTUDIANTE PRACTICA ALGUNA ACTIVIDAD EXTRACURRICULAR SI_ NO_ CUAL_____________________:</p>
                                <p>LUGAR DONDE LA PRACTICA_____________________<span
                                    style={{ display: "inline-block", border: "1px solid black", width: "15px", height: "15px", textAlign: "center", lineHeight: "12px" }}></span>
                                    HORARIO:________________________________________</p>
                                <p>EL REQUIERE ALGUN TRATAMIENTO ESPECIAL: SI ___NO___ CUAL:__________________________________________  </p>
                                <p>ALERGICO A:_______________________________________________________</p>
                                <p>PROMOVIDO A AÑO: _________ PLANTEL DE PROCEDENCIA:_________________________________________________</p>
                            </div>

                            <p>REPRESENTANTE LEGAL:__________________________________C.I._____________________ FIRMA:_____________________</p>
                            <p>DOCENTE QUE REALIZA LA INSCRIPCION:_____________________________ C.I.___________________FIRMA:___________________</p>
                            <p>FECHA DE LA INSCRIPCION: _____________________________________ HORA: _________________</p>
                        </>
                }
                <div className="avoid-page-break"></div>

            </div>
        </section >
    );
}
