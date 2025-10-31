import type { CurrentStatusBannerProps } from "../../types/common.types";
import { getStatusLabel } from "../../lib/utils/getStatusLabel";

function CurrentStatusBanner({ progress, status }: CurrentStatusBannerProps) {
  return (
    <section className="bg-white rounded-xl p-4 md:p-6 border border-gray-200 mb-4">
      <header className="flex justify-between items-center mb-2">
        <h2 className="text-sm text-gray-700">Progreso del proceso</h2>
        <span className="text-sm text-gray-900">{progress}%</span>
      </header>
      <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
        <div
          className="bg-blue-800 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="font-semibold text-sm text-gray-900">
        {getStatusLabel(status)}
      </p>
    </section>
  );
}

export default CurrentStatusBanner;
