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
  const [errors, setErrors] = useState({ gmail: "", password: "" });

  const handleChange = (field: keyof UserData, value: string) => {
    onChange({ ...data, [field]: value });

    if (field === "password") {
      let passwordError = "";
      if (value.length < 6) {
        passwordError = "La contraseña debe tener al menos 6 caracteres";
      } else if (!/[A-Za-z]/.test(value)) {
        passwordError = "La contraseña debe contener al menos una letra";
      }
      setErrors((prev) => ({ ...prev, password: passwordError }));
    }

    if (field === "gmail") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors((prev) => ({
        ...prev,
        gmail: !emailRegex.test(value) ? "Ingresa un email válido" : "",
      }));
    }
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
          className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-2 ${
            errors.gmail
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-primary"
          } bg-[#F3F3F5]`}
        />
        {errors.gmail && (
          <p className='text-red-500 text-sm mt-1'>{errors.gmail}</p>
        )}
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
            placeholder='Mínimo 6 caracteres y 1 letra'
            className={`w-full border rounded-lg p-2 pr-10 focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary"
            } bg-[#F3F3F5]`}
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className='absolute cursor-pointer inset-y-0 right-3 flex items-center text-gray-500'
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>
        {errors.password && (
          <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
        )}
      </div>
    </div>
  );
}
