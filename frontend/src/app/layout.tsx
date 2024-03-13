import "./globals.css";
import type { Metadata } from "next";
import Providers from "./provider";
import { Toaster } from "sonner";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Raleway } from "next/font/google";

const font = Raleway({
  weight: ["300", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SISINSES",
  description: "SISTEMA DE INSCRIPCIÓN ESPÍRITU SANTO",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="es-VE">
      <body className={`${font.className} antialiased`}>
        <Providers session={session}>
          {children}
          <Toaster closeButton />
        </Providers>
      </body>
    </html>
  );
}
