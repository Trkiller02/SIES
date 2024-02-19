"use client";

import { useSession } from "next-auth/react";
import { Divider, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/");
  }

  return (
    <main className="flex min-h-[100vh] items-center justify-center">
      <section className="flex flex-row max-md:flex-col border-gray-300 rounded-xl py-7 shadow-xl w-2/4 max-lg:p-9 m-7 border max-lg:border-none max-lg:w-full max-lg:m-0 max-lg:shadow-none">
        <figure className="flex flex-col w-1/2 max-md:w-full justify-center items-center border-r-1 border-gray-300 max-md:m-0 my-1 max-md:border-none">
          <h3 className="text-2xl max-md:text-2xl text-primary-500 font-semibold">
            Sistema de Incripción
          </h3>
          <p className="text-lg max-md:text-xl text-primary font-light mb-4">
            Espiritu Santo
          </p>
          <img
            src="/img/image1.svg"
            alt="Community Logo"
            width="100%"
            className="max-md:hidden w-4/5"
          />
          <Divider
            orientation="horizontal"
            className="mb-4 hidden max-md:block"
          />
        </figure>
        {children}
      </section>
    </main>
  );
}
