import React from "react";
import SectionHeader from "../components/ui/SectionHeader";
import { getHeaderBadge } from "../lib/utils/getHeaderBadge";
import ActionsItem from "../components/ui/ActionsItem";
import { formatDate } from "../lib/utils/utils";
import { CircleCheckBig, Clock } from "lucide-react";
import CurrentStatusBanner from "../components/ui/CurrentStatusBanner";
import { getProgressPercentage } from "../lib/utils/getProgressPercentage";

// --- INTERFAZ INCLUIDA ---
interface SolicitudAPI {
  id: number;
  amount: number;
  installment_count: number;
  status: string;
  created_at: string;
  updated_at: string;
  company: {
    business_name: string;
    tax_id: string;
    company_type: string;
  };
  legal_representative: {
    full_name: string;
    position: string;
    document_type: string;
    document_number: string;
    corporate_email: string;
    contact_phone: string;
  };
  bank_account: {
    bank_name: string;
    account_type: string;
    cbu_cvu: string;
  };
  documents: {
    id: number;
    document_type: string;
    file_path: string;
    approved: boolean;
    message: string | null;
  }[];
  comments: {
    id: number;
    author: string;
    message: string;
    created_at: string;
  }[];
  assigned_to: {
    id: number;
    name: string;
  } | null;
}
// --- FIN DE LA INTERFAZ ---

interface Props {
  data: SolicitudAPI;
}

const SolicitudDetalle: React.FC<Props> = ({ data }) => {
  const { company, legal_representative, amount, company_type, status } = data;
  const progress = getProgressPercentage(data.status);
  return (
    <div className='p-8 bg-gray-50 min-h-screen'>
      <div className='max-w-6xl mx-auto bg-white rounded-2xl shadow-sm p-8'>
        {/* Header */}
        <SectionHeader
          backLink={{
            path: "/operator",
            text: "Volver a solicitudes",
          }}
          title={`Solicitud ME-${data.id.toString().padStart(6, "0")}`}
          subtitle={company.business_name}
          badge={getHeaderBadge(status)}
        />

        {/* GRID PRINCIPAL */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6'>
          {/* Columna Izquierda (2/3) */}
          <div className='lg:col-span-2 space-y-2'>
            {/* Resumen de la solicitud */}
            <div className='border border-gray-200 rounded-xl p-5'>
              <h3 className='font-semibold mb-4 text-gray-800 flex items-center gap-2'>
                <span>📄</span> Resumen de la solicitud
              </h3>
              <div className='grid grid-cols-2 gap-y-2 text-sm text-gray-700'>
                <p>
                  <span className='font-medium'>Empresa:</span>{" "}
                  {company.business_name}
                </p>
                <p>
                  <span className='font-medium'>CUIT:</span> {company.tax_id}
                </p>
                <p>
                  <span className='font-medium'>Tipo societario:</span>{" "}
                  {company.company_type}
                </p>
                <p>
                  <span className='font-medium'>Monto solicitado:</span>{" "}
                  <span className='text-blue-600 font-semibold'>
                    ${amount.toLocaleString()}
                  </span>
                </p>
              </div>

              {/* Barra de progreso */}
            </div>
            <CurrentStatusBanner progress={progress} status={data.status} />

            {/* Estado del proceso */}
            <section className='border border-gray-200 rounded-xl p-6 bg-white'>
              <h3 className='font-semibold mb-5 text-gray-800 flex items-center gap-2 text-lg'>
                <span>⏱️</span> Estado del proceso
              </h3>

              <ul className='space-y-4'>
                <li className='flex items-start gap-4'>
                  <figure className='flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center'>
                    <CircleCheckBig className='w-5 h-5 text-green-600' />
                  </figure>
                  <aside className='flex-1'>
                    <p className='font-medium text-gray-900'>
                      Solicitud recibida
                    </p>
                    <p className='text-xs text-gray-500'>
                      Solicitud recibida exitosamente
                    </p>
                    <p className='text-xs text-gray-400'>
                      {formatDate(data.created_at)}
                    </p>
                  </aside>
                </li>

                <li className='flex items-start gap-4'>
                  <figure className='flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center'>
                    <CircleCheckBig className='w-5 h-5 text-green-600' />
                  </figure>
                  <aside className='flex-1'>
                    <p className='font-medium text-gray-900'>
                      Revisión de documentos
                    </p>
                    <p className='text-xs text-gray-500'>
                      Se comenzó la validación de la documentación
                    </p>
                    <p className='text-xs text-gray-400'>
                      {formatDate(data.updated_at)}
                    </p>
                  </aside>
                </li>

                <li className='flex items-start gap-4'>
                  <figure className='flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center'>
                    <CircleCheckBig className='w-5 h-5 text-green-600' />
                  </figure>
                  <aside className='flex-1'>
                    <p className='font-medium text-gray-900'>
                      Verificación empresarial
                    </p>
                    <p className='text-xs text-gray-500'>
                      Validación de datos societarios y AFIP
                    </p>
                    <p className='text-xs text-gray-400'>
                      01 de oct 2025, 09:15 a. m.
                    </p>
                  </aside>
                </li>

                <li className='flex items-start gap-4'>
                  <figure className='flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center'>
                    <Clock className='w-5 h-5 text-blue-600' />
                  </figure>
                  <aside className='flex-1'>
                    <p className='font-medium text-gray-900'>
                      Análisis crediticio
                    </p>
                    <p className='text-xs text-gray-500'>
                      Evaluación de capacidad de pago y riesgo
                    </p>
                  </aside>
                </li>

                <li className='flex items-start gap-4'>
                  <figure className='flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center'>
                    <div className='w-3 h-3 rounded-full bg-gray-400'></div>
                  </figure>
                  <aside className='flex-1'>
                    <p className='font-medium text-gray-500'>
                      Aprobación final
                    </p>
                    <p className='text-xs text-gray-500'>
                      Decisión definitiva y términos del crédito
                    </p>
                  </aside>
                </li>
              </ul>
            </section>
          </div>

          {/* Columna Derecha */}
          <div className='space-y-6'>
            {/* Representante legal */}
            <div className='border border-gray-200 rounded-xl p-5'>
              <h3 className='font-semibold mb-4 text-gray-800 flex items-center gap-2'>
                <span>👤</span> Representante legal
              </h3>
              <div className='text-sm text-gray-700 space-y-2'>
                <p>
                  <span className='font-medium'>Nombre completo:</span>{" "}
                  {legal_representative.full_name}
                </p>
                <p>
                  <span className='font-medium'>Cargo:</span>{" "}
                  {legal_representative.position}
                </p>
                <p>
                  <span className='font-medium'>Email:</span>{" "}
                  {legal_representative.corporate_email}
                </p>
                <p>
                  <span className='font-medium'>Teléfono:</span>{" "}
                  {legal_representative.contact_phone}
                </p>
              </div>
            </div>

            {/* Acciones */}
            <div>
              <ActionsItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolicitudDetalle;
