import React from "react";
import Loginkeyfour from "../components/forms/Login/Loginkeyfour";
import TitleBluetwo from "../components/forms/Login/TitleBluetwo";


const Myloginkeyfour: React.FC = () => {
  return (
    <div className="fondo">
      <Loginkeyfour />
      <TitleBluetwo texto="Mi título alineado a la izquierda" />
    </div>
  );
};

export default Myloginkeyfour;