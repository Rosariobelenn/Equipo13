export interface Application {
  id: string;
  amount: number;
  requestedDate: string;
  updatedDate: string;
  message: string;
  actionText: string;
  status: "ready" | "pending" | "completed";
  statusLabel: string;
}

export interface RequestStatusStep {
  id: string;
  title: string;
  date?: string;
  status: "completed" | "current" | "pending";
}

export type RequestDetailsTabs = "progress" | "documents" | "contact";
