import React from "react";
import Loginkeytree from "../components/forms/Login/Loginkeytree";
import TitleBluetwo from "../components/forms/Login/TitleBluetwo";


const Myloginkeythree: React.FC = () => {
  return (
    <div className="fondo">
      <Loginkeytree />
      <TitleBluetwo texto="Mi título alineado a la izquierda" />
    </div>
  );
};

export default Myloginkeythree;