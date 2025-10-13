import type { StatusCardProps } from "../../types/types";

function StatusCard({
  icon: Icon,
  iconColor,
  bgColor,
  label,
  value,
}: StatusCardProps) {
  return (
    <article className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-slate-300/80">
      <figure className={`${bgColor} p-3 rounded-xl`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </figure>
      <section>
        <p className="text-gray-600">{label}</p>
        <p className="text-lg font-medium text-gray-900">{value}</p>
      </section>
    </article>
  );
}

export default StatusCard;
