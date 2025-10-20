import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface UserData {
  gmail: string;
  password: string;
}

interface StepSecurityProps {
  data: UserData;
  onChange: (data: UserData) => void;
}

export default function StepSecurity({ data, onChange }: StepSecurityProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: keyof UserData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className='space-y-4'>
      <div className='flex flex-col items-center text-center'>
        <h2 className='text-xl font-semibold'>Seguridad de la cuenta</h2>
        <p>Ingresa tu correo y crea una contraseña segura</p>
      </div>

      <div>
        <label className='block mb-1 font-medium'>
          Gmail <span className='text-red-500'>*</span>
        </label>
        <input
          type='email'
          value={data.gmail}
          onChange={(e) => handleChange("gmail", e.target.value)}
          placeholder='ejemplo@gmail.com'
          className='w-full border border-gray-300 bg-[#F3F3F5] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary'
        />
      </div>

      <div>
        <label className='block mb-1 font-medium'>
          Contraseña <span className='text-red-500'>*</span>
        </label>
        <div className='relative'>
          <input
            type={showPassword ? "text" : "password"}
            value={data.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder='Mínimo 12 caracteres'
            className='w-full border border-gray-300 bg-[#F3F3F5] rounded-lg p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary'
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className='absolute cursor-pointer inset-y-0 right-3 flex items-center text-gray-500'
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>
      </div>
    </div>
  );
}
