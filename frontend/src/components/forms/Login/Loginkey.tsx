import React from "react";
import "./Login.css";
import RecoverKey from "./RecoverKey"

const Loginkey: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="login-container2">
      <form className="login-form" onSubmit={handleSubmit}>
        <RecoverKey/>
        {/* Formulario vacío - listo para agregar campos después */}
      </form>
    </div>
  );
};

export default Loginkey;

