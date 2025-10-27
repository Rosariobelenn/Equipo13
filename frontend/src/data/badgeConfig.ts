import { CircleCheckBig, PenTool, Upload, Clock, XCircle } from "lucide-react";

export const badgeConfig = {
  approved: {
    icon: PenTool,
    className: "bg-blue-50 text-blue-700 border border-blue-200",
  },
  pending_review: {
    icon: Clock,
    className: "bg-yellow-100 text-yellow-800 border border-yellow-200",
  },
  pending_documents: {
    icon: Upload,
    className: "bg-orange-100 text-amber-700 border border-amber-200",
  },
  completed: {
    icon: CircleCheckBig,
    className: "bg-green-50 text-green-700 border border-green-200",
  },
  rejected: {
    icon: XCircle,
    className: "bg-red-50 text-red-700 border border-red-200",
  },
};
