import { Link } from "react-router-dom";

const Header = () => {

  const handleCerrarSesion = () => {
    localStorage.clear();

    window.location.href = "/portal/";
  };

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <Link to="/portal/personas">
          <h2 className="header-portal text-4xl font-black text-center">
            Vulnerables Protegidos
          </h2>
        </Link>

        <input
          type="search"
          placeholder="Buscar Persona"
          className="rounded-xl lg:w-96 block p-2 border"
        />

        <div className="flex items-center gap-4">
          <Link to="/portal/personas/" className="font-bold uppercase">
            Personas
          </Link>

          <button
            type="button"
            className="cerrar-sesion text-white text-sm bg-sky-600 p-3 w-40 rounded-xl uppercase font-bold"
            onClick={handleCerrarSesion}
          >
              Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
