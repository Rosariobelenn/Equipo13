import { FileDown } from "lucide-react";

interface RequestsTableProps {
  resultados: Request[];
  colores: Record<string, string>;
}

export default function RequestsTable({
  resultados,
  colores,
}: RequestsTableProps) {
  return (
    <div className='bg-white shadow rounded-xl overflow-hidden border'>
      <div className='flex justify-between items-center px-4 py-2 border-b'>
        <h2 className='font-semibold text-gray-700'>Solicitudes</h2>
        <button className='flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition text-sm'>
          <FileDown size={16} /> Reportes
        </button>
      </div>

      <table className='w-full text-sm text-gray-700'>
        <thead className='bg-gray-100 text-gray-600 uppercase text-xs border-b'>
          <tr>
            <th className='py-2 px-3 text-left'>ID</th>
            <th className='py-2 px-3 text-left'>Empresa</th>
            <th className='py-2 px-3 text-left'>Monto</th>
            <th className='py-2 px-3 text-left'>Estado</th>
            <th className='py-2 px-3 text-left'>Score</th>
            <th className='py-2 px-3 text-left'>Asignado</th>
            <th className='py-2 px-3 text-left'>Fecha</th>
            <th className='py-2 px-3'></th>
          </tr>
        </thead>
        <tbody>
          {resultados.length > 0 ? (
            resultados.map((r) => (
              <tr
                key={r.id}
                className='border-b last:border-none hover:bg-gray-50 transition'
              >
                <td className='py-2 px-3'>{r.id}</td>
                <td className='py-2 px-3'>{r.empresa}</td>
                <td className='py-2 px-3'>{r.monto}</td>
                <td className='py-2 px-3'>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      colores[r.estado] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {r.estado}
                  </span>
                </td>
                <td className='py-2 px-3'>{r.score}</td>
                <td className='py-2 px-3'>{r.asignado}</td>
                <td className='py-2 px-3'>{r.fecha}</td>
                <td className='py-2 px-3 text-blue-600 hover:underline cursor-pointer'>
                  Ver detalles
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className='text-center py-6 text-gray-500 italic'>
                No se encontraron resultados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
