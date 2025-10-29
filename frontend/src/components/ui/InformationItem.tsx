import { AlertCircle } from "lucide-react";

function InformationItem() {
  return (
    <section className="bg-yellow-50/70 border border-yellow-200 rounded-lg p-6 mb-6">
      <header className="flex items-start gap-3 mb-3">
        <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
        <h2 className="text-lg font-semibold">Información importante</h2>
      </header>

      <ul className="space-y-2 text-sm ml-8 text-gray-800">
        <li className="list-disc">
          Mantén tu teléfono disponible, podríamos contactarte para aclarar
          información
        </li>
        <li className="list-disc">
          Revisa tu email regularmente, incluida la carpeta de spam
        </li>
        <li className="list-disc">
          Si no recibes noticias en 48 horas, contáctanos
        </li>
        <li className="list-disc">
          Toda la información será tratada de forma confidencial
        </li>
      </ul>
    </section>
  );
}

export default InformationItem;
