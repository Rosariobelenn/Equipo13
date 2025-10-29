import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    message: string | null;
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
  } | null;
}

const SolicDet: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<SolicitudAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchSolicitud = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://pymego.onrender.com/v1/api/admin/credit-applications/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP ${res.status} - ${res.statusText}`);
        }

        const json = (await res.json()) as SolicitudAPI;
        setData(json);
      } catch (err) {
        setError(String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitud();
  }, [id]);

  if (loading)
    return <div style={{ padding: 24 }}>Cargando solicitud #{id}...</div>;
  if (error)
    return (
      <div style={{ padding: 24, color: "crimson" }}>
        Error al cargar los datos: {error}
      </div>
    );
  if (!data)
    return <div style={{ padding: 24 }}>No se encontró la solicitud #{id}</div>;
  console.log(data);

  return <SolicitudDetalle data={data} />;
};

export default SolicDet;
