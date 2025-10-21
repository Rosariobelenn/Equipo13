import React from "react";
import "./BotonVerdeAgua.css";

interface BotonVerdeAguaProps {
  texto?: string;
  onClick?: () => void;
}

const BotonVerdeAgua: React.FC<BotonVerdeAguaProps> = ({
  texto = "Nueva Solicitud",
  onClick,
}) => {
  return (
    <button className="boton-verde-agua" onClick={onClick}>
      {texto}
    </button>
  );
};

export default BotonVerdeAgua;
