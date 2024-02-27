import { Button, Input } from "@nextui-org/react";
import { Session } from "next-auth";
import React, { useState } from "react";
import { MdArrowForward } from "react-icons/md";
import { toast } from "sonner";

export default function UploadForm({
  session,
  constancia,
}: {
  session: Session;
  constancia?: boolean;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File>();

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files![0]);
  };

  const sendInfoPlanilla = async (values: FormData) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tools/planilla/update`,
      {
        method: "POST",
        body: values,
        headers: {
          Authorization: "Bearer " + session.user.token,
        },
      }
    );

    if (response.ok) return await response.text();
  };

  const sendInfoConstancia = async (values: FormData) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tools/constancia/update`,
      {
        method: "POST",
        body: values,
        headers: {
          Authorization: "Bearer " + session.user.token,
        },
      }
    );

    if (response.ok) return await response.text();
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (
      selectedFile?.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const formData = new FormData();

      formData.append("file", selectedFile);

      if (constancia) {
        toast.promise(sendInfoConstancia(formData), {
          loading: "Procesando...",
          success: (data) => {
            return data;
          },
          error: (error: Error) => {
            return error.message === "Failed to fetch"
              ? "Error en conexión."
              : error.message ?? "";
          },
          finally: () => {
            setIsLoading(false);
          },
        });
      } else {
        toast.promise(sendInfoPlanilla(formData), {
          loading: "Procesando...",
          success: (data) => {
            return data;
          },
          error: (error: Error) => {
            return error.message === "Failed to fetch"
              ? "Error en conexión."
              : error.message ?? "";
          },
          finally: () => {
            setIsLoading(false);
          },
        });
      }
    } else {
      setIsLoading(false);
    }
  };

  return (
    <form className="inline-flex gap-2 items-center" onSubmit={onSubmitHandler}>
      <Input
        type="file"
        accept=".docx"
        name="myfile"
        className="form-input mt-1 block w-full"
        onChange={onChangeHandler}
      />

      <Button
        type="submit"
        isLoading={isLoading}
        color="primary"
        size="lg"
        variant="light"
      >
        Enviar
      </Button>
    </form>
  );
}
