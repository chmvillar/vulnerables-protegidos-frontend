import { useState } from "react";
import Swal from "sweetalert2";
import usePersonas from "../hooks/usePersonas";

const FormularioAsistente = () => {
  const [nombre, setNombre] = useState("");
  const { submitAsignacion } = usePersonas();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nombre.length >= 3) {
      submitAsignacion(nombre);
      setNombre("")
    } else {
      Swal.fire({
        icon: "warning",
        title: "Nombre inválido",
        text: "Inténtelo nuevamente.",
        allowOutsideClick: false,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    
  };

  return (
    <form
      className="bg-white py-5 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      <div>
        <label
          htmlFor="nombre"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Nombre:
        </label>
        <input
          type="text"
          id="nombre"
          placeholder="Miles Morales"
          className="border-2 w-full p-2 placeholder-gray-400 rounded-md mt-2"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="flex justify-center items-center mt-2">
        <input
          type="submit"
          className="btn-registrar text-sm py-2.5 px-12 md:w-auto rounded-xl font-bold text-white text-center mt-5 uppercase cursor-pointer"
          value="Buscar"
        />
      </div>
    </form>
  );
};

export default FormularioAsistente;
