import { Route, Routes } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import SignInPage from "./pages/SignInPage";
import DashBordage from "./pages/DashBoardPage";
import WizardForm from "./components/wizardForm";
import Treinos from "./pages/TreinosPage";




const Rotas = () => (
  <Routes>
    <Route path="/" element={<RegistrationPage/>} />
    <Route path="/signIn" element={<SignInPage/>} />
    <Route path="/dashboard" element={<DashBordage/>} />
    <Route path="/welcome" element={<WizardForm/>} />
    <Route path="/training-plans" element={<Treinos/>} />
  </Routes>
);

export default Rotas;
