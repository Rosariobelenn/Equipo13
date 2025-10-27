import { MessageSquare, Download, ExternalLink } from "lucide-react";

function ActionsItem() {
  return (
    <div className="bg-white rounded-xl p-6 pt-4 border border-gray-200">
      <h3 className="text-center mb-5">Acciones</h3>
      <div className="space-y-3 [&>button]:w-full [&>button]:flex [&>button]:items-center [&>button]:gap-3 [&>button]:px-4 [&>button]:py-2 [&>button]:text-sm [&>button]:text-gray-700 [&>button]:bg-cream-white [&>button]:hover:bg-stone-300 [&>button]:border [&>button]:border-stone-300 [&>button]:rounded-md [&>button]:transition-colors [&>button]:cursor-pointer">
        <button>
          <MessageSquare className="w-4 h-4" />
          Enviar mensaje
        </button>

        <button>
          <Download className="w-4 h-4" />
          Descargar solicitud
        </button>

        <button>
          <ExternalLink className="w-4 h-4" />
          Ver documentación
        </button>
      </div>
    </div>
  );
}

export default ActionsItem;
