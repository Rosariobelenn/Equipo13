import { useMemo } from "react";
import { FileText, AlertCircle, CircleCheckBig } from "lucide-react";
import { statusItems as statusItemsArray } from "../data/statusItems";
import type { CreditApplication } from "../types/credit.types";

export const useStatusItems = (applications?: CreditApplication[]) => {
  const statusItems = useMemo(() => {
    if (!applications) {
      return statusItemsArray;
    }

    const total = applications.length;

    const pendingStatuses = ["pending_review", "pending_approval", "pending"];
    const completedStatuses = ["approved", "completed", "disbursed"];

    const pending = applications.filter((app) =>
      pendingStatuses.includes(app.status)
    ).length;

    const completed = applications.filter((app) =>
      completedStatuses.includes(app.status)
    ).length;

    return [
      {
        icon: FileText,
        iconColor: "text-primary",
        bgColor: "bg-blue-100",
        label: "Total solicitudes",
        value: total.toString(),
      },
      {
        icon: AlertCircle,
        iconColor: "text-orange-600",
        bgColor: "bg-orange-100",
        label: "Requieren acción",
        value: pending.toString(),
      },
      {
        icon: CircleCheckBig,
        iconColor: "text-green-600",
        bgColor: "bg-green-100",
        label: "Completadas",
        value: completed.toString(),
      },
    ];
  }, [applications]);

  return statusItems;
};
