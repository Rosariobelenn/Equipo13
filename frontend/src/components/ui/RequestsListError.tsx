import { Link } from "react-router-dom";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import type { RequestsDataErrorProps } from "../../types/common.types";

function RequestsDataError({ title, onRetry }: RequestsDataErrorProps) {
  return (
    <section className="bg-gray-50 p-6 min-h-screen flex items-center justify-center">
      <article className="max-w-md w-full flex flex-col items-center bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
        <figure className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </figure>

        <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>

        <p className="text-gray-600 mb-6">
          Ocurrió un error al intentar cargar la información. Por favor, intenta
          nuevamente o vuelve al inicio.
        </p>

        <footer className="flex flex-col sm:flex-row gap-3 justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              Reintentar
            </button>
          )}
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            <Home className="w-4 h-4" />
            Volver al inicio
          </Link>
        </footer>
      </article>
    </section>
  );
}

export default RequestsDataError;
