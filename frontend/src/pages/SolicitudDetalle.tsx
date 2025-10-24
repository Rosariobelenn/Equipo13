import React from "react";
import "./SolicitudDetalle.css";
import Headerr from "./Headerr";
import Process from "./Proceso";
import Summary from "./logoss/summary";
import Person from "./logoss/Person";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <div className='solicitud-containerone'>
      <Headerr
        numeroSolicitud={id.toString()}
        empresa={company.business_name}
        status={status}
        onBack={() => navigate(`/operator`)}
      />

      <div className='solicitud-grid'>
        <div className='card resumen'>
          <div className='contpositioon'>
            <div>
              <h3 className='lettter possitioon'>
                {" "}
                <Summary /> Resumen de la solicitud
              </h3>

              <div className='contnam'>
                <div>Empresa: </div>{" "}
                <div className='styloleterr'>{company.business_name}</div>
              </div>
              <div className='contnam'>
                <div>Tipo societario:</div>
                <div className='styloleterr'> {company.company_type} </div>
              </div>
            </div>
            <div className='pound'>
              <div className='contnam'>
                <div>CUIT:</div>
                <div className='styloleterr'> {company.tax_id} </div>
              </div>

              <div className='contnam'>
                <div>Monto solicitado:</div>{" "}
                <div className='styloleterr'> ${amount.toLocaleString()}</div>
              </div>
              <div className='contnam'>
                <div>Cuotas:</div>{" "}
                <div className='styloleterr'> {installment_count} </div>
              </div>
            </div>
          </div>
        </div>

        <div className='card representante'>
          <h3 className='lettter possitioontwo'>
            {" "}
            <Person /> Representante legal
          </h3>
          <p className='contnam'>
            Nombre: <strong>{legal_representative.full_name} </strong>
          </p>
          <p className='contnam'>
            Cargo:<strong> {legal_representative.position} </strong>
          </p>
          <p className='contnam'>
            Email:<strong> {legal_representative.corporate_email}</strong>
          </p>
          <p className='contnam'>
            Teléfono:<strong> {legal_representative.contact_phone}</strong>
          </p>
        </div>
      </div>

      <Process />

      {/* Cuenta bancaria y asignación */}
      <div className='solicitud-grid'>
        <div className='card estado'>
          <h3>Cuenta bancaria</h3>
          <p>
            <strong>Banco:</strong> {bank_account.bank_name}
          </p>
          <p>
            <strong>Tipo:</strong> {bank_account.account_type}
          </p>
          <p>
            <strong>CBU / CVU:</strong> {bank_account.cbu_cvu}
          </p>
        </div>

        <div className='card acciones'>
          <h3>Asignado a</h3>
          {assigned_to ? (
            <>
              <p>
                <strong>ID:</strong> {assigned_to.id}
              </p>
              <p>
                <strong>Nombre:</strong> {assigned_to.name}
              </p>
            </>
          ) : (
            <p className='text-gray-500 italic'>No asignado</p>
          )}
        </div>
      </div>

      {/* Documentos */}
      <div className='card documentos'>
        <h3>Documentos</h3>
        <ul className='ull'>
          {documents.map((doc) => (
            <li className='lli' key={doc.id}>
              <strong>{doc.document_type}</strong> –{" "}
              <span>{doc.approved ? "✅ Aprobado" : "⏳ Pendiente"}</span>
              <br />
              <small>{doc.message}</small>
            </li>
          ))}
        </ul>
      </div>

      {/* Comentarios */}
      <div className='card comentarios'>
        <h3>Comentarios</h3>
        {comments.map((c) => (
          <div key={c.id} className='comentario'>
            <p>
              <strong>{c.author}:</strong> {c.message}
            </p>
            <small>{new Date(c.created_at).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolicitudDetalle;
