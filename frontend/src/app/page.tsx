"use client";

import { ROLE_LIST } from "@/utils/roleList";
import {
  Button,
  Checkbox,
  Input,
  Select,
  SelectItem,
  Tooltip,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import DashboardLayout from "./dashboard/layout";
import { Field, Form, Formik } from "formik";
import { toast } from "sonner";
import { fetchDataWithoutBody } from "@/utils/fetchHandler";
import {
  entitySelect,
  etapaSelect,
  levelSelect,
  seccionSelect,
} from "@/utils/selectList";
import { searchInitVal, searchSchema } from "@/utils/schemas/SearchSchema";
import { MdIosShare, MdSearch } from "react-icons/md";
import { useEffect, useState } from "react";
import RepresentTable from "@/components/tables/RepresentTable";
import UserTable from "@/components/tables/UserTable";
import StudentTable from "@/components/tables/StudentTable";

export default function indexSearchPage() {
  const { data: session } = useSession();
  const [info, setInfo] = useState<any>();
  const [entity, setEntity] = useState("");

  const download = async (values: {
    entity: string;
    etapa: string;
    section: string;
    level: number;
    id: string;
  }) => {
    let params = `?entity=${values.entity}`;

    if (values.etapa) {
      params = params.concat(`&etapa=${values.etapa}&level=${values.level}`);
      if (values.section) {
        params = params.concat(`&section=${values.section}`);
      }
    }

    if (values.id) {
      params = `?entity=${values.entity}&id=${values.id}`;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tools/excel${params}`,
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

    a.download = `${
      values.entity.charAt(0).toUpperCase() + values.entity.slice(1)
    }${values.etapa ? values.etapa.replace(" ", "") : ""}${values.level ?? ""}${
      values.section ?? ""
    }${values.id ?? ""}.xlsx`;

    a.click();

    window.URL.revokeObjectURL(url);
  };

  const reqInfo = async (value: {
    entity: string;
    etapa: string;
    section: string;
    level: number;
    id: string;
  }) => {
    let url = `/${value.entity === "student" ? "ficha" : value.entity}`;

    if (value.etapa && value.level) {
      url += `?etapa=${value.etapa}&level=${value.level}`;
      if (value.section) {
        url += `&section=${value.section}`;
      }
    }

    if (value.id !== "") {
      url = `/${value.entity === "student" ? "ficha" : value.entity}/${
        value.id
      }`;
    }

    const req = await fetchDataWithoutBody(url, session?.user.token);

    if (req || (req && entity === "user" && req.role_id && req.role_id.name)) {
      if (!(req instanceof Array)) {
        setInfo([req]);
      } else {
        setInfo(req);
      }
      return "Busqueda finalizada.";
    }
  };

  useEffect(() => console.log(info), [info]);

  return (
    <DashboardLayout>
      <Formik
        initialValues={searchInitVal}
        validationSchema={searchSchema}
        onSubmit={async (values) => {
          setEntity(values.entity);
          toast.promise(reqInfo(values), {
            loading: "Procesando...",
            success: (data) => {
              return data;
            },
            error: (error: Error) => {
              return error.message;
            },
          });
        }}
      >
        {({ values, errors, touched, handleBlur, handleChange }) => (
          <Form className="w-3/4 flex justify-center items-center flex-col max-lg:w-full max-lg:p-0">
            <div className="flex flex-row max-md:flex-col max-md:justify-center items-center justify-between mb-3 w-full">
              <h1 className="text-2xl max-md:text-xl text-primary">
                Busqueda:
              </h1>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-row max-md:flex-col gap-3 w-full">
                {/* ENTITY SELECT */}

                <Select
                  items={
                    session?.user.role !== ROLE_LIST.ADMIN
                      ? entitySelect.slice(0, 2)
                      : entitySelect
                  }
                  name="entity"
                  label="Entidad:"
                  description="Seleccione una entidad."
                  color={errors.entity && touched.entity ? "danger" : "primary"}
                  errorMessage={
                    errors.entity && touched.entity && errors.entity
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isRequired
                >
                  {(entity: {
                    value: string | number;
                    description?: string;
                    label: string;
                  }) => (
                    <SelectItem
                      key={entity.value}
                      value={entity.value}
                      description={entity.description}
                    >
                      {entity.label}
                    </SelectItem>
                  )}
                </Select>

                {/* ETAPA SELECT */}

                <Select
                  items={etapaSelect}
                  label="Etapa:"
                  name="etapa"
                  description="Seleccione una etapa."
                  color={errors.etapa && touched.etapa ? "danger" : "primary"}
                  errorMessage={errors.etapa && touched.etapa && errors.etapa}
                  isRequired={values.entity === "student" && values.id === ""}
                  isDisabled={values.entity !== "student" || values.id !== ""}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  {(etapa: {
                    value: string | number;
                    description?: string;
                    label: string;
                  }) => (
                    <SelectItem
                      key={etapa.value}
                      value={etapa.value}
                      description={etapa.description}
                    >
                      {etapa.label}
                    </SelectItem>
                  )}
                </Select>

                {/* LEVEL SELECT */}

                <Select
                  items={
                    values.etapa === "EDUCACION PRIMARIA"
                      ? levelSelect
                      : values.etapa === "EDUCACION MEDIA"
                      ? levelSelect.slice(0, 5)
                      : levelSelect
                  }
                  label="Level:"
                  name="level"
                  description="Seleccione un nivel."
                  color={errors.level && touched.level ? "danger" : "primary"}
                  errorMessage={errors.level && touched.level && errors.level}
                  isRequired={values.etapa !== ""}
                  isDisabled={
                    values.entity !== "student" || values.etapa === ""
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  {(level: { value: string | number; label: string }) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  )}
                </Select>

                {/* SECCION SELECT */}

                <Select
                  items={seccionSelect}
                  label="Sección:"
                  name="section"
                  description="Seleccione una sección."
                  color={
                    errors.section && touched.section ? "danger" : "primary"
                  }
                  errorMessage={
                    errors.section && touched.section && errors.section
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isDisabled={values.entity !== "student" || values.level === 0}
                >
                  {(section: { value: string | number; label: string }) => (
                    <SelectItem key={section.value} value={section.value}>
                      {section.label}
                    </SelectItem>
                  )}
                </Select>
              </div>
              <Field
                title="Incluir registros eliminados."
                as={Checkbox}
                type="checkbox"
                color="primary"
                size="lg"
                name="deleted"
                onValueChange={handleChange}
                onBlur={handleBlur}
              >
                Eliminadas.
              </Field>

              <div className="flex flex-row gap-3 w-full items-center">
                <Field
                  name="id"
                  variant="bordered"
                  label="C.I o Correo Electronico:"
                  color={errors.id && touched.id ? "danger" : "primary"}
                  errorMessage={errors.id && touched.id && errors.id}
                  as={Input}
                  isRequired={values.entity === "represent"}
                />
                <Tooltip
                  content="Realizar la busqueda."
                  className="border border-primary-500 h-full p-0 m-0"
                >
                  <Button
                    isDisabled={values.entity === ""}
                    isIconOnly
                    color="primary"
                    variant="ghost"
                    className="w-1/5 min-h-full"
                    size="lg"
                    type="submit"
                  >
                    <MdSearch className="text-2xl" />
                  </Button>
                </Tooltip>
                <Tooltip
                  content="Exportar información a excel."
                  shadow="sm"
                  showArrow
                  className="border border-primary-500"
                >
                  <Button
                    isDisabled={!info}
                    isIconOnly
                    color="success"
                    variant="ghost"
                    className="w-1/5"
                    size="lg"
                    onClick={async () => await download(values)}
                  >
                    <MdIosShare className="text-2xl" />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      {info && (
        <div className="rounded-xl w-3/4 max-lg:w-full min-h-[40vh] my-5">
          {info && entity === "user" && info[0].role_id && (
            <UserTable info={info} />
          )}
          {info && entity === "represent" && info[0].relation && (
            <RepresentTable info={info} />
          )}
          {info && entity === "student" && info[0].age && (
            <StudentTable info={info} />
          )}
        </div>
      )}
    </DashboardLayout>
  );
}
