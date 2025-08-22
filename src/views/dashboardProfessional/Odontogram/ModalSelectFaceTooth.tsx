import { Modal } from "@/components/features/PanelProfessional/Modal";
import React from "react";

interface ModalSelectFaceToothProps {
  show: boolean;
  onClose: () => void;
  setFace: (
    cara: "vesibular" | "mesial" | "palatino" | "distal" | "oclusal"
  ) => void;
  toothNumber: number;
}

export const ModalSelectFaceTooth: React.FC<ModalSelectFaceToothProps> = ({
  show,
  onClose,
  setFace,
  toothNumber,
}) => {
  if (!show) return null;
  const buttons = [
    "vesibular",
    "mesial",
    "palatino",
    "distal",
    "oclusal",
  ] as const;

  return (
    <Modal title={`Seleccionar Cara Diente: N° ${toothNumber}`} close={onClose}>
      <div className="flex flex-wrap items-center justify-center w-full gap-2">
        {buttons.map((item) => (
          <button
            key={item}
            onClick={() => {
              setFace(item);
              onClose();
            }}
            className="px-3 py-2 text-sm text-white capitalize transition-all duration-300 rounded bg-green hover:bg-greenHover"
          >
            {item}
          </button>
        ))}
      </div>
    </Modal>
  );
};
