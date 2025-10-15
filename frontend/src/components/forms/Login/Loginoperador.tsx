import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("cliente");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate(); // ✅ hook para navegar

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(
      `Email: ${email}\nPassword: ${password}\nRecordarme: ${
        rememberMe ? "Sí" : "No"
      }\nModo: ${activeTab}`
    );
  };

  // ✅ Funciones para manejar navegación
  const handleClienteClick = () => {
    setActiveTab("cliente");
    navigate("/");
  };

  const handleOperadorClick = () => {
    setActiveTab("operador");
    navigate("/Loginoperador");
  };

  return (
    <>
      {/* Mitad izquierda (color celeste) */}
      <div className="login-container2">
        {/* Mitad derecha (formulario azul oscuro) */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="toggle-container">
            {/* Toggle “Soy cliente / Soy operador” */}
            <div className="user-toggle">
              <button
                type="button"
                className={`toggle-btn ${
                  activeTab === "cliente" ? "active extra-class" : ""
                }`}
                onClick={handleClienteClick} > Soy cliente </button>
              <button
                type="button"
                className={`toggle-btn ${
                  activeTab === "operador" ? "active extra-class" : ""
                }`}
                onClick={handleOperadorClick} >
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

          {/* Enlace de registro */}
          <p className="register-text">
            Acceso restringido para personal autorizado
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;

