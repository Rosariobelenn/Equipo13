import { useState, useMemo, useEffect } from "react";
import StatCard from "../components/operator/StatCardProps";
import HeaderPanel from "../components/operator/HeaderPanel";
import FilterBar from "../components/operator/FilterBar";
import RequestsTable from "../components/operator/RequestTable";
import { useAuth } from "../context/AuthContext";
import { FileDown } from "lucide-react";

const filtros = [
  "Todas",
  "En evaluación",
  "Aprobado",
  "Rechazado",
  "Documentos pendientes",
  "Pendiente de revisión",
  "Revisión de documentos",
  "Depositado",
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
  const { user } = useAuth();
  const [filtroEstado, setFiltroEstado] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 👇 Datos hardcodeados
  const mockData = [
    {
      id: 2,
      amount: 1000.0,
      status: "pending_review",
      created_at: "2025-10-15T18:53:57.705203",
      company: {
        business_name: "Tomato",
        tax_id: "1234567",
        company_type: "Company",
      },
      legal_representative: {
        full_name: "MR Tomato",
        position: "Manager",
      },
      assigned_to: null,
    },
    {
      id: 8,
      amount: 800000.0,
      status: "pending_review",
      created_at: "2025-10-24T15:30:45.277579",
      company: {
        business_name: "Biotech Agro S.A.",
        tax_id: "30-72569312-8",
        company_type: "SA",
      },
      legal_representative: {
        full_name: "Lucía Ramírez",
        position: "Presidenta",
      },
      assigned_to: null,
    },
    {
      id: 1,
      amount: 0.01,
      status: "rejected",
      created_at: "2025-10-15T06:14:05.945933",
      company: {
        business_name: "Pyme_Go",
        tax_id: "12345",
        company_type: "Money",
      },
      legal_representative: {
        full_name: "Test",
        position: "Manager",
      },
      assigned_to: null,
    },
  ];

  useEffect(() => {
    // Simular carga
    setTimeout(() => {
      setRequests(
        mockData.map((r) => ({
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
          empresa: r.company.business_name,
          asignado: r.assigned_to || "Sin asignar",
          fecha: r.created_at,
        }))
      );
      setLoading(false);
    }, 800);
  }, []);

  const resultados = useMemo(() => {
    return requests.filter((item) => {
      const coincideEstado =
        filtroEstado === "Todas" ||
        item.estado?.toLowerCase() === filtroEstado.toLowerCase();

      const coincideBusqueda =
        item.id?.toString().includes(busqueda.toLowerCase()) ||
        item.empresa?.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.asignado?.toLowerCase().includes(busqueda.toLowerCase());

      return coincideEstado && coincideBusqueda;
    });
  }, [requests, filtroEstado, busqueda]);

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

  if (loading) return <div className='p-6'>Cargando solicitudes...</div>;

  return (
    <div className='p-6 bg-gray-50 min-h-screen space-y-6'>
      <HeaderPanel />

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4'>
        <StatCard label='Total' value={total} />
        <StatCard label='Pendientes' value={pendientes} />
        <StatCard label='En Revisión' value={enRevision} />
        <StatCard label='Aprobadas' value={aprobadas} />
        <StatCard label='Rechazadas' value={rechazadas} />
      </div>

      <div className='flex flex-col items-end  gap-3   rounded-xl p-4'>
        <div className='w-full'>
          <FilterBar
            filtros={filtros}
            filtroEstado={filtroEstado}
            setFiltroEstado={setFiltroEstado}
            busqueda={busqueda}
            setBusqueda={setBusqueda}
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
