import { AlertCircle } from "lucide-react";
import type { Application } from "../../types/request.types";
import getActionButton from "../../lib/utils/getActionButton";
import getStatusBadge from "../../lib/utils/getStatusBadge";
import { formatAmount } from "../../lib/utils/utils";
import { Link } from "react-router-dom";

function ApplicationListItem({ application }: { application: Application }) {
  return (
    <article
      key={application.id}
      className="grid grid-cols-1 md:grid-cols-3 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <main className="md:col-span-2">
        <header className="flex flex-col sm:flex-row md:items-center gap-3 mb-2">
          <h3 className="text-xl font-semibold text-gray-900">
            Solicitud {application.id}
          </h3>
          {getStatusBadge(application.status, application.statusLabel)}
        </header>

        <ul className="flex flex-col md:flex-row gap-1 md:gap-8 text-sm text-gray-600 mb-4 list-disc list-inside ml-2">
          <li className="list-none">
            Monto: <strong>{formatAmount(application.amount)}</strong>
          </li>
          <li>Solicitado: {application.requestedDate}</li>
          <li>Actualizado: {application.updatedDate}</li>
        </ul>

        <p className="text-gray-700 text-sm mb-4 bg-gray-100/50 p-3 rounded-lg ml-2">
          {application.message}
        </p>

        <ul className="flex items-center gap-2 text-sm ml-2">
          <li>
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </li>
          <li className="text-gray-600">Acción requerida:</li>
          <li className="text-orange-600 font-medium">
            {application.actionText}
          </li>
        </ul>
      </main>
      <aside className="flex md:flex-col justify-evenly md:justify-center items-center gap-3 mt-4 md:mt-0 md:col-span-1">
        {getActionButton(application)}
        <Link
          to={`/request-details/${application.id}`}
          className="text-sm text-gray-900 hover:text-gray-600 underline transition-colors cursor-pointer"
        >
          Ver detalles
        </Link>
      </aside>
    </article>
  );
}

export default ApplicationListItem;
