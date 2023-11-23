import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ModalFormNecesidad from "../components/ModalFormularioNecesidad";
import ModalEliminarNecesidad from "../components/ModalEliminarNecesidad";
import ModalEliminarAsignacion from "../components/ModalEliminarAsignacion";
import usePersonas from "../hooks/usePersonas";
import { LuPencilLine, LuTrash2, LuPlusCircle } from "react-icons/lu";
import Swal from "sweetalert2";
import Necesidad from "../components/Necesidad";
import Asignacion from "../components/Asignacion";
import io from "socket.io-client";

let socket;

const Persona = () => {
  const params = useParams();

  const {
    obtenerPersona,
    persona,
    cargando,
    eliminarPersona,
    handleModalNecesidad,
    submitNecesidadesPersona,
    eliminarNecesidadPersona,
    actualizarNecesidadPersona,
    completarNecesidadPersona,
  } = usePersonas();

  const token_admin = import.meta.env.VITE_TOKEN_ADMIN;
  const token = localStorage.getItem("email");

  useEffect(() => {
    obtenerPersona(params.id);
  }, []);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("abrir necesidad", params.id);
  }, []);

  useEffect(() => {
    socket.on("necesidad agregada", (necesidadNueva) => {
      if (necesidadNueva.persona === persona._id) {
        submitNecesidadesPersona(necesidadNueva);
      }
    });

    socket.on("necesidad eliminada", (necesidadEliminada) => {
      if (necesidadEliminada.persona === persona._id) {
        eliminarNecesidadPersona(necesidadEliminada);
      }
    });

    socket.on("necesidad actualizada", (necesidadActualizada) => {
      if (necesidadActualizada.persona._id === persona._id) {
        actualizarNecesidadPersona(necesidadActualizada);
      }
    });

    socket.on("nuevo estado", (estadoNecesidad) => {
      if (estadoNecesidad.persona._id === persona._id) {
        completarNecesidadPersona(estadoNecesidad);
      }
    });
  });

  const { nombre } = persona;

  const handleClickEliminarPersona = () => {
    Swal.fire({
      title: "¿Desea elimnar el registro?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarPersona(params.id);
      }
    });
  };

  if (cargando) return "Cargando...";

  return (
    <>
      <div className="flex justify-center">
        <h1 className="nombrePersona font-black text-4xl capitalize">
          {nombre}
        </h1>
      </div>
      <div className="flex justify-center mt-2 mb-8">
        {token_admin === token && (
          <div className="flex text-gray-500 font-bold gap-5">
            <div className="flex items-center gap-1 pr-3 hover:text-blue-600 text-blue-400">
              <LuPencilLine />
              <Link to={`/portal/personas/editar/${params.id}`}>Editar</Link>
            </div>
            <div className="flex items-center gap-1 hover:text-red-600 text-red-400">
              <LuTrash2 />
              <button onClick={handleClickEliminarPersona}>Eliminar</button>
            </div>
          </div>
        )}
      </div>

      <div className="container-persona flex justify-between gap-8 mt-5 bg-white p-5 rounded-lg shadow lg:flex-row sm:flex-col">
        {/* Necesidades */}
        <div className="w-full">
          <div className="flex justify-between">
            <p className="font-bold text-xl">Necesidades</p>
            <button
              onClick={handleModalNecesidad}
              type="button"
              className="md:w-auto rounded-lg font-bold text-center flex gap-2 items-center justify-center text-gray-500"
            >
              Añadir
            </button>
          </div>
          {persona.necesidades?.length ? (
            persona.necesidades?.map((necesidad) => (
              <div
                key={necesidad._id}
                className="bg-white shadow mt-3 rounded-lg"
              >
                <Necesidad necesidad={necesidad} />
              </div>
            ))
          ) : (
            <p className="bg-white shadow rounded-lg mt-5 text-center text-gray-600 p-5">
              No existen necesidades o tareas almacenadas.
            </p>
          )}
        </div>

        {/* Asignaciones */}
        <div className="w-full">
          {token_admin === token && (
            <div className="w-full">
              <div className="flex items-center justify-between">
                <p className="font-bold text-xl">Asignaciones</p>
                {token_admin === token && (
                  <Link
                    to={`/portal/personas/asignar-asistente/${persona._id}`}
                    className="text-gray-500 hover:text-black font-bold"
                  >
                    Añadir
                  </Link>
                )}
              </div>
              {persona.asignacion?.length ? (
                persona.asignacion?.map((asignacion) => (
                  <div
                    key={asignacion._id}
                    className="bg-white shadow mt-3 rounded-lg"
                  >
                    <Asignacion asignacion={asignacion} />
                  </div>
                ))
              ) : (
                <p className="bg-white shadow rounded-lg mt-5 text-center text-gray-600 p-5">
                  Aún no se ha asignado nadie.
                </p>
              )}
            </div>
          )}
          <ModalFormNecesidad />
          <ModalEliminarNecesidad />
          <ModalEliminarAsignacion />
        </div>
      </div>
    </>
  );
};

export default Persona;
