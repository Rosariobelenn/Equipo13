import React from "react";
import "./ProgressBar.css";

interface ProgressBarProps {
  step: 1 | 2 | 3; // el paso actual
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  // Calculamos el porcentaje según el paso
  let porcentaje = 0;
  
  if (step === 1) porcentaje = 25;
  else if (step === 2) porcentaje = 50;
  else if (step === 3) porcentaje = 100;

  return (
    <div className="progress-container">
      <h2 className="htwo">Estado del proceso</h2>
      <div className="progress-bar">
        <div
          className="progress-filled"
          style={{ width: `${porcentaje}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
