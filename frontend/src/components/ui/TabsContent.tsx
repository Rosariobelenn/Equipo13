import { Circle, CircleCheckBig, Clock } from "lucide-react";
import type { RequestStatusStep } from "../../types/request.types";

function TabsContent({
  title,
  requestDetails,
  description,
}: {
  title: string;
  requestDetails?: RequestStatusStep[];
  description?: string;
}) {
  return (
    <article>
      <h3 className="text-lg text-gray-900 mb-6">{title}</h3>

      {requestDetails && (
        <div className="space-y-6">
          {requestDetails.map((step) => (
            <div key={step.id} className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    step.status === "completed"
                      ? "bg-green-100"
                      : step.status === "current"
                      ? "bg-blue-100"
                      : "bg-gray-100"
                  }`}
                >
                  {step.status === "completed" ? (
                    <CircleCheckBig className="text-green-600" size={20} />
                  ) : step.status === "current" ? (
                    <Clock className="text-blue-600" size={20} />
                  ) : (
                    <Circle
                      className="text-gray-400"
                      fill="#99a1af"
                      size={13}
                    />
                  )}
                </div>
              </div>

              <aside className="flex-1">
                <h4
                  className={`${
                    step.status === "pending" ? "text-gray-400" : "text-black"
                  }`}
                >
                  {step.title}
                </h4>
                {step.date && (
                  <p className="text-sm text-gray-500">{step.date}</p>
                )}
              </aside>
            </div>
          ))}
        </div>
      )}
      {description && <p className="text-gray-600">{description}</p>}
    </article>
  );
}

export default TabsContent;
