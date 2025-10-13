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
