// src/services/credit.service.ts
import { apiFetch } from "./api";

export const CreditService = {
  getAll: () => apiFetch("/credit_applications"),
  getById: (id: number) => apiFetch(`/credit_applications/${id}`),
};
