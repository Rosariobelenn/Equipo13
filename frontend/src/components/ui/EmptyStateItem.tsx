import { Link } from "react-router-dom";
import { FileText, Plus } from "lucide-react";

function EmptyStateItem() {
  return (
    <section className="bg-white rounded-lg border border-gray-200 p-10 text-center">
      <article className="max-w-md mx-auto">
        <figure className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-10 h-10 text-blue-600" />
        </figure>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Aún no tienes solicitudes
        </h3>

        <p className="text-gray-600 mb-6">
          Comienza creando tu primera solicitud de crédito. Es rápido y fácil.
        </p>

        <Link
          to="/new-request"
          className="inline-flex text-sm md:text-base items-center gap-1 md:gap-2 bg-primary hover:bg-blue-800 text-white font-medium px-6 py-3 rounded-sm transition-colors"
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5" />
          Crear mi primera solicitud
        </Link>
      </article>
    </section>
  );
}

export default EmptyStateItem;
