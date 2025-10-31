import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { SectionHeaderProps } from "../../types/common.types";
import { getBadgeClasses, getButtonClasses } from "../../lib/utils/styles";

function SectionHeader({
  backLink,
  title,
  subtitle,
  description,
  badge,
  actionButton,
}: SectionHeaderProps) {
  return (
    <header className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <aside className="flex flex-col gap-4 md:flex-row md:items-center md:gap-2">
        <Link
          to={backLink.path}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors pt-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="whitespace-nowrap">{backLink.text}</span>
        </Link>

        <section className="flex items-center">
          <div className="h-8 w-px bg-gray-300 mx-3"></div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <div>
                <h1 className="text-2xl md:text-[1.65rem] font-semibold text-gray-900">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-lg text-gray-700 mt-1">{subtitle}</p>
                )}
              </div>
            </div>
            {description && <p className="text-gray-600 mt-1">{description}</p>}
          </div>
        </section>
      </aside>

      {actionButton && actionButton.href && (
        <Link
          to={actionButton.href}
          className={`w-full md:w-fit inline-flex items-center justify-center gap-2 px-6 py-2 rounded-sm transition-colors ${getButtonClasses(
            actionButton.variant
          )}`}
        >
          {actionButton.icon}
          {actionButton.text}
        </Link>
      )}
      {badge && (
        <span
          className={`py-2 p-4 rounded-sm ${getBadgeClasses(badge.variant)}`}
        >
          {badge.text}
        </span>
      )}
    </header>
  );
}

export default SectionHeader;
