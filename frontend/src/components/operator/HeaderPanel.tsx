import { useAuth } from "../../context/AuthContext";

export default function HeaderPanel() {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

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
        Operador: <span className='font-medium'>{user?.email}</span> |{" "}
        <button
          onClick={handleLogout}
          className='text-primary font-medium hover:underline'
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
