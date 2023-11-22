import { useEffect } from "react";
import FormularioAsistente from "../components/FormularioAsistente";
import usePersonas from "../hooks/usePersonas";
import { Link, useParams } from "react-router-dom";

const AsignarAsistente = () => {
  const { cargando, obtenerPersona, persona, asistente, agregarAsignacion } =
    usePersonas();
  const params = useParams();

  useEffect(() => {
    obtenerPersona(params.id);
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl">Asignar Asistente Para</h1>
        <span className="text-xl font-bold capitalize">{persona.nombre}</span>
      </div>

      <div className="mt-10 flex justify-center">
        <FormularioAsistente />
      </div>

      {cargando ? (
        <p className="text-center mt-5">Cargando...</p>
      ) : (
        asistente &&
        asistente.length > 0 && (
          <div className="flex justify-center mt-10">
            <div>
              <h2 className="text-center mb-10 text-2xl font-bold">
                Resultados:
              </h2>
              {asistente.map((usuario) => (
                <div className="bg-white py-3 px-10 mb-5 rounded-lg shadow"
                key={usuario._id}>
                  <div
                    
                    className="flex justify-between items-center mb-3 gap-10"
                  >
                    <div className="flex flex-col">
                      <p>{usuario.nombre}</p>
                      <span>{usuario.email}</span>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="bg-green-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                        onClick={() =>
                          agregarAsignacion({
                            email: usuario.email,
                          })
                        }
                      >
                        Asignar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </>
  );
};

export default AsignarAsistente;
