import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import RegisterFlow from "../components/forms/Register/RegisterFlow";
import Mylogin from "../pages/Mylogin";
import EmailVerification from "../components/forms/Login/EmailVerification";
import EmailVerified from "../components/forms/Login/EmailVerified";
import MyLoginOperator from "../pages/MyLoginOperator";
import Dashboard from "../pages/Dashboard";
import RequestsList from "../pages/RequestsList";
import RequestPanel from "../pages/RequestPanel";
import RequestDetails from "../pages/RequestDetails";
import DigitalSignatureContract from "../components/forms/Login/DigitalSignatureContract";
import SolicDet from "../pages/SolicDet"; 
import SolicitudCredito from "../pages/SolicitudCredito";
import SolicitudEnviada from "../pages/SolicitudEnviada";
import SolicitudResumen from "../pages/SolicitudResumen";
import ListaDocumentos from "../pages/ListaDocumentos";



export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Mylogin />} />
      <Route path="/register" element={<Register />} />
      <Route path="/registerFlow" element={<RegisterFlow />} />
      <Route path="/EmailVerification" element={<EmailVerification />} />
      <Route path="/EmailVerified" element={<EmailVerified />} />
      <Route path="/Loginoperador" element={<MyLoginOperator />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/requests-list" element={<RequestsList />} />
      <Route path="/request-details/:id" element={<RequestDetails />} />
      <Route path="/operator" element={<RequestPanel />} />
      <Route path='/' element={<Mylogin />} />
      <Route path='/register' element={<Register />} />
      <Route path='/registerFlow' element={<RegisterFlow />} />
      <Route path='/EmailVerification' element={<EmailVerification />} />
      <Route path='/EmailVerified' element={<EmailVerified />} />
      <Route path='/Loginoperador' element={<MyLoginOperator />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/requests-list' element={<RequestsList />} />
      <Route path='/operator' element={<RequestPanel />} />
      <Route path='/DigitalSignatureContract' element={<DigitalSignatureContract />} />
      <Route path="/solicitud-detalle" element={<SolicDet />} />
      <Route path="/SolicitudCredito" element={<SolicitudCredito />} />
      <Route path="/SolicitudEnviada" element={<SolicitudEnviada />} />
      <Route path="/SolicitudResumen" element={<SolicitudResumen />} />
      <Route path="/ListaDocumentos" element={<ListaDocumentos />} />
      


    </Routes>
  );
}
