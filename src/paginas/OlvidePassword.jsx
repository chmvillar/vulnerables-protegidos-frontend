import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../config/clienteAxios";

const OlvidePassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password`,
        { email }
      );
      Swal.fire({
        icon: "success",
        title: "Solicitud enviada correctamente",
        text: data.msg,
        confirmButtonColor: "#3085d6",
        allowOutsideClick: false,
        confirmButtonText: "Continuar",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/portal/";
        }
      });
    } catch (error) {
      if (email === "" || email.length < 6) {
        Swal.fire({
          icon: "error",
          title: "Correo inválido",
          text: "Ingrese su correo electrónico",
          confirmButtonColor: "#3085d6",
          allowOutsideClick: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Usuario no registrado",
          text: "Intente nuevamente con su correo electrónico",
          confirmButtonColor: "#3085d6",
          allowOutsideClick: false,
        });
      }
    }
  };

  return (
    <>
      <h1 className="ini-sesion font-black text-6xl text-center mx-auto">
        Recuperar cuenta
      </h1>

      <form
        className="my-10 bg-white shadow rounded-lg px-10 py-5"
        onSubmit={handleSubmit}
      >
        {/* Correo */}
        <div className="my-5">
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

        <div className="flex items-center justify-between">
          <Link
            className="block text-center mt-1 text-slate-500 text-sm"
            to="/portal/"
          ></Link>

          <button>
            <Link
              className="block text-center mt-1 text-slate-500 text-sm"
              to="/portal/"
            >
              <input
                type="submit"
                value="Volver"
                className="bg-blue-400 w-60 py-3 my-3 text-white font-bold rounded-xl hover:cursor-pointer hover:bg-blue-500 transition-colors mx-auto"
              />
            </Link>
          </button>

          <input
            type="submit"
            value="Recuperar Acceso"
            className="bg-green-400 w-60 py-3 my-3 text-white font-bold rounded-xl hover:cursor-pointer hover:bg-green-500 transition-colors mx-auto"
          />
        </div>
      </form>
    </>
  );
};

export default OlvidePassword;
