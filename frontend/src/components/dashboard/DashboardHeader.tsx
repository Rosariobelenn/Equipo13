import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { GetCompanyByUserIdResponse } from "../../types/credit.types";

function DashboardHeader({ company }: { company: GetCompanyByUserIdResponse }) {
  return (
    <section className="bg-white rounded-2xl shadow-lg p-6 mb-6 md:mb-10 flex flex-col md:flex-row justify-between items-center">
      <header className="mb-4 md:mb-0">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          ¡Bienvenido de nuevo!
        </h1>
        <p className="text-gray-600">
          Panel de control - {company.company.business_name}
        </p>
      </header>
      <Link
        to="/new-request"
        className="bg-primary hover:bg-blue-800 text-white w-full md:w-fit md:px-22 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
      >
        <Building2 className="w-5 h-5" />
        Nueva solicitud
      </Link>
    </section>
  );
}

export default DashboardHeader;
