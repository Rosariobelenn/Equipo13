import type { StatusBadgeProps } from "../../types/types";

const StatusBadge: React.FC<StatusBadgeProps> = ({
  icon: Icon,
  label,
  className,
}) => {
  const baseClasses =
    "inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium";

  return (
    <span className={`${baseClasses} ${className}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
};

export default StatusBadge;
