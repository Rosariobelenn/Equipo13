import { useAuth } from "../../context/AuthContext";
import ActivityItem from "./ActivityItem";
import type { ActivityItemProps } from "../../types/dashboard.types";
import type { CreditApplication } from "../../types/credit.types";

function RecentActivity({
  activitiesData,
}: {
  activitiesData: CreditApplication[];
}) {
  const { loginTime } = useAuth();

  const formattedTime = loginTime
    ? new Date(loginTime).toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    : null;

  const sessionActivity: ActivityItemProps = {
    color: "green",
    title: "Sesión iniciada correctamente",
    timestamp: `Hoy a las ${formattedTime}`,
  };

  const statusGroups = activitiesData.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusConfig = {
    approved: {
      color: "blue",
      title: (count: number) =>
        `Tienes ${count} ${
          count === 1 ? "solicitud aprobada" : "solicitudes aprobadas"
        }`,
      subtitle: "Fondos disponibles para uso",
    },
    rejected: {
      color: "red",
      title: (count: number) =>
        `Tienes ${count} ${
          count === 1 ? "solicitud rechazada" : "solicitudes rechazadas"
        }`,
      subtitle: "Revisa los motivos en el detalle",
    },
  };

  const requestActivities: ActivityItemProps[] = Object.entries(statusGroups)
    .map(([status, count]) => {
      const config = statusConfig[status as keyof typeof statusConfig];

      if (!config) return null;

      return {
        color: config.color,
        title: config.title(count),
        timestamp: config.subtitle,
      };
    })
    .filter(Boolean) as ActivityItemProps[];

  const allActivities = [sessionActivity, ...requestActivities];

  return (
    <section className="bg-white rounded-lg p-6 border border-slate-300/80">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 md:mb-8">
        Actividad reciente
      </h3>

      {activitiesData.length === 0 ? (
        <p className="text-gray-500 text-sm">No hay solicitudes registradas.</p>
      ) : (
        <ul className="space-y-3">
          {allActivities.map((activity, index) => (
            <ActivityItem key={index} {...activity} />
          ))}
        </ul>
      )}
    </section>
  );
}

export default RecentActivity;
