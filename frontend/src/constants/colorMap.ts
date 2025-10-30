import type { ActivityColor } from "../types/dashboard.types";

export const COLOR_MAP: Record<ActivityColor, string> = {
  green: "bg-green-500",
  red: "bg-red-500",
  blue: "bg-blue-500",
  yellow: "bg-yellow-500",
  purple: "bg-purple-500",
} as const;
