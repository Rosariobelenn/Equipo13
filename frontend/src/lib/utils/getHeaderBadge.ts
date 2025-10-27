import type { SectionHeaderBadge } from "../../types/common.types";

export function getHeaderBadge(status: string): SectionHeaderBadge {
  if (status === "pending_review" || status === "pending_documents") {
    return {
      text: "En revisión",
      variant: "yellow",
    };
  } else {
    return {
      text: "Finalizado",
      variant: "gray",
    };
  }
}
