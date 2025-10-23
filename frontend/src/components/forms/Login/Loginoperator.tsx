import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Loginoperator: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"cliente" | "operador">("operador");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(
      `Email: ${email}\nPassword: ${password}\nRecordarme: ${
        rememberMe ? "Sí" : "No"
      }\nModo: ${activeTab}`
    );
  };

  const handleClienteClick = () => {
    setActiveTab("cliente");
    navigate("/");
  };

  const handleOperadorClick = () => {
    setActiveTab("operador");
    navigate("/MyLoginOperator");
  };

  return (
    <>
      <div className="login-container2">
        <form className="login-form" onSubmit={handleSubmit}>
          {/* 🔹 Toggle visual modernizado */}
          <div className="toggle-container">
            <div className="toggle-tabs">
              <button
                type="button"
                onClick={handleClienteClick}
                className={`toggle-tab ${
                  activeTab === "cliente"
                    ? "active-tab"
                    : "inactive-tab"
                }`}
              >
                Soy cliente
              </button>
              <button
                type="button"
                onClick={handleOperadorClick}
                className={`toggle-tab ${
                  activeTab === "operador"
                    ? "active-tab"
                    : "inactive-tab"
                }`}
              >
                Soy operador
              </button>
            </div>
          </div>

          {/* Título y subtítulo */}
          <div className="conteinertituloform">
            <h2 className="tituloform">Acceso Operadores</h2>
            <h4 className="subtituloform">
              Panel de gestión de solicitudes de crédito
            </h4>
          </div>

          {/* Input Correo */}
          <div className="input-group">
            <label className="label1">Correo electrónico</label>
            <input
              className="botton"
              type="email"
              placeholder="Ingresa tu correo corporativo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Input Contraseña */}
          <div className="input-group password-group">
            <label className="label1">Contraseña</label>
            <div className="password-wrapper">
              <input
                className="botton"
                type={showPassword ? "text" : "password"}
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="show-password-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
          </div>

          {/* Checkbox Recordarme */}
          <div className="remember-me">
            <input
              className="botton"
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe" className="label2">
              Recordarme
            </label>
          </div>

          {/* Botón Ingresar */}
          <button type="submit" className="extra-class">
            Ingresar
          </button>

          {/* Texto informativo */}
          <p className="register-text">
            Acceso restringido para personal autorizado
          </p>
        </form>
      </div>
    </>
  );
};

export default Loginoperator;
