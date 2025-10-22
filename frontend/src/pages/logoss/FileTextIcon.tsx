import React from "react";
import { FileText } from "lucide-react";
import "./FileTextIcon.css";

const FileTextIcon: React.FC = () => {
  return (
    <div className="filetext-icon-container">
      <FileText className="filetext-icon" />
    </div>
  );
};

export default FileTextIcon;
