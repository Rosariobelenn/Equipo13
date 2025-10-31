import { X, PenTool } from "lucide-react";
import {
  calculateLoanPayment,
  formatModalSignatureAmount,
} from "../../../lib/utils/utils";
import type { DigitalSignatureModalProps } from "../../../types/common.types";

const DigitalSignatureModal: React.FC<DigitalSignatureModalProps> = ({
  isOpen,
  onClose,
  amount,
}) => {
  const ANNUAL_RATE = 35.5;
  const MONTHS = 24;

  const monthlyPayment = calculateLoanPayment(amount, ANNUAL_RATE, MONTHS);

  if (!isOpen) return null;

  return (
    <section className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <article className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <header className="flex items-center justify-between px-6 pt-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Firma digital del contrato
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <section className="p-6 py-4">
          <div className="bg-gray-100/80 rounded-lg p-4 mb-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Resumen del contrato
            </h3>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
              <li>
                <p className="text-gray-600 mb-1">
                  Monto:{" "}
                  <span className="text-gray-900 font-semibold">
                    {formatModalSignatureAmount(amount)}
                  </span>
                </p>
              </li>

              <li>
                <p className="text-gray-600 mb-1">
                  Tasa anual:{" "}
                  <span className="text-gray-900 font-semibold">
                    {ANNUAL_RATE}%
                  </span>
                </p>
              </li>

              <li>
                <p className="text-gray-600 mb-1">
                  Plazo:{" "}
                  <span className="text-gray-900 font-semibold">
                    {MONTHS} meses
                  </span>
                </p>
              </li>

              <li>
                <p className="text-gray-600 mb-1">
                  Cuota mensual:{" "}
                  <span className="text-gray-900 font-semibold">
                    {formatModalSignatureAmount(monthlyPayment)}
                  </span>
                </p>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-7 pb-4">
            <div className="flex flex-col items-center text-center">
              <div className="bg-gray-200 rounded-full p-4 mb-4">
                <PenTool className="w-7 h-7 text-gray-600" />
              </div>

              <h4 className="text-base font-medium text-gray-900 mb-1">
                Área de firma digital
              </h4>

              <p className="text-sm text-gray-600 max-w-md">
                Al hacer click, confirmas que has leído y aceptas todos los
                términos del contrato
              </p>
            </div>
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 py-2">
              <p className="text-center text-xs text-yellow-800">
                <strong className="font-semibold">Importante:</strong> La firma
                digital tiene la misma validez legal que una firma manuscrita.
              </p>
            </div>
          </div>
        </section>

        <footer className="flex flex-col sm:flex-row gap-3 px-6 pb-5 [&>button]:cursor-pointer">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>

          <button className="flex-1 px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            Firmar digitalmente
          </button>
        </footer>
      </article>
    </section>
  );
};

export default DigitalSignatureModal;
