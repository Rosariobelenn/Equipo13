import React from "react";
import { CreditCard } from "lucide-react";
import "./CreditCardIcon.css";

const CreditCardIcon: React.FC = () => {
  return (
    <div className="creditcard-container">
      <CreditCard className="creditcard-icon" />
    </div>
  );
};

export default CreditCardIcon;
