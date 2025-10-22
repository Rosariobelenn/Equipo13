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
import ApplicationCredit from "../pages/ApplicationCredit";
import RequestSent from "../pages/RequestSent";
import ApplicationSummary from "../pages/ApplicationSummary";
import DocumentList from "../pages/DocumentList";




export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Mylogin />} />
      <Route path="/register" element={<Register />} />
      <Route path="/registerFlow" element={<RegisterFlow />} />
      <Route path="/EmailVerification" element={<EmailVerification />} />
      <Route path="/EmailVerified" element={<EmailVerified />} />
      <Route path="/MyLoginOperator" element={<MyLoginOperator />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/requests-list" element={<RequestsList />} />
      <Route path="/request-details/:id" element={<RequestDetails />} />
      <Route path="/operator" element={<RequestPanel />} />
      <Route path='/' element={<Mylogin />} />
      <Route path='/register' element={<Register />} />
      <Route path='/registerFlow' element={<RegisterFlow />} />
      <Route path='/EmailVerification' element={<EmailVerification />} />
      <Route path='/EmailVerified' element={<EmailVerified />} />
      <Route path='/MyLoginOperator' element={<MyLoginOperator />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/requests-list' element={<RequestsList />} />
      <Route path='/operator' element={<RequestPanel />} />
      <Route path='/DigitalSignatureContract' element={<DigitalSignatureContract />} />
      <Route path="/request-detail" element={<SolicDet />} />
      <Route path="/ApplicationCredit" element={<ApplicationCredit />} />
      <Route path="/RequestSent" element={<RequestSent />} />
      <Route path="/ApplicationSummary" element={<ApplicationSummary />} />
      <Route path="/DocumentList" element={<DocumentList />} />
      
      


    </Routes>
  );
}
