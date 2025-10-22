import React, { useState } from "react";
import "./ApplicationCredit.css";
import GreenWaterButton from "./GreenWaterButton";
import UploadIcon from "./UploadIcon"
import CalculatorIcon from "./CalculatorIcon";
import CreditCardIcon from "./CreditCardIcon";
import FileTextIcon from "./FileTextIcon";


const SolicitudCredito: React.FC = () => {
  const [monto, setMonto] = useState("");
  const [cuotas, setCuotas] = useState("");
  const [banco, setBanco] = useState("");
  const [tipoCuenta, setTipoCuenta] = useState("");
  const [cbucvu, setCbucvu] = useState("");
  const [titular, setTitular] = useState("");

  return (
    <div className="solicitud-containerfive">
        <div className="ppositioon">
            <div>
      <a href="#" className="volver-link">← Volver al dashboard</a>
      </div>
      <div>
      <GreenWaterButton/>
      </div>
       </div>



      <h1 className="h1five">Solicitar crédito</h1>
      <p className="subtitle">Completa los datos para tu solicitud de crédito</p>

      {/* Monto y condiciones */}
      <section className="section">
        <h2 className="h2five"><CalculatorIcon/> Monto y Condiciones</h2>
        <div className="form-row">
          <div className="form-group">
            <label className="labelf" >Monto solicitado *</label>
            <input
              className="inputfive"
              type="number"
              placeholder="$ 0"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
            />
            <small className="smallfive">Monto mínimo: $50.000 - Máximo: $5.000.000</small>
          </div>

          <div className="form-group">
            <label className="labelf">Cantidad de cuotas *</label>
            <select className="selectfive" value={cuotas} onChange={(e) => setCuotas(e.target.value)}>
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
        <h2 className="h2five"><CreditCardIcon/> Cuenta para Depósito</h2>
        <div className="form-row">
          <div className="form-group">
            <label className="labelf">Banco *</label>
            <select className="selectfive" value={banco} onChange={(e) => setBanco(e.target.value)}>
              <option value="">Selecciona tu banco</option>
              <option value="Santander">Santander</option>
              <option value="BBVA">BBVA</option>
              <option value="Galicia">Galicia</option>
            </select>
          </div>

          <div className="form-group">
            <label className="labelf">Tipo de cuenta *</label>
            <select className="selectfive" value={tipoCuenta} onChange={(e) => setTipoCuenta(e.target.value)}>
              <option value="">Seleccionar tipo</option>
              <option value="CC">Cuenta Corriente</option>
              <option value="CA">Caja de Ahorro</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="labelf">CBU/CVU *</label>
            <input
            className="inputfive"
              type="text"
              maxLength={22}
              placeholder="0000000000000000000000"
              value={cbucvu}
              onChange={(e) => setCbucvu(e.target.value)}
            />
            <small className="smallfive">22 dígitos sin espacios ni guiones</small>
          </div>

          <div className="form-group">
            <label className="labelf">Titular de la cuenta *</label>
            <input
              className="inputfive"
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
        <h2 className="h2five"><FileTextIcon/> Documentación Requerida</h2>

        {[
          "Estados contables (últimos 2 meses)",
          "Certificado de Ingresos Brutos",
          "Extracto bancario (último mes)",
        ].map((titulo, idx) => (
          <div key={idx} className="upload-box">
            <label className="labelf">{titulo} *</label>
            <div className="upload-area">
              <p className="pfive"> <div className="posdownld"> <UploadIcon/></div> Haz clic para subir o arrastra aquí</p>
              <small className="smallfive">PDF o imagen (máx. 5MB)</small>
              <input className="inputfive" type="file" />
            </div>
          </div>
        ))}
      </section>

      <button className="ssubmit-button">📨 Enviar Solicitud de Crédito</button>
    </div>
  );
};

export default SolicitudCredito;
