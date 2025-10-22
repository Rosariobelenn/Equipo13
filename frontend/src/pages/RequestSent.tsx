import React from "react";
import "./RequestSent.css";
import FileTextIcontwo from "./FileTextIcontwo";
import CircleCheckIcon from "./CircleCheckIcon";
import { Clock, Mail, Phone, FileText, Info } from "lucide-react";

const RequestSent: React.FC = () => {
  return (
    <div className="solicitud-container">
      {/* Encabezado */}
      <div className="solicitud-header">
        <Clock className="icono" />
        <h2 className="h2seven">¡Solicitud enviada exitosamente!</h2>
        <p className="pseven">
          Tu solicitud de crédito ha sido recibida y está siendo procesada. Nuestro equipo especializado revisará toda la información y te contactará pronto.
        </p>
        <div className="tiempo-respuesta">
          ⏱️ Tiempo estimado de respuesta: <strong>24-48 horas hábiles</strong>
        </div>
      </div>

      {/* Resumen */}
      <div className="resumen">
        <h3 className="h3seven"><FileTextIcontwo/> <strong> Resumen de tu solicitud</strong></h3>
        <div className="resumen-grid">
          <p className="pseven"><strong>Empresa:</strong> Mi empresa SRL</p>
          <p className="pseven"><strong>Representante:</strong> Registrado</p>
          <p className="pseven"><strong>CUIT:</strong> ***,***,***,*</p>
          <p className="pseven"><strong>Email:</strong> Registrado</p>
          <p className="pseven"><strong>Figura jurídica:</strong> S.R.L.</p>
          <p className="pseven"><strong>Documentos:</strong> 3 archivo(s)</p>
          <p className="pseven"><strong>Número de referencia:</strong> ME-00001234</p>
        </div>
      </div>

      {/* Próximos pasos */}
      <div className="proximos-pasos">
        <h3 className="h3seven"><CircleCheckIcon/> <strong>Próximos pasos</strong></h3>
        <ul className="ulseven">
          <li className="liseven" ><Mail className="logmpf" size={18}/> <div className="poslt"> <strong>Confirmación por email </strong>  <br /> Recibirás un email de confirmación en las próximas horas </div></li>
          <li className="liseven"><Phone className="logmpf" size={18}/> <div className="poslt"> <strong>Contacto telefónico</strong>  <br />  Nuestro equipo puede contactarte para aclarar información </div> </li>
          <li className="liseven"><FileText  className="logmpf" size={18}/><div className="poslt"> <strong> Documentación adicional </strong><br />Si es necesario, te solicitaremos documentos complementarios </div></li>
        </ul>
      </div>

      {/* Información importante */}
      <div className="info-importante">
        <h3 className="h3seven"><Info className="colourinfo" size={18}/> <strong> Información importante </strong></h3>
        <ul className="ulseven">
          <li className="liseven">Mantené tu teléfono disponible, podríamos contactarte para aclarar información.</li>
          <li className="liseven">Revisá tu email regularmente, incluida la carpeta de spam.</li>
          <li className="liseven">Si no recibís noticias en 48 horas, contactanos.</li>
          <li className="liseven">Toda la información será tratada de forma confidencial.</li>
        </ul>
      </div>

      {/* Ayuda */}
      <div className="ayuda">
        <p className="pseven">¿Necesitás ayuda o tenés preguntas?</p>
        <p className="pseven">📞 0800-123-4567 — ✉️ soporte@miempresa.com</p>
        <small className="smallseven">Horario de atención: Lunes a Viernes de 9:00 a 18:00 hs</small>
      </div>

      {/* Botón */}
      <button className="btn-volver">Volver al dashboard</button>
    </div>
  );
};

export default RequestSent;
