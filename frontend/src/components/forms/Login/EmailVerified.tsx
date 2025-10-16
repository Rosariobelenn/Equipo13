import React from "react";
import "./EmailVerified.css";
import LogoCheck from "./LogoCheck";
import LogoChecktwo from "./LogoChecktwo";

const EmailVerified: React.FC = () => {
  const handleAccess = () => {
    alert("Accediendo al sistema..."); // después podés navegar a otra ruta
  };

  return (
    <div className="verified-container">
      <div className="verified-card">
        <div className="icon-circle success">

           {/* Círculo con el logo de verificación */}
        <div className="icon-circle successs">
          <LogoCheck />
        </div>

        </div>

        <h2 className="letter">¡Email verificado!</h2>
        <p className="pair">Tu correo electrónico ha sido confirmado exitosamente</p>

        <div className="verified-box">
         
          <span className="conteiner-verl"> 
             
             <div className="icon-circlee success">
          <LogoChecktwo />
        </div>
            
            
                <p className="very">Verificado</p>
                
          <span className="email">fedeecrer@gmail.com</span>
          </span>
        </div>

        <button className="access-btn" onClick={handleAccess}>
          Acceder al sistema
        </button>
      </div>
    </div>
  );
};

export default EmailVerified;
