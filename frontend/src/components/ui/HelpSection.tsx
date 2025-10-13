import { BookOpen, Phone } from "lucide-react";

function HelpSection() {
  return (
    <article className="mt-4 bg-blue-50 rounded-xl p-6 border border-blue-100 flex items-start gap-3">
      <span className="w-4 h-4 mt-2 bg-neutral-300 rounded-full hidden md:block"></span>
      <aside className="flex-1">
        <h3 className="font-semibold text-gray-900 mb-2">¿Necesitas ayuda?</h3>
        <p className="text-gray-700 text-sm mb-3">
          Si tienes dudas sobre el proceso o necesitas asistencia, estamos acá
          para ayudarte.
        </p>
        <footer className="flex flex-col gap-3 md:flex-row">
          <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium border border-gray-200">
            <Phone className="w-4 h-4" />
            Contactar soporte
          </button>
          <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium border border-gray-200">
            <BookOpen className="w-4 h-4" />
            Guía paso a paso
          </button>
        </footer>
      </aside>
    </article>
  );
}

export default HelpSection;
