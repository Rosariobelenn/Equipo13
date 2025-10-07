export default function StepRepresentative() {
  return (
    <div className='space-y-4'>
      <div className='flex flex-col items-center text-center'>
        <h2 className='text-xl font-semibold'>Datos del representante</h2>
        <p>Ingresa la información personal del representante de la empresa</p>
      </div>

      {/* Nombre completo */}
      <div>
        <label className='block mb-1 font-medium'>
          Nombre completo <span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          placeholder='Ej: Juan Carlos Pérez'
          className='w-full border border-gray-300 bg-[#F3F3F5] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary '
        />
      </div>

      {/* Cargo */}
      <div>
        <label className='block mb-1 font-medium'>
          Cargo <span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          placeholder='Ej: Gerente General'
          className='w-full border border-gray-300 bg-[#F3F3F5] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary '
        />
      </div>

      {/* Tipo y número de documento */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label className='block mb-1 font-medium'>
            Tipo de documento <span className='text-red-500'>*</span>
          </label>
          <select className='w-full border border-gray-300 bg-[#F3F3F5] rounded-lg p-2  focus:outline-none focus:ring-2 focus:ring-primary '>
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
            placeholder='12345678'
            className='w-full border border-gray-300 bg-[#F3F3F5] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary '
          />
        </div>
      </div>

      {/* Correo corporativo */}
      <div>
        <label className='block mb-1 font-medium'>
          Correo corporativo <span className='text-red-500'>*</span>
        </label>
        <input
          type='email'
          placeholder='Ej: juan.perez@miempresa.com'
          className='w-full border border-gray-300 bg-[#F3F3F5] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary '
        />
      </div>

      {/* Teléfono de contacto */}
      <div>
        <label className='block mb-1 font-medium'>
          Teléfono de contacto <span className='text-red-500'>*</span>
        </label>
        <input
          type='tel'
          placeholder='+54 11 1234-5678'
          className='w-full border border-gray-300 bg-[#F3F3F5] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary '
        />
      </div>
    </div>
  );
}
