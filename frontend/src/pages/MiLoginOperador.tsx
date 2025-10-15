import React from "react";
import Loginoperador from "../components/forms/Login/Loginoperador";
import TituloCeleste from "../components/forms/Login/TituloCeleste";


const Milogin: React.FC = () => {
  return (
    <div className="fondo">
    <Loginoperador />
    <TituloCeleste texto="Mi título alineado a la izquierda" />
    </div>
  );
};

export default Milogin;