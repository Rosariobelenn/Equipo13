import React from "react";
import { Clock5 } from "lucide-react";

const checktwo: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: "#b2f0ff", // fondo azul agua
        display: "inline-flex",
        padding: "0.5rem",
        borderRadius: "50%", // círculo
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Clock5 color="#0077cc" size={24} /> {/* icono azul */}
    </div>
  );
};

export default checktwo;
