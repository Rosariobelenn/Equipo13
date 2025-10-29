import { useLocation, Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { useCreditApplication } from "../hooks/useCreditApplications";
import { useCompany } from "../hooks/useCompany";
import SuccessfulRequestSkeleton from "../components/ui/SuccessfulRequestSkeleton";
import ApplicationSummaryItem from "../components/ui/ApplicationSummaryItem";
import RequestsDataError from "../components/ui/RequestsListError";
import InformationItem from "../components/ui/InformationItem";
import HelpContact from "../components/ui/HelpContact";
import NextSteps from "../components/ui/NextSteps";

function SuccessfulRequest() {
  const location = useLocation();
  const { referenceNumber } = location.state?.summary || {};
  const {
    application,
    isLoading: applicationLoading,
    error: applicationError,
  } = useCreditApplication(referenceNumber);
  const {
    company,
    isLoading: companyLoading,
    error: companyError,
  } = useCompany(application?.company_id);

  if (applicationLoading || companyLoading) {
    return <SuccessfulRequestSkeleton />;
  }

  if (applicationError) {
    return <RequestsDataError title="Error al cargar solicitud" />;
  }

  if (companyError) {
    return <RequestsDataError title="Error al cargar compañía" />;
  }

  if (!application) {
    return <RequestsDataError title="No se encontró la solicitud" />;
  }

  if (!company) {
    return <RequestsDataError title="No se encontró la compañía" />;
  }

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

        <ApplicationSummaryItem
          application={application}
          company={company}
          referenceNumber={referenceNumber}
        />
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
