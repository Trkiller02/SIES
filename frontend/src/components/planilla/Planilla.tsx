export default function PlanillaMedia() {
  return (
    <section>
      <style>
        {` @page {
          size: letter;
          margin: 20px;
        }

        body {
          font-family: Arial, sans-serif;
          font-size: 12px;
        }

        h2,
        h3 {
          text-align: center;
        }
        .header_container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .header_image {
          width: 140px;
          height: auto;
        }
        .header_image2 {
          width: 140px;
          height: 90px;
        }

        .title_container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .title_box {
          border: 1px solid black;
          padding: 20px;
          width: 100px;
          height: 100px;
          text-align: center;
          font-size: 70%;
        }
        .pre_title {
          text-align: center;
          margin-bottom: 10px;
        }

        table {
          border-collapse: collapse;
          width: 100%;
          margin-top: 10px;
        }

        th,
        td {
          border: 1px solid black;
          padding: 2px;
          text-align: left;
        }

        th {
          background-color: #ffffff;
        }
        .th_td2 {
          border: 1px solid black;
          padding: 15px;
          text-align: left;
        }
      `}
      </style>
      <div className="planilla1 p-9">
        <div className="header_container">
          <img
            src="img/image2.jpg"
            alt="Imagen Izquierda"
            className="header_image"
          />
          <img
            src="img/image1.png"
            alt="Imagen Derecha"
            className="header_image2"
          />
        </div>
        <div className="title_container">
          <div className="title_box">
            <p>FOTO DEL ESTUDIANTE</p>
          </div>
          <div className="pre_title">
            <b>
              U.E.P. &ldquo;Espíritu Santo&rdquo;
              <br />
              Código de Plantel
            </b>
            <br />
            <b>PDO2941406</b>
          </div>
          <div className="title_box">
            <p>FOTO DEL REPRESENTANTE</p>
          </div>
        </div>
        <h2 style={{ marginBottom: 10 + "px" }}>FICHAS DE INSCRIPCION</h2>
        <h3 style={{ marginBottom: 10 + "px" }}>NIVEL MEDIA GENERAL</h3>
        <h3 style={{ textAlign: "left" }}>DATOS DEL ESTUDIANTE:</h3>
        <div>
          <p>
            Nombres y Apellidos:
            _________________________________________________C.E/C.I.:
            ____________________ <br /> Lugar de Nac.: _______________________
          </p>
          <p>
            {" "}
            Estado: _____________ Municipio: ____________________ Parroquia:
            _________________{" "}
          </p>
          <br />
          País: ______________ Fecha de Nacimiento: _____/________/________
          Edad: _______ Sexo: M _______ F _______ <br />
          <p>
            {" "}
            Peso: ________ Talla: _______ Lateralidad: ___________________
            Institución de procedencia: _________________________{" "}
          </p>
          <p>
            Dirección de Habitación:
            _______________________________________________________
          </p>
          Parroquia: __________________ Municipio: ____________________Correo
          Gmail: _________________________
        </div>
        <h3 style={{ marginTop: 20 + "px" }}>
          DATOS DEL PADRE, MADRE Y/ O REPRESENTANTE LEGAL
        </h3>
        <table>
          <thead>
            <tr>
              <th></th>
              <th style={{ width: 100 + "px", textAlign: "center" }}>PADRE</th>
              <th style={{ width: 100 + "px", textAlign: "center" }}>MADRE</th>
              <th style={{ width: 100 + "px", textAlign: "center" }}>
                REPRESENTANTE LEGAL
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th style={{ width: 63 + "px" }}>Nombres y Apellidos</th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>C.I.N°</th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Estado Civil</th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Direccion de Habitacion</th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Teléfono</th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Correo</th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Grado de Instrucción</th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Profesión</th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Ocupación</th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Lugar de Trabajo</th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Teléfono y dirección del trabajo</th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Ingresos Mensuales</th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Fuentes de ingreso</th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <b>DESARROLLO EVOLUTIVO DEL ESTUDIANTE:</b>
        <p>
          El Estudiante presenta algún tipo de alergia: SI ____ NO______
          Especifique: __________________________
        </p>
        <p>
          El Estudiante ha sido sometido a algunas operaciones SI___ NO ____
          Especifique: __________________________{" "}
        </p>
        <br />
        <p>
          Enfermedades que ha padecido:
          ____________________________________________________________________
        </p>{" "}
        <br />
        <h3 style={{ textAlign: "center" }}>
          “DISPUESTOS A OFRECERLES UN SERVICIO EDUCATIVO DE CALIDAD! SABIDURIA,
          CIENCIA Y CULTURA”
        </h3>
        <br />
      </div>
      <div className="planilla2 p-9">
        <div className="header_container">
          <img
            src="img/image2.jpg"
            alt="Imagen Izquierda"
            className="header_image"
          />
          <div className="pre_title">
            <b>
              U.E.P. &ldquo;Espíritu Santo&rdquo;
              <br />
              Código de Plantel P D O2941406
            </b>
          </div>
          <img
            src="img/image1.png"
            alt="Imagen Derecha"
            className="header_image2"
          />
        </div>
        <p>
          {" "}
          El Estudiante presenta alguna Condición de salud que requiere atención
          médica especial (visual, auditiva, motora, o
        </p>
        <p>
          {" "}
          de aprendizaje). Especifique:
          ________________________________________________________
        </p>
        <p>
          {" "}
          Posee atención médica ________________________________________________
          Tipo de sangre: _____
        </p>
        <p>
          El Estudiante ha sido atendido(a) por algún servicio médico
          Especialista SI_____ NO_____ Especifique:
          <br />
          _______________________ Posee informe médico SI ___ NO _______
          Especifique _________________
        </p>
        <p>
          El Estudiante vive con: Padre: _____Madre: ______ Ambos: _______Otros
          (especifique): <br /> _________________________
        </p>
        <p>
          Tiene hermanos en el plantel: ______ Grado o año que estudia:
          __________ Edades de los hermanos_____________ <br />
          prefiere compañía de adultos o niños______________ ¿En qué Grupo de
          Creación le gustaría participar?_________ <br />
          _________________________Sus actividades
          Preferidas_________________________________________Horas <br />
        </p>
        <p>
          {" "}
          Recreativas: ___________ Medio de transporte para llegar a la
          institución: Caminando _____ Vehículo personal ______{" "}
        </p>{" "}
        <p> Transporte privado: _____ otros____</p>
        <p>
          Responsable de orientar al estudiante en sus actividades escolares:
          ________________________________________________
        </p>
        <b>EN CASO DE EMERGENCIA ACUDIR A UNA TERCERA PERSONA:</b>
        <p>
          Apellidos y
          Nombres______________________________________________________________________________{" "}
          <br />
          C.I________________________ Dirección:
          ___________________________________________________________ <br />{" "}
          Teléfono: ________________________________ Parentesco:
          ____________________________________________
        </p>
        <h3 style={{ marginTop: 20 + "px" }}>DATOS DE INSCRIPCIÓN</h3>
        <table>
          <thead>
            <tr>
              <th>AÑO</th>
              <th>SECCIÓN</th>
              <th style={{ textAlign: "center" }}>PLANTEL DE PROCEDENCIA</th>
              <th style={{ width: 180 + "px", textAlign: "center" }}>
                AÑO ESCOLAR
              </th>
              <th style={{ width: 210 + "px", textAlign: "center" }}>
                FECHA DE INSCRIPCIÓN
              </th>
              <th style={{ textAlign: "center" }}>
                PERSONAL RESPONSABLE DE LA INSCRIPCIÓN
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="th_td2"></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="th_td2"></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="th_td2"></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="th_td2"></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="th_td2"></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="th_td2"></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="th_td2"></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <p>
          Observación:____________________________________________________________________________________
        </p>
        <b>
          {" "}
          Nombre y Apellido:_______________
          <span style={{ marginRight: 80 + "px" }}></span>
        </b>
        <b> Nombre y Apellido del docente:_______________________</b>
        <br />
        <b>
          C.I:_______________<span style={{ marginRight: 180 + "px" }}></span>
          C.I:___________{" "}
        </b>{" "}
        <br />
        <b>
          {" "}
          Firma del Represente:___________________
          <span
            style={{ marginRight: 40 + "px" }}
          ></span>Firma:________________{" "}
        </b>{" "}
        <br />
        <h3 style={{ textAlign: "center" }}>
          “DISPUESTOS A OFRECERLES UN SERVICIO EDUCATIVO DE CALIDAD! SABIDURIA,
          CIENCIA Y CULTURA”
        </h3>
      </div>
    </section>
  );
}
