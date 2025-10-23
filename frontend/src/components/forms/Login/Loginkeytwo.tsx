import React from "react";
import "./Login.css";
import VerificationForm from "./VerificationForm";

const Loginkeytwo: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="login-container2">
      <form className="login-form" onSubmit={handleSubmit}>
       < VerificationForm/>
        {/* Formulario vacío - listo para agregar campos después */}
      </form>
    </div>
  );
};

export default Loginkeytwo;
