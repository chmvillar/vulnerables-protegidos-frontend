import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import usePersonas from "../hooks/usePersonas";
import PreviewPersona from "../components/PreviewPersona";

const Personas = () => {
  const { auth } = useAuth();
  const { personas } = usePersonas();

  console.log(personas);

  const token_admin = import.meta.env.VITE_TOKEN_ADMIN;
  const token = localStorage.getItem("email");

  return (
    <>
      <div className="flex justify-center items-center mb-2">
        <p className="ini-sesion text-2xl border-gray-600">
          ¡Hola, <span className="capitalize">{auth.nombre}!</span>
        </p>
        <span className="text-xl">😁</span>
      </div>
      <div className="text-gray-500 text-center mb-3 border-gray-600">
        {token_admin === token && (
          <p>¡Puede registrar personas y asignar Asistente!</p>
        )}
      </div>
      <div className="flex justify-center items-center">
        <Link
          to="registrar-persona"
          className="btn-registrar py-2 px-6 mb-10 text-white uppercase font-bold block text-center justify-center rounded-xl"
        >
          Registrar Persona
        </Link>
      </div>
      <h1 className="ini-sesion text-3xl">Personas</h1>
      {personas.length ? (
        personas.map((persona) => (
          <div className="bg-white shadow mt-5 rounded-lg p-4">
            <PreviewPersona key={personas._id} persona={persona} />
          </div>
        ))
      ) : (
        <p className="bg-white shadow rounded-lg mt-5 text-center text-gray-600 p-5">
          Aún no se ha registrado a ninguna persona.
        </p>
      )}
    </>
  );
};

export default Personas;
