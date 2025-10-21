import React, { useState } from "react";
import "./SolicitudCredito.css";
import BotonVerdeAgua from "./BotonVerdeAgua";

const SolicitudCredito: React.FC = () => {
  const [monto, setMonto] = useState("");
  const [cuotas, setCuotas] = useState("");
  const [banco, setBanco] = useState("");
  const [tipoCuenta, setTipoCuenta] = useState("");
  const [cbucvu, setCbucvu] = useState("");
  const [titular, setTitular] = useState("");

  return (
    <div className="solicitud-container">
        <div className="ppositioon">
            <div>
      <a href="#" className="volver-link">← Volver al dashboard</a>
      </div>
      <div>
      <BotonVerdeAgua/>
      </div>
       </div>



      <h1>Solicitar crédito</h1>
      <p className="subtitle">Completa los datos para tu solicitud de crédito</p>

      {/* Monto y condiciones */}
      <section className="section">
        <h2>💰 Monto y Condiciones</h2>
        <div className="form-row">
          <div className="form-group">
            <label>Monto solicitado *</label>
            <input
              type="number"
              placeholder="$ 0"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
            />
            <small>Monto mínimo: $50.000 - Máximo: $5.000.000</small>
          </div>

          <div className="form-group">
            <label>Cantidad de cuotas *</label>
            <select value={cuotas} onChange={(e) => setCuotas(e.target.value)}>
              <option value="">Seleccionar cuotas</option>
              <option value="6">6 cuotas</option>
              <option value="12">12 cuotas</option>
              <option value="24">24 cuotas</option>
            </select>
          </div>
        </div>
      </section>

      {/* Cuenta para depósito */}
      <section className="section">
        <h2>🏦 Cuenta para Depósito</h2>
        <div className="form-row">
          <div className="form-group">
            <label>Banco *</label>
            <select value={banco} onChange={(e) => setBanco(e.target.value)}>
              <option value="">Selecciona tu banco</option>
              <option value="Santander">Santander</option>
              <option value="BBVA">BBVA</option>
              <option value="Galicia">Galicia</option>
            </select>
          </div>

          <div className="form-group">
            <label>Tipo de cuenta *</label>
            <select value={tipoCuenta} onChange={(e) => setTipoCuenta(e.target.value)}>
              <option value="">Seleccionar tipo</option>
              <option value="CC">Cuenta Corriente</option>
              <option value="CA">Caja de Ahorro</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>CBU/CVU *</label>
            <input
              type="text"
              maxLength={22}
              placeholder="0000000000000000000000"
              value={cbucvu}
              onChange={(e) => setCbucvu(e.target.value)}
            />
            <small>22 dígitos sin espacios ni guiones</small>
          </div>

          <div className="form-group">
            <label>Titular de la cuenta *</label>
            <input
              type="text"
              placeholder="Nombre completo del titular"
              value={titular}
              onChange={(e) => setTitular(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Documentación */}
      <section className="section">
        <h2>📄 Documentación Requerida</h2>

        {[
          "Estados contables (últimos 2 meses)",
          "Certificado de Ingresos Brutos",
          "Extracto bancario (último mes)",
        ].map((titulo, idx) => (
          <div key={idx} className="upload-box">
            <label>{titulo} *</label>
            <div className="upload-area">
              <p>📤 Haz clic para subir o arrastra aquí</p>
              <small>PDF o imagen (máx. 5MB)</small>
              <input type="file" />
            </div>
          </div>
        ))}
      </section>

      <button className="submit-button">📨 Enviar Solicitud de Crédito</button>
    </div>
  );
};

export default SolicitudCredito;
