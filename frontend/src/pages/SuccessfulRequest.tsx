import { useLocation, Link } from "react-router-dom";
import {
  Clock,
  FileText,
  Mail,
  Phone,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface ApplicationSummary {
  empresa: string;
  cuit: string;
  figuraJuridica: string;
  numeroReferencia: string;
  representante: string;
  email: string;
  documentos: number;
}

const SuccessfulRequest = () => {
  const location = useLocation();
  const { referenceNumber } = location.state?.summary || {};

  // Datos que vienen del formulario o de la respuesta del backend
  // const summary: ApplicationSummary = location.state?.summary || {
  //   empresa: "Mi empresa SRL",
  //   cuit: "***-********-*",
  //   figuraJuridica: "S.R.L",
  //   numeroReferencia: "ME-00001234",
  //   representante: "Registrado",
  //   email: "Registrado",
  //   documentos: 3,
  // };

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header con icono de éxito */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-19 h-19 bg-blue-600 rounded-full mb-4">
            <Clock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl text-gray-900 mb-2">
            ¡Solicitud enviada exitosamente!
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Tu solicitud de crédito ha sido recibida y está siendo procesada.
            Nuestro equipo especializado revisará toda la información y te
            contactará pronto.
          </p>
        </div>

        {/* Tiempo estimado */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 px-10 mb-6 flex items-center justify-center gap-1 w-fit mx-auto">
          <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <p className="text-blue-700 text-sm">
            Tiempo estimado de respuesta: <strong>24-48 horas hábiles</strong>
          </p>
        </div>

        {/* Resumen de la solicitud */}
        <div className="bg-[#f9f7f4] rounded-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-blue-900" />
            <h2 className="text-lg font-semibold">Resumen de tu solicitud</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna izquierda */}
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Empresa:</p>
                <p className="font-medium text-gray-900">{summary.empresa}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">CUIT:</p>
                <p className="font-medium text-gray-900">{summary.cuit}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Figura jurídica:</p>
                <p className="font-medium text-gray-900">
                  {summary.figuraJuridica}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Número de referencia:</p>
                <p className="font-medium text-gray-900">
                  ME-0000{referenceNumber}
                </p>
              </div>
            </div>

            {/* Columna derecha */}
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Representante:</p>
                <p className="font-medium text-gray-900">
                  {summary.representante}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email:</p>
                <p className="font-medium text-gray-900">{summary.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Documentos:</p>
                <p className="font-medium text-gray-900">
                  {summary.documentos} archivo(s)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Próximos pasos */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-3 mb-4">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <h2 className="text-lg font-semibold">Próximos pasos</h2>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-200/60 rounded-full flex items-center justify-center mt-1">
                <Mail className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="mb-1">Confirmación por email</h3>
                <p className="text-sm text-gray-700">
                  Recibirás un email de confirmación en las próximas horas
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-200/60 rounded-full flex items-center justify-center mt-1">
                <Phone className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="mb-1">Contacto telefónico</h3>
                <p className="text-sm text-gray-700">
                  Nuestro equipo puede contactarte para aclarar información
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-200/60 rounded-full flex items-center justify-center mt-1">
                <FileText className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="mb-1">Documentación adicional</h3>
                <p className="text-sm text-gray-700">
                  Si es necesario, te solicitaremos documentos complementarios
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Información importante */}
        <div className="bg-yellow-50/70 border border-yellow-200 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-3 mb-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <h2 className="text-lg font-semibold">Información importante</h2>
          </div>

          <ul className="space-y-2 text-sm ml-8 text-gray-800">
            <li className="list-disc">
              Mantén tu teléfono disponible, podríamos contactarte para aclarar
              información
            </li>
            <li className="list-disc">
              Revisa tu email regularmente, incluida la carpeta de spam
            </li>
            <li className="list-disc">
              Si no recibes noticias en 48 horas, contáctanos
            </li>
            <li className="list-disc">
              Toda la información será tratada de forma confidencial
            </li>
          </ul>
        </div>

        {/* Ayuda y contacto */}
        <div className="bg-white rounded-xl border border-gray-300 p-6 mt-16 mb-6 text-center w-10/12 mx-auto">
          <h3 className="text-lg mb-2">¿Necesitas ayuda o tienes preguntas?</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-800" />
              <span>0800-123-4567</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-800" />
              <span>soporte@pymego.com</span>
            </div>
          </div>
          <p className="text-xs text-gray-500/80 font-medium">
            Horario de atención: Lunes a Viernes de 9:00 a 18:00 hs
          </p>
        </div>

        {/* Botón para volver al dashboard */}
        <Link
          to="/dashboard"
          className="w-80 flex justify-center mx-auto bg-blue-900 text-white py-3 rounded-md hover:bg-blue-800 transition-colors"
        >
          Volver al dashboard
        </Link>
      </div>
    </div>
  );
};

export default SuccessfulRequest;
