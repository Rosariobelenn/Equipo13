export interface CreditApplication {
  id: number;
  amount: number;
  status: "pending_review" | "under_review" | "approved" | "rejected";
  company_name: string;
  company_id: number;
  created_at: string;
  updated_at: string;
}

export interface CreditRequest {
  credit_amount: number;
  credit_installment_count: number;
  bank_name: string;
  bank_type: string;
  bank_cbu_cvu: string;
  bank_holder_name: string;
  document_financial_statements: string;
  document_gross_income_certificate: string;
  document_statement_file: string;
}

export interface RequestedBy {
  id: number;
  name: string;
  email: string;
}

export interface Document {
  id: number;
  name: string;
  type: string;
  url: string;
}

export interface CreditApplicationById extends CreditApplication {
  requested_by: RequestedBy;
  documents: Document[];
}

export interface DocumentInputProps {
  field: "financial_statements" | "gross_income" | "bank_statement";
  documentField: keyof CreditRequest;
  label: string;
  inputId: string;
  mode: "url" | "file";
  file: File | null;
  urlValue: string;
  onToggleMode: () => void;
  onUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface Company {
  business_name: string;
  tax_id: string;
  company_type: string;
}

export interface ApplicationSummaryItemProps {
  application: CreditApplicationById;
  company: Company;
  referenceNumber: number;
}

export interface GetCompanyByUserIdResponse {
  id: number;
  email: string;
  company: Company;
}
