import { useState, useMemo } from "react";
import { Filter, FileDown } from "lucide-react";
import StatCard from "../components/operator/StatCardProps";
import { requestsData } from "../data/requestsData";
import HeaderPanel from "../components/operator/HeaderPanel";
import FilterBar from "../components/operator/FilterBar";
import RequestsTable from "../components/operator/RequestTable";

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
  const [filtroEstado, setFiltroEstado] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");

  // 🔍 Filtrar resultados
  const resultados = useMemo(() => {
    return requestsData.filter((item) => {
      const coincideEstado =
        filtroEstado === "Todas" ||
        item.estado.toLowerCase() === filtroEstado.toLowerCase();

      const coincideBusqueda =
        item.id.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.empresa.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.asignado.toLowerCase().includes(busqueda.toLowerCase());

      return coincideEstado && coincideBusqueda;
    });
  }, [filtroEstado, busqueda]);

  // 📊 Totales dinámicos
  const total = requestsData.length;
  const pendientes = requestsData.filter((r) =>
    [
      "En evaluación",
      "Pendiente de revisión",
      "Revisión de documentos",
    ].includes(r.estado)
  ).length;
  const enRevision = requestsData.filter((r) =>
    ["Documentos pendientes"].includes(r.estado)
  ).length;
  const aprobadas = requestsData.filter((r) => r.estado === "Aprobado").length;
  const rechazadas = requestsData.filter(
    (r) => r.estado === "Rechazado"
  ).length;

  return (
    <div className='p-6 bg-gray-50 min-h-screen space-y-6'>
      {/* Header */}
      <HeaderPanel operador='Juana Pérez' />
      {/* Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4'>
        <StatCard label='Total' value={total} />
        <StatCard label='Pendientes' value={pendientes} />
        <StatCard label='En Revisión' value={enRevision} />
        <StatCard label='Aprobadas' value={aprobadas} />
        <StatCard label='Rechazadas' value={rechazadas} />
      </div>
      {/* Filtros */}
      <div className='flex flex-wrap items-center gap-3 justify-between bg-white border shadow-sm rounded-xl p-4'>
        <FilterBar
          filtros={filtros}
          filtroEstado={filtroEstado}
          setFiltroEstado={setFiltroEstado}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
        />
      </div>
      {/* Tabla */}
      <div className='bg-white shadow rounded-xl overflow-hidden border'>
        <RequestsTable resultados={resultados} colores={colores} />
      </div>
    </div>
  );
}
