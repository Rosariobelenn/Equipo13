// src/services/credit.service.ts
import type { CreditApplication } from "../types/credit.types";
import { apiFetch } from "./api";

export const CreditService = {
  getAll: async (): Promise<{ credit_applications: CreditApplication[] }> =>
    apiFetch("/admin/credit-applications"),
  getById: (id: number) => apiFetch(`/admin/credit-applications/${id}`),
};
