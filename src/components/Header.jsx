import { Link } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import usePersonas from "../hooks/usePersonas";
import Busqueda from "./Busqueda";

const Header = () => {
  const token_admin = import.meta.env.VITE_TOKEN_ADMIN;
  const token = localStorage.getItem("email");

  const handleCerrarSesion = () => { 
    localStorage.clear();
    window.location.href = "/";
  };

  const { handleBuscador } = usePersonas();

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex justify-between">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
          <Link to="/portal/personas/">
            <h2 className="header-portal text-4xl font-black text-center md:mb-0">
              Portal Web
            </h2>
          </Link>
          <Link
            to="/portal/personas/"
            className="font-bold border-gray-600 text-gray-600 block text-xl"
          >
            Inicio
          </Link>
          {token_admin === token && (
            <Link
              to="/portal/personas/reg-l5mqb7f5l6tk"
              className="font-bold text-gray-600 block text-lg"
            >
              Personal
            </Link>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <button
            type="button"
            className="flex items-center justify-center font-bold uppercase"
            onClick={handleBuscador}
          >
            Buscar persona
          </button>

          <button
            type="button"
            className="text-red-400 text-3xl hover:text-blue-500 transition-colors"
            onClick={handleCerrarSesion}
          >
            <LuLogOut />
          </button>
          <Busqueda />
        </div>
      </div>
    </header>
  );
};

export default Header;
