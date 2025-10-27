import { Eye, PenTool, Upload } from "lucide-react";
import ActionButton from "../../components/ui/Button/ActionButton";

const getActionButton = (status: string) => {
  switch (status) {
    case "approved":
      return (
        <ActionButton
          icon={PenTool}
          text="Firmar contrato"
          className="bg-blue-600 text-white hover:bg-blue-700"
        />
      );
    case "pending_documents":
      return (
        <ActionButton
          icon={Upload}
          text="Cargar documentos"
          className="bg-orange-600 text-white hover:bg-orange-700"
        />
      );
    case "completed":
      return (
        <ActionButton
          icon={Eye}
          text="Ver detalles"
          className="bg-gray-100 text-gray-700 hover:bg-gray-200"
        />
      );
    default:
      return null;
  }
};

export default getActionButton;
