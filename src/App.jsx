import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import RutaProtegida from "./layouts/RutaProtegida";
import NavbarLayout from "./layouts/NavbarLayout";
import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import OlvidePassword from "./paginas/OlvidePassword";
import NuevaPassword from "./paginas/NuevaPassword";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import Inicio from "./paginas/Inicio";
import SolicitarVisita from "./paginas/SolicitarVisita";
import OfrecerServicios from "./paginas/OfrecerServicios";
import Personas from "./paginas/Personas";

import { AuthProvider } from "./context/AuthProvider";
import { PersonasProvider } from "./context/PersonasProvider";
import NuevaPersona from "./paginas/NuevaPersona";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PersonasProvider>
          <Routes>
            <Route path="/" element={<NavbarLayout />}>
              <Route index element={<Inicio />} />
              <Route path="solicitar-visita" element={<SolicitarVisita />} />
              <Route path="ofrecer-servicios" element={<OfrecerServicios />} />
            </Route>

            <Route path="/portal/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route
                path="olvide-password/:token"
                element={<NuevaPassword />}
              />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>

            <Route path="/portal/personas" element={<RutaProtegida />}>
              <Route index element={<Personas />} />
              <Route path="reg-l5mqb7f5l6tk" element={<Registrar />} />
              <Route path="registrar-persona" element={<NuevaPersona />} />
            </Route>
          </Routes>
        </PersonasProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
