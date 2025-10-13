interface HeaderPanelProps {
  operador: string;
}

export default function HeaderPanel({ operador }: HeaderPanelProps) {
  return (
    <header className='flex justify-between items-center border-b pb-3'>
      <div>
        <h1 className='text-xl font-semibold text-gray-800'>
          Panel de solicitudes
        </h1>
        <p className='text-gray-500 text-sm'>
          Gestión de solicitudes crediticias
        </p>
      </div>
      <div className='text-sm text-gray-700'>
        Operador: <span className='font-medium'>{operador}</span> |{" "}
        <button className='text-primary font-medium hover:underline'>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
