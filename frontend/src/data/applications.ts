import type { Application, RequestStatusStep } from "../types/request.types";

export const applications: Application[] = [
  {
    id: "33",
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
    id: "32",
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
    id: "31",
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

export const requestSteps: RequestStatusStep[] = [
  {
    id: "1",
    title: "Solicitud enviada",
    date: "30 de sep 2025, 10:30 a. m.",
    status: "completed",
  },
  {
    id: "2",
    title: "Documentos en revisión",
    date: "30 de sep 2025, 11:45 a. m.",
    status: "completed",
  },
  {
    id: "3",
    title: "Verificación empresarial",
    date: "01 de oct 2025, 09:15 a. m.",
    status: "completed",
  },
  {
    id: "4",
    title: "Análisis crediticio",
    status: "current",
  },
  {
    id: "5",
    title: "Decisión final",
    status: "pending",
  },
];
