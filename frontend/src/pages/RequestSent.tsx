import React from "react";
import "./RequestSent.css";
import { Clock, Mail, Phone, FileText, Info } from "lucide-react";

const RequestSent: React.FC = () => {
  return (
    <div className="solicitud-container">
      {/* Encabezado */}
      <div className="solicitud-header">
        <Clock className="icono" />
        <h2>¡Solicitud enviada exitosamente!</h2>
        <p>
          Tu solicitud de crédito ha sido recibida y está siendo procesada. Nuestro equipo especializado revisará toda la información y te contactará pronto.
        </p>
        <div className="tiempo-respuesta">
          ⏱️ Tiempo estimado de respuesta: <strong>24-48 horas hábiles</strong>
        </div>
      </div>

      {/* Resumen */}
      <div className="resumen">
        <h3>📄 Resumen de tu solicitud</h3>
        <div className="resumen-grid">
          <p><strong>Empresa:</strong> Mi empresa SRL</p>
          <p><strong>Representante:</strong> Registrado</p>
          <p><strong>CUIT:</strong> ***,***,***,*</p>
          <p><strong>Email:</strong> Registrado</p>
          <p><strong>Figura jurídica:</strong> S.R.L.</p>
          <p><strong>Documentos:</strong> 3 archivo(s)</p>
          <p><strong>Número de referencia:</strong> ME-00001234</p>
        </div>
      </div>

      {/* Próximos pasos */}
      <div className="proximos-pasos">
        <h3>✅ Próximos pasos</h3>
        <ul>
          <li><Mail size={18}/> Confirmación por email — Recibirás un email de confirmación en las próximas horas</li>
          <li><Phone size={18}/> Contacto telefónico — Nuestro equipo puede contactarte para aclarar información</li>
          <li><FileText size={18}/> Documentación adicional — Si es necesario, te solicitaremos documentos complementarios</li>
        </ul>
      </div>

      {/* Información importante */}
      <div className="info-importante">
        <h3><Info size={18}/> Información importante</h3>
        <ul>
          <li>Mantené tu teléfono disponible, podríamos contactarte para aclarar información.</li>
          <li>Revisá tu email regularmente, incluida la carpeta de spam.</li>
          <li>Si no recibís noticias en 48 horas, contactanos.</li>
          <li>Toda la información será tratada de forma confidencial.</li>
        </ul>
      </div>

      {/* Ayuda */}
      <div className="ayuda">
        <p>¿Necesitás ayuda o tenés preguntas?</p>
        <p>📞 0800-123-4567 — ✉️ soporte@miempresa.com</p>
        <small>Horario de atención: Lunes a Viernes de 9:00 a 18:00 hs</small>
      </div>

      {/* Botón */}
      <button className="btn-volver">Volver al dashboard</button>
    </div>
  );
};

export default RequestSent;
