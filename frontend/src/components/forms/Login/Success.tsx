import React from "react";
import "./Success.css";

interface SuccessProps {
  onContinue: () => void;
}

const Success: React.FC<SuccessProps> = ({ onContinue }) => {
  return (
    <div className="success-container">
        <button className="btn-login">Iniciar sesión</button>
      <div className="success-card">
        <h1 className="success-title">Éxito</h1>
        <p className="success-text">Tu clave fue reseteada correctamente</p>
        <button className="success-button" onClick={onContinue}>
          CONTINUAR
        </button>
      </div>
    </div>
  );
};

export default Success;
