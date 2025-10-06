import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false); // nuevo estado
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes hacer la lógica de login
    alert(
      `Email: ${email}\nPassword: ${password}\nRecordarme: ${
        rememberMe ? "Sí" : "No"
      }`
    );
  };

  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={handleSubmit}>
        <div className='conteinertituloform'>
          <h2 className='tituloform'>Bienvenido</h2>
          <h4 className='subtituloform'>
            Accede a tu cuenta o registra tu empresa
          </h4>
        </div>

        <div className='input-group'>
          <label className='label1'>Correo Electronico</label>
          <input
            type='email'
            placeholder='Ingresa tu correo corporativo'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='input-group'>
          <label className='label1'>Contraseña</label>
          <input
            type='password'
            placeholder='Ingresa tu contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Checkbox Recordarme */}
        <div className='remember-me'>
          <input
            type='checkbox'
            id='rememberMe'
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor='rememberMe' className='label2'>
            {" "}
            Recordarme{" "}
          </label>
        </div>

        <button type='submit'>Ingresar</button>

        <p className='register-text'>
          ¿No tenes cuenta?
          <strong>
            <a onClick={() => navigate("/register")}>Regístrate acá</a>
          </strong>
        </p>
      </form>
    </div>
  );
};

export default Login;
