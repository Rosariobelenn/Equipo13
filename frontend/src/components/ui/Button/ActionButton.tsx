import type { ActionButtonProps } from "../../../types/common.types";

const ActionButton: React.FC<ActionButtonProps> = ({
  icon: Icon,
  text,
  className,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`md:w-48 flex items-center justify-center gap-2 px-4 py-2 rounded-sm transition-colors font-medium text-sm cursor-pointer ${className}`}
  >
    <Icon className="w-4 h-4" />
    {text}
  </button>
);

export default ActionButton;
