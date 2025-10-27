export const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    pending_review: "Revisión pendiente",
    under_review: "En revisión",
    approved: "Aprobada",
    rejected: "Rechazada",
  };
  return labels[status] || status;
};
