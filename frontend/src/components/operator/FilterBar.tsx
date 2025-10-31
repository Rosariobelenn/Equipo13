import { Filter } from "lucide-react";

interface FilterBarProps {
  filtros: string[];
  filtroEstado: string;
  setFiltroEstado: (estado: string) => void;
  busqueda: string;
  setBusqueda: (valor: string) => void;
  conteos: Record<string, number>;
}

export default function FilterBar({
  filtros,
  filtroEstado,
  setFiltroEstado,
  busqueda,
  setBusqueda,
  conteos,
}: FilterBarProps) {
  return (
    <div className='flex flex-wrap items-center gap-3 justify-between bg-white  shadow-sm rounded-2xl p-4'>
      <div className='flex flex-wrap gap-2 rounded-2xl bg-[#F1F5F9] p-2'>
        {filtros.map((f) => (
          <button
            key={f}
            onClick={() => setFiltroEstado(f)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              filtroEstado === f
                ? "bg-white text-primary shadow border-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span>{f}</span>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                filtroEstado === f
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {conteos[f] ?? 0}
            </span>
          </button>
        ))}
      </div>
      <div className='flex items-center gap-2'>
        <input
          type='text'
          placeholder='Buscar por empresa o ID...'
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className='border rounded-lg px-3 py-1.5 text-sm focus:ring-1 focus:ring-blue-400'
        />
        <Filter size={18} className='text-gray-600' />
      </div>
    </div>
  );
}
