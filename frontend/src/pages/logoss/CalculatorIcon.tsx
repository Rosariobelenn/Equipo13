import React from "react";
import { Calculator } from "lucide-react";
import "./CalculatorIcon.css";

const CalculatorIcon: React.FC = () => {
  return (
    <div className="calculator-container">
      <Calculator className="calculator-icon" />
    </div>
  );
};

export default CalculatorIcon;
