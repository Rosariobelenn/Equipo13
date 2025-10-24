import React from "react";
import "./Login.css";
import NewKey from "./NewKey";

const Loginkeytree: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="login-container2">
      <form className="login-form" onSubmit={handleSubmit}>
        <NewKey/>
        {/* Formulario vacío - listo para agregar campos después */}
      </form>
    </div>
  );
};

export default Loginkeytree;
