import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuth } from "../../../context/AuthContext";
const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"cliente" | "operador">("cliente");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);

      const storedUser = JSON.parse(localStorage.getItem("userData") || "null");

      console.log("Inicio de sesión exitoso ✅", storedUser);

      if (storedUser?.role?.toUpperCase() === "ADMIN") {
        navigate("/operator");
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`);
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
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
    <div className='login-container2'>
      <form className='login-form' onSubmit={handleSubmit}>
        <div className='toggle-container'>
          <div className='toggle-tabs'>
            <button
              type='button'
              onClick={handleClienteClick}
              className={`toggle-tab ${
                activeTab === "cliente" ? "active-tab" : "inactive-tab"
              }`}
            >
              Soy cliente
            </button>
            <button
              type='button'
              onClick={handleOperadorClick}
              className={`toggle-tab ${
                activeTab === "operador" ? "active-tab" : "inactive-tab"
              }`}
            >
              Soy operador
            </button>
          </div>
        </div>

        <div className='conteinertituloform'>
          <h2 className='tituloform'>
            {activeTab === "cliente" ? "Bienvenido" : "Acceso Operadores"}
          </h2>
          <h4 className='subtituloform'>
            {activeTab === "cliente"
              ? "Accede a tu cuenta o registra tu empresa"
              : "Panel de gestión de solicitudes de crédito"}
          </h4>
        </div>

        {/* Email input */}
        <div className='input-group'>
          <label className='labelonne'>Correo electrónico</label>
          <input
            className='botton'
            type='email'
            placeholder='Ingresa tu correo corporativo'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password input */}
        <div className='input-group password-group'>
          <label className='labelonne'>Contraseña</label>
          <div className='password-wrapper'>
            <input
              className='botton'
              type={showPassword ? "text" : "password"}
              placeholder='Ingresa tu contraseña'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className='show-password-icon'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
        </div>

        {/* Remember me checkbox */}
        <div className='remember-me'>
          <input
            className='botton'
            type='checkbox'
            id='rememberMe'
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor='rememberMe' className='label2'>
            Recordarme
          </label>
        </div>

        {/* Submit button */}
        <button type='submit' className='extra-class' disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>

        <p className='register-text'>
          ¿No tenés cuenta?{" "}
          <strong className='strg'>
            <a
              className='texxto'
              onClick={() => navigate("/register")}
              style={{ cursor: "pointer" }}
            >
              Regístrate acá
            </a>
          </strong>
        </p>
      </form>
    </div>
  );
};

export default Login;
