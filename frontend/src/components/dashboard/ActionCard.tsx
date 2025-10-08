import type { ActionCardProps } from "../../types/dashboard.types";

function ActionCard({
  icon: Icon,
  title,
  description,
  buttonText,
  buttonStyle,
  onButtonClick,
}: ActionCardProps) {
  return (
    <article
      className={`bg-white rounded-2xl p-8 flex flex-col items-center text-center ${
        buttonStyle === "primary"
          ? "border-2 border-slate-400/80"
          : "border-2 border-slate-200"
      }`}
    >
      <figure
        className={`${
          buttonStyle === "primary" ? "bg-slate-200" : "bg-blue-100"
        } p-4 rounded-full mb-4`}
      >
        <Icon
          className={`w-8 h-8 ${
            buttonStyle === "primary" ? "text-primary" : "text-blue-600"
          }`}
        />
      </figure>
      <h2 className="text-xl font-medium text-gray-900 mb-3">{title}</h2>
      <p className="text-gray-600 mb-6 w-11/12">{description}</p>
      <button
        onClick={onButtonClick}
        className={`w-full px-6 py-2 rounded-lg transition-colors cursor-pointer ${
          buttonStyle === "primary"
            ? "bg-primary hover:bg-blue-800 text-white border border-primary"
            : "bg-cream-white hover:bg-stone-300 border border-stone-300"
        }`}
      >
        {buttonText}
      </button>
    </article>
  );
}

export default ActionCard;
