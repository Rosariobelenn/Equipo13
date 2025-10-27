import { Plus } from "lucide-react";
import SectionHeader from "../components/ui/SectionHeader";
import StatusCard from "../components/ui/StatusCard";
import ApplicationListItem from "../components/ui/ApplicationListItem";
import HelpSection from "../components/ui/HelpSection";
import { useCreditApplications } from "../hooks/useCreditApplications";
import { useStatusItems } from "../hooks/useStatusItems";
import RequestsListSkeleton from "../components/ui/RequestsListSkeleton";
import RequestsListError from "../components/ui/RequestsListError";

function RequestsList() {
  const { applications, isLoading, error, refetch } = useCreditApplications();
  const statusItems = useStatusItems(applications);

  if (isLoading) return <RequestsListSkeleton />;
  if (error)
    return (
      <RequestsListError
        title="No pudimos cargar tus solicitudes"
        onRetry={refetch}
      />
    );

  return (
    <section className="bg-gray-50 p-6" id="requests-list">
      <article className="max-w-5xl mx-auto">
        <SectionHeader
          backLink={{
            path: "/dashboard",
            text: "Volver al dashboard",
          }}
          title="Mis Solicitudes"
          description="Revisa el estado y toma las acciones necesarias"
          actionButton={{
            text: "Nueva solicitud",
            icon: <Plus className="w-4 h-4" />,
            href: "/solicitudes/nueva",
            variant: "primary",
          }}
        />

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4">
          {statusItems.map((status) => (
            <StatusCard
              key={status.label}
              icon={status.icon}
              iconColor={status.iconColor}
              bgColor={status.bgColor}
              label={status.label}
              value={status.value}
            />
          ))}
        </section>

        <section className="space-y-4">
          {applications?.map((application) => (
            <ApplicationListItem
              key={application.id}
              application={application}
            />
          ))}
        </section>
        <HelpSection />
      </article>
    </section>
  );
}

export default RequestsList;
