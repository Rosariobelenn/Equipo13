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
      <div className="btt">
  <button className="back-button" onClick={onBack}>
    ← Volver a solicitudes
  </button>

  
    <div className="solicitud-info">
      <h1 className="hone">{`Solicitud ${numeroSolicitud}`}</h1>
      <p className=".pone">{empresa}</p>
      
    </div>
    </div>
    {status && <span className="estado">{status}</span>}
  
</div>

  );
};

export default SolicitudHeader;




