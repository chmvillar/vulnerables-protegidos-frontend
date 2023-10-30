import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAuth } = useAuth();

  const navigate = useNavigate();

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

    if ([email, password].includes("")) {
      alerta("warning", "Todos los campos son obligatorios", "Intentelo nuevamente")
      return;
    }

    try {
      const { data } = await clienteAxios.post("/usuarios/login/", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email)
      setAuth(data);
      setTimeout( () => {
        alerta("success", "Inicio de sesión existoso", "")
        navigate("/portal/personas/")
        console.clear();
      })

    } catch (error) {
      alerta("error", error.response.data.msg, "")
    }
  };

  return (
    <>
      <h1 className="ini-sesion font-black text-6xl text-center mx-auto">
        Iniciar Sesión
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
        {/* Contraseña */}
        <div className="my-5">
          <label
            className="text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Ingrese su contraseña"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-center">
          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-green-400 w-60 py-3 my-3 text-white font-bold rounded-xl hover:cursor-pointer hover:bg-green-500 transition-colors mx-auto"
          />
        </div>
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link className="block text-center my-2 text-slate-500 text-sm" to="/">
          Volver
        </Link>
        <Link
          className="block text-center my-2 text-slate-500 text-sm"
          to="/portal/olvide-password"
        >
          Olvidé mi Contraseña
        </Link>
      </nav>
    </>
  );
};

export default Login;
