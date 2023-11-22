import { useState } from "react";
import { formatearFecha } from "../helpers/formatearFecha";
import usePersonas from "../hooks/usePersonas";
import ImagenModal from "./ImagenModal";

const Necesidad = ({ necesidad }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { tipoNecesidad, descripcion, fechaMaxima, prioridad, estado, imagen, _id } =
    necesidad;

  const {
    handleModalEditarNecesidad,
    handleModalEliminarNecesidad,
    completarNecesidad,
  } = usePersonas();

  const handleImagenClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const token_admin = import.meta.env.VITE_TOKEN_ADMIN;
  const token = localStorage.getItem("email");

  return (
    <div className="necesidad border-b p-5 flex justify-between gap-x-5 sm:flex-col lg:flex-row">
      {estado ? (
        <>
          <div className="lg:flex lg:flex-col mx-auto lg:mx-0">
            <p className="mb-1 text-lg flex justify-center lg:justify-start capitalize">
              {tipoNecesidad}
            </p>
            {estado && token_admin === token ? (
              <div className="flex flex-row justify-center mb-3">
                {necesidad.completado.nombre === "admin" ? (
                  <div className="flex flex-row justify-center mb-3">
                    <p className="text-xl text-green-600">
                      Fue completada por usted.
                    </p>
                  </div>
                ) : (
                  <div className="completadaPor flex gap-1 bg-green-500 shadow py-1 px-2 rounded-lg">
                    <p className="text-sm text-white xl:text-xl">Completada</p>
                    <p className="capitalize text-white text-sm xl:text-xl">
                      por: {necesidad.completado.nombre}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="flex text-xl justify-center items-center mb-3 text-green-600">
                Está completada!
              </p>
            )}
          </div>
          <div className="flex justify-center items-center">
            {token_admin === token && (
              <button
                className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                onClick={() => handleModalEliminarNecesidad(necesidad)}
              >
                Eliminar
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <div>
            <p className="mb-1 text-xl">{tipoNecesidad}</p>
            <p className="mb-1 text-sm text-gray-500 uppercase">
              {descripcion}
            </p>
            <p className="mb-1 text-sm">
              Fecha Máxima: {formatearFecha(fechaMaxima)}
            </p>
            <p className="mb-1 text-lg text-gray-600">Prioridad: {prioridad}</p>
            {imagen && (
              <div className="mb-4 w-10" onClick={handleImagenClick}>
                <ImagenModal imageUrl={imagen} onClose={handleCloseModal} />
              </div>
            )}
          </div>

          <div className="btn-necesidad flex justify-center items-center lg:justify-endlg:flex-row gap-2 mt-3">
            {token_admin === token && (
              <button
                className="bg-blue-500 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                onClick={() => handleModalEditarNecesidad(necesidad)}
              >
                Editar
              </button>
            )}

            <button
              className={`${
                estado ? "bg-green-600" : "bg-gray-400"
              } px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
              onClick={() => completarNecesidad(_id)}
            >
              {estado ? "Completa" : "Pendiente"}
            </button>
            {token_admin === token && (
              <button
                className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                onClick={() => handleModalEliminarNecesidad(necesidad)}
              >
                Eliminar
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Necesidad;
