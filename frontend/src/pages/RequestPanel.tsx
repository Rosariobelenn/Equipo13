import { useState, useMemo, useEffect } from "react";
import StatCard from "../components/operator/StatCardProps";
import HeaderPanel from "../components/operator/HeaderPanel";
import FilterBar from "../components/operator/FilterBar";
import RequestsTable from "../components/operator/RequestTable";
import { FileDown } from "lucide-react";
import { CreditService } from "../services/credit.service";
import { formatDate } from "../lib/utils/utils";

// Tipos para los datos del backend
interface CreditApplication {
  id: number;
  amount: number;
  status: string;
  created_at: string;
  company?: {
    business_name?: string;
  };
  assigned_to?: string;
}

// Tipos para los datos adaptados que usa el frontend
interface AdaptedRequest {
  id: number;
  monto: number;
  estado: string;
  empresa: string;
  asignado: string;
  fecha: string;
}

// Filtros y colores
const filtros = [
  "Todas",
  "En evaluación",
  "Aprobado",
  "Rechazado",
  "Documentos pendientes",
  "Pendiente de revisión",
];

const colores: Record<string, string> = {
  Aprobado: "bg-green-100 text-green-700",
  Rechazado: "bg-red-100 text-red-700",
  "En evaluación": "bg-yellow-100 text-yellow-700",
  "Pendiente de revisión": "bg-blue-100 text-blue-700",
  "Documentos pendientes": "bg-orange-100 text-orange-700",
  "Revisión de documentos": "bg-purple-100 text-purple-700",
  Depositado: "bg-emerald-100 text-emerald-700",
};

export default function RequestPanel() {
  const [filtroEstado, setFiltroEstado] = useState<string>("Todas");
  const [busqueda, setBusqueda] = useState<string>("");
  const [requests, setRequests] = useState<AdaptedRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 👇 Cargar datos reales desde la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CreditService.getAll();
        const data: CreditApplication[] = response.credit_applications;

        // Adaptar la estructura al formato del frontend
        const adaptado: AdaptedRequest[] = data.map((r) => ({
          id: r.id,
          monto: r.amount,
          estado:
            r.status === "pending_review"
              ? "Pendiente de revisión"
              : r.status === "rejected"
              ? "Rechazado"
              : r.status === "approved"
              ? "Aprobado"
              : "En evaluación",
          empresa: r.company?.business_name || "Sin empresa",
          asignado: r.assigned_to || "Sin asignar",
          fecha: formatDate(r.created_at),
        }));

        setRequests(adaptado);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("❌ Error al obtener créditos:", error.message);
        } else {
          console.error("❌ Error desconocido:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 👇 Filtro y búsqueda
  const resultados = useMemo(() => {
    return requests.filter((item) => {
      const coincideEstado =
        filtroEstado === "Todas" ||
        item.estado?.toLowerCase() === filtroEstado.toLowerCase();

      const coincideBusqueda =
        item.id.toString().includes(busqueda.toLowerCase()) ||
        item.empresa.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.asignado.toLowerCase().includes(busqueda.toLowerCase());

      return coincideEstado && coincideBusqueda;
    });
  }, [requests, filtroEstado, busqueda]);

  // 👇 Estadísticas
  const total = requests.length;
  const pendientes = requests.filter((r) =>
    [
      "En evaluación",
      "Pendiente de revisión",
      "Revisión de documentos",
    ].includes(r.estado)
  ).length;
  const enRevision = requests.filter((r) =>
    ["Documentos pendientes"].includes(r.estado)
  ).length;
  const aprobadas = requests.filter((r) => r.estado === "Aprobado").length;
  const rechazadas = requests.filter((r) => r.estado === "Rechazado").length;
  // 👇 Conteos por estado para mostrar en el FilterBar
  const conteos: Record<string, number> = {
    Todas: total,
    "En evaluación": requests.filter((r) => r.estado === "En evaluación")
      .length,
    Aprobado: aprobadas,
    Rechazado: rechazadas,
    "Documentos pendientes": requests.filter(
      (r) => r.estado === "Documentos pendientes"
    ).length,
    "Pendiente de revisión": requests.filter(
      (r) => r.estado === "Pendiente de revisión"
    ).length,
  };

  if (loading)
    return (
      <div className='flex justify-center items-center p-6 min-h-screen'>
        <div className='w-12 h-12 border-4 border-blue-200 border-t-primary rounded-full animate-spin'></div>
      </div>
    );

  return (
    <div className='p-6  min-h-screen space-y-6 max-w-6xl mx-auto'>
      <HeaderPanel />

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4'>
        <StatCard label='Total' value={total} />
        <StatCard label='Pendientes' value={pendientes} />
        <StatCard label='En Revisión' value={enRevision} />
        <StatCard label='Aprobadas' value={aprobadas} />
        <StatCard label='Rechazadas' value={rechazadas} />
      </div>

      <div className='flex flex-col items-end gap-3 rounded-xl p-4'>
        <div className='w-full'>
          <FilterBar
            filtros={filtros}
            filtroEstado={filtroEstado}
            setFiltroEstado={setFiltroEstado}
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            conteos={conteos}
          />
        </div>

        <button className='flex items-center gap-2 bg-primary text-white px-5 py-1.5 rounded-md hover:bg-blue-700 transition text-sm'>
          <FileDown size={16} /> Reportes
        </button>
      </div>

      <div className='bg-white shadow rounded-xl overflow-hidden border'>
        <RequestsTable resultados={resultados} colores={colores} />
      </div>
    </div>
  );
}
