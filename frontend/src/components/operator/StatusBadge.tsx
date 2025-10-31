interface StatusBadgeProps {
  estado: string;
}

const colors: Record<string, string> = {
  "Aprobado": "bg-green-100 text-green-700",
  "Rechazado": "bg-red-100 text-red-700",
  "En evaluación": "bg-yellow-100 text-yellow-700",
  "Pendiente de revisión": "bg-blue-100 text-blue-700",
  "Documentos pendientes": "bg-orange-100 text-orange-700",
  "Revisión de documentos": "bg-purple-100 text-purple-700",
  "Depositado": "bg-emerald-100 text-emerald-700",
};

export default function StatusBadge({ estado }: StatusBadgeProps) {
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
        colors[estado] || "bg-gray-100 text-gray-600"
      }`}
    >
      {estado}
    </span>
  );
}
