import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("cliente");
  const [showPassword, setShowPassword] = useState<boolean>(false); // <-- estado nuevo
  
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(
      `Email: ${email}\nPassword: ${password}\nRecordarme: ${
        rememberMe ? "Sí" : "No"
      }\nModo: ${activeTab}`
    );
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
            className={`toggle-btn ${activeTab === "cliente" ? "active extra-clase" : ""}`}
            onClick={() => setActiveTab("cliente")}
          >
            Soy cliente
          </button>
          <button
            type="button"
            className={`toggle-btn ${activeTab === "operador" ? "active extra-clase" : ""}`}
            onClick={() => setActiveTab("operador")}
          >
            Soy operador
          </button>
        </div>
</div>
        {/* Título y subtítulo */}
        <div className="conteinertituloform">
          <h2 className="tituloform">Bienvenido</h2>
          <h4 className="subtituloform">
            Accede a tu cuenta o registra tu empresa
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
        <button type="submit" className="extra-clase">Ingresar</button>

        {/* Enlace de registro */}
        <p className="register-text">
          ¿No tenes cuenta?{" "}
          <strong className="strg">
            <a className="texxto" onClick={() => navigate("/register")}>Regístrate acá</a>
          </strong>
        </p>
      </form>
      </div>
    </>
  );
};

export default Login;
