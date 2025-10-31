import React from "react";
import "./GreenWaterButton.css";

interface GreenWaterButtonProps {
  texto?: string;
  onClick?: () => void;
}

const GreenWaterButton: React.FC<GreenWaterButtonProps> = ({
  texto = "Nueva Solicitud",
  onClick,
}) => {
  return (
    <button className="boton-verde-agua" onClick={onClick}>
      {texto}
    </button>
  );
};

export default GreenWaterButton;
