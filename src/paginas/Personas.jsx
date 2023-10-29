import { Link } from "react-router-dom";
// import usePersonas from "../hooks/usePersonas";
import useAuth from "../hooks/useAuth";

const Personas = () => {
  // const { personas } = usePersonas();
  const { auth } = useAuth();

  return (
    <>
      <div className="flex justify-center items-center mb-5">
        <p className="text-2xl font-bold">
          ¡Hola, <span className="capitalize">{auth.nombre}!</span> 😁
        </p>
      </div>
      <div className="flex justify-center items-center">
        <Link
          to="registrar-persona"
          className="bg-green-400 w-56 p-3 mb-10 text-white uppercase font-bold block text-center justify-center rounded-xl"
        >
          Registrar Persona
        </Link>
      </div>
      <h1 className="text-4xl font-black">Personas</h1>

      <div></div>
    </>
  );
};

export default Personas;
