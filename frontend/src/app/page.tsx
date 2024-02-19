"use client";

import { ROLE_LIST } from "@/utils/roleList";
import {
  Button,
  Checkbox,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Table,
  Tooltip,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
import { useState } from "react";
import UserCards from "@/components/UserCards";
import RepresentTable from "@/components/tables/RepresentTable";
import UserTable from "@/components/tables/UserTable";
import StudentTable from "@/components/tables/StudentTable";

export default function indexSearchPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [info, setInfo] = useState<any>();
  const [entity, setEntity] = useState("");

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
      url = `/${value.entity}/${value.id}`;
    }

    if (value.entity === "represent") url += "?tofielter=true";

    const req = await fetchDataWithoutBody(url, session?.user.token);

    if (req) {
      if (!(req instanceof Array)) {
        setInfo([req]);
      } else {
        setInfo(req);
      }
      return "Busqueda finalizada.";
    }
  };

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
              router.push("/");
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
                    values.etapa === "EP"
                      ? levelSelect
                      : values.etapa === "EM"
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
              </div>
            </div>
          </Form>
        )}
      </Formik>

      {info && entity === "user" && <UserTable info={info} />}
      {info && entity === "represent" && <RepresentTable info={info} />}
      {info && entity === "student" && <StudentTable info={info} />}
      {!info && (
        <Skeleton className="rounded-xl w-3/4 max-lg:w-full min-h-[40vh] my-5 border border-gray-300">
          <div className="w-3/4 max-lg:w-full mt-5 min-h-[40vh] rounded-xl shadow-lg bg-default-300"></div>
        </Skeleton>
      )}

      <div className="w-3/4 flex justify-between items-center flex-row content-end mt-4">
        <Tooltip
          content="Exportar información a excel."
          shadow="sm"
          showArrow
          className="border border-primary-500"
        >
          <Button
            isDisabled={!info}
            isIconOnly
            color="primary"
            variant="ghost"
            className="w-1/5"
            size="lg"
            type="submit"
          >
            <MdIosShare className="text-2xl" />
          </Button>
        </Tooltip>
      </div>
    </DashboardLayout>
  );
}
