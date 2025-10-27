import { Plus } from "lucide-react";
import SectionHeader from "../components/ui/SectionHeader";
import StatusCard from "../components/ui/StatusCard";
import ApplicationListItem from "../components/ui/ApplicationListItem";
import HelpSection from "../components/ui/HelpSection";
import { applications as creditApplications } from "../data/applications"; // TODO eliminar esto
import { useCreditApplications } from "../hooks/useCreditApplications";
import { useStatusItems } from "../hooks/useStatusItems";

function RequestsList() {
  const { applications, isLoading, error } = useCreditApplications();
  const statusItems = useStatusItems(applications);
  // console.log(applications);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading applications</div>;

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

        <section className="space-y-4">
          {creditApplications?.map((application) => (
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
