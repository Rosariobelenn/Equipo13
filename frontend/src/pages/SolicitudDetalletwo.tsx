import React from "react";
import "./SolicitudDetalle.css";
import Headerr from "./Headerr";
import Person from "./logoss/Person";



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

const SolicitudDetalletwo: React.FC<Props> = ({ data }) => {
  const {
    id,
    status,
    company,
    legal_representative,
  } = data;

  return (
    <div className="solicitud-containerone">
      {/* Header con número de solicitud, empresa y estado */}
      <Headerr
        numeroSolicitud={id.toString()}
        empresa={company.business_name}
        status={status}
        onBack={() => console.log("Volver a solicitudes")}
      />

      {/* Resumen de la solicitud */}
      <div className="solicitud-grid">
        <div className="card resumen">
          
        </div>

        <div className="card representante">
          <h3 className="lettter possitioontwo"> <Person /> Representante legal</h3>
          <p className="contnam">Nombre: <strong>{legal_representative.full_name} </strong></p>
          <p className="contnam">Cargo:<strong> {legal_representative.position} </strong></p>
          <p className="contnam">Email:<strong> {legal_representative.corporate_email}</strong></p>
          <p className="contnam">Teléfono:<strong> {legal_representative.contact_phone}</strong></p>
        </div>
      </div>

      

     

     
    </div>
  );
};

export default SolicitudDetalletwo;

