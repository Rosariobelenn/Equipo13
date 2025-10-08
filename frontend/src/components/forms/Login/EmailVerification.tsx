import React, { useState, useEffect } from "react";
import "./EmailVerification.css";

const EmailVerification: React.FC = () => {
const [code, setCode] = useState("");
const [timer, setTimer] = useState(60);
const [isSent, setIsSent] = useState(true);

useEffect(() => {
    if (timer > 0) {
    const countdown = setInterval(() => setTimer(timer - 1), 1000);
    return () => clearInterval(countdown);
    }
}, [timer]);

const handleResend = () => {
    setIsSent(true);
    setTimer(60);
};

const handleVerify = () => {
    alert(`Código ingresado: ${code}`);
};

return (
    <div className="verify-container">
    <div className="verify-card">
        <div className="icon-circle">LOGO</div>
        <h2 className="ltverimail">Verifica tu email</h2>
        <p className="parrafo">Hemos enviado un código de 6 dígitos a{" "}   <br /> <a className="linking" href="mailto:fedeecrer@gmail.com">fedeecrer@gmail.com</a></p>

        <label className="labcod" htmlFor="code">Código de verificación *</label>
        <input
        className="inpt2"
        id="code"
        type="text"
        maxLength={6}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="000000"
        />
        <small className="pequeño">Ingresa el código de 6 dígitos que recibiste por email</small>

        <div className="resend-row">
        <span>⏱️ Reenviar en {timer > 0 ? `0:${timer}` : "0:00"}</span>
        {timer === 0 && (
            <button className="resend-btn" onClick={handleResend}>
            Reenviar código
            </button>
        )}
        </div>

        <button
        className={`verify-btn ${code.length === 6 ? "active" : ""}`}
        disabled={code.length !== 6}
        onClick={handleVerify}>Verificar código</button>

        <button className="change-email">← Cambiar email</button>

        {isSent && (
        <div className="success-box">
            ✓ Código enviado automáticamente a tu correo
        </div>
        )}
    </div>
    </div>
);
};

export default EmailVerification;
