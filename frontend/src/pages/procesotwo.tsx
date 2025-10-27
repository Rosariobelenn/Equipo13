import React from "react";
import "./Proceso.css";
import ProgressBar from "./ProgressBar";
import Message from "./logoss/Message";
import Downloadd from "./logoss/Download";
import Logdocumentation from "./logoss/Logdocumentation";
import Watch from "./logoss/Watch";
import Check from "./logoss/check";
import Checktwo from "./logoss/checktwo";


interface Paso {
  titulo: string;
  descripcion: string;
  fecha?: string;
  estado: "completado" | "en-proceso" | "pendiente";
}

const pasosBase: Paso[] = [
  {
    titulo: "Solicitud recibida",
    descripcion: "Solicitud recibida exitosamente",
    fecha: "30 de mayo de 2025, 11:00 a.m",
    estado: "pendiente",
  },
  {
    titulo: "Revisión de documentos iniciada",
    descripcion: "Se comenzó la validación de la documentación",
    fecha: "02 de junio de 2025, 10:30 a.m",
    estado: "pendiente",
  },
  {
    titulo: "Verificación empresarial",
    descripcion: "Validación de datos societarios y AFIP",
    estado: "pendiente",
  },
  {
    titulo: "Análisis crediticio",
    descripcion: "Evaluación de capacidad de pago y riesgo",
    estado: "pendiente",
  },
  {
    titulo: "Aprobación final",
    descripcion: "Decisión definitiva y términos del crédito",
    estado: "pendiente",
  },
];

interface ProcessProps {
  step: 0 | 1 | 2 | 3;
}

const Process: React.FC<ProcessProps> = ({ step }) => {
  // Calculamos el porcentaje según el step
  let porcentaje = 0;
  if (step === 1) porcentaje = 25;
  else if (step === 2) porcentaje = 50;
  else if (step === 3) porcentaje = 100;

  // Determinar cuántos pasos deben tener el icono <Check />
  let pasosCompletados = 0;
  if (porcentaje === 25) pasosCompletados = 1;
  else if (porcentaje === 50) pasosCompletados = Math.ceil(pasosBase.length / 2);
  else if (porcentaje === 100) pasosCompletados = pasosBase.length;
  else pasosCompletados = 0;

  // Generar pasos con estado según progreso
  const pasos = pasosBase.map((paso, index) => ({
    ...paso,
    estado: index < pasosCompletados ? "completado" : "pendiente",
  }));

  return (
    <div className="proceso-container">
      <div className="timeline">
        <div className="progesbar">
          <ProgressBar step={step} />
        </div>

        <h2 className="htwop posfour">
          <Watch /> Estado del proceso
        </h2>

        {pasos.map((paso, index) => {
  let icono;

  if (paso.estado === "completado") {
    icono = <Check />;
  } else if (paso.estado === "en-proceso") {
    icono = "⏳"; // ícono para pasos en proceso
  } else {
    // Paso pendiente
    if (paso.titulo === "Aprobación final") {
      icono = "⏱"; // ícono especial para "Aprobación final" pendiente
    } else {
      icono = <Checktwo />; // ícono normal para el resto de pendientes
    }
  }

          return (
            <div key={index} className="timeline-item">
              <div className={`timeline-icon ${paso.estado}`}>{icono}</div>
              <div className="timeline-content">
                <h3 className="htree">{paso.titulo}</h3>
                <p className="ptwo">{paso.descripcion}</p>
                {paso.fecha && <span className="fecha">{paso.fecha}</span>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="acciones">
        <h3 className="letttertree">Acciones</h3>
        <button className="bttoonn">
          <Message /> Enviar mensaje
        </button>
        <button className="bttoonn">
          <Downloadd /> Descargar resumen
        </button>
        <button className="bttoonn">
          <Logdocumentation /> Ver documentación
        </button>
      </div>
    </div>
  );
};

export default Process;

