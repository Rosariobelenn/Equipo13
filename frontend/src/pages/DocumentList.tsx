import React from "react";
import "./DocumentList.css";
import { CheckCircle, XCircle, Clock, Upload, Pencil } from "lucide-react";

interface Documento {
  id: number;
  nombre: string;
  archivo?: string;
  tamano?: string;
  fecha?: string;
  estado: "completo" | "faltante" | "pendiente";
}

const documentos: Documento[] = [
  {
    id: 1,
    nombre: "Acta Constitutiva",
    archivo: "acta_constitutiva.pdf",
    tamano: "2.4 MB",
    fecha: "30 de mayo de 2025, 11 a. m.",
    estado: "completo",
  },
  {
    id: 2,
    nombre: "Estados contables",
    estado: "faltante",
  },
  {
    id: 3,
    nombre: "Certificado AFIP",
    archivo: "certificado_afip_vigencia.pdf",
    tamano: "856 KB",
    fecha: "30 de mayo de 2025, 11 a. m.",
    estado: "pendiente",
  },
  {
    id: 4,
    nombre: "DNI Representante Legal",
    archivo: "dni_Jane_Doe.pdf",
    tamano: "1.2 MB",
    fecha: "30 de mayo de 2025, 11 a. m.",
    estado: "completo",
  },
];

const DocumentList: React.FC = () => {
  return (
    <div className="lista-container">
      <h2 className="solicitud-titulo">Solicitud ME-00001234</h2>
      <p className="empresa-nombre">Mi empresa S.R.L</p>

      {documentos.map((doc) => (
        <div key={doc.id} className="documento-card">
          <div className="documento-info">
            {doc.estado === "completo" && <CheckCircle className="icono verde" />}
            {doc.estado === "faltante" && <XCircle className="icono rojo" />}
            {doc.estado === "pendiente" && <Clock className="icono naranja" />}

            <div>
              <h3>{doc.nombre}</h3>
              {doc.archivo && (
                <p className="archivo-detalle">
                  {doc.archivo} • {doc.tamano} • {doc.fecha}
                </p>
              )}
            </div>
          </div>

          <div className="acciones">
            {doc.estado === "faltante" ? (
              <Upload className="icono-subir" />
            ) : (
              <button className="ver-adjunto">
                <Pencil size={16} /> Ver adjunto
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentList;
