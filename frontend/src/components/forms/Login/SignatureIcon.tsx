import { PenTool } from "lucide-react";
import "./SignatureIcon.css";

function SignatureIcon() {
  return (
    <div className="signature-icon-container">
      <PenTool size={48} color="#999" strokeWidth={1.8} />
    </div>
  );
}

export default SignatureIcon;
