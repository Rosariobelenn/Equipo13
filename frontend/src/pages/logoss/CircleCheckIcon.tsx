import React from "react";
import { CircleCheckBig } from "lucide-react";
import "./CircleCheckIcon.css";

const CircleCheckIcon: React.FC = () => {
  return (
    <div className="circlecheck-icon-container-green">
      <CircleCheckBig className="circlecheck-icon-green" />
    </div>
  );
};

export default CircleCheckIcon;
