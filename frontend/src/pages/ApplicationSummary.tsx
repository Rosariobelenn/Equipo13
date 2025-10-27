import React, { useState } from "react";
import "./ApplicationSummary.css";
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface Documento {
  nombre: string;
  archivo: string;
  tamaño: string;
  fecha: string;
  estado: "Aprobada" | "Faltante" | "Pendiente de revisión";
}

const initialDocumentos: Documento[] = [
  {
    nombre: "Acta Constitutiva",
    archivo: "acta_constitutiva.pdf",
    tamaño: "2.4 MB",
    fecha: "30 de mayo de 2025, 11 a.m.",
    estado: "Aprobada",
  },
  {
    nombre: "Estados contables",
    archivo: "",
    tamaño: "",
    fecha: "",
    estado: "Faltante",
  },
  {
    nombre: "Certificado AFIP",
    archivo: "certificado_afip_vigencia.pdf",
    tamaño: "856 KB",
    fecha: "30 de mayo de 2025, 11 a.m.",
    estado: "Pendiente de revisión",
  },
  {
    nombre: "DNI Representante Legal",
    archivo: "dni_Jane_Doe.pdf",
    tamaño: "1.2 MB",
    fecha: "30 de mayo de 2025, 11 a.m.",
    estado: "Aprobada",
  },
];

const ApplicationSummary: React.FC = () => {
  const [documentos, setDocumentos] = useState<Documento[]>(initialDocumentos);

  const handleEstadoChange = (index: number, nuevoEstado: Documento["estado"]) => {
    const nuevosDocs = [...documentos];
    nuevosDocs[index].estado = nuevoEstado;
    setDocumentos(nuevosDocs);
  };

  const mostrarAlertaContable = documentos.some(doc => doc.estado !== "Aprobada");

  return (
    <div className="solicitud-card">
      <h3 className="solicitud-titulo">Solicitud ME-00001232</h3>
      <p className="solicitud-subtitulo">Mi empresa S.R.L.</p>

      {documentos.map((doc, i) => (
        <div key={i} className="doc-item">
          <div className="doc-info">
            {doc.estado === "Aprobada" && <CheckCircle className="icon verde" />}
            {doc.estado === "Faltante" && <XCircle className="iconr rojo" />}
            {doc.estado === "Pendiente de revisión" && <Clock className="icon amarillo" />}
            <div>
              <p className="doc-nombre">{doc.nombre}</p>
              {doc.archivo && (
                <p className="doc-archivo">
                  {doc.archivo} • {doc.tamaño} • {doc.fecha}
                </p>
              )}
            </div>
          </div>

          <div className="doc-acciones">
            <select
              value={doc.estado}
              onChange={(e) => handleEstadoChange(i, e.target.value as Documento["estado"])}
              className={`estado ${doc.estado.toLowerCase().replace(/ /g, "-")}`}
            >
              <option>Aprobada</option>
              <option>Pendiente de revisión</option>
              <option>Faltante</option>
            </select>

            {doc.archivo && <button className="btn-adjunto">Ver adjunto</button>}
          </div>
        </div>
      ))}

      {mostrarAlertaContable && (
        <div className="estado-contable-alerta">
          <XCircle className="iconr rojo" />
          <p>
            <strong>Estado Contable Actualizado</strong>
            <br />
            Solicitar estado contable con fecha posterior a abril de 2025
          </p>
        </div>
      )}
    </div>
  );
};

export default ApplicationSummary;

