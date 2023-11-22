"use client";

import { Input, Button, Select, SelectItem, Tooltip } from "@nextui-org/react";
import { MdSearch } from "react-icons/md";
import { fetchData, fetchDataWithoutBody } from "@/utils/fetchHandler";
import { useState, useContext, useEffect } from "react";
import { initValStudent, studentSchema } from "@/utils/schemas/StudentSchema";
import { ctxDataRelation } from "./ProviderCtx";
import { dateHandler } from "@/utils/dateHandler";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { toast } from "sonner";

export default function StudentForm() {
  const { dataRelations, setDataRelations } = useContext(ctxDataRelation);
  const { data: session } = useSession();
  const [caseOther, setCaseOther] = useState(false);

  const router = useRouter();

  const [Loading, setLoading] = useState(false);

  const sendInfo = async (values: any) => {
    const res = await fetchData(
      '/student',
      "POST",
      values,
      session?.user.token
    );

    setDataRelations({ ...dataRelations, studentId: values.ciNumber });

    if (res) {
      return "Registro exitoso."
    }
  }

  const formik = useFormik({
    initialValues: initValStudent,
    validationSchema: studentSchema,
    onSubmit: async (values) => {
      setLoading(true);
      toast.promise(sendInfo(values), {
        loading: "Procesando...",
        success: (data) => {
          router.push('/register/health')
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

  const searchStudent = async () => {
    const data = await fetchDataWithoutBody(
      `/student/${formik.values.ciNumber}`,
      session?.user.token
    );
    if (data) {
      setDataRelations({ ...dataRelations, studentId: data.studentCiNumber });
      return "Registro existente. Redirigiendo...";
    }
  };

  useEffect(() => {
    const age = dateHandler(formik.values.bornDate);
    formik.setFieldValue("age", age);
  }, [formik.values.bornDate]);

  useEffect(() => {
    if (dataRelations.studentId !== '' && dataRelations.studentId !== undefined && dataRelations.studentId) {
      router.push('/register/health')
    }
  }, [dataRelations]);

  useEffect(() => {
    if ((formik.values.liveWith as string) === "OTRO" && (formik.values.liveWith as string) !== "") {
      setCaseOther(true);
    }
    if (formik.values.liveWith === 'MADRE' || formik.values.liveWith === 'PADRE') {
      setCaseOther(false);
    }

  }, [formik.values.liveWith])

  return (
    <form
      className="h-2/4 w-3/4 border border-gray-300 rounded-xl shadow-xl p-8"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex items-center justify-center mb-7 w-full">
        <h1 className="text-2xl font-medium">
          Estudiante <p className="text-primary-500 inline-flex">|</p> Registro
        </h1>
      </div>
      <div className="grid grid-cols-8 gap-3">
        <Input
          isRequired
          label="Cédula de Identidad:"
          name="ciNumber"
          description="Ingrese su Cédula de Identidad"
          variant="bordered"
          color={
            formik.errors.ciNumber && formik.touched.ciNumber
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.ciNumber &&
            formik.touched.ciNumber &&
            formik.errors.ciNumber
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-2"
          value={formik.values.ciNumber.toUpperCase()}
        />
        <Tooltip
          content="Buscar Estudiante"
          className="border border-primary-500"
        >
          <Button
            isDisabled={formik.values.ciNumber ? false : true}
            isIconOnly
            color="primary"
            variant="ghost"
            aria-label="Buscar entidad"
            className="w-3/4 h-3/4"
            onClick={() =>
              toast.promise(searchStudent, {
                loading: "Procesando...",
                success: (data) => {
                  return data;
                },
                error: (error: Error) => {
                  if (error.message === "Failed to fetch") {
                    return "Error en conexión.";
                  }
                  return error.message;
                },
              })
            }
          >
            <MdSearch className="text-2xl" />
          </Button>
        </Tooltip>

        <div className="col-span-2"></div>
        <Select
          isRequired
          label="Genero:"
          variant="bordered"
          name="sex"
          className="col-span-3"
          description={"Ingrese el genero del estudiante."}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={
            formik.errors.sex && formik.touched.sex && formik.errors.sex
          }
          color={formik.errors.sex && formik.touched.sex ? "danger" : "primary"}
        >
          <SelectItem key={"M"} value={"MASCULINO"}>
            Masculino
          </SelectItem>
          <SelectItem key={"F"} value={"FEMENINO"}>
            Femenino
          </SelectItem>
        </Select>

        <Input
          isRequired
          label="Nombres:"
          name="name"
          description="Ingrese sus Nombres"
          variant="bordered"
          color={
            formik.errors.name && formik.touched.name ? "danger" : "primary"
          }
          errorMessage={
            formik.errors.name && formik.touched.name && formik.errors.name
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-2"
          value={formik.values.name.toUpperCase()}
        />

        <Input
          isRequired
          label="Apellidos:"
          name="lastName"
          description="Ingrese sus Apellidos"
          variant="bordered"
          color={
            formik.errors.lastName && formik.touched.lastName
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.lastName &&
            formik.touched.lastName &&
            formik.errors.lastName
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-2"
          value={formik.values.lastName.toUpperCase()}
        />

        <div className="col-span-1"></div>

        <Select
          isRequired
          label="Lateralidad:"
          variant="bordered"
          name="Lateralidad"
          className="col-span-3"
          description={"Ingrese la  del estudiante."}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={
            formik.errors.Lateralidad &&
            formik.touched.Lateralidad &&
            formik.errors.Lateralidad
          }
          color={
            formik.errors.Lateralidad && formik.touched.Lateralidad
              ? "danger"
              : "primary"
          }
        >
          <SelectItem key={"Z"} value={"ZURDO"}>
            Zurdo
          </SelectItem>
          <SelectItem key={"D"} value={"DIESTRO"}>
            Diestro
          </SelectItem>
        </Select>

        <Input
          isRequired
          label="Correo electrónico:"
          type="email"
          name="email"
          description="Ingrese su correo electrónico"
          variant="bordered"
          color={
            formik.errors.email && formik.touched.email ? "danger" : "primary"
          }
          errorMessage={
            formik.errors.email && formik.touched.email && formik.errors.email
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-3"
        />
        <Input
          isRequired
          label="Número telefónico:"
          name="phoneNumber"
          description="Ingrese su número de teléfono"
          variant="bordered"
          color={
            formik.errors.phoneNumber && formik.touched.phoneNumber
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.phoneNumber &&
            formik.touched.phoneNumber &&
            formik.errors.phoneNumber
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-3"
        />
        <div className="col-span-1"></div>

        <Input
          label="Peso:"
          type="number"
          name="weight"
          description="Ingrese el peso del Estudiante."
          variant="bordered"
          color={
            formik.errors.weight && formik.touched.weight ? "danger" : "primary"
          }
          errorMessage={
            formik.errors.weight &&
            formik.touched.weight &&
            formik.errors.weight
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-3"
          value={`${formik.values.weight}`}
          endContent={<p className="text-gray-400 font-medium text-base">kg</p>}
        />
        <Input
          label="Estatura:"
          type="number"
          name="size"
          description="Ingrese el peso del Estudiante."
          variant="bordered"
          color={
            formik.errors.size && formik.touched.size ? "danger" : "primary"
          }
          errorMessage={
            formik.errors.size && formik.touched.size && formik.errors.size
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-2"
          value={`${formik.values.size}`}
          endContent={<p className="text-gray-400 font-medium text-base">m</p>}
        />

        <Select
          isRequired
          label="Vive con:"
          variant="bordered"
          name="liveWith"
          className="col-span-3"
          description="El estudiante vive con:"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={
            formik.errors.liveWith &&
            formik.touched.liveWith &&
            formik.errors.liveWith
          }
          color={
            formik.errors.liveWith && formik.touched.liveWith
              ? "danger"
              : "primary"
          }
        >
          <SelectItem key={"MADRE"} value={"MADRE"}>
            MADRE
          </SelectItem>
          <SelectItem key={"PADRE"} value={"PADRE"}>
            PADRE
          </SelectItem>
          <SelectItem key={"OTRO"} value={"OTRO"}>
            OTRO
          </SelectItem>
        </Select>

        {
          caseOther && <Input
            isRequired
            label="Vive con:"
            name="liveWith"
            description="El estudiante vive con:"
            variant="bordered"
            color={
              formik.errors.liveWith && formik.touched.liveWith
                ? "danger"
                : "primary"
            }
            errorMessage={
              formik.errors.liveWith &&
              formik.touched.liveWith &&
              formik.errors.liveWith
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="col-span-2"
            value={formik.values.liveWith.toUpperCase()}
          />

        }

        <Input
          isRequired
          label="Institución de procedencia:"
          name="instPro"
          description="Ingrese sus Nombres"
          variant="bordered"
          color={
            formik.errors.instPro && formik.touched.instPro
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.instPro &&
            formik.touched.instPro &&
            formik.errors.instPro
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-8"
          value={formik.values.instPro.toUpperCase()}
        />



        <h1 className="col-span-8 font-semibold text-lg">
          Datos de Nacimiento:
        </h1>
        <Input
          isRequired
          type="date"
          variant="bordered"
          name="bornDate"
          label="Fecha de nacimiento"
          description="Ingrese la fecha de nacimiento"
          className="col-span-3"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          color={
            formik.errors.bornDate && formik.touched.bornDate
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.bornDate &&
            formik.touched.bornDate &&
            formik.errors.bornDate
          }
          value={`${formik.values.bornDate}`}
        />
        <Input
          isRequired
          label="Edad:"
          type="number"
          name="age"
          isReadOnly
          description="Ingrese la edad del Estudiante."
          variant="bordered"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          color={
            formik.errors.age && formik.touched.bornDate ? "danger" : "primary"
          }
          errorMessage={
            formik.errors.age && formik.touched.bornDate && formik.errors.age
          }
          className="col-span-2"
          value={`${formik.values.age}`}
          endContent={
            <p className="text-gray-400 font-medium text-base">años</p>
          }
        />
        <div className="col-span-3"></div>
        <Input
          isRequired
          label="País:"
          name="bornPais"
          description="Ingrese País donde nació"
          variant="bordered"
          color={
            formik.errors.bornPais && formik.touched.bornPais
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.bornPais &&
            formik.touched.bornPais &&
            formik.errors.bornPais
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-4"
          value={formik.values.bornPais}
        />
        <Input
          isRequired
          label="Estado:"
          name="bornState"
          description="Ingrese Estado donde nació"
          variant="bordered"
          color={
            formik.errors.bornState && formik.touched.bornState
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.bornState &&
            formik.touched.bornState &&
            formik.errors.bornState
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-4"
          value={formik.values.bornState}
        />
        <h1 className="col-span-8 font-semibold text-lg">
          Datos donde reside:
        </h1>
        <Input
          isRequired
          label="Parroquia:"
          name="homeParroquia"
          description="Ingrese su Parroquia"
          variant="bordered"
          color={
            formik.errors.homeParroquia && formik.touched.homeParroquia
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.homeParroquia &&
            formik.touched.homeParroquia &&
            formik.errors.homeParroquia
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-4"
          value={formik.values.homeParroquia}
        />
        <Input
          isRequired
          label="Municipio:"
          name="homeMunicipio"
          description="Ingrese su Municipio"
          variant="bordered"
          color={
            formik.errors.homeMunicipio && formik.touched.homeMunicipio
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.homeMunicipio &&
            formik.touched.homeMunicipio &&
            formik.errors.homeParroquia
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-4"
          value={formik.values.homeMunicipio}
        />
        <Input
          isRequired
          label="Dirección de habitación:"
          name="homeDir"
          description="Ingrese su Dirección"
          variant="bordered"
          color={
            formik.errors.homeDir && formik.touched.homeDir
              ? "danger"
              : "primary"
          }
          errorMessage={
            formik.errors.homeDir &&
            formik.touched.homeDir &&
            formik.errors.homeDir
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-8"
          value={formik.values.homeDir}
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
