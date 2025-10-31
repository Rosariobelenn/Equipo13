import React from "react";
import Loginkey from "../components/forms/Login/Loginkey";
import TitleBluetwo from "../components/forms/Login/TitleBluetwo";


const Myloginkey: React.FC = () => {
  return (
    <div className="fondo">
      <Loginkey />
      <TitleBluetwo texto="Mi título alineado a la izquierda" />
    </div>
  );
};

export default Myloginkey;