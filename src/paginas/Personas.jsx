import { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import usePersonas from "../hooks/usePersonas";
import PreviewPersona from "../components/PreviewPersona";

const Personas = () => {
  const { auth } = useAuth();
  const { personas } = usePersonas();

  const token_admin = import.meta.env.VITE_TOKEN_ADMIN;
  const token = localStorage.getItem("email");

  

  return (
    <>
      <div className="flex justify-center items-center mb-3.5">
        <p className="ini-sesion text-2xl border-gray-600">
          ¡Hola, <span className="capitalize">{auth.nombre}!</span>
        </p>
        <span className="text-xl">😁</span>
      </div>
      {token_admin === token && (
        <div>
          <div className="flex justify-center items-center">
            <Link
              to="registrar-persona"
              className="btn-registrar py-2 px-6 mb-10 text-white uppercase font-bold block text-center justify-center rounded-xl"
            >
              Registrar Persona
            </Link>
          </div>
        </div>
      )}
      <h1 className="ini-sesion text-3xl">Personas</h1>
      {personas.length ? (
        personas.map((persona) => (
          <div
            className="bg-white shadow mt-5 rounded-lg p-4"
            key={persona._id}
          >
            <PreviewPersona persona={persona} />
          </div>
        ))
      ) : (
        <p className="bg-white shadow rounded-lg mt-5 text-center text-gray-600 p-5">
          Aún no se le ha asignado ninguna persona.
        </p>
      )}
    </>
  );
};

export default Personas;
