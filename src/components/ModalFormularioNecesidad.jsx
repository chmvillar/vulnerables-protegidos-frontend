import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useParams } from "react-router-dom";
import usePersonas from "../hooks/usePersonas";
import Swal from "sweetalert2";

const PRIORIDAD = ["Baja", "Media", "Alta"];

const ModalFormNecesidad = () => {
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaMaxima, setFechaMaxima] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [errorNombre, setErrorNombre] = useState("");
  const [errorDescripcion, setErrorDescripcion] = useState("");
  const [errorFechaMaxima, setErrorFechaMaxima] = useState("");
  const [errorPrioridad, setErrorPrioridad] = useState("");

  const params = useParams();

  const {
    modalFormNecesidad,
    handleModalNecesidad,
    submitNecesidad,
    necesidad,
  } = usePersonas();

  useEffect(() => {
    if (necesidad?._id) {
      setId(necesidad._id);
      setNombre(necesidad.nombre);
      setDescripcion(necesidad.descripcion);
      setFechaMaxima(necesidad.fechaMaxima?.split("T")[0]);
      setPrioridad(necesidad.prioridad);
    } else {
      setId(""),
        setNombre(""),
        setDescripcion(""),
        setFechaMaxima(""),
        setPrioridad("");
    }
  }, [necesidad]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, descripcion, prioridad, fechaMaxima].includes("")) {
      Swal.fire({
        icon: "warning",
        title: "Todos los campos son obligatorios",
        text: "Inténtelo nuevamente",
        confirmButtonColor: "#3085d6",
        allowOutsideClick: false,
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    if (
      nombre.length >= 3 &&
      descripcion.length >= 5 &&
      prioridad !== "" &&
      fechaMaxima !== ""
    ) {
      if (necesidad?._id){
        await submitNecesidad({ id, nombre, descripcion, fechaMaxima, prioridad, persona: params.id});
      setId(""),
        setNombre(""),
        setDescripcion(""),
        setFechaMaxima(""),
        setPrioridad("");
      } else {
        await submitNecesidad({ nombre, descripcion, fechaMaxima, prioridad, persona: params.id});
        setId(""),
        setNombre(""),
        setDescripcion(""),
        setFechaMaxima(""),
        setPrioridad("");
      }
    }
  };

  return (
    <Transition.Root show={modalFormNecesidad} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleModalNecesidad}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleModalNecesidad}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title>
                    <div className="flex justify-center">
                      <h3 className="text-3xl leading-6 font-bold text-gray-600 mt-5">
                        {id ? "Editar" : "Crear Tarea o Necesidad"}
                      </h3>
                    </div>
                  </Dialog.Title>

                  <form
                    id="formularioNecesidad"
                    className="my-10"
                    onSubmit={handleSubmit}
                  >
                    <div className="mb-5">
                      <label
                        htmlFor="nombre"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Nombre:
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        placeholder="Ingrese nombre de la necesidad"
                        className="border-2 w-full p-2 placeholder-gray-400 rounded-md mt-2"
                        value={nombre}
                        onChange={(e) => {
                          setNombre(e.target.value);
                          if (e.target.value.length < 3) {
                            setErrorNombre("Nombre inválido");
                          } else {
                            setErrorNombre("");
                          }
                        }}
                      />
                      {errorNombre && (
                        <p className="text-red-500">{errorNombre}</p>
                      )}
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="descripcion"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Descripción de la necesidad:
                      </label>
                      <textarea
                        id="descripcion"
                        placeholder="Ingrese la descripción de la necesidad"
                        className="border-2 w-full p-2 placeholder-gray-400 rounded-md mt-2"
                        value={descripcion}
                        onChange={(e) => {
                          setDescripcion(e.target.value);
                          if (e.target.value.length < 5) {
                            setErrorDescripcion(
                              "Debe escribir al menos 5 caracteres"
                            );
                          } else {
                            setErrorDescripcion("");
                          }
                        }}
                      ></textarea>
                      {errorDescripcion && (
                        <p className="text-red-500">{errorDescripcion}</p>
                      )}
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="fecha-maxima"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Fecha Máxima
                      </label>
                      <input
                        type="date"
                        id="fecha-maxima"
                        className="border-2 w-full p-2 placeholder-gray-400 rounded-md mt-2"
                        value={fechaMaxima}
                        onChange={(e) => {
                          setFechaMaxima(e.target.value);
                          if (e.target.value.length < 8) {
                            setErrorFechaMaxima("Fecha inválida");
                          } else {
                            setErrorFechaMaxima("");
                          }
                        }}
                      />
                      {errorFechaMaxima && (
                        <p className="text-red-500">{errorFechaMaxima}</p>
                      )}
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="prioridad"
                        className="text-gray-700 uppercase font-bold text-sm mb-2"
                      >
                        Prioridad
                      </label>
                      <select
                        id="prioridad"
                        className="border-2 w-full p-2 mt-2 rounded-md"
                        value={prioridad}
                        onChange={(e) => {
                          setPrioridad(e.target.value);
                          if (e.target.value.length < 3) {
                            setErrorPrioridad("Seleccione prioridad");
                          } else {
                            setErrorPrioridad("");
                          }
                        }}
                      >
                        <option value="">-- Seleccionar --</option>
                        {PRIORIDAD.map((opcion) => (
                          <option key={opcion}>{opcion}</option>
                        ))}
                      </select>
                      {errorPrioridad && (
                        <p className="text-red-500">{errorPrioridad}</p>
                      )}
                    </div>
                    <div className="flex justify-center items-center mt-2">
                      <input
                        type="submit"
                        className="btn-gradient text-sm py-2.5 px-12 md:w-auto rounded-xl font-bold text-white text-center mt-5 uppercase cursor-pointer"
                        value={id ? "Guardar" : "Crear"}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalFormNecesidad;
