import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Swal from "sweetalert2";

const NuevaPassword = () => {
  const [password, setPassword] = useState("");
  const [tokenValido, setTokenValido] = useState(false);
  const params = useParams();
  const { token } = params;
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`);
        setTokenValido(true);
      } catch (error) {
        console.log(error);
      }
    };
    comprobarToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      Swal.fire({
        icon: "warning",
        text: "La contraseña debe tener al menos 6 caracteres",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    try {
      const url = `/usuarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });

      Swal.fire({
        icon: "success",
        //title: "Contraseña restablecida exitosamente",
        title: data.msg,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/portal/";
        }
      });
    } catch (error) {
      console.log("");
    }
  };

  return (
    <>
      <h1 className="ini-sesion font-black text-6xl text-center mx-auto">
        Restablecer contraseña
      </h1>

      {tokenValido ? (
        <>
          <form
            className="my-10 bg-white shadow rounded-lg px-10 py-5"
            onSubmit={handleSubmit}
          >
            {/* Contraseña */}
            <div className="my-5">
              <label
                className="text-gray-600 block text-xl font-bold"
                htmlFor="password"
              >
                Nueva Contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder="Ingrese su nueva contraseña"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Botones */}
            <div className="flex items-center justify-around">
              <div className="bg-blue-500 w-5/12 p-1 rounded-xl text-white font-bold">
                <Link
                  className="block text-center my-2 text-white text-sm"
                  to="/"
                >
                  Volver
                </Link>
              </div>
              <div>
                <input
                  type="submit"
                  value="Enviar"
                  className="bg-green-400 w-60 py-3 my-3 text-white font-bold rounded-xl hover:cursor-pointer hover:bg-green-500 transition-colors mx-auto"
                />
              </div>
            </div>
          </form>
        </>
      ) : (
        <form className="my-10 bg-white shadow rounded-lg px-10 py-5">
          {/* Contraseña */}
          <div className="my-5 flex items-center justify-center text-3xl text-red-600">
            <h1>Enlace inválido</h1>
          </div>
          <div className="my-5 flex items-center justify-center text-slate-500">
            <p>Contacte con un administrador</p>
          </div>
          {/* Botones */}
          <div className="flex items-center justify-center">
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
          </div>
        </form>
      )}
    </>
  );
};

export default NuevaPassword;
