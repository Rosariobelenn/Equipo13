import React from "react";
import Loginoperator from "../components/forms/Login/Loginoperator";
import TitleBlue from "../components/forms/Login/TitleBlue";


const MyLoginOperator: React.FC = () => {
  return (
    <div className="fondo">
    <Loginoperator />
    <TitleBlue texto="Mi título alineado a la izquierda" />
    </div>
  );
};

export default MyLoginOperator;