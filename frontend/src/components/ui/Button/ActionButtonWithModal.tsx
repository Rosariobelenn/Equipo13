import { useState } from "react";
import { PenTool } from "lucide-react";
import ActionButton from "./ActionButton";
import DigitalSignatureModal from "../Modal/DigitalSignatureModal";
import type { ActionButtonWithModalProps } from "../../../types/common.types";

const ActionButtonWithModal = ({ amount }: ActionButtonWithModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ActionButton
        icon={PenTool}
        text="Firmar contrato"
        className="bg-blue-600 text-white hover:bg-blue-700"
        onClick={() => setIsModalOpen(true)}
      />
      <DigitalSignatureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amount={amount}
      />
    </>
  );
};

export default ActionButtonWithModal;
