// TituloCeleste.tsx
import React from "react";
import "./PymeGo.css";
import rocketIcon from "./logsupl.png";

interface TitleBlueProps {
  texto: string;
}

const TitleBlue: React.FC<TitleBlueProps> = () => {
  return (
   <div className="login-container2">

     <div className="pymego-containertwo">
      <div className="logo">
    <img className="imagee" src={rocketIcon} alt="Logo"  style={{ width: "150px", height: "auto", borderRadius: "10px" }} />

      </div>
      <div className="dots">
        <span className="spacio"></span>
        <span className="spacio"></span>
        <span className="spacio"></span>
      </div>
      <h1 className="title">PYME GO</h1>
      
    </div>

   </div>
  );
};

export default TitleBlue;