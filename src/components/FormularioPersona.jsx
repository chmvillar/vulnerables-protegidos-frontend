import { useEffect, useState } from "react";
import usePersonas from "../hooks/usePersonas";
import { formatRut, validarRut } from "../helpers/ValidarRut";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const FormularioPersona = () => {
  const [id, setId] = useState(null);
  const [rut, setRut] = useState("");
  const [nombre, setNombre] = useState("");
  const [busquedaMapa, setBusquedaMapa] = useState("");
  const [direccionActualizada, setDireccionActualizada] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [isValidRut, setIsValidRut] = useState(true);
  const [validarNombre, setValidarNombre] = useState(true);
  const [validarBusqueda, setValidarBusqueda] = useState(true);
  const [validarDireccionActualizada, setValidarDireccionActualizada] =
    useState(false);
  const [validarDescripcion, setValidarDescripcion] = useState(true);

  const { submitPersona, persona } = usePersonas();
  const params = useParams();

  useEffect(() => {
    if (params.id && persona.rut) {
      setId(persona._id);
      setRut(persona.rut);
      setNombre(persona.nombre);
      setDireccionActualizada(persona.direccion);
      setDescripcion(persona.descripcion);
      setValidarDireccionActualizada(true);

      console.log(persona.direccion);
    }
  }, [params]);

  const handleRutChange = (e) => {
    const nuevoRut = e.target.value;
    setRut(nuevoRut);
    if (!validarRut(nuevoRut)) {
      setIsValidRut(false);
    } else {
      setIsValidRut(true);
    }
  };

  const handleNombreChange = (e) => {
    const nuevoNombre = e.target.value;
    setNombre(nuevoNombre);
    if (nuevoNombre.length < 3) {
      setValidarNombre(false);
    } else {
      setValidarNombre(true);
    }
  };

  const handleDescripcionChange = (e) => {
    const nuevaDescripcion = e.target.value;
    setDescripcion(nuevaDescripcion);
    if (nuevaDescripcion.length < 5) {
      setValidarDescripcion(false);
    } else {
      setValidarDescripcion(true);
    }
  };

  const handleBlur = () => {
    const rutFormateado = formatRut(rut);
    setRut(rutFormateado);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    function capitalize(str) {
      return str.replace(/\b\w/g, (char) => char.toUpperCase());
    }

    if (isValidRut) {
      let direccionAUsar;

      if (validarDireccionActualizada) {
        const direccionActualizadaLowerCase =
          direccionActualizada.toLowerCase();

        // Validar si la dirección actualizada ya contiene alguna variante de "Isla de Maipo"
        if (
          !(
            direccionActualizadaLowerCase.includes("isla de maipo") ||
            direccionActualizadaLowerCase.includes("isla") ||
            direccionActualizadaLowerCase.includes("islade maipo") ||
            direccionActualizadaLowerCase.includes("islademaipo")
          )
        ) {
          direccionAUsar = `${capitalize(direccionActualizada)}, Isla de Maipo`;
        } else {
          direccionAUsar = capitalize(direccionActualizada);
        }
      } else {
        direccionAUsar = `${busquedaMapa.label}`;
      }

      if (
        nombre.length < 3 ||
        direccionAUsar.length < 5 ||
        descripcion.length < 3
      ) {
        setValidarBusqueda(false);
        Swal.fire({
          icon: "warning",
          title: "Todos los campos son obligatorios",
          text: "Inténtelo nuevamente",
          allowOutsideClick: false,
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        setValidarBusqueda(true);
        await submitPersona({
          id,
          rut,
          nombre,
          direccion: direccionAUsar,
          descripcion,
        });
        setId(null);
      }
    }
  };

  return (
    <form
      className="formPersona bg-white py-10 px-5 md:w-2/3 sm:w-3/4 lg:w-1/3 rounded-lg"
      onSubmit={handleSubmit}
    >
      <h1 className="ini-sesion text-4xl font-bold text-center mb-10 pb-5">
        {id ? "Actualizar Información" : "Registrar Persona"}
      </h1>
      <div className="campo mb-5 px-10">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="rut"
        >
          Rut
        </label>
        <input
          id="rut"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="11.111.111-1"
          value={rut}
          onChange={handleRutChange}
          onBlur={handleBlur}
          maxLength={12}
        />
        {!isValidRut && <p className="pt-1 text-red-500">RUT inválido</p>}
      </div>
      <div className="campo mb-5 px-10">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="nombre"
        >
          Nombre
        </label>
        <input
          id="nombre"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Miles Morales"
          value={nombre}
          onChange={handleNombreChange}
        />
        {validarNombre ? (
          ""
        ) : (
          <p className="pt-1 text-red-500">Nombre inválido</p>
        )}
      </div>
      <div className="campo mb-5 px-10">
        <label className="text-gray-700 uppercase font-bold text-sm">
          Dirección
        </label>
        {id ? (
          <input
            id="dirección"
            type="text"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Municipalidad Isla de Maipo"
            value={direccionActualizada}
            onChange={(e) => setDireccionActualizada(e.target.value)}
          />
        ) : (
          <GooglePlacesAutocomplete
            id="direccion"
            apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
            value={busquedaMapa}
            selectProps={{
              busquedaMapa,
              onChange: setBusquedaMapa,
              placeholder: "Municipalidad Isla de Maipo",
            }}
            autocompletionRequest={{
              componentRestrictions: {
                country: ["cl"],
              },
            }}
          />
        )}

        {!validarBusqueda && (
          <p className="pt-1 text-red-500">Ingresar dirección</p>
        )}
      </div>
      <div className="campo mb-5 px-10">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="descripcion"
        >
          Descripción
        </label>
        <textarea
          id="descripcion"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md resize-none"
          placeholder="Persona con necesidades especiales..."
          value={descripcion}
          onChange={handleDescripcionChange}
        />
        {!validarDescripcion && (
          <p className="pt-1 text-red-500">
            Debe contener al menos 5 caracteres
          </p>
        )}
      </div>
      <div className="flex justify-center items-center">
        <input
          type="submit"
          value={id ? "Actualizar" : "Registrar"}
          className="btn-gradient p-2 px-10 text-white uppercase font-bold block text-center rounded-xl hover:cursor-pointer -mb-4"
        />
      </div>
    </form>
  );
};

export default FormularioPersona;
