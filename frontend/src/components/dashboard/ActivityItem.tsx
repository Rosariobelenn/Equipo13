import { COLOR_MAP } from "../../constants/colorMap";
import type { ActivityItemProps } from "../../types/dashboard.types";

function ActivityItem({ color, title, timestamp }: ActivityItemProps) {
  const spanColorClass = COLOR_MAP[color] || "bg-gray-500";

  return (
    <li className="flex items-center gap-3 bg-gray-100/60 rounded-lg p-4">
      <span
        className={`w-[10px] h-[10px] ${spanColorClass} rounded-full`}
      ></span>
      <div className="flex-1">
        <p className="text-gray-900">{title}</p>
        <time className="text-sm text-gray-400">{timestamp}</time>
      </div>
    </li>
  );
}

export default ActivityItem;
