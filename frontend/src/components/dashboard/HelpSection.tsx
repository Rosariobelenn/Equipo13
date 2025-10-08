import { Users, FileText } from "lucide-react";
import HelpItem from "./HelpItem";

function HelpSection() {
  return (
    <section className="bg-white rounded-lg p-6 border border-slate-300/80">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 md:mb-8">
        ¿Necesitas ayuda?
      </h3>
      <main className="space-y-5">
        <HelpItem
          icon={Users}
          iconColor="text-blue-700"
          bgColor="bg-blue-50"
          title="Soporte telefónico"
          subtitle="0800-123-4567"
        />
        <HelpItem
          icon={FileText}
          iconColor="text-green-600"
          bgColor="bg-green-50"
          title="Guía paso a paso"
          subtitle="Aprende sobre el proceso"
        />
        <button className="w-full bg-cream-white hover:bg-stone-300 px-4 py-2 border border-stone-300 rounded-lg transition-colors cursor-pointer">
          Centro de ayuda
        </button>
      </main>
    </section>
  );
}

export default HelpSection;
