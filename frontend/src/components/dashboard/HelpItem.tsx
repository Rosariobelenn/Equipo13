import type { HelpItemProps } from "../../types/dashboard.types";

function HelpItem({
  icon: Icon,
  iconColor,
  bgColor,
  title,
  subtitle,
}: HelpItemProps) {
  return (
    <article
      className={`${bgColor} rounded-lg p-4 py-3 flex items-center gap-3`}
    >
      <Icon className={`w-5 h-5 ${iconColor}`} />
      <aside>
        <p className="font-medium text-gray-900">{title}</p>
        <p
          className={
            subtitle.includes("0800") ? "text-primary" : "text-gray-600"
          }
        >
          {subtitle}
        </p>
      </aside>
    </article>
  );
}

export default HelpItem;
