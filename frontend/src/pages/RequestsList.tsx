import SectionHeader from "../components/ui/SectionHeader";
import StatusCard from "../components/ui/StatusCard";
import ApplicationListItem from "../components/ui/ApplicationListItem";
import HelpSection from "../components/ui/HelpSection";
import { statusItems } from "../data/statusItems";
import { applications } from "../data/applications";

function RequestsList() {
  return (
    <section className="bg-gray-50 p-6" id="requests-list">
      <article className="max-w-5xl mx-auto">
        <SectionHeader
          pathLink="/dashboard"
          pathText="Volver al dashboard"
          title="Mis Solicitudes"
          description="Revisa el estado y toma las acciones necesarias"
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
          {applications.map((application) => (
            <ApplicationListItem application={application} />
          ))}
        </section>

        <HelpSection />
      </article>
    </section>
  );
}

export default RequestsList;
