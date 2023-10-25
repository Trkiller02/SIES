"use client";

import { fetchData } from "@/utils/fetchHandler";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { toast } from "sonner";

export default function pageView({ params: id }) {
  const { data: session } = useSession();
  const [data, setData] = useState();
  const getData = async () => {
    try {
      const data = await fetchData(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/person/${id}`,
        "GET",
        session?.user.token
      );

      setData(data);
    } catch (error) {
      toast.error("¡Algo salió mal!", {
        description: error.message,
        duration: 6000,
        icon: <MdCancel />,
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      {JSON.stringify(data)}
    </main>
  );
}
