import { CheckCircle } from "lucide-react";
import { confirmationSteps } from "../../data/confirmationSteps";
import StepItem from "./StepItem";

function NextSteps() {
  return (
    <section className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
      <header className="flex items-start gap-3 mb-4">
        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
        <h2 className="text-lg font-semibold">Próximos pasos</h2>
      </header>

      <ul className="space-y-4">
        {confirmationSteps.map((step) => (
          <StepItem key={step.title} {...step} />
        ))}
      </ul>
    </section>
  );
}

export default NextSteps;
