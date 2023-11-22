import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useParams } from "react-router-dom";
import usePersonas from "../hooks/usePersonas";
import Swal from "sweetalert2";

const PRIORIDAD = ["Baja", "Media", "Alta"];
const TIPONECESIDAD = [
  "Acceso a Tecnología Educativa",
  "Acceso a Transporte",
  "Bienestar Emocional y Mental",
  "Conectividad Digital",
  "Cultura y Recreación",
  "Desarrollo Personal",
  "Documentación y Legalidad",
  "Educación",
  "Empleo y Medios de Vida",
  "Equidad de Género",
  "Inclusión Social",
  "Medio Ambiente",
  "Participación Cívica",
  "Protección del Medio Ambiente",
  "Red de Apoyo Social",
  "Salud y Seguridad",
  "Seguridad Alimentaria",
  "Servicios Básicos",
  "Sostenibilidad",
  "Vivienda",
  "Otros (Especifique en descripción)"
];



const ModalFormNecesidad = () => {
  const [id, setId] = useState("");
  const [tipoNecesidad, setTipoNecesidad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaMaxima, setFechaMaxima] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [errorTipoNecesidad, setErrorTipoNecesidad] = useState("");
  const [errorDescripcion, setErrorDescripcion] = useState("");
  const [errorFechaMaxima, setErrorFechaMaxima] = useState("");
  const [errorPrioridad, setErrorPrioridad] = useState("");
  const [image, setImage] = useState("");

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
      setTipoNecesidad(necesidad.tipoNecesidad);
      setDescripcion(necesidad.descripcion);
      setFechaMaxima(necesidad.fechaMaxima?.split("T")[0]);
      setPrioridad(necesidad.prioridad);
      setImage(necesidad.imagen);
    } else {
      setId(""),
      setTipoNecesidad(""),
      setDescripcion(""),
      setFechaMaxima(""),
      setPrioridad("");
    }
  }, [necesidad]);

  function convertirBase64(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    var chunkSize = 5 * 1024 * 1024; // 5 MB chunks
    var offset = 0;
  
    function leerChunk() {
      var blob = file.slice(offset, offset + chunkSize);
      reader.readAsDataURL(blob);
    }
  
    reader.onload = function () {
      if (reader.result) {
        console.log(reader.result);
        setImage(reader.result);

        offset += chunkSize;
  
        if (offset < file.size) {
          leerChunk();
        }
      }
    };
  
    leerChunk();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([tipoNecesidad, descripcion, prioridad, fechaMaxima].includes("")) {
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
      tipoNecesidad !== "" &&
      descripcion.length >= 5 &&
      prioridad !== "" &&
      fechaMaxima !== ""
    ) {
      if (necesidad?._id) {
        await submitNecesidad({
          id,
          tipoNecesidad,
          descripcion,
          fechaMaxima,
          prioridad,
          persona: params.id,
          imagen: image,
        });
        setId(""),
        setTipoNecesidad(""),
        setDescripcion(""),
        setFechaMaxima(""),
        setPrioridad("");
        setImage("");
      } else {
        await submitNecesidad({
          tipoNecesidad,
          descripcion,
          fechaMaxima,
          prioridad,
          persona: params.id,
          imagen: image,
        });
        setId(""),
        setTipoNecesidad(""),
        setDescripcion(""),
        setFechaMaxima(""),
        setPrioridad("");
        setImage("");
      }
    }
  };

  const fechaActual = new Date().toISOString().split('T')[0];

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
                    {/* actual */}
                    <div className="mb-5">
                      <label
                        htmlFor="tipoNecesidad"
                        className="text-gray-700 uppercase font-bold text-sm mb-2"
                      >
                        Tipo Necesidad:
                      </label>
                      <select
                        id="tipoNecesidad"
                        className="border-2 w-full p-2 mt-2 rounded-md"
                        value={tipoNecesidad}
                        onChange={(e) => {
                          setTipoNecesidad(e.target.value);
                          if (e.target.value.length < 3) {
                            setErrorTipoNecesidad("Tipo de Necesidad inválida");
                          } else {
                            setErrorTipoNecesidad("");
                          }
                        }}
                      >
                        <option value="">-- Seleccionar --</option>
                        {TIPONECESIDAD.map((opcion) => (
                          <option key={opcion}>{opcion}</option>
                        ))}
                      </select>
                      {errorPrioridad && (
                        <p className="text-red-500">{errorPrioridad}</p>
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
                        min={fechaActual}
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
                    <div className="situacion">
                      <div>
                        {image && (
                          <div className="mb-4 flex justify-center items-center">
                            <img
                              src={image}
                              alt="Imagen seleccionada"
                              className="max-w-full max-h-32 mb-2 rounded-lg"
                            />
                          </div>
                        )}
                      </div>
                      <form className="bg-white shadow-md p-2 rounded-lg my-5">
                        <label className="block">
                          <input
                            accept=".png, .jpg, .jpeg"
                            type="file"
                            className="block w-full text-sm file:text-white text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 :text-white hover:file:bg-blue-700 file:disabled:opacity-50 :disabled:pointer-events-none dark:file:bg-blue-500 dark:hover:file:bg-blue-400"
                            onChange={convertirBase64}
                          />
                        </label>
                      </form>
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
