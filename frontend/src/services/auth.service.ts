// src/services/auth.service.ts
import { apiFetch } from "./api";

interface RegisterData {
  user: {
    gmail: string;
    password: string;
  };
  company: {
    business_name: string;
    tax_id: string;
    company_type: string;
  };
  legal_representative: {
    full_name: string;
    position: string;
    document_type: string;
    document_number: string;
    corporate_email: string;
    contact_phone: string;
  };
}

export const AuthService = {
  register: (data: RegisterData) =>
    apiFetch("/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (credentials: { gmail: string; password: string }) =>
    apiFetch("/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),
    
};
