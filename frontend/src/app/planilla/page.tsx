"use client";

import PlanillaMedia from "@/components/planilla/Planilla";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import jsPDF from "jspdf";

export default function planillaPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="4xl"
        placement="center"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <PlanillaMedia />
              </ModalBody>
              <ModalFooter className="justify-between">
                <Button variant="ghost" onPress={onClose} color="danger">
                  Cancelar
                </Button>
                <Button variant="ghost" onClick={downloadPDF}>
                  Descargar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Button onPress={onOpen}>Open Modal</Button>
    </div>
  );
}
