import "@/components/planilla/planilla.module.css";
import {
  FichaI,
  RepresentI,
  HealthInfoI,
  StudentI,
  RelationTableI,
} from "@/types/register.interfaces";

// Componente Header
function Header() {
  return (
    <div className="header-container">
      <img
        src="/img/Captura.JPG"
        alt="Imagen Izquierda"
        className="header-image"
      />
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
      <p className="mb-[10px] text-xl font-bold">PLANILLA DE INSCRIPCION</p>
      <p className="mb-[10px] text-base">
        AÑO ESCOLAR {new Date().getFullYear()}-{new Date().getFullYear() + 1}
      </p>
      <p className="mb-[10px] text-lg">
        GRADO {data ? <u>{data.level}</u> : "____"} SECCION{" "}
        {data ? <u>{data.section}</u> : "____"} TURNO{" "}
        {data ? (
          <u>
            {data.turno === "T" ? "TARDE" : data.turno === "D" ? "MAÑANA" : ""}
          </u>
        ) : (
          "___"
        )}
      </p>
    </div>
  );
}

function StudentData({
  dataStudent,
  dataHealth,
}: {
  dataStudent: StudentI | undefined;
  dataHealth: HealthInfoI | undefined;
}) {
  return (
    <p className="w-full">
      {dataHealth && dataStudent ? (
        <p>
          Apellidos: <u>{dataStudent.person_id.lastname}</u> Nombres:
          <u>{dataStudent.person_id.name}</u> <br />
          Lugar de Nacionalidad: V{" "}
          <p
            style={{
              display: "inline-block",
              border: "1px solid black",
              width: "15px",
              height: "15px",
              verticalAlign: "sub",
            }}
          >
            {dataStudent.person_id.ci_number.charAt(0) === "V" && "X"}
          </p>{" "}
          E{" "}
          <p
            style={{
              display: "inline-block",
              border: "1px solid black",
              width: "15px",
              height: "15px",
              verticalAlign: "sub",
            }}
          >
            {dataStudent.person_id.ci_number.charAt(0) === "E" && "X"}
          </p>
          Cedula de Identidad:{dataStudent.person_id.ci_number} Fecha de
          Nacimiento: {dataStudent.born_date.split("T")[0]} Edad:{" "}
          {dataStudent.age + " años."}
          <p>
            País: {dataStudent.born_pais} Estado: {dataStudent.born_state}{" "}
            Genero:{dataStudent.sex} Estatura:{dataStudent.size} Peso:{" "}
            {dataStudent.weight}
          </p>
          <br />
          <>
            Con quien vive el estudiante:{" "}
            {dataHealth.live_with === "MADRE"
              ? "MADRE"
              : dataHealth.live_with === "PADRE"
              ? "PADRE"
              : "OTRO"}{" "}
            En caso de otro especifique:{" "}
            {dataHealth.live_with === "OTRO"
              ? dataHealth.live_with
              : "___________"}{" "}
          </>
          <p>
            Dirección de Habitación:{" "}
            {dataStudent.person_id.home_parroquia +
              " " +
              dataStudent.person_id.home_parroquia +
              " " +
              dataStudent.person_id.home_dir}
          </p>
        </p>
      ) : (
        <p className="w-full text-justify">
          Apellidos:______________________________________
          Nombres:____________________________________ <br />
          Lugar de Nacionalidad: V{" "}
          <span
            style={{
              display: "inline-flex",
              border: "1px solid black",
              width: "15px",
              height: "15px",
              verticalAlign: "bottom",
            }}
          ></span>{" "}
          E{" "}
          <span
            style={{
              display: "inline-flex",
              border: "1px solid black",
              width: "15px",
              height: "15px",
              verticalAlign: "bottom",
            }}
          ></span>
          Cedula de Identidad:________________ Fecha de Nacimiento: ____________
          Edad: _______
          <p>
            País: ______________ Estado: _____________ Genero:_____
            Estatura:____ Peso: _____{" "}
          </p>
          <br />
          <p>
            Con quien vive el estudiante: ___________________ En caso de otro
            especifique: _________________________{" "}
          </p>
          <p>
            Dirección de Habitación:
            _______________________________________________________
          </p>
          <hr className="border-[1px] border-black mt-4" />
        </p>
      )}
    </p>
  );
}

