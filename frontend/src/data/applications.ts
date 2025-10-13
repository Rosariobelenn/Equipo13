import type { Application } from "../types/requestsList.types";

export const applications: Application[] = [
  {
    id: "ME-00001233",
    amount: 1800000,
    requestedDate: "30 de julio de 2025",
    updatedDate: "02 de agosto de 2025",
    message:
      "¡Felicitaciones! Tu crédito fue aprobado. Firma el contrato para completar el proceso.",
    actionText: "Firmar contrato",
    status: "ready",
    statusLabel: "Listo para firmar",
  },
  {
    id: "ME-00001232",
    amount: 950000,
    requestedDate: "30 de mayo de 2025",
    updatedDate: "02 de junio de 2025",
    message:
      "Necesitamos que cargues el estado contable actualizado para continuar.",
    actionText: "Cargar documentos",
    status: "pending",
    statusLabel: "Documentos pendientes",
  },
  {
    id: "ME-00001231",
    amount: 750000,
    requestedDate: "30 de enero de 2025",
    updatedDate: "07 de febrero de 2025",
    message:
      "Tu crédito ha sido depositado exitosamente. Puedes ver los detalles del contrato.",
    actionText: "Ver contrato",
    status: "completed",
    statusLabel: "Aprobado - Desembolsado",
  },
];
