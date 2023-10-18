"use client";

import PlanillaMedia from "@/components/planilla/Planilla";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import jsPDF from "jspdf";

export default function planillaPage() {
  const router = useRouter();
  const downloadPDF = async () => {
    const doc = new jsPDF("p", "mm", "letter");
    const hDoc = doc.internal.pageSize.getHeight();
    const wDoc = doc.internal.pageSize.getWidth();

    const planilla1: HTMLElement | null = document.querySelector(".planilla1");
    const planilla2: HTMLElement | null = document.querySelector(".planilla2");

    if (planilla1) {
      await doc.html(planilla1, {
        x: 0,
        y: 0,
        autoPaging: "slice",
        html2canvas: {
          windowWidth: wDoc,
          windowHeight: hDoc,
          height: hDoc,
          width: wDoc,
          scale: 0.265,
        },
        width: wDoc,
        windowWidth: wDoc * 3.8,
      });
      if (planilla2) {
        doc.addPage("letter", "p");
        await doc.html(planilla2, {
          x: 0,
          y: hDoc,
          autoPaging: "slice",
          html2canvas: {
            windowWidth: wDoc,
            windowHeight: hDoc,
            height: hDoc,
            width: wDoc,
            scale: 0.295,
          },
          width: wDoc,
          windowWidth: wDoc * 3.35,
        });
        doc.output("dataurlnewwindow", { filename: "planilla" });
      } else {
        doc.save("planilla");
      }
    } else {
      return;
    }
  };

  return (
    <section className="px-9 pt-9 pb-6 m-4 shadow-md w-4/5 border border-gray-300 rounded-2xl">
      <div className="rounded-md p-1 border border-gray-300 shadow-inner">
        <PlanillaMedia />
      </div>
      <div className="flex flex-row justify-between mt-5 mx-5">
        <Button
          variant="ghost"
          onPress={() => router.push("/dashboard")}
          color="danger"
        >
          Cancelar
        </Button>
        <Button variant="ghost" onClick={downloadPDF} color="primary">
          Descargar
        </Button>
      </div>
    </section>
  );
}
