import { Filter } from "lucide-react";

interface FilterBarProps {
  filtros: string[];
  filtroEstado: string;
  setFiltroEstado: (estado: string) => void;
  busqueda: string;
  setBusqueda: (valor: string) => void;
}

export default function FilterBar({
  filtros,
  filtroEstado,
  setFiltroEstado,
  busqueda,
  setBusqueda,
}: FilterBarProps) {
  return (
    <div className='flex flex-wrap items-center gap-3 justify-between bg-white  shadow-sm rounded-xl p-4'>
      <div className='flex flex-wrap gap-2 bg-[#F1F5F9] p-2'>
        {filtros.map((f) => (
          <button
            key={f}
            onClick={() => setFiltroEstado(f)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium  transition ${
              filtroEstado === f
                ? "bg-white text-primary shadow border-white"
                : " text-gray-600 hover:bg-gray-100"
            }`}
          >
            {f}
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
