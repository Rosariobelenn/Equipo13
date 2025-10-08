import type { ActivityItemProps } from "../../types/dashboard.types";
import ActivityItem from "./ActivityItem";

function RecentActivity({ activities }: { activities: ActivityItemProps[] }) {
  return (
    <section className="bg-white rounded-lg p-6 border border-slate-300/80">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 md:mb-8">
        Actividad reciente
      </h3>
      <ul className="space-y-3">
        {activities.map((activity, index) => (
          <ActivityItem key={index} {...activity} />
        ))}
      </ul>
    </section>
  );
}

export default RecentActivity;
