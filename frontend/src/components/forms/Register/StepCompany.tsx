export default function StepDocuments() {
  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-semibold'>Documentación</h2>

      <div>
        <label className='block mb-1'>Documento de identidad</label>
        <input type='file' className='border p-2 w-full rounded' />
      </div>

      <div>
        <label className='block mb-1'>Registro mercantil</label>
        <input type='file' className='border p-2 w-full rounded' />
      </div>
    </div>
  );
}
