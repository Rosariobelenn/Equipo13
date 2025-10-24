import React from "react";
import Loginkeytwo from "../components/forms/Login/Loginkeytwo";
import TitleBluetwo from "../components/forms/Login/TitleBluetwo";


const Myloginkeytwo: React.FC = () => {
  return (
    <div className="fondo">
      <Loginkeytwo />
      <TitleBluetwo texto="Mi título alineado a la izquierda" />
    </div>
  );
};

export default Myloginkeytwo;