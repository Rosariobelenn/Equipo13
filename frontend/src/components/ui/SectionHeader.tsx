import { Link } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import type { SectionHeaderProps } from "../../types/types";

function SectionHeader({
  pathLink,
  pathText,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <header className="mb-4 flex flex-col md:flex-row justify-between items-center">
      <aside className="flex items-center gap-2">
        <Link
          to={pathLink}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{pathText}</span>
        </Link>

        <section className="pl-3 flex items-center">
          <div className="h-8 w-px bg-gray-300 mr-3"></div>
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>
            <p className="text-gray-600">{description}</p>
          </div>
        </section>
      </aside>
      <button className="w-full md:w-fit inline-flex items-center justify-center gap-2 px-6 py-[6px] bg-primary text-white rounded-sm hover:bg-blue-700 transition-colors cursor-pointer mt-4 md:mt-0">
        <Plus className="w-4 h-4" />
        Nueva solicitud
      </button>
    </header>
  );
}

export default SectionHeader;
