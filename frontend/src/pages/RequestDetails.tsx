import { useParams } from "react-router-dom";
import SectionHeader from "../components/ui/SectionHeader";
import { formatAmount } from "../lib/utils/utils";
import CurrentStatusBanner from "../components/ui/CurrentStatusBanner";
import { useCreditApplication } from "../hooks/useCreditApplications";
import { getProgressPercentage } from "../lib/utils/getProgressPercentage";
import OperatorItem from "../components/ui/OperatorItem";
import ActionsItem from "../components/ui/ActionsItem";
import { assignedOperator } from "../data/assignedOperator";
import ApplicationProgress from "../components/ui/ApplicationProgress";
import RequestDetailsSkeleton from "../components/ui/RequestDetailsSkeleton";
import RequestsDataError from "../components/ui/RequestsListError";
import { getHeaderBadge } from "../lib/utils/getHeaderBadge";

function RequestDetails() {
  const { id } = useParams();
  const idNumber = parseInt(id as string);
  const { application, isLoading, error, refetch } =
    useCreditApplication(idNumber);

  if (isLoading) return <RequestDetailsSkeleton />;
  if (error)
    return (
      <RequestsDataError title="Error al cargar solicitud" onRetry={refetch} />
    );

  const progress = getProgressPercentage(application.status);

  return (
    <section className="bg-gray-50 p-6" id="request-details">
      {application && (
        <article className="max-w-5xl mx-auto">
          <SectionHeader
            backLink={{
              path: "/requests-list",
              text: "Volver a mis solicitudes",
            }}
            title={`Solicitud ME-0000${application.id}`}
            subtitle={`Monto: ${formatAmount(application.amount)}`}
            badge={getHeaderBadge(application.status)}
          />

          <CurrentStatusBanner
            progress={progress}
            status={application.status}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ApplicationProgress application={application} />

            <aside className="flex flex-col gap-4">
              <OperatorItem assignedOperator={assignedOperator} />
              <ActionsItem />
            </aside>
          </div>
        </article>
      )}
    </section>
  );
}

export default RequestDetails;
