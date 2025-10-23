import React from "react";
import "./Login.css";
import Success from "./Success";

const Loginkeytree: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleContinue = () => {
    console.log("Continuar presionado");
    // Aquí podrías redirigir con React Router, por ejemplo
  };

  return (
    <div className="login-container2">
      <form className="login-form" onSubmit={handleSubmit}>
        {/* Formulario vacío - listo para agregar campos después */}
        <Success onContinue={handleContinue} />
      </form>
    </div>
  );
};

export default Loginkeytree;

