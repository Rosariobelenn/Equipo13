// src/services/credit.service.ts
import type { CreditApplication } from "../types/credit.types";
import { apiFetch } from "./api";

interface GetAllParams {
  page?: number;
  limit?: number;
  status?: string;
  assigned_to_me?: boolean;
}

export const CreditService = {
  getAll: async (params?: GetAllParams): Promise<any> => {
    // Construir query string
    const query = new URLSearchParams();
    if (params?.page) query.append("page", params.page.toString());
    if (params?.limit) query.append("limit", params.limit.toString());
    if (params?.status) query.append("status", params.status);
    if (params?.assigned_to_me) query.append("assigned_to_me", "true");

    const endpoint = `/admin/credit-applications?${query.toString()}`;
    return apiFetch(endpoint);
  },

  getById: (id: number) => apiFetch(`/admin/credit-applications/${id}`),
};
