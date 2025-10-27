import React, { useState } from "react";
import "./RecoverKey.css";


const RecuperoClave: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email ingresado:", email);
    // Aquí podés agregar la lógica para enviar el código
  };

  return (
    <div className="recupero-container">
      <button className="btn-login">Iniciar sesión</button>

      <div className="recupero-card">
        <h2 className="recupero-title">Recupero de clave</h2>
        <p className="recupero-subtitle">
          Ingresá tu email para el proceso de verificación, te enviaremos un
          código de cuatro dígitos a tu correo.
        </p>

        <form onSubmit={handleSubmit} className="recupero-form">
          <label htmlFor="email" className="recupero-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Ingresá tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="recupero-input"
          />
          <button  type="submit" className="recupero-button">
            CONTINUAR
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecuperoClave;

