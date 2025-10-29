import { Mail, Phone } from "lucide-react";

function HelpContact() {
  return (
    <section className="bg-white rounded-xl border border-gray-300 p-6 lg:mt-16 mb-6 text-center md:w-10/12 mx-auto">
      <h3 className="text-lg mb-2">¿Necesitas ayuda o tienes preguntas?</h3>
      <ul className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-600 mb-4">
        <li className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-blue-800" />
          <span>0800-123-4567</span>
        </li>
        <li className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-blue-800" />
          <span>soporte@pymego.com</span>
        </li>
      </ul>
      <p className="text-xs text-gray-500/80 font-medium">
        Horario de atención: Lunes a Viernes de 9:00 a 18:00 hs
      </p>
    </section>
  );
}

export default HelpContact;
