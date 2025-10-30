import { Eye, Upload } from "lucide-react";
import ActionButton from "../../components/ui/Button/ActionButton";
import ActionButtonWithModal from "../../components/ui/Button/ActionButtonWithModal";

const getActionButton = (status: string, amount: number) => {
  switch (status) {
    case "approved":
      return <ActionButtonWithModal amount={amount} />;
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
