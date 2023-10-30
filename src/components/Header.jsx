import { Link } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";

const Header = () => {
  const token_admin = import.meta.env.VITE_TOKEN_ADMIN;
  const token = localStorage.getItem("email");

  const handleCerrarSesion = () => {
    localStorage.clear();
    window.location.href = "/portal/";
  };

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex justify-between">
        <div className="flex items-center">
          <Link to="/portal/personas/">
            <h2 className="header-portal text-4xl font-black text-center pr-5">
              Portal Web
            </h2>
          </Link>
          <Link
            to="/portal/personas/"
            className="font-bold border-gray-600 pl-3 text-gray-600 block text-xl"
          >
            Inicio
          </Link>
        </div>

        <input
          type="search"
          placeholder="Buscar Persona"
          className="rounded-xl w-2/6 py-2 px-5 border"
        />

        <div className="flex items-center">
          {token_admin === token && (
            <Link
              to="/portal/personas/reg-l5mqb7f5l6tk"
              className="font-bold pr-6 text-gray-600 block text-lg"
            >
              Personal
            </Link>
          )}

          <button
            type="button"
            className="text-red-400 text-3xl hover:text-blue-500 transition-colors"
            onClick={handleCerrarSesion}
          >
            <LuLogOut />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
