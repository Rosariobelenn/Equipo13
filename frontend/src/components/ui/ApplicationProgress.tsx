import { CircleCheckBig } from "lucide-react";
import type { ApplicationProgressProps } from "../../types/request.types";
import { formatDate } from "../../lib/utils/utils";

function ApplicationProgress({
  application,
}: {
  application: ApplicationProgressProps;
}) {
  return (
    <section className="lg:col-span-2 bg-white rounded-lg p-6 border border-gray-200">
      <h2 className="text-lg text-gray-900 mb-6">Progreso de tu solicitud</h2>

      <ul className="space-y-4">
        <li className="flex items-start gap-4">
          <figure className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <CircleCheckBig className="w-5 h-5 text-green-600" />
          </figure>
          <aside className="flex-1">
            <p className="text-gray-900">Solicitud enviada</p>
            <p className="text-sm text-gray-500">
              {formatDate(application.created_at)}
            </p>
          </aside>
        </li>

        <li className="flex items-start gap-4">
          <figure className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <CircleCheckBig className="w-5 h-5 text-green-600" />
          </figure>
          <aside className="flex-1">
            <p className="text-gray-900">
              {application.status == "pending_review"
                ? "Pendiente de revisión"
                : "Verificación de documentos"}
            </p>
            <p className="text-sm text-gray-500">
              {formatDate(application.updated_at)}
            </p>
          </aside>
        </li>

        <li className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            {application.status == "approved" ? (
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            ) : application.status == "rejected" ? (
              <div className="w-3 h-3 rounded-full bg-red-600"></div>
            ) : (
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            )}
          </div>
          <aside className="flex-1">
            <p className="text-gray-500">
              Decisión final:{" "}
              {application.status == "approved"
                ? "Aprobado"
                : application.status == "rejected"
                ? "Rechazado"
                : "En evaluación"}
            </p>
          </aside>
        </li>
      </ul>
    </section>
  );
}

export default ApplicationProgress;
