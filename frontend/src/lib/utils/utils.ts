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
    case "rejected":
      return "Tu solicitud ha sido rechazada. Por favor, contacta con soporte.";
    default:
      return "Estado desconocido. Por favor, contacta con soporte.";
  }
}

export function getRequiredActionText(status: string): string {
  switch (status) {
    case "approved":
      return "Firmar contrato";
    case "pending_review":
      return "Revisión pendiente";
    case "pending_documents":
      return "Cargar documentos";
    case "pending_approval":
      return "Análisis crediticio";
    case "rejected":
      return "Contactar a soporte";
    default:
      return "Estado desconocido. Por favor, contacta con soporte.";
  }
}

export function formatId(id: number) {
  return id.toString().padStart(4, "0");
}

export const calculateLoanPayment = (
  principal: number,
  annualRate: number,
  months: number
) => {
  const monthlyRate = annualRate / 12 / 100;
  const payment =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
    (Math.pow(1 + monthlyRate, months) - 1);
  return payment;
};

export const formatModalSignatureAmount = (amount: number) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
