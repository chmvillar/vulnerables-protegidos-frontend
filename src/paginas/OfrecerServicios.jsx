import { Link } from "react-router-dom";
import FormularioServicios from "../components/FormularioServicios";

const SolicitarVisita = () => {
  return (
    <div>
      <div className="bg-white p-5 flex flex-col md:flex-row justify-between items-center">
        <div className="ini-sesion mb-4 md:mb-0 md:mr-4">
          <Link to="/">
            <div className="flex justify-center items-center">
              <img
                src="https://i.ibb.co/wWpyF85/344349729-6066660163420156-9203906128119944882-n.jpg"
                alt="Fono emergencia: 1518"
                width="100px"
                className="rounded-lg"
              />
            </div>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:gap-16 items-center justify-center mb-5 md:mb-0">
          <Link to="/" className="mb-2 md:mb-0">
            Inicio
          </Link>

          <Link to="/formulario/solicitar-visita/" className="mb-2 md:mb-0">
            Solicitar Visita
          </Link>

          <Link
            to="/formulario/ofrecer-servicios/"
            className="bg-orange-500 text-white py-1 px-5 rounded-2xl "
          >
            Ofrecer Ayuda Comunitaria
          </Link>
        </div>

        <div className="btn-gradient flex flex-col justify-center items-center rounded-lg px-7 text-white font-bold py-1">
          <Link to="/portal/">Login</Link>
        </div>
      </div>

      <div className="mt-0.5 p-5 h-full bg-white">
        <FormularioServicios />
      </div>
    </div>
  );
};

export default SolicitarVisita;
