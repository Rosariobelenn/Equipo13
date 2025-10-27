import { User } from "lucide-react";
import type { OperatorItemProps } from "../../types/common.types";

function OperatorItem({ assignedOperator }: OperatorItemProps) {
  return (
    <section className="bg-white rounded-xl p-6 border border-gray-200">
      <header className="flex items-center gap-2 mb-6">
        <User className="w-5 h-5" />
        <h2 className="text-gray-900">Operador asignado</h2>
      </header>

      <ul className="space-y-4">
        <li>
          <p className="text-xs text-gray-500 mb-1">Nombre completo</p>
          <p className="text-sm text-gray-900">{assignedOperator.fullName}</p>
        </li>

        <li>
          <p className="text-xs text-gray-500 mb-1">Cargo</p>
          <p className="text-sm text-gray-900">{assignedOperator.position}</p>
        </li>

        <li>
          <p className="text-xs text-gray-500 mb-1">Email</p>
          <p className="text-sm text-gray-900">{assignedOperator.email}</p>
        </li>

        <li>
          <p className="text-xs text-gray-500 mb-1">Teléfono</p>
          <p className="text-sm">{assignedOperator.phoneNumber}</p>
        </li>
      </ul>
    </section>
  );
}

export default OperatorItem;
