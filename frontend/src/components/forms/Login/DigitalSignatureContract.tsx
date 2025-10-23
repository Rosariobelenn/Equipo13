import React, { useState } from "react";
import "./DigitalSignatureContract.css";
import PenTool from "./SignatureIcon";

const DigitalSignatureContract: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [fechaFirma, setFechaFirma] = useState("");


  const handleVolver = () => {
  console.log("Volviendo a la pantalla anterior...");
  window.history.back(); // vuelve a la página anterior del navegador
};


  const handleCancel = () => {
    console.log("Cancel clicked");
    setNombre("");
    setApellido("");
    setDni("");
    setFechaFirma("");
  };

  const handleSign = () => {
    console.log("Signing contract digitally");

    let nombreIngresado = prompt("Ingresar nombre:");
    if (!nombreIngresado || !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombreIngresado)) {
      alert("El nombre solo debe contener letras.");
      return;
    }

    let apellidoIngresado = prompt("Ingresar apellido:");
    if (!apellidoIngresado || !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(apellidoIngresado)) {
      alert("El apellido solo debe contener letras.");
      return;
    }

    let dniIngresado = prompt("Ingresar DNI (solo números):");
    if (!dniIngresado || !/^\d+$/.test(dniIngresado)) {
      alert("El DNI solo debe contener números.");
      return;
    }

    setNombre(nombreIngresado);
    setApellido(apellidoIngresado);
    setDni(dniIngresado);

    const fecha = new Date().toLocaleString("es-AR", {
      dateStyle: "long",
      timeStyle: "short",
    });
    setFechaFirma(fecha);

    alert("Contrato firmado digitalmente ✅");
  };

  const firmaCompletada = nombre && apellido && dni;

  return (
    <div className="overlayy">
      <div className="contract-modal">
        <h2 className="titlee">Firma de contrato digital</h2>

        <div className="summary">
          <div className="summary-item">
            <p className="paragraphh">
              <span className="label">Cantidad:</span> $ 1.800.000
            </p>
            <p>
              <span className="label">Tasa anual:</span> 35.5%
            </p>
          </div>
          <div className="summary-item">
            <p className="paragraphh">
              <span className="label">Término:</span> 24 meses
            </p>
            <p>
              <span className="label">Pago mensual:</span> $ 104.250
            </p>
          </div>
        </div>

        <div className="signature-area">
          {!firmaCompletada ? (
            <>
              <div className="signature-icon">
                <PenTool />
              </div>
              <h3 className="lettter">Área de firma digital</h3>
              <p className="paragraphh">
                Al hacer clic, confirmas que has leído y aceptas todos los términos del contrato.
              </p>
              <div className="important-note">
                <strong>Importante:</strong> La firma digital tiene la misma validez legal que una manuscrita.
              </div>
            </>
          ) : (
            <div className="datos-firma">
              <h3 className="lettter">Firma registrada</h3>
              <p><strong>Nombre:</strong> {nombre}</p>
              <p><strong>Apellido:</strong> {apellido}</p>
              <p><strong>DNI:</strong> {dni}</p>
              <p><strong>Fecha de firma:</strong> {fechaFirma}</p>
            </div>
          )}
        </div>

        <div className="buttons">
          <button className="btn cancel" onClick={handleCancel}>
            Cancelar
          </button>
          {!firmaCompletada && (
            <button className="btn sign" onClick={handleSign}>
              Firmar digitalmente
            </button>
          )}
        </div>
      </div>

      {/* Botón volver fuera del contenedor principal */}
      <button className="btn volver" onClick={handleVolver}>
        Volver
      </button>

    </div>
  );
};

export default DigitalSignatureContract;
