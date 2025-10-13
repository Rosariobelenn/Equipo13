import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import RegisterFlow from "../components/forms/Register/RegisterFlow";
import Milogin from "../pages/Milogin";
import Dashboard from "../pages/Dashboard";
import RequestPanel from "../pages/RequestPanel";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Milogin />} />
      <Route path='/register' element={<Register />} />
      <Route path='/registerFlow' element={<RegisterFlow />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/operator' element={<RequestPanel />} />
    </Routes>
  );
}
