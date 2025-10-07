import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Íconos modernos y ligeros

export default function StepPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className='space-y-4'>
      <div className='flex flex-col items-center text-center'>
        <h2 className='text-xl font-semibold'>Crear contraseña</h2>
        <p>Configura la contraseña para tu cuenta</p>
      </div>

      {/* Contraseña */}
      <div>
        <label className='block mb-1 font-medium'>
          Contraseña <span className='text-red-500'>*</span>
        </label>
        <div className='relative'>
          <input
            type={showPassword ? "text" : "password"}
            placeholder='Mínimo 12 caracteres'
            className='w-full border border-gray-300   bg-[#F3F3F5] rounded-lg p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary'
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className='absolute cursor-pointer inset-y-0 right-3 flex items-center text-gray-500'
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>
      </div>

      {/* Confirmar contraseña */}
      <div>
        <label className='block mb-1 font-medium'>
          Confirmar contraseña <span className='text-red-500'>*</span>
        </label>
        <div className='relative'>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder='Repite tu contraseña'
            className='w-full border border-gray-300   bg-[#F3F3F5] rounded-lg p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary'
          />
          <div
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className='absolute cursor-pointer inset-y-0 right-3 flex items-center text-gray-500'
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>
      </div>
    </div>
  );
}
