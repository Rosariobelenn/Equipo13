interface CompanyData {
  business_name: string;
  tax_id: string;
  company_type: string;
}

interface StepCompanyProps {
  data: CompanyData;
  onChange: (data: CompanyData) => void;
}

export default function StepCompany({ data, onChange }: StepCompanyProps) {
  const handleChange = (field: keyof CompanyData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className='space-y-4'>
      <div className='flex flex-col items-center text-center'>
        <h2 className='text-xl font-semibold'>Datos de la empresa</h2>
        <p>Ingresa la información básica de tu empresa</p>
      </div>

      <div>
        <label className='block mb-1 font-medium'>
          Razón social <span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          value={data.business_name}
          onChange={(e) => handleChange("business_name", e.target.value)}
          placeholder='Ej: Mi Empresa S.A.'
          className='w-full border border-gray-300 bg-[#F3F3F5] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary'
        />
      </div>

      <div>
        <label className='block mb-1 font-medium'>
          CUIT <span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          value={data.tax_id}
          onChange={(e) => handleChange("tax_id", e.target.value)}
          placeholder='Ej: 20-12345678-9'
          className='w-full border border-gray-300 bg-[#F3F3F5] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary'
        />
      </div>

      <div>
        <label className='block mb-1 font-medium'>
          Tipo de empresa <span className='text-red-500'>*</span>
        </label>
        <select
          value={data.company_type}
          onChange={(e) => handleChange("company_type", e.target.value)}
          className='w-full border border-gray-300 bg-[#F3F3F5] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary'
        >
          <option value=''>Selecciona el tipo de empresa</option>
          <option value='sociedad-anonima'>Sociedad Anónima (S.A.)</option>
          <option value='sociedad-limitada'>
            Sociedad de Responsabilidad Limitada (S.R.L.)
          </option>
          <option value='unipersonal'>Empresa Unipersonal</option>
          <option value='cooperativa'>Cooperativa</option>
        </select>
      </div>
    </div>
  );
}
