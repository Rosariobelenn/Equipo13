import React from "react";
import "./SolicitudDetalle.css";
import SolicitudHeader from "./SolicitudHeader";

export interface SolicitudAPI {
  id: number;
  amount: number;
  installment_count: number;
  status: string;
  created_at: string;
  updated_at: string;
  company: {
    business_name: string;
    tax_id: string;
    company_type: string;
  };
  legal_representative: {
    full_name: string;
    position: string;
    document_type: string;
    document_number: string;
    corporate_email: string;
    contact_phone: string;
  };
  bank_account: {
    bank_name: string;
    account_type: string;
    cbu_cvu: string;
  };
  documents: {
    id: number;
    document_type: string;
    file_path: string;
    approved: boolean;
    message: string;
  }[];
  comments: {
    id: number;
    author: string;
    message: string;
    created_at: string;
  }[];
  assigned_to: {
    id: number;
    name: string;
  };
}

interface Props {
  data: SolicitudAPI;
}

const SolicitudDetalle: React.FC<Props> = ({ data }) => {
  const {
    id,
    amount,
    installment_count,
    status,
    company,
    legal_representative,
    bank_account,
    documents,
    comments,
    assigned_to,
  } = data;

  return (
    <div className="solicitud-container">
      {/* Header con número de solicitud, empresa y estado */}
      <SolicitudHeader
        numeroSolicitud={id.toString()}
        empresa={company.business_name}
        status={status}
        onBack={() => console.log("Volver a solicitudes")}
      />

      {/* Resumen de la solicitud */}
      <div className="solicitud-grid">
        <div className="card resumen">
          <h3>Resumen de la solicitud</h3>
          <p><strong>Empresa:</strong> {company.business_name}</p>
          <p><strong>CUIT:</strong> {company.tax_id}</p>
          <p><strong>Tipo societario:</strong> {company.company_type}</p>
          <p><strong>Monto solicitado:</strong> ${amount.toLocaleString()}</p>
          <p><strong>Cuotas:</strong> {installment_count}</p>
        </div>

        <div className="card representante">
          <h3>Representante legal</h3>
          <p><strong>Nombre:</strong> {legal_representative.full_name}</p>
          <p><strong>Cargo:</strong> {legal_representative.position}</p>
          <p><strong>Email:</strong> {legal_representative.corporate_email}</p>
          <p><strong>Teléfono:</strong> {legal_representative.contact_phone}</p>
        </div>
      </div>

      {/* Cuenta bancaria y asignación */}
      <div className="solicitud-grid">
        <div className="card estado">
          <h3>Cuenta bancaria</h3>
          <p><strong>Banco:</strong> {bank_account.bank_name}</p>
          <p><strong>Tipo:</strong> {bank_account.account_type}</p>
          <p><strong>CBU / CVU:</strong> {bank_account.cbu_cvu}</p>
        </div>

        <div className="card acciones">
          <h3>Asignado a</h3>
          <p><strong>ID:</strong> {assigned_to.id}</p>
          <p><strong>Nombre:</strong> {assigned_to.name}</p>
        </div>
      </div>

      {/* Documentos */}
      <div className="card documentos">
        <h3>Documentos</h3>
        <ul>
          {documents.map((doc) => (
            <li key={doc.id}>
              <strong>{doc.document_type}</strong> –{" "}
              <span>{doc.approved ? "✅ Aprobado" : "⏳ Pendiente"}</span>
              <br />
              <small>{doc.message}</small>
            </li>
          ))}
        </ul>
      </div>

      {/* Comentarios */}
      <div className="card comentarios">
        <h3>Comentarios</h3>
        {comments.map((c) => (
          <div key={c.id} className="comentario">
            <p><strong>{c.author}:</strong> {c.message}</p>
            <small>{new Date(c.created_at).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolicitudDetalle;

