import { CircleCheckBig, PenTool, Upload } from "lucide-react";

export const badgeConfig = {
  ready: {
    icon: PenTool,
    className: "bg-blue-50 text-blue-700 border border-blue-200",
  },
  pending: {
    icon: Upload,
    className: "bg-orange-100 text-amber-700 border border-amber-200",
  },
  completed: {
    icon: CircleCheckBig,
    className: "bg-green-50 text-green-700 border border-green-200",
  },
};
