import { Link, Outlet } from "react-router-dom";
import InformacionInicio from "../components/InformacionInicio";

const NavbarLayout = () => {
  return (
    <>
      <div className="bg-white p-5 flex flex-col md:flex-row justify-between items-center">
        <div className="ini-sesion mb-4 md:mb-0 md:mr-4">
          <Link to="/">
            <h2 className="header-portal text-4xl font-black text-center">
              Portal Web
            </h2>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row md:gap-16 items-center justify-center mb-4 md:mb-0">
          <Link to="/" className="mb-2 md:mb-0 bg-blue-400 text-white py-1 px-5 rounded-2xl">
            Inicio
          </Link>

          <Link to="/formulario/solicitar-visita/" className="mb-2 md:mb-0">
            Solicitar Visita
          </Link>

          <Link
            to="/formulario/ofrecer-servicios/"
            className=" "
          >
            Ofrecer Servicios
          </Link>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
      <InformacionInicio />
    </>
  );
};

export default NavbarLayout;
