import { useState } from "react";
import Swal from "sweetalert2";
import clienteAxios from "../config/clienteAxios";
import { Link } from "react-router-dom";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if ([nombre, email, password, repetirPassword].includes("")) {
      Swal.fire({
        icon: "error",
        text: "Todos los campos son obligatorios",
        confirmButtonColor: "#3085d6",
      });
      return;
    }
    {
      /* Validar nombre */
    }
    if (nombre.length < 3) {
      Swal.fire({
        icon: "error",
        text: "Debe ingresar un nombre",
        confirmButtonColor: "#3085d6",
      });
      return;
    }
    {
      /* Validar correo */
    }
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        text: "Correo Electrónico no válido!",
        confirmButtonColor: "#3085d6",
      });
      return;
    }
    // Validar contraseña
    if (password.length < 6 || password !== repetirPassword) {
      Swal.fire({
        icon: "warning",
        text: "La contraseña debe tener al menos 6 caracteres y ser iguales",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    // Crear usuario en API
    try {
      const { data } = await clienteAxios.post(`/usuarios`, {
        nombre,
        email,
        password,
      });
      Swal.fire({
        icon: "success",
        title: "Usuario creado correctamente",
        text: data.msg,
        confirmButtonColor: "#3085d6",
      });

      setNombre("");
      setEmail("");
      setPassword("");
      setRepetirPassword("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Correo ya registrado",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  return (
    <form
      className="container-asistente bg-white shadow rounded-lg sm:w-1/3 md:w-2/3 lg:w-1/3 mx-auto mt-10"
      onSubmit={handleSubmit}
    >
      <h1 className="ini-sesion text-4xl text-center mb-10 pt-8 pb-4">
        Registrar Asistente
      </h1>
      {/* Nombre */}
      <div className="mb-5 px-8">
        <label
          className="text-gray-600 block text-xl font-bold"
          htmlFor="nombre"
        >
          Nombre
        </label>
        <input
          id="nombre"
          type="text"
          placeholder="Juan Magan"
          className="w-full mt-3 p-2 border rounded-xl bg-gray-50"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      {/* Correo */}
      <div className="mb-5 px-8">
        <label
          className="text-gray-600 block text-xl font-bold"
          htmlFor="email"
        >
          Correo
        </label>
        <input
          id="email"
          type="email"
          placeholder="Correo@islademaipo.cl"
          className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {/* Contraseña */}
      <div className="mb-5 px-8">
        <label
          className="text-gray-600 block text-xl font-bold"
          htmlFor="password"
        >
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          placeholder="Ingrese la contraseña"
          className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {/* Repetir Contraseña */}
      <div className="mb-5 px-8">
        <label
          className="text-gray-600 block text-xl font-bold"
          htmlFor="password2"
        >
          Repetir Contraseña
        </label>
        <input
          id="password2"
          type="password"
          placeholder="Repita la contraseña"
          className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          value={repetirPassword}
          onChange={(e) => setRepetirPassword(e.target.value)}
        />
      </div>

      <div className="crear-asistente text-center justify-between">
        <input
          type="submit"
          value="Crear"
          className="btn-gradient w-40 py-2 mt-2 mb-5 text-white font-bold rounded-xl hover:cursor-pointer mx-auto"
        />
      </div>
    </form>
  );
};

export default Registrar;
