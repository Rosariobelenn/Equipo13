import { useNavigate } from "react-router-dom";

interface Request {
  id: number;
  empresa: string;
  monto: number;
  estado: string;
  score?: string;
  asignado: string;
  fecha: string;
}

interface RequestsTableProps {
  resultados: Request[];
  colores: Record<string, string>;
}

export default function RequestsTable({
  resultados,
  colores,
}: RequestsTableProps) {
  const navigate = useNavigate();

  const handleVerDetalles = (id: number) => {
    navigate(`/request-detail/${id}`);
  };

  return (
    <div className='bg-white shadow rounded-xl overflow-hidden '>
      <table className='w-full shadow text-sm text-gray-700'>
        <thead className='bg-gray-100 text-gray-600 uppercase text-xs border-b'>
          <tr>
            <th className='py-2 px-3 text-left'>ID</th>
            <th className='py-2 px-3 text-left'>Empresa</th>
            <th className='py-2 px-3 text-left'>Monto</th>
            <th className='py-2 px-3 text-left'>Estado</th>
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
                className='border border-gray-200 font-bold  last:border-none hover:bg-gray-50 transition'
              >
                <td className='py-2 px-3'>{`Solicitud ME-${r.id
                  .toString()
                  .padStart(6, "0")}`}</td>
                <td className='py-2 px-3'>{r.empresa}</td>
                <td className='py-2 px-3'>{`$ ${r.monto}`}</td>
                <td className='py-2 px-3'>
                  <div
                    className={` py-0.5 flex justify-center  rounded-full text-xs font-medium ${
                      colores[r.estado] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {r.estado}
                  </div>
                </td>
                <td className='py-2 px-3'>{r.asignado}</td>
                <td className='py-2 px-3'>{r.fecha}</td>
                <td
                  className='py-2 px-3 text-blue-600 hover:underline cursor-pointer'
                  onClick={() => handleVerDetalles(r.id)}
                >
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