function RepresentData({
  data,
  prefix,
}: {
  data: RepresentI | undefined | null;
  prefix: string;
}) {
  return (
    <p className="w-full">
      {data ? (
        <>
          <p>
            <b>{prefix}</b>: APELLIDOS: <u>{data.person_id.lastname}</u> NOMBRE:{" "}
            <u>{data.person_id.name}</u> C.I.:
            <u>{data.person_id.ci_number}</u>
          </p>
          <p>
            TLF. HABITACION:<u>{data.tlfn_home}</u> CELULAR:{" "}
            <u>{data.person_id.phone_number}</u>{" "}
          </p>
          <p>
            TLF. TRABAJO: <u>{data.work_phone_number}</u> DIRECCION:
            <u>
              {data.person_id.home_municipio +
                " " +
                data.person_id.home_parroquia +
                " " +
                data.person_id.home_dir}
            </u>{" "}
            PROFESION U OCUPACION:<u>{data.profession}</u>
          </p>
          <p>
            LUGAR DE TRABAJO:<u>{data.work_place}</u> INGRESO MENSUAL:
            <u>{data.income_month}</u>
          </p>
        </>
      ) : (
        <>
          <p>
            <b>{prefix}</b>: APELLIDOS: ________________ NOMBRE:
            ________________ C.I._________:
          </p>
          <p>TLF. HABITACION:_________ CELULAR:___________________________ </p>
          <p>
            TLF. TRABAJO:______________
            DIRECCION:___________________________PROFESION U
            OCUPACION:___________________
          </p>
          <p>
            LUGAR DE TRABAJO:______________________________ INGRESO
            MENSUAL:________________
          </p>
        </>
      )}
    </p>
  );
}

// Componente ParentData
function ParentData({ data }: { data: RepresentI | undefined }) {
  return (
    <div className="w-full">
      {data ? (
        <>
          <p>
            EL REPRESENTANTE LEGAL DEL ESTUDIANTE SERA:
            <u>{data.person_id.ci_number}</u> (
            <strong>
              EN CASO DE QUE NO SEA NINGUNO DE LOS PADRES EL REPRESENTANTE LEGAL
              DEBE PRESENTAR AUTORIZACION SELLADA Y FIRMADA POR EL C.P.N.N.A.
            </strong>
            )
          </p>
          <p>
            APELLIDOS:<u>{data.person_id.lastname}</u> NOMBRE:
            <u>{data.person_id.name}</u> C.I.: <u>{data.person_id.ci_number}</u>
          </p>
          <p>
            TLF. HABITACION:<u>{data.tlfn_home}</u> CELULAR:{" "}
            <u>{data.person_id.phone_number}</u>
          </p>
          <p>
            TLF. TRABAJO: <u>{data.work_phone_number}</u> EMAIL:{" "}
            <u>{data.person_id.email}</u>
          </p>
          <p>
            LUGAR DE TRABAJO: <u>{data.work_place}</u> INGRESO MENSUAL:{" "}
            <u>{data.income_month}</u>
          </p>
          <p>
            PROFESION U OCUPACION: <u>{data.profession}</u>{" "}
            OTRO:_____________________________:
          </p>
        </>
      ) : (
        <>
          <p>
            EL REPRESENTANTE LEGAL DEL ESTUDIANTE SERA:____________________ (
            <strong>
              EN CASO DE QUE NO SEA NINGUNO DE LOS PADRES EL REPRESENTANTE LEGAL
              DEBE PRESENTAR AUTORIZACION SELLADA Y FIRMADA POR EL C.P.N.N.A.
            </strong>
            )
          </p>
          <p>
            APELLIDOS:________________ NOMBRE:________________ C.I._________:
          </p>
          <p>TLF. HABITACION:_________ CELULAR:___________________________ </p>
          <p>
            TLF. HABITACION:__________________ CELULAR:______________________
          </p>
          <p>TLF. TRABAJO:___________________ EMAIL:_______________________</p>
          <p>LUGAR DE TRABAJO:_________________ INGRESO MENSUAL:____________</p>
          <p>
            PROFESION U OCUPACION_______________________________________
            OTRO:_____________________________:
          </p>
        </>
      )}
    </div>
  );
}

