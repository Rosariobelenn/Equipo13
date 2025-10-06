import React from "react";
import Login from "../components/forms/Login/Login";
import TituloCeleste from "../components/forms/Login/TituloCeleste";


const Milogin: React.FC = () => {
  return (
    <div className="fondo">
      <Login />
      <TituloCeleste texto="Mi título alineado a la izquierda" />
    </div>
  );
};

export default Milogin;