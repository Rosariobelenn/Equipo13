import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import RegisterFlow from "../components/forms/Register/RegisterFlow";
import Milogin from "../pages/Milogin";
import EmailVerification from "../components/forms/Login/EmailVerification";
import EmailVerified from "../components/forms/Login/EmailVerified";
import MiLoginOperador from "../pages/MiLoginOperador";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Milogin />} />
      <Route path='/register' element={<Register />} />
      <Route path='/registerFlow' element={<RegisterFlow />} />
      <Route path='/EmailVerification' element={<EmailVerification />} />
      <Route path='/EmailVerified' element={<EmailVerified />} />
      <Route path='/Loginoperador' element={<MiLoginOperador />} />
    </Routes>
  );
}
