import { Building2, FileText, CircleCheckBig, Shield } from "lucide-react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import ActionCard from "../components/dashboard/ActionCard";
import HelpSection from "../components/dashboard/HelpSection";
import StatusCard from "../components/ui/StatusCard";
import RecentActivity from "../components/dashboard/RecentActivity";
import HeaderDashboard from "../components/dashboard/HeaderDashboard";
import { useCreditApplications } from "../hooks/useCreditApplications";
import RequestsDataError from "../components/ui/RequestsListError";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";
import { useCompanyByUserId } from "../hooks/useCompany";

function Dashboard() {
  const { applications, isLoading, error, refetch } = useCreditApplications();
  const user = JSON.parse(localStorage.getItem("userData") || "null");
  const userId = user?.id;
  const {
    company,
    isLoading: companyLoading,
    error: companyError,
  } = useCompanyByUserId(userId);

  if (isLoading || companyLoading) return <DashboardSkeleton />;
  if (error)
    return (
      <RequestsDataError
        title="No pudimos cargar tus solicitudes"
        onRetry={refetch}
      />
    );

  if (companyError) {
    return <RequestsDataError title="No pudimos cargar tu empresa" />;
  }

  if (!company) {
    return <RequestsDataError title="No pudimos cargar tu empresa" />;
  }

  return (
    <section className="bg-gray-50 p-6">
      <article className="max-w-5xl mx-auto">
        <HeaderDashboard />
        <DashboardHeader company={company} />

        <main className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-10">
          <ActionCard
            icon={Building2}
            title="Nueva Solicitud"
            description="Solicita un nuevo crédito para tu empresa de forma rápida y digital"
            buttonText="Iniciar solicitud"
            buttonStyle="primary"
            navigateTo="/new-request"
          />
          <ActionCard
            icon={FileText}
            title="Mis Solicitudes"
            description="Revisa el estado de tus solicitudes y completa acciones pendientes"
            buttonText="Ver solicitudes"
            buttonStyle="secondary"
            navigateTo="/requests-list"
          />
        </main>

        <article className="grid md:grid-cols-2 gap-4 md:gap-12 mb-6 md:mb-10 lg:w-8/12 mx-auto">
          <StatusCard
            icon={CircleCheckBig}
            iconColor="text-green-600"
            bgColor="bg-green-100"
            label="Estado de cuenta"
            value="Verificada ✓"
          />
          <StatusCard
            icon={Shield}
            iconColor="text-orange-600"
            bgColor="bg-orange-100"
            label="Acciones pendientes"
            applications={applications}
          />
        </article>

        <footer className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-18">
          <RecentActivity activitiesData={applications || []} />
          <HelpSection />
        </footer>
      </article>
    </section>
  );
}

export default Dashboard;
