export const formatAmount = (amount: number) => {
  return `$ ${amount.toLocaleString("es-AR")}`;
};

export function formatDate(isoDate: string): string {
  if (!isoDate) return "";

  const date = new Date(isoDate);

  if (isNaN(date.getTime())) return "";

  const formatted = new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  return formatted.replace(/\b(\p{L})/u, (l) => l.toLowerCase());
}

export function getStatusMessage(status: string): string {
  switch (status) {
    case "pending_review":
      return "Tu solicitud está siendo revisada por nuestro equipo. Te notificaremos cualquier novedad.";

    case "approved":
      return "¡Felicitaciones! Tu crédito fue aprobado. Firma el contrato para completar el proceso.";

    case "deposited":
      return "Tu crédito ha sido depositado exitosamente. Puedes ver los detalles del contrato.";

    case "missing_financial_statements":
      return "Necesitamos que cargues el estado contable actualizado para continuar.";

    default:
      return "Estado desconocido. Por favor, contacta con soporte.";
  }
}
