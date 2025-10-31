import { Upload, Link2 } from "lucide-react";
import type { DocumentInputProps } from "../../types/credit.types";

function DocumentInput({
  label,
  inputId,
  mode,
  file,
  urlValue,
  onToggleMode,
  onUrlChange,
  onFileChange,
}: DocumentInputProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-700">
          {label} *
        </label>
        <button
          type="button"
          onClick={onToggleMode}
          className="text-xs text-teal-600 hover:text-teal-700 flex items-center gap-1"
        >
          {mode === "url" ? (
            <>
              <Upload className="w-3 h-3" />
              Subir archivo
            </>
          ) : (
            <>
              <Link2 className="w-3 h-3" />
              Usar URL
            </>
          )}
        </button>
      </div>

      {mode === "url" ? (
        <div className="relative mb-2">
          <Link2 className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="url"
            value={urlValue}
            onChange={onUrlChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="https://ejemplo.com/documento.pdf"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Pega la URL del documento almacenado
          </p>
        </div>
      ) : (
        <div className="bg-gray-200/30 border-2 border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors mb-6">
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={onFileChange}
            className="hidden"
            id={inputId}
          />
          <label htmlFor={inputId} className="cursor-pointer">
            <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">
              {file ? (
                file.name
              ) : (
                <>
                  <strong>Haz clic para subir</strong> o arrastra aquí
                </>
              )}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PDF o imagen (máx. 5MB)
            </p>
          </label>
        </div>
      )}
    </>
  );
}

export default DocumentInput;
