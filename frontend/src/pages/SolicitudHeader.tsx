import React from "react";
import "./SolicitudHeader.css";

interface SolicitudHeaderProps {
  numeroSolicitud: string;
  empresa: string;
  status?: string; // opcional, para mostrar estado
  onBack?: () => void;
}

const SolicitudHeader: React.FC<SolicitudHeaderProps> = ({
  numeroSolicitud,
  empresa,
  status,
  onBack,
}) => {
  return (
    <div className="solicitud-header-container">
      <button className="back-button" onClick={onBack}>
        ← Volver a solicitudes
      </button>
      <div className="solicitud-info">
        <h1>{`Solicitud ${numeroSolicitud}`}</h1>
        <p>{empresa}</p>
        {status && <span className="estado">{status}</span>}
      </div>
    </div>
  );
};

export default SolicitudHeader;




