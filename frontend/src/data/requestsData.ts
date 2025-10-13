// src/data/requestsData.ts
export interface Request {
  id: string;
  empresa: string;
  monto: string;
  estado: string;
  score: number;
  asignado: string;
  fecha: string;
}

export const requestsData: Request[] = [
  {
    id: "ME-00001234",
    empresa: "Mi empresa SRL",
    monto: "$2.500.000",
    estado: "En evaluación",
    score: 78,
    asignado: "Juan Pérez",
    fecha: "30/09/2025",
  },
  {
    id: "ME-00001233",
    empresa: "Mi empresa SRL",
    monto: "$1.800.000",
    estado: "Aprobado",
    score: 89,
    asignado: "Juan Pérez",
    fecha: "30/03/2025",
  },
  {
    id: "MI-00001232",
    empresa: "Manufacturas SA",
    monto: "$950.000",
    estado: "Documentos pendientes",
    score: 72,
    asignado: "Ana López",
    fecha: "05/09/2025",
  },
  {
    id: "CM-00001231",
    empresa: "Tecno Avanzada SRL",
    monto: "$3.200.000",
    estado: "Depositado",
    score: 92,
    asignado: "Miguel Torres",
    fecha: "20/08/2025",
  },
  {
    id: "TA-00001230",
    empresa: "Tecno Avanzada SRL",
    monto: "$1.450.000",
    estado: "Pendiente de revisión",
    score: 78,
    asignado: "Sin asignar",
    fecha: "10/09/2025",
  },
  {
    id: "FE-00001229",
    empresa: "Farmacia Esperanza",
    monto: "$890.000",
    estado: "Revisión de documentos",
    score: 89,
    asignado: "Ana López",
    fecha: "12/09/2025",
  },
  {
    id: "CM-00001228",
    empresa: "Constructora Metro SRL",
    monto: "$1.200.000",
    estado: "Rechazado",
    score: 48,
    asignado: "Miguel Torres",
    fecha: "25/08/2025",
  },
];
