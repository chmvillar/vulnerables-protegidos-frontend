import { Outlet, Navigate, Route } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return "Cargando...";
  return (
    <>
      {auth._id ? 
      (
        <div className="bg-gray-50">
          <Header />
          
          <div className="md:min-h-screen">

            <main className="min-h-screen mx-12 p-5">
              <Outlet />
            </main>
            
          </div>
        </div>
      ) : <Navigate to="/portal/" /> }
    </>
  );
};

export default RutaProtegida;
