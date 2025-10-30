// src/services/credit.service.ts
import { apiFetch } from "./api";

export const CreditService = {
  getAll: () => apiFetch("/admin/credit-applications"),
  getById: (id: number) => apiFetch(`/admin/credit-applications/${id}`),
};
