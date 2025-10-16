import React from "react";
import Login from "../components/forms/Login/Login";
import TitleBlue from "../components/forms/Login/TitleBlue";


const Mylogin: React.FC = () => {
  return (
    <div className="fondo">
      <Login />
      <TitleBlue texto="Mi título alineado a la izquierda" />
    </div>
  );
};

export default Mylogin;