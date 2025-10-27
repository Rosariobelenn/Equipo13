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
import ProtectedRoute from "./ProtectedRoute";
import Detailsfinal from "../pages/Detailsfinal";
import Myloginkey from "../pages/Myloginkey";
import Loginkeytwo from "../pages/Myloginkeytwo";
import Myloginkeythree from "../pages/Myloginkeythree";
import Loginkeyfour from "../pages/Myloginkeyfour";
import Proceso from "../pages/Proceso";

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
      <Route
        path="/DigitalSignatureContract"
        element={<DigitalSignatureContract />}
      />
      <Route
        path="/operator"
        element={
          <ProtectedRoute requiredRole="ADMIN">
            <RequestPanel />
          </ProtectedRoute>
        }
      />
      <Route path="/ApplicationCredit" element={<ApplicationCredit />} />
      <Route path="/RequestSent" element={<RequestSent />} />
      <Route path="/ApplicationSummary" element={<ApplicationSummary />} />
      <Route path="/DocumentList" element={<DocumentList />} />
      <Route path="/Detailsfinal" element={<Detailsfinal />} />
      <Route path="/Myloginkey" element={<Myloginkey />} />
      <Route path="/Loginkeytwo" element={<Loginkeytwo />} />
      <Route path="/Myloginkeythree" element={<Myloginkeythree />} />
      <Route path="/Loginkeyfour" element={<Loginkeyfour />} />

      <Route
        path="/request-detail/:id"
        element={
          <ProtectedRoute requiredRole="ADMIN">
            <SolicDet />
          </ProtectedRoute>
        }
      />
      <Route path="/Proceso" element={<Proceso step={1} />} />
    </Routes>
  );
}
