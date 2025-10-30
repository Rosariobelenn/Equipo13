import type { StatusCardProps } from "../../types/common.types";
import type { CreditApplication } from "../../types/credit.types";

function StatusCard({
  icon: Icon,
  iconColor,
  bgColor,
  label,
  value,
  applications,
}: StatusCardProps & { applications?: CreditApplication[] }) {
  let displayValue = value;

  if (applications) {
    const approved = applications.filter((a) => a.status === "approved");
    const pending = applications.filter((a) => a.status === "pending_review");

    if (approved.length > 0) {
      displayValue =
        approved.length === 1
          ? "1 solicitud para firmar"
          : `${approved.length} solicitudes para firmar`;
    } else if (pending.length > 0) {
      displayValue =
        pending.length === 1
          ? "1 solicitud en revisión"
          : `${pending.length} solicitudes en revisión`;
    } else {
      displayValue = "Sin acciones pendientes";
    }
  }

  return (
    <article className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-slate-300/80">
      <figure className={`${bgColor} p-3 rounded-xl`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </figure>
      <section>
        <p className="text-gray-600">{label}</p>
        <p className="font-medium text-gray-900">{displayValue}</p>
      </section>
    </article>
  );
}

export default StatusCard;
