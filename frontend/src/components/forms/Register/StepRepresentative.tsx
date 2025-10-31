import { useState } from "react";

interface RepresentativeData {
  full_name: string;
  position: string;
  document_type: string;
  document_number: string;
  corporate_email: string;
  contact_phone: string;
}

interface StepRepresentativeProps {
  data: RepresentativeData;
  onChange: (data: RepresentativeData) => void;
}

export default function StepRepresentative({
  data,
  onChange,
}: StepRepresentativeProps) {
  const [errors, setErrors] = useState({ corporate_email: "" });

  const handleChange = (field: keyof RepresentativeData, value: string) => {
    onChange({ ...data, [field]: value });

    if (field === "corporate_email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors((prev) => ({
        ...prev,
        corporate_email: !emailRegex.test(value)
          ? "Ingresa un email válido"
          : "",
      }));
    }
  };

  return (
    <div className='space-y-4'>
      <div className='flex flex-col items-center text-center'>
        <h2 className='text-xl font-semibold'>Datos del representante</h2>
        <p>Ingresa la información personal del representante de la empresa</p>
      </div>

      <div>
        <label className='block mb-1 font-medium'>
          Nombre completo <span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          value={data.full_name}
          onChange={(e) => handleChange("full_name", e.target.value)}
          placeholder='Ej: Juan Carlos Pérez'
          className='w-full border border-gray-300 bg-[#F3F3F5] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary'
        />
      </div>

      <div>
        <label className='block mb-1 font-medium'>
          Cargo <span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          value={data.position}
          onChange={(e) => handleChange("position", e.target.value)}
          placeholder='Ej: Gerente General'
          className='w-full border border-gray-300 bg-[#F3F3F5] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary'
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label className='block mb-1 font-medium'>
            Tipo de documento <span className='text-red-500'>*</span>
          </label>
          <select
            value={data.document_type}
            onChange={(e) => handleChange("document_type", e.target.value)}
            className='w-full border border-gray-300 bg-[#F3F3F5] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary'
          >
            <option value=''>Selecciona</option>
            <option value='dni'>DNI</option>
            <option value='pasaporte'>Pasaporte</option>
            <option value='cedula'>Cédula de identidad</option>
          </select>
        </div>

        <div>
          <label className='block mb-1 font-medium'>
            Número de documento <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            value={data.document_number}
            onChange={(e) => handleChange("document_number", e.target.value)}
            placeholder='12345678'
            className='w-full border border-gray-300 bg-[#F3F3F5] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary'
          />
        </div>
      </div>

      <div>
        <label className='block mb-1 font-medium'>
          Correo corporativo <span className='text-red-500'>*</span>
        </label>
        <input
          type='email'
          value={data.corporate_email}
          onChange={(e) => handleChange("corporate_email", e.target.value)}
          placeholder='Ej: juan.perez@miempresa.com'
          className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-2 ${
            errors.corporate_email
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-primary"
          } bg-[#F3F3F5]`}
        />
        {errors.corporate_email && (
          <p className='text-red-500 text-sm mt-1'>{errors.corporate_email}</p>
        )}
      </div>

      <div>
        <label className='block mb-1 font-medium'>
          Teléfono de contacto <span className='text-red-500'>*</span>
        </label>
        <input
          type='tel'
          value={data.contact_phone}
          onChange={(e) => handleChange("contact_phone", e.target.value)}
          placeholder='+54 11 1234-5678'
          className='w-full border border-gray-300 bg-[#F3F3F5] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary'
        />
      </div>
    </div>
  );
}
