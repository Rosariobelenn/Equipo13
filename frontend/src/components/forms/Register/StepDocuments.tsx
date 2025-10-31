import { useState } from "react";
import { Upload, FileText, X } from "lucide-react";

interface FileData {
  name: string;
  size: number;
  type: string;
}

export default function StepDocuments() {
  const [files, setFiles] = useState<FileData[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);
    const formattedFiles = selectedFiles.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
    }));
    setFiles(formattedFiles);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const formattedFiles = droppedFiles.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
    }));
    setFiles((prevFiles) => [...prevFiles, ...formattedFiles]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

  return (
    <div className='space-y-6'>
      {/* Encabezado */}
      <div className='flex flex-col items-center text-center'>
        <h2 className='text-xl font-semibold'>Documentación</h2>
        <p className='text-gray-600'>
          Sube los documentos requeridos para completar tu registro
        </p>
      </div>

      {/* Subida de archivos */}
      <div>
        <label className='block mb-1 font-medium'>
          Documentos requeridos <span className='text-red-500'>*</span>
        </label>
        <p className='text-sm text-gray-600 mb-2'>
          Sube al menos uno de los siguientes documentos: poder, acta
          constitutiva o estatuto social.
        </p>

        {/* Área de carga */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className='border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50 hover:bg-gray-100 transition'
        >
          <Upload className='mx-auto text-gray-400 mb-2' size={32} />
          <p className='text-gray-700'>
            Arrastra y suelta tus archivos aquí,{" "}
            <label className='text-primary hover:underline cursor-pointer'>
              o busca en tu computadora
              <input
                type='file'
                accept='.pdf,.jpg,.jpeg,.png'
                multiple
                onChange={handleFileChange}
                className='hidden'
              />
            </label>
          </p>
          <p className='text-sm text-gray-500 mt-1'>
            Formatos aceptados: PDF, JPG, PNG (máximo 10MB por archivo)
          </p>
        </div>

        {/* Lista de archivos */}
        {files.length > 0 && (
          <div className='mt-4 space-y-2'>
            {files.map((file, index) => (
              <div
                key={index}
                className='flex items-center justify-between border rounded-lg p-2 bg-white shadow-sm'
              >
                <div className='flex items-center gap-2'>
                  <FileText size={18} className='text-primary' />
                  <div>
                    <p className='text-sm font-medium text-gray-800'>
                      {file.name}
                    </p>
                    <p className='text-xs text-gray-500'>
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <div
                  onClick={() => handleRemoveFile(index)}
                  className='text-gray-400 hover:text-red-500 transition cursor-pointer'
                >
                  <X size={18} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Checkbox de confirmación */}
      <div className='flex items-start gap-2'>
        <input
          type='checkbox'
          id='representante'
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          className='mt-1 accent-primary w-4 h-4'
        />
        <label htmlFor='representante' className='text-sm text-gray-700'>
          <span className='font-medium'>
            Confirmo que soy el representante legal autorizado de la empresa{" "}
            <span className='text-red-500'>*</span>
          </span>
          <br />
          <span className='text-gray-500'>
            Al marcar esta casilla, certificas que tienes la autoridad legal
            para representar a la empresa y que toda la información
            proporcionada es veraz y completa.
          </span>
        </label>
      </div>
    </div>
  );
}
