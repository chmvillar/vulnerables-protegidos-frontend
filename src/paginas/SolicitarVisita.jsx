import { Link } from "react-router-dom";
import FormularioVisita from "../components/FormularioVisita";

const SolicitarVisita = () => {
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
          <Link to="/" className="mb-2 md:mb-0">
            Inicio
          </Link>

          <Link
            to="/formulario/solicitar-visita/"
            className="bg-blue-400 text-white py-1 px-5 rounded-2xl mb-2 md:mb-0"
          >
            Solicitar Visita
          </Link>

          <Link to="/formulario/ofrecer-servicios/" className="mb-2 md:mb-0">
            Ofrecer Ayuda Comunitaria
          </Link>
        </div>

        <div className="btn-gradient flex flex-col justify-center items-center rounded-lg px-7 text-white font-bold py-1">
          <Link to="/portal/">Login</Link>
        </div>
      </div>

      <div className="mt-0.5 p-5 h-full bg-white">
        <FormularioVisita />
      </div>
    </>
  );
};

export default SolicitarVisita;
