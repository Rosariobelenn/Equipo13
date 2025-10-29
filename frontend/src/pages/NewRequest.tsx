import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  FileText,
  CreditCard,
  Calculator,
  Banknote,
  Link2,
} from "lucide-react";
import { useCreateCreditApplication } from "../hooks/useCreditApplications";
import type { CreditRequest } from "../types/credit.types";

const NewRequest = () => {
  const navigate = useNavigate();
  const { createApplication, isCreating, isSuccess, data, isError } =
    useCreateCreditApplication();

  const [formData, setFormData] = useState<CreditRequest>({
    credit_amount: 0,
    credit_installment_count: 1,
    bank_name: "",
    bank_type: "",
    bank_cbu_cvu: "",
    bank_holder_name: "",
    document_financial_statements: "",
    document_gross_income_certificate: "",
    document_statement_file: "",
  });

  const [uploadMode, setUploadMode] = useState({
    financial_statements: "url" as "url" | "file",
    gross_income: "url" as "url" | "file",
    bank_statement: "url" as "url" | "file",
  });

  const [files, setFiles] = useState({
    financial_statements: null as File | null,
    gross_income: null as File | null,
    bank_statement: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "credit_amount" || name === "credit_installment_count"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handleUrlChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    documentField: keyof CreditRequest
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [documentField]: value,
    }));
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof typeof files,
    documentField: keyof CreditRequest
  ) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setFiles((prev) => ({ ...prev, [fieldName]: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData((prev) => ({
          ...prev,
          [documentField]: base64String.split(",")[1],
        }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("El archivo debe ser menor a 5MB");
    }
  };

  const toggleUploadMode = (field: keyof typeof uploadMode) => {
    setUploadMode((prev) => ({
      ...prev,
      [field]: prev[field] === "url" ? "file" : "url",
    }));

    const documentFieldMap = {
      financial_statements: "document_financial_statements",
      gross_income: "document_gross_income_certificate",
      bank_statement: "document_statement_file",
    };

    setFormData((prev) => ({
      ...prev,
      [documentFieldMap[field]]: "",
    }));

    setFiles((prev) => ({
      ...prev,
      [field]: null,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.credit_amount < 50000 || formData.credit_amount > 5000000) {
      alert("El monto debe estar entre $50,000 y $5,000,000");
      return;
    }

    if (
      !formData.bank_name ||
      !formData.bank_type ||
      !formData.bank_cbu_cvu ||
      !formData.bank_holder_name
    ) {
      alert("Por favor completa todos los campos de la cuenta bancaria");
      return;
    }

    if (
      !formData.document_financial_statements ||
      !formData.document_gross_income_certificate ||
      !formData.document_statement_file
    ) {
      alert("Por favor sube todos los documentos requeridos");
      return;
    }

    console.log(formData);
    createApplication(formData);
  };

  if (isSuccess && data) {
    navigate("/successful-request", {
      state: {
        summary: {
          referenceNumber: data.credit_application.id,
        },
      },
    });
  }

  const renderDocumentInput = (
    field: keyof typeof uploadMode,
    documentField: keyof CreditRequest,
    label: string,
    inputId: string
  ) => {
    const mode = uploadMode[field];
    const file = files[field];
    const urlValue = formData[documentField] as string;

    return (
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            {label} *
          </label>
          <button
            type="button"
            onClick={() => toggleUploadMode(field)}
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
              onChange={(e) => handleUrlChange(e, documentField)}
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
              onChange={(e) => handleFileChange(e, field, documentField)}
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
      </div>
    );
  };

  return (
    <section className="bg-gray-50 p-6">
      <article className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al dashboard
          </Link>
          <p className="px-10 py-[5px] text-sm bg-teal-100 border border-teal-400 text-teal-700 rounded-lg select-none">
            Nueva Solicitud
          </p>
        </header>

        <>
          <h1 className="text-3xl text-center mb-2">Solicitar crédito</h1>
          <p className="text-gray-500 text-center mb-6">
            Completa los datos para tu solicitud de crédito
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
            {/* Monto y Condiciones */}
            <section className="bg-white border border-gray-300 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-5 h-5 text-teal-600" />
                <h2 className="text-lg">Monto y Condiciones</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monto solicitado *
                  </label>
                  <div className="relative bg-gray-200/60 rounded-lg">
                    <span className="absolute left-3 top-2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      name="credit_amount"
                      value={formData.credit_amount || ""}
                      onChange={handleInputChange}
                      className="w-full pl-8 pr-4 py-2 rounded-lg"
                      placeholder="0"
                      min="50000"
                      max="5000000"
                      required
                    />
                  </div>
                  <p className="text-xs font-semibold text-gray-500 mt-1">
                    Monto mínimo: $50.000 - Máximo: $5.000.000
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cantidad de cuotas *
                  </label>
                  <select
                    name="credit_installment_count"
                    value={formData.credit_installment_count}
                    onChange={handleInputChange}
                    className="w-full bg-gray-200/60 px-4 py-2 rounded-lg"
                    required
                  >
                    <option value="">Seleccionar cuotas</option>
                    {[1, 3, 6, 12, 18, 24, 36, 48].map((count) => (
                      <option key={count} value={count}>
                        {count} {count === 1 ? "cuota" : "cuotas"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            {/* Cuenta para Depósito */}
            <section className="bg-white border border-gray-300 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg">Cuenta para Depósito</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Banco *
                  </label>
                  <select
                    name="bank_name"
                    value={formData.bank_name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-200/60 px-4 py-2 rounded-lg"
                    required
                  >
                    <option value="">Selecciona tu banco</option>
                    <option value="Banco Nación">Banco Nación</option>
                    <option value="Banco Provincia">Banco Provincia</option>
                    <option value="Banco Galicia">Banco Galicia</option>
                    <option value="Banco Santander">Banco Santander</option>
                    <option value="BBVA">BBVA</option>
                    <option value="HSBC">HSBC</option>
                    <option value="Banco Macro">Banco Macro</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de cuenta *
                  </label>
                  <select
                    name="bank_type"
                    value={formData.bank_type}
                    onChange={handleInputChange}
                    className="w-full bg-gray-200/60 px-4 py-2 rounded-lg"
                    required
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="Caja de Ahorro">Caja de Ahorro</option>
                    <option value="Cuenta Corriente">Cuenta Corriente</option>
                    <option value="Cuenta Sueldo">Cuenta Sueldo</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CBU/CVU *
                  </label>
                  <input
                    type="text"
                    name="bank_cbu_cvu"
                    value={formData.bank_cbu_cvu}
                    onChange={handleInputChange}
                    className="w-full bg-gray-200/60 px-4 py-2 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="0000000000000000000000"
                    maxLength={22}
                    required
                  />
                  <p className="text-xs font-semibold text-gray-500 mt-1">
                    22 dígitos sin espacios ni guiones
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titular de la cuenta *
                  </label>
                  <input
                    type="text"
                    name="bank_holder_name"
                    value={formData.bank_holder_name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-200/60 px-4 py-2 rounded-lg"
                    placeholder="Nombre completo del titular"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Documentación Requerida */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg">Documentación Requerida</h2>
              </div>

              {/* Nuevo codigo */}
              <div className="space-y-4">
                {renderDocumentInput(
                  "financial_statements",
                  "document_financial_statements",
                  "Estados contables (últimos 2 meses)",
                  "financial-statements"
                )}

                {renderDocumentInput(
                  "gross_income",
                  "document_gross_income_certificate",
                  "Certificado de Ingresos Brutos",
                  "gross-income"
                )}

                {renderDocumentInput(
                  "bank_statement",
                  "document_statement_file",
                  "Extracto bancario (último mes)",
                  "bank-statement"
                )}
              </div>
            </section>

            {/* Mensajes de estado */}
            {isError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">
                  Error al enviar la solicitud, intenta nuevamente más tarde
                </p>
              </div>
            )}

            {isSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm">
                  ¡Solicitud enviada exitosamente! Redirigiendo...
                </p>
              </div>
            )}

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={isCreating}
              className="w-fit mt-8 mb-4 mx-auto bg-blue-800 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {isCreating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Banknote className="w-5 h-5" />
                  Enviar Solicitud de Crédito
                </>
              )}
            </button>
          </form>
        </>
      </article>
    </section>
  );
};

export default NewRequest;
// export default CreditApplicationForm;
