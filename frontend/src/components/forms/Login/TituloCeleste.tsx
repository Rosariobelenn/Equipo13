// TituloCeleste.tsx
import React from "react";
import "./PymeGo.css";
import rocketIcon from "./rocket-icon.png";

interface TituloCelesteProps {
  texto: string;
}

const TituloCeleste: React.FC<TituloCelesteProps> = () => {
  return (
   <div className="login-container2">

     <div className="pymego-container">
      <div className="logo">
    <img className="imagee" src={rocketIcon} alt="Logo"  style={{ width: "150px", height: "auto", borderRadius: "10px" }} />

      </div>
      <div className="dots">
        <span className="spacio"></span>
        <span className="spacio"></span>
        <span className="spacio"></span>
      </div>
      <h1 className="title">PYME GO</h1>
      <p className="subtitle">
        Impulsa tu empresa con <br /> <strong>créditos inteligentes</strong>
      </p>
      <p className="description">
        Accede a financiamiento rápido y seguro <br />
        para PYMEs. <br />
        Proceso 100% digital, evaluación en minutos.
      </p>
      <div className="features">
        <div className="feature">
          <span className="icon">🛡️</span>
          Seguro
        </div>
        <div className="feature">
          <span  className="icon spacio">📄</span>
          Digital
        </div>
        <div className="feature">
          <span className="icon spacio">👥</span>
          Para PYMEs
        </div>
      </div>
    </div>

   </div>
  );
};

export default TituloCeleste;
