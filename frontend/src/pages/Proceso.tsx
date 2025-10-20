import React from "react";
import "./Proceso.css";
import ProgressBar from "./ProgressBar"; // ruta según donde esté tu archivo

interface Paso {
  titulo: string;
  descripcion: string;
  fecha?: string;
  estado: "completado" | "en-proceso" | "pendiente";
}

const pasos: Paso[] = [
  {
    titulo: "Solicitud recibida",
    descripcion: "Solicitud recibida exitosamente",
    fecha: "30 de mayo de 2025, 11:00 a.m",
    estado: "completado",
  },
  {
    titulo: "Revisión de documentos iniciada",
    descripcion: "Se comenzó la validación de la documentación",
    fecha: "02 de junio de 2025, 10:30 a.m",
    estado: "completado",
  },
  {
    titulo: "Verificación empresarial",
    descripcion: "Validación de datos societarios y AFIP",
    estado: "en-proceso",
  },
  {
    titulo: "Análisis crediticio",
    descripcion: "Evaluación de capacidad de pago y riesgo",
    estado: "en-proceso",
  },
  {
    titulo: "Aprobación final",
    descripcion: "Decisión definitiva y términos del crédito",
    estado: "pendiente",
  },
];

const Proceso: React.FC = () => {
  return (
    <div className="proceso-container">
     {/* <h2 className="htwo">Estado del proceso</h2>*/}
      
      <ProgressBar step={1} />  {/* step puede ser 1, 2 o 3 */}
      <div className="timeline">
        {pasos.map((paso, index) => (
          <div key={index} className="timeline-item">
            <div className={`timeline-icon ${paso.estado}`}>
              {paso.estado === "completado" ? "✔" : "⏱"}
            </div>
            <div className="timeline-content">
              <h3 className="htree">{paso.titulo}</h3>
              <p className="ptwo">{paso.descripcion}</p>
              {paso.fecha && <span className="fecha">{paso.fecha}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="acciones">
        <button className="bttoon">Enviar mensaje</button>
        <button className="bttoon">Descargar resumen</button>
        <button className="bttoon">Ver documentación</button>
      </div>
    </div>
  );
};

export default Proceso;
