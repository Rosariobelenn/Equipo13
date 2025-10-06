import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import RegisterFlow from "../components/forms/Register/RegisterFlow";
import Milogin from "../pages/Milogin";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<>test</>} />
      <Route path='/register' element={<Register />} />
      <Route path='/registerFlow' element={<RegisterFlow />} />
      <Route path='/milogin' element={<Milogin/>} />
    </Routes>
  );
}
