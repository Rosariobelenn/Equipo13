import type { StepItemProps } from "../../types/common.types";

function StepItem({ icon: Icon, title, description }: StepItemProps) {
  return (
    <li className="flex gap-3">
      <figure className="flex-shrink-0 w-8 h-8 bg-green-200/60 rounded-full flex items-center justify-center mt-1">
        <Icon className="w-4 h-4 text-green-600" />
      </figure>
      <aside>
        <h3 className="mb-1">{title}</h3>
        <p className="text-sm text-gray-700">{description}</p>
      </aside>
    </li>
  );
}

export default StepItem;
