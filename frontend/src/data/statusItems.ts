import { FileText, AlertCircle, CircleCheckBig } from "lucide-react";

export const statusItems = [
  {
    icon: FileText,
    iconColor: "text-primary",
    bgColor: "bg-blue-100",
    label: "Total solicitudes",
    value: "3",
  },
  {
    icon: AlertCircle,
    iconColor: "text-orange-600",
    bgColor: "bg-orange-100",
    label: "Requieren acción",
    value: "2",
  },
  {
    icon: CircleCheckBig,
    iconColor: "text-green-600",
    bgColor: "bg-green-100",
    label: "Completadas",
    value: "1",
  },
];
