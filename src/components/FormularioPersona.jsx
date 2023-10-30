import { useState } from "react";
import usePersonas from "../hooks/usePersonas";
import Swal from "sweetalert2";

const FormularioPersona = () => {
  const [rut, setRut] = useState("");
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const { submitPersona } = usePersonas();

  const alerta = (icon, titulo, texto) => {
    Swal.fire({
      icon: icon,
      title: titulo,
      text: texto,
      confirmButtonColor: "#3085d6",
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([rut, nombre, direccion, descripcion].includes("")) {
      alerta(
        "warning",
        "Todos los campos son obligatorios",
        "Intentelo nuevamente"
      );
      return;
    }

    submitPersona({ rut, nombre, direccion, descripcion });
    setRut("")
    setNombre("")
    setDireccion("")
    setDescripcion("")
  };

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/3 rounded-lg"
      onSubmit={handleSubmit}
    >
      <h1 className="ini-sesion text-4xl font-bold text-center mb-10 pb-5">
        Registrar Persona
      </h1>
      <div className="mb-5 px-10">
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
          onChange={(e) => setRut(e.target.value)}
        />
      </div>
      <div className="mb-5 px-10">
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
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="mb-5 px-10">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="direccion"
        >
          Dirección
        </label>
        <input
          id="direccion"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="P. Sherman calle wallaby 42, Sydney"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
      </div>
      <div className="mb-5 px-10">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="descripcion"
        >
          Descripción
        </label>
        <textarea
          id="descripcion"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md resize-none"
          placeholder="Información que desee almacenar"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>
      <div className="flex justify-center items-center">
        <input
          type="submit"
          value="Registrar"
          className="btn-registrar p-2 px-10 text-white uppercase font-bold block text-center rounded-xl hover:cursor-pointer"
        />
      </div>
    </form>
  );
};

export default FormularioPersona;
