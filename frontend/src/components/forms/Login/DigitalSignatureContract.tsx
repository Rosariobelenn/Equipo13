import React from "react";
import "./DigitalSignatureContract.css";
import PenTool from "./SignatureIcon";

const DigitalSignatureContract: React.FC = () => {
  const handleCancel = () => {
    console.log("Cancel clicked");
  };

  const handleSign = () => {
    console.log("Signing contract digitally");
  };

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
          <div className="signature-icon"><PenTool/></div>
          <h3 className="lettter">Área de firma digital</h3>
          <p className="paragraphh">
            Al hacer clic, confirmas que has leído y aceptas todos los términos del contrato.
          </p>
          <div className="important-note">
            <strong>Importante:</strong> La firma digital tiene la misma validez legal que una manuscrita.
          </div>
        </div>

        <div className="buttons">
          <button className="btn cancel" onClick={handleCancel}>
            Cancelar
          </button>
          <button className="btn sign" onClick={handleSign}>
            Firmar digitalmente
          </button>
        </div>
      </div>
    </div>
  );
};

export default DigitalSignatureContract;
