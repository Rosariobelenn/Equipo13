import React from "react";
import Login from "../components/forms/Login/Login";
import TitleBluetwo from "../components/forms/Login/TitleBluetwo";


const Mylogin: React.FC = () => {
  return (
    <div className="fondo">
      <Login />
      <TitleBluetwo texto="Mi título alineado a la izquierda" />
    </div>
  );
};

export default Mylogin;