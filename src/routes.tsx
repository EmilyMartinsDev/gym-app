import { Route, Routes } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import SignInPage from "./pages/SignInPage";
import DashBordage from "./pages/DashBoardPage";






const Rotas = () => (
  <Routes>
    <Route path="/" element={<RegistrationPage/>} />
    <Route path="/signIn" element={<SignInPage/>} />
    <Route path="/dashboard" element={<DashBordage/>} />
  </Routes>
);

export default Rotas;
