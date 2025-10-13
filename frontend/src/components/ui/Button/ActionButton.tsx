import type { ActionButtonProps } from "../../../types/types";

const ActionButton: React.FC<ActionButtonProps> = ({
  icon: Icon,
  text,
  className,
}) => (
  <button
    className={`w-48 flex items-center justify-center gap-2 px-4 py-2 rounded-sm transition-colors font-medium text-sm ${className}`}
  >
    <Icon className="w-4 h-4" />
    {text}
  </button>
);

export default ActionButton;