function HealthInfo({
  dataHealth,
  dataAcademic,
}: {
  dataHealth: HealthInfoI | undefined;
  dataAcademic: FichaI | undefined;
}) {
  return (
    <div
      style={{
        display: "inline-block",
        border: "1px solid black",
        padding: "4px",
        width: "100%",
        textAlign: "justify",
        paddingBottom: "6px",
      }}
    >
      {dataHealth && dataAcademic ? (
        <>
          <p>
            EL ESTUDIANTE PRACTICA ALGUNA ACTIVIDAD EXTRACURRICULAR SI
            <u>
              {dataHealth.prefer_act === "" ||
              dataHealth.prefer_act === "NO" ||
              dataHealth.prefer_act === undefined ||
              dataHealth.prefer_act === null
                ? "___"
                : "X"}
            </u>{" "}
            NO
            <u>
              {dataHealth.prefer_act === "" ||
              dataHealth.prefer_act === "NO" ||
              dataHealth.prefer_act === undefined ||
              dataHealth.prefer_act === null
                ? "X"
                : "___"}
            </u>{" "}
            &nbsp;CUAL{" "}
            {dataHealth.prefer_act ? (
              <u>{dataHealth.prefer_act}</u>
            ) : (
              "_____________________"
            )}
            :
          </p>
          <p>
            LUGAR DONDE LA PRACTICA
            {dataHealth.site_act ? (
              <u>{dataHealth.site_act}</u>
            ) : (
              "_____________________"
            )}
            HORARIO:
            {dataHealth.recre_time ? (
              <u>{dataHealth.recre_time}</u>
            ) : (
              "________________________________________"
            )}
          </p>
          <p>
            EL REQUIERE ALGUN TRATAMIENTO ESPECIAL: SI{" "}
            {dataHealth.trata_esp ? <u>X</u> : "___"} NO{" "}
            {dataHealth.trata_esp ? "___" : <u>x</u>} CUAL:{" "}
            {dataHealth.trata_esp ? (
              <u>{dataHealth.trata_esp}</u>
            ) : (
              "__________________________________________"
            )}
          </p>
          <p>
            ALERGICO A:{" "}
            {dataHealth.type_aler ? (
              <u>{dataHealth.type_aler}</u>
            ) : (
              "_______________________________________________________"
            )}
          </p>
          <p>
            PROMOVIDO A AÑO:{" "}
            {dataAcademic.level ? <u>{dataAcademic.level}</u> : "_________"}{" "}
            PLANTEL DE PROCEDENCIA:
            {dataAcademic.proce_plant ? (
              <u>{dataAcademic.proce_plant}</u>
            ) : (
              "_________________________________________________"
            )}
          </p>
        </>
      ) : (
        <>
          <p>
            EL ESTUDIANTE PRACTICA ALGUNA ACTIVIDAD EXTRACURRICULAR SI_ NO_
            CUAL_____________________:
          </p>
          <p>
            LUGAR DONDE LA PRACTICA_____________________
            HORARIO:________________________________________
          </p>
          <p>
            EL REQUIERE ALGUN TRATAMIENTO ESPECIAL: SI ___NO___
            CUAL:__________________________________________{" "}
          </p>
          <p>
            ALERGICO A:_______________________________________________________
          </p>
          <p>
            PROMOVIDO A AÑO: _________ PLANTEL DE
            PROCEDENCIA:_________________________________________________
          </p>
        </>
      )}
    </div>
  );
}

export default function PlanillaMedia({
  data,
}: {
  data: RelationTableI | undefined;
}) {
  return (
    <section className="w-full planilla1 flex flex-col p-9 gap-2">
      <Header />
      <div className="title-container">
        <TitleBox title="ESTUDIANTE" />
        <PreTitle data={data?.ficha_id} />
        <TitleBox title="REPRESENTANTE" />
      </div>

      <h3 style={{ textAlign: "left", fontWeight: "bold" }}>
        DATOS DEL ESTUDIANTE:
      </h3>

      <StudentData
        dataStudent={data?.student_id}
        dataHealth={data?.health_info_id}
      />

      <h4 className="text-md">
        <b>DATOS DE LOS PADRES:</b>
      </h4>

      <RepresentData data={data?.father_id} prefix="PADRE" />
      <RepresentData data={data?.mother_id} prefix="MADRE" />

      {data?.father_id !== data?.represent_id &&
      data?.mother_id !== data?.represent_id ? (
        <ParentData data={data?.represent_id} />
      ) : (
        <ParentData data={undefined} />
      )}

      <HealthInfo
        dataAcademic={data?.ficha_id}
        dataHealth={data?.health_info_id}
      />

      <p>
        REPRESENTANTE
        LEGAL:__________________________________C.I._____________________
        FIRMA:_____________________
      </p>
      <p>
        DOCENTE QUE REALIZA LA INSCRIPCION:_____________________________
        C.I.___________________FIRMA:___________________
      </p>
      <p>
        FECHA DE LA INSCRIPCION:{" "}
        {data
          ? new Date().toLocaleDateString()
          : "_____________________________________"}{" "}
        HORA: {data ? new Date().toLocaleTimeString() : "_________________"}
      </p>

      <div className="avoid-page-break"></div>
    </section>
  );
}
