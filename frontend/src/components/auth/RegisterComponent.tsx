"use client";

// hooks
import { useEffect, useState } from "react";

// utilidades
import {
  RegisterSchema,
  RegisterSchemaUpdate,
  RegisterValues,
} from "@/utils/schemas/AuthSchema";
import { fetchData, fetchDataWithoutBody } from "@/utils/fetchHandler";
import { toast } from "sonner";

// componentes
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { Field, Form, Formik } from "formik";

// MATERIAL DESIGN ICONS GOOGLE APACHE LICENSE 2.0
import {
  MdAlternateEmail,
  MdFeaturedPlayList,
  MdOutlineRemoveRedEye,
  MdRemoveRedEye,
} from "react-icons/md";
import { RoleI, UserI } from "@/types/register.interfaces";
import { useSession } from "next-auth/react";
import { roleSelect } from "@/utils/selectList";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";

export default function RegisterComponent({
  edit,
  id,
}: {
  edit?: boolean;
  id?: string;
}) {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [info, setInfo] = useState<UserI>(RegisterValues);
  const [qrCode, setQrCode] = useState("");
  const [isVisible, setVisible] = useState(false);
  const [isVisibleToken, setVisibleToken] = useState(false);
  const router = useRouter();

  const onImageCownload = () => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg!);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "QRCode";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  const sendInfoUpdate = async (values: UserI) => {
    const res = await fetchData(
      `/user/${id}`,
      "PATCH",
      {
        name: values.name,
        lastname: values.lastname,
        ci_number: values.ci_number,
        email: values.email,
        password: values.password,
        role_id: parseInt(values.role_id.toString()),
        restore_token: values.restore_token,
      },
      session?.user.token
    );

    if (res) {
      if (res.restore_token) {
        setQrCode(res.restore_token);
        onOpen();
      }
      return "Usuario actualizado con exito.";
    }
  };

  const deleteEntity = async () => {
    const res = await fetchDataWithoutBody(
      `/user/${id}`,
      session?.user.token,
      "DELETE"
    );

    if (res) {
      return "Usuario eliminado con exito.";
    }
  };

  const sendInfo = async (values: UserI) => {
    const res = await fetchData(
      `/auth/register`,
      "POST",
      {
        name: values.name,
        lastname: values.lastname,
        ci_number: values.ci_number,
        email: values.email,
        password: values.password,
        role_id: parseInt(values.role_id.toString()),
      },
      session?.user.token
    );

    if (res) {
      if (res.restore_token) {
        setQrCode(res.restore_token);
        onOpen();
      }

      return "Usuario registrado con exito.";
    }
  };

  const searchUser = async (values: string) => {
    const data: UserI = await fetchDataWithoutBody(
      `/user/${values}`,
      session?.user.token
    );

    return data;
  };

  const toggleVisibility = () => setVisible(!isVisible);
  const toggleVisibilityToken = () => setVisibleToken(!isVisibleToken);

  if (edit) {
    useEffect(() => {
      toast.promise(searchUser(id!), {
        loading: "Cargando...",
        success: (data) => {
          setInfo({
            ...data,
            role_id: (data.role_id as RoleI).id!,
          });

          return "Carga completa.";
        },
        error: (error: Error) => {
          return error.message;
        },
      });
    }, []);
  }

  return (
    <>
      <Formik
        initialValues={info}
        enableReinitialize
        validationSchema={edit ? RegisterSchemaUpdate : RegisterSchema}
        onSubmit={async (values) => {
          toast.promise(edit ? sendInfoUpdate(values) : sendInfo(values), {
            loading: "Procesando...",
            success: (data) => {
              return data;
            },
            error: (error: Error) => {
              return error.message === "Failed to fetch"
                ? "Error en conexion"
                : error.message;
            },
          });
        }}
      >
        {({ errors, touched, values, handleBlur, handleChange }) => (
          <Form className="grid place-items-center w-2/3 border border-gray-300 rounded-xl px-7 py-8 shadow-xl">
            <div className="pb-6">
              <h1 className="text-2xl">
                Usuario <span className="text-primary">|</span> SINSES
              </h1>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <div className="w-full flex flex-row justify-evenly gap-3">
                <Field
                  label="Nombre:"
                  name="name"
                  description="Ingrese su nombre"
                  variant="bordered"
                  color={errors.name && touched.name ? "danger" : "primary"}
                  errorMessage={errors.name && touched.name && errors.name}
                  as={Input}
                />
                <Field
                  label="Apellido:"
                  name="lastname"
                  description="Ingrese su nombre"
                  variant="bordered"
                  color={
                    errors.lastname && touched.lastname ? "danger" : "primary"
                  }
                  errorMessage={
                    errors.lastname && touched.lastname && errors.lastname
                  }
                  as={Input}
                />
              </div>
              <div className="w-full flex flex-row justify-evenly gap-3">
                <Field
                  endContent={
                    <MdFeaturedPlayList className="text-2xl self-center" />
                  }
                  label="Cedula de identidad:"
                  type="text"
                  color={
                    errors.ci_number && touched.ci_number ? "danger" : "primary"
                  }
                  name="ci_number"
                  description="Ingrese su cedula de identidad"
                  variant="bordered"
                  errorMessage={
                    errors.ci_number && touched.ci_number && errors.ci_number
                  }
                  as={Input}
                />
                <Field
                  endContent={<MdAlternateEmail className="text-2xl" />}
                  label="Correo electronico:"
                  type="email"
                  name="email"
                  description="Ingrese su correo electronico"
                  variant="bordered"
                  color={errors.email && touched.email ? "danger" : "primary"}
                  errorMessage={errors.email && touched.email && errors.email}
                  as={Input}
                />
              </div>

              <div className="w-full flex flex-row justify-evenly gap-3">
                <Select
                  items={roleSelect}
                  name="role_id"
                  label="Rol:"
                  className="col-span-3"
                  description={"Ingrese el rol."}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  selectedKeys={[values.role_id.toString()]}
                  errorMessage={
                    errors.role_id && touched.role_id && errors.role_id
                  }
                  color={
                    errors.role_id && touched.role_id ? "danger" : "primary"
                  }
                >
                  {(item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  )}
                </Select>
                {edit && (
                  <Field
                    label="Clave de restauración:"
                    type={isVisibleToken ? "text" : "password"}
                    name="restore_token"
                    description="Ingrese una clave de restauración."
                    variant="bordered"
                    color={
                      errors.restore_token && touched.restore_token
                        ? "danger"
                        : "primary"
                    }
                    errorMessage={
                      errors.restore_token &&
                      touched.restore_token &&
                      errors.restore_token
                    }
                    endContent={
                      <button
                        onClick={() => toggleVisibilityToken()}
                        className="focus:outline-none"
                        type="button"
                      >
                        {isVisibleToken ? (
                          <MdOutlineRemoveRedEye className="text-2xl" />
                        ) : (
                          <MdRemoveRedEye className="text-2xl" />
                        )}
                      </button>
                    }
                    as={Input}
                  />
                )}
              </div>

              <Field
                label="Contraseña:"
                type={isVisible ? "text" : "password"}
                name="password"
                description="Ingrese su contraseña"
                variant="bordered"
                color={
                  errors.password && touched.password ? "danger" : "primary"
                }
                errorMessage={
                  errors.password && touched.password && errors.password
                }
                endContent={
                  <button
                    onClick={() => toggleVisibility()}
                    className="focus:outline-none"
                    type="button"
                  >
                    {isVisible ? (
                      <MdOutlineRemoveRedEye className="text-2xl" />
                    ) : (
                      <MdRemoveRedEye className="text-2xl" />
                    )}
                  </button>
                }
                as={Input}
              />
              <Field
                label="Repetir contraseña:"
                type={isVisible ? "text" : "password"}
                name="repeatPassword"
                description="Ingrese su contraseña"
                variant="bordered"
                color={
                  errors.repeatPassword && touched.repeatPassword
                    ? "danger"
                    : "primary"
                }
                errorMessage={
                  errors.repeatPassword &&
                  touched.repeatPassword &&
                  (errors.repeatPassword.split(", ")[1] ||
                    errors.repeatPassword)
                }
                endContent={
                  <button
                    onClick={() => toggleVisibility()}
                    className="focus:outline-none"
                    type="button"
                  >
                    {isVisible ? (
                      <MdOutlineRemoveRedEye className="text-2xl" />
                    ) : (
                      <MdRemoveRedEye className="text-2xl" />
                    )}
                  </button>
                }
                as={Input}
              />
            </div>
            <div className="w-full mt-6 flex flex-row justify-between">
              <Button
                variant="ghost"
                size="lg"
                color="primary"
                onClick={() => router.back()}
              >
                Regresar
              </Button>
              <Button variant="ghost" size="lg" color="warning" type="reset">
                Limpiar
              </Button>
              <div className="w-1/3 flex flex-row justify-between gap-4">
                {edit && (
                  <Button
                    variant="ghost"
                    size="lg"
                    color="danger"
                    onPress={() => {
                      toast.promise(deleteEntity(), {
                        loading: "Procesando...",
                        success: (data) => {
                          router.push("/");
                          return "Eliminado con exito.";
                        },
                        error: (error: Error) => {
                          return error.message === "Failed to fetch"
                            ? "Error en conexión."
                            : error.message ?? "";
                        },
                      });
                    }}
                  >
                    Eliminar
                  </Button>
                )}
                <Button variant="solid" size="lg" color="success" type="submit">
                  {edit ? "Actualizar" : "Registrar"}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <Modal size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h1>Descargar QR de Recuperación</h1>
              </ModalHeader>
              <ModalBody className="flex flex-col gap-6 justify-center items-center">
                <p>
                  En caso de olvidar su contraseña y su clave de recuperación,
                  escanee e introduzca el contenido de este QR junto a su nueva
                  contraseña en el formulario de recuperación.
                </p>
                <QRCode value={qrCode} id="QRCode" />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onImageCownload();
                    onClose();
                  }}
                >
                  Descargar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
