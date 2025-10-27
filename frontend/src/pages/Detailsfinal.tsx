// Footer.tsx
import React from "react";
import "./Footer.css";
import Procesotwo from "./procesotwo";
import SolicDettwo from "./SolicDettwo";

const Footer: React.FC = () => {
  return (

<div>
       <SolicDettwo/>
       <Procesotwo step={1} />
        

    <footer className="footer">
      <p>
        ¿Necesitas ayuda? Contáctanos al{" "}
        <a href="tel:+541112345678">+54 11 1234-5678</a> o envíanos un email a{" "}
        <a href="mailto:soporte@pymego.com">soporte@pymego.com</a>
      </p>
    </footer>

    </div>
  );
};

export default Footer;
