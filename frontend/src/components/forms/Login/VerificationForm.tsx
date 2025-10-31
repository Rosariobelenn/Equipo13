import React, { useState } from "react";
import "./VerificationForm.css";
import { Link } from "react-router-dom";

const Verificacion: React.FC = () => {
  const [code, setCode] = useState(["", "", "", ""]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.replace(/\D/, ""); // solo números
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // pasar al siguiente input automáticamente
    if (value && index < code.length - 1) {
      const nextInput = document.getElementById(`digit-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Código ingresado: " + code.join(""));
  };

  return (
    <div className="verificacion-container">
        <button className="btn-login">Iniciar sesión</button>
      <div className="verificacion-card">
        <h2 className="verificacion-title">Verificación</h2>
        <p className="verificacion-text">Ingresá los cuatro dígitos que recibiste en tu email</p>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`digit-${index}`}
                className="input-digit"
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
              />
            ))}
          </div>
          

        <Link to="/Myloginkeythree" type="submit" className="btn-continuar">
          CONTINUAR
        </Link>



        </form>
        <p className="reenviar-text">
          Si no recibiste el código hace clic en <span className="reenviar-link">Reenviar</span>
        </p>
      </div>
    </div>
  );
};

export default Verificacion;
