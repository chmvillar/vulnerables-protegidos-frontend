import { Link, Outlet } from "react-router-dom";
import InformacionInicio from "../components/InformacionInicio";

const NavbarLayout = () => {
  return (
    <>
      <div className="bg-white p-5 flex justify-between">
        <div className="ini-sesion ">
          <Link to="/">
            <h2 className="header-portal text-4xl font-black text-center md:mb-0">
              Portal Web
            </h2>
          </Link>
        </div>
        <div className="flex gap-16">
          <Link to="/">Inicio</Link>
          <Link to="/portal/">Solicitar Visita</Link>
          <Link to="/portal/">Ofrecer Servicios</Link>
        </div>
        <div></div>
        <div>
          <Outlet />
        </div>
      </div>
      <InformacionInicio />
    </>
  );
};

export default NavbarLayout;
