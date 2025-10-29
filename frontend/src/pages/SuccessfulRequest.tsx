import { useLocation, Link } from "react-router-dom";
import { Clock, FileText } from "lucide-react";
import { formatId } from "../lib/utils/utils";
import NextSteps from "../components/ui/NextSteps";
import HelpContact from "../components/ui/HelpContact";
import InformationItem from "../components/ui/InformationItem";

function SuccessfulRequest() {
  const location = useLocation();
  const { referenceNumber } = location.state?.summary || {};

  return (
    <section className="min-h-screen bg-white py-8 px-4">
      <article className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <figure className="inline-flex items-center justify-center w-19 h-19 bg-blue-600 rounded-full mb-4">
            <Clock className="w-10 h-10 text-white" />
          </figure>
          <h1 className="text-3xl text-gray-900 mb-2">
            ¡Solicitud enviada exitosamente!
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Tu solicitud de crédito ha sido recibida y está siendo procesada.
            Nuestro equipo especializado revisará toda la información y te
            contactará pronto.
          </p>
        </header>

        <section className="bg-blue-50 border border-blue-200 rounded-lg p-4 px-10 mb-6 flex items-center justify-center gap-1 w-fit mx-auto">
          <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <p className="text-blue-700 text-sm">
            Tiempo estimado de respuesta: <strong>24-48 horas hábiles</strong>
          </p>
        </section>

        {/* Application Summary - Not implemented yet */}
        <section className="bg-[#f9f7f4] rounded-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-blue-900" />
            <h2 className="text-lg font-semibold">Resumen de tu solicitud</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna izquierda */}
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Empresa:</p>
                <p className="font-medium text-gray-900">Mi empresa S.R.L</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">CUIT:</p>
                <p className="font-medium text-gray-900">***-******-*</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Figura jurídica:</p>
                <p className="font-medium text-gray-900">S.R.L</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Número de referencia:</p>
                <p className="font-medium text-gray-900">
                  ME-{formatId(referenceNumber)}
                </p>
              </div>
            </div>

            {/* Columna derecha */}
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Representante:</p>
                <p className="font-medium text-gray-900">
                  {/* {summary.representante} */}
                  El representante
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email:</p>
                <p className="font-medium text-gray-900">
                  {/* {summary.email} */}
                  Registrado
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Documentos:</p>
                <p className="font-medium text-gray-900">3 archivo(s)</p>
              </div>
            </div>
          </div>
        </section>

        <NextSteps />
        <InformationItem />
        <HelpContact />

        <Link
          to="/dashboard"
          className="w-80 flex justify-center mx-auto bg-blue-900 text-white py-3 rounded-md hover:bg-blue-800 transition-colors"
        >
          Volver al dashboard
        </Link>
      </article>
    </section>
  );
}

export default SuccessfulRequest;
