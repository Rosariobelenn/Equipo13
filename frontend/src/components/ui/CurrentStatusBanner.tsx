import type { CurrentStatusBannerProps } from "../../types/common.types";

function CurrentStatusBanner({
  title,
  description,
  icon,
}: CurrentStatusBannerProps) {
  return (
    <section className="bg-white rounded-xl p-4 md:p-6 my-4 md:my-8 border border-gray-200 flex items-center gap-4">
      <figure className="flex-shrink-0 w-11 h-11 bg-blue-100 rounded-full flex items-center justify-center">
        {icon}
      </figure>

      <aside>
        <h2 className="text-lg text-gray-900 mb-1">{title}</h2>
        <p className="text-gray-600 text-sm md:text-base">{description}</p>
      </aside>
    </section>
  );
}

export default CurrentStatusBanner;
