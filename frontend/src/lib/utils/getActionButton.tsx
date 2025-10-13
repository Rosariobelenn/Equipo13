import { Eye, PenTool, Upload } from "lucide-react";
import ActionButton from "../../components/ui/Button/ActionButton";
import type { Application } from "../../types/requestsList.types";

const getActionButton = (application: Application) => {
  switch (application.status) {
    case "ready":
      return (
        <ActionButton
          icon={PenTool}
          text="Firmar contrato"
          className="bg-blue-600 text-white hover:bg-blue-700"
        />
      );
    case "pending":
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
