import { useNavigate } from "react-router-dom";
import thorn from "../../../assets/icon1.png";

export default function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div className=' bg-white flex flex-col items-center  py-10'>
      <div className='w-full px-4  mb-6'>
        <a href='/' className='text-sm text-gray-500 hover:underline'>
          ← Volver al inicio
        </a>
      </div>
      <div className='text-center max-w-2xl mb-10'>
        <h1 className='text-2xl font-bold text-gray-800'>
          Registra tu empresa para acceder a Pyme GO
        </h1>
        <p className='mt-2 text-gray-600'>
          Inicia el proceso de solicitud de crédito para tu empresa. Nuestro
          sistema te guiará paso a paso para completar toda la información
          necesaria.
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 rounded-lg p-6 w-full max-w-5xl mb-8'>
        <div className='flex flex-col items-center text-center'>
          <span className='flex items-center justify-center bg-[#DBEAFE] w-12 h-12 rounded-full overflow-hidden'>
            <img src={thorn} alt='' className='w-6 h-6 object-contain' />
          </span>
          <h3 className='mt-2 font-semibold'>Proceso rápido</h3>
          <p className='text-gray-600 text-sm'>
            Completa tu registro en menos de 15 minutos
          </p>
        </div>
        <div className='flex flex-col items-center text-center'>
          <span className='flex items-center justify-center bg-[#DBEAFE] w-12 h-12 rounded-full overflow-hidden'>
            <img src={thorn} alt='' className='w-6 h-6 object-contain' />
          </span>

          <h3 className='mt-2 font-semibold'>100% seguro</h3>
          <p className='text-gray-600 text-sm'>
            Tus datos están protegidos con encriptación de nivel bancario
          </p>
        </div>
        <div className='flex flex-col items-center text-center'>
          <span className='flex items-center justify-center bg-[#DBEAFE] w-12 h-12 rounded-full overflow-hidden'>
            <img src={thorn} alt='' className='w-6 h-6 object-contain' />
          </span>
          <h3 className='mt-2 font-semibold'>Aprobación ágil</h3>
          <p className='text-gray-600 text-sm'>
            Evaluación automatizada para respuesta en 12 horas
          </p>
        </div>
      </div>
      <div className='bg-[#EFF6FF] border border-[#BEDBFF] rounded-lg p-6 w-full max-w-5xl mb-6'>
        <h4 className='font-semibold text-gray-700 mb-4'>
          📄 Documentos que necesitarás tener a mano
        </h4>
        <ul className='grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700 text-sm'>
          <li>✅ Acta constitutiva de la empresa</li>
          <li>✅ CUIT de la empresa</li>
          <li>✅ DNI del representante legal</li>
          <li>✅ Estados contables recientes</li>
          <li>✅ Certificado de ingresos</li>
          <li>✅ Correo electrónico corporativo</li>
        </ul>
      </div>
      <div className='bg-[#F0FDF4] border border-[#B9F8CF] rounded-lg p-4 w-full max-w-5xl mb-8 text-sm text-gray-700'>
        <h1 className=''> Tu información está protegida:</h1>
        <span className='ml-1'>
          Utilizamos encriptación de grado bancario para proteger todos tus
          datos. Nuestra plataforma cumple con las más altas normas de seguridad
          y privacidad.
        </span>
      </div>
      <button
        onClick={() => navigate("/registerFlow")}
        className='bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-blue-800 transition'
      >
        Comenzar registro →
      </button>
      ;
    </div>
  );
}
