export default function StepRepresentative() {
  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-semibold'>Representante Legal</h2>

      <input
        type='text'
        placeholder='Nombre completo'
        className='border p-2 w-full rounded'
      />
      <input
        type='text'
        placeholder='Número de identificación'
        className='border p-2 w-full rounded'
      />
      <input
        type='email'
        placeholder='Correo electrónico'
        className='border p-2 w-full rounded'
      />
    </div>
  );
}
