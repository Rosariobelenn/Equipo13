import StatusBadge from "../../components/ui/StatusBadge";
import { badgeConfig } from "../../data/badgeConfig";

const getStatusBadge = (status: string) => {
  const config = badgeConfig[status as keyof typeof badgeConfig];
  let label = "";

  switch (status) {
    case "ready":
      label = "Listo para firmar";
      break;
    case "pending_review":
      label = "En revisión";
      break;
    case "pendig_documents":
      label = "Documentos pendientes";
      break;
    case "completed":
      label = "Aprobado - Desembolsado";
      break;
    default:
      label = "Estado desconocido";
      break;
  }

  if (!config) return null;

  return (
    <StatusBadge
      icon={config.icon}
      label={label}
      className={config.className}
    />
  );
};

export default getStatusBadge;
