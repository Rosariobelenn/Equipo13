import React, { useEffect, useState } from "react";
import SolicitudDetalle from "./SolicitudDetalle";
import "./SolicitudDetalle.css";

interface SolicitudAPI {
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
    approved?: boolean; // opcional para renderizar estado
  }[];
  assigned_to: {
    id: number;
    name: string;
  };
}

const SolicDet: React.FC = () => {
  const [data, setData] = useState<SolicitudAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/datos.db")
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        try {
          const json = JSON.parse(text);
          setData(json as SolicitudAPI);
        } catch (parseErr) {
          throw new Error("Error al parsear JSON: " + parseErr);
        }
      })
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: 24 }}>Cargando datos...</div>;
  if (error) return <div style={{ padding: 24, color: "crimson" }}>Error: {error}</div>;
  if (!data) return <div style={{ padding: 24 }}>No hay datos</div>;

  return <SolicitudDetalle data={data} />;
};

export default SolicDet;



