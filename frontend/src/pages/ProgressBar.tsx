import React from "react";
import "./ProgressBar.css";

interface ProgressBarProps {
  step: 0 | 1 | 2 | 3;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  let porcentaje = 0;
  let mensaje = "";

  if (step === 0) {
    porcentaje = 0;
    mensaje = "Próximo paso: Cargar documentación";
  } else if (step === 1) {
    porcentaje = 25;
    mensaje = "Próximo paso: Revisión de documentos iniciada";
  } else if (step === 2) {
    porcentaje = 50;
    mensaje = "Próximo paso: Análisis crediticio";
  } else if (step === 3) {
    porcentaje = 100;
    mensaje = "Carga completa";
  }

  return (
    <div className="progress-container">
      <h2 className="htwo">Progreso del proceso</h2>

      <div className="progress-wrapper">
        <div className="progress-percent-top">{porcentaje}%</div>

        <div className="progress-bar">
          <div
            className="progress-filled"
            style={{ width: `${porcentaje}%` }}
          ></div>
        </div>
      </div>

      <p className="progress-message">{mensaje}</p>
    </div>
  );
};

export default ProgressBar;
