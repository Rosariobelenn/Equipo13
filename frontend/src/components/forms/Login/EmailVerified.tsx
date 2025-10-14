import React from "react";
import "./EmailVerified.css";
import LogoCheck from "./LogoCheck";

const EmailVerified: React.FC = () => {
  const handleAccess = () => {
    alert("Accediendo al sistema..."); // después podés navegar a otra ruta
  };

  return (
    <div className="verified-container">
      <div className="verified-card">
        <div className="icon-circle success">

           {/* Círculo con el logo de verificación */}
        <div className="icon-circle success">
          <LogoCheck />
        </div>

        </div>

        <h2 className="letrra">¡Email verificado!</h2>
        <p className="parr">Tu correo electrónico ha sido confirmado exitosamente</p>

        <div className="verified-box">
          <span> logo Verificado</span>
          <span className="email">fedeecrer@gmail.com</span>
        </div>

        <button className="access-btn" onClick={handleAccess}>
          Acceder al sistema
        </button>
      </div>
    </div>
  );
};

export default EmailVerified;
