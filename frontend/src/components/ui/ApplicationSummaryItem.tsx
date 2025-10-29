import { FileText } from "lucide-react";
import { formatId } from "../../lib/utils/utils";
import type { ApplicationSummaryItemProps } from "../../types/credit.types";

function ApplicationSummaryItem({
  application,
  company,
  referenceNumber,
}: ApplicationSummaryItemProps) {
  return (
    <section className="bg-[#f9f7f4] rounded-lg p-6 mb-6">
      <header className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-blue-900" />
        <h2 className="text-lg font-semibold">Resumen de tu solicitud</h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="grid grid-cols-[150px_1fr] items-center gap-x-4">
            <p className="text-sm text-gray-600">Empresa:</p>
            <p className="font-medium text-gray-900">{company.business_name}</p>
          </div>

          <div className="grid grid-cols-[150px_1fr] items-center gap-x-4">
            <p className="text-sm text-gray-600">CUIT:</p>
            <p className="font-medium text-gray-900">{company.tax_id}</p>
          </div>

          <div className="grid grid-cols-[150px_1fr] items-center gap-x-4">
            <p className="text-sm text-gray-600">Figura jurídica:</p>
            <p className="font-medium text-gray-900">{company.company_type}</p>
          </div>

          <div className="grid grid-cols-[150px_1fr] items-center gap-x-4">
            <p className="text-sm text-gray-600">Número de referencia:</p>
            <p className="font-medium text-gray-900">
              ME-{formatId(referenceNumber)}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="grid grid-cols-[150px_1fr] items-center gap-x-4">
            <p className="text-sm text-gray-600">Representante:</p>
            <p className="font-medium text-gray-900">
              {application.requested_by.name}
            </p>
          </div>

          <div className="grid grid-cols-[150px_1fr] items-center gap-x-4">
            <p className="text-sm text-gray-600">Email:</p>
            <p className="font-medium text-gray-900">
              {application.requested_by.email}
            </p>
          </div>

          <div className="grid grid-cols-[150px_1fr] items-center gap-x-4">
            <p className="text-sm text-gray-600">Documentos:</p>
            <p className="font-medium text-gray-900">3 archivo(s)</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ApplicationSummaryItem;
