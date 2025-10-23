import React, { useState } from "react";
import "./NewKey.css";
import { Eye, EyeOff } from "lucide-react";

const NuevaClave: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para actualizar la contraseña
    console.log("Nueva contraseña:", password);
    console.log("Confirmación:", confirmPassword);
  };

  return (
    <div className="nueva-clave-container">
      <button className="btn-login">Iniciar sesión</button>
      <div className="nueva-clave-card">
        <h2 className="titulo">Nueva clave</h2>
        <p className="descripcion">Ingresa una nueva contraseña para tu cuenta</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="password">Ingresa tu nueva contraseña</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="mínimo 8 letras"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <div className="input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="mínimo 8 letras"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
              />
              <span
                className="eye-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          <button type="submit" className="btn-actualizar">
            ACTUALIZAR CONTRASEÑA
          </button>
        </form>
      </div>
    </div>
  );
};

export default NuevaClave;
